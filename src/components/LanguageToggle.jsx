import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === 'nl' ? 'en' : 'nl';

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors"
      aria-label={language === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
    >
      {language === 'nl' ? 'English' : 'Nederlands'}
    </button>
  );
}