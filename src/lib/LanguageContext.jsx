import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { nlToEn, enToNl } from '@/lib/languageDictionary';

const LanguageContext = createContext({ language: 'nl', setLanguage: () => {} });

function translateText(value, language) {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (!clean) return value;
  const map = language === 'en' ? nlToEn : enToNl;
  return map[clean] || value;
}

function applyTranslations(language) {
  const root = document.getElementById('root');
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (node.parentElement?.closest('script, style, textarea')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const translated = translateText(node.nodeValue, language);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  });

  root.querySelectorAll('[placeholder], [aria-label], [title]').forEach((el) => {
    ['placeholder', 'aria-label', 'title'].forEach((attr) => {
      const value = el.getAttribute(attr);
      if (!value) return;
      const translated = translateText(value, language);
      if (translated !== value) el.setAttribute(attr, translated);
    });
  });
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('preferredLanguage') || 'nl');

  useEffect(() => {
    if (localStorage.getItem('preferredLanguage')) return;

    base44.functions.invoke('detectVisitorLanguage', {}).then((response) => {
      const detected = response.data?.language === 'nl' ? 'nl' : 'en';
      setLanguageState(detected);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    applyTranslations(language);

    const observer = new MutationObserver(() => applyTranslations(language));
    const root = document.getElementById('root');
    if (root) observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true });
    return () => observer.disconnect();
  }, [language]);

  const setLanguage = (nextLanguage) => {
    localStorage.setItem('preferredLanguage', nextLanguage);
    setLanguageState(nextLanguage);
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}