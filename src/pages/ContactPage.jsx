import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

const experts = [
  {
    name: 'Rutger de Valk',
    role: 'Lead IT Architecture',
    email: 'r.devalk@conclusion.nl',
    linkedin: 'https://www.linkedin.com/company/conclusion-consulting/',
    initial: 'R',
  },
  {
    name: 'Antoon van der Gouw',
    role: 'Senior Architect',
    email: 'a.vandergouw@conclusion.nl',
    linkedin: 'https://www.linkedin.com/in/antoonvandergouw/',
    initial: 'A',
  },
  {
    name: 'Mischa van Ek',
    role: 'Enterprise Architect',
    email: 'mischa.van.ek@conclusion.nl',
    linkedin: 'https://www.linkedin.com/company/conclusion-consulting/',
    initial: 'M',
  },
];

export default function ContactPage() {
  usePageMeta(
    'Contact',
    'Neem contact op met de IT-architecten van Conclusion IT Architecture Consulting (CIAC). Stel je architectuurvraagstuk voor en plan een vrijblijvend kennismakingsgesprek.'
  );
  return (
    <main className="min-h-screen bg-brand-offwhite font-inter">
      {/* Nav */}
      <div className="bg-brand-charcoal px-8 md:px-16 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Terug naar overzicht
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 md:px-16 py-20">
        <div className="w-12 h-px bg-brand-green mb-8" />
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Contact
        </h1>
        <p className="font-inter text-lg text-muted-foreground font-light leading-relaxed mb-12">
          Heb je een architectuurvraagstuk of wil je vrijblijvend kennismaken? Neem direct contact op met één van onze architecten of stuur een e-mail naar ons algemene adres.
        </p>

        {/* General contact */}
        <div className="bg-white border border-border p-6 rounded-sm mb-10">
          <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-brand-green mb-3">Algemeen</p>
          <a
            href="mailto:ciac@conclusion.nl"
            className="inline-flex items-center gap-3 font-inter text-base font-medium text-foreground hover:text-brand-green transition-colors"
          >
            <Mail className="w-5 h-5 text-brand-green" />
            ciac@conclusion.nl
          </a>
        </div>

        {/* Expert cards */}
        <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Onze architecten
        </p>
        <div className="space-y-3">
          {experts.map((expert, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-5 bg-white border border-border hover:border-brand-green/50 transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-sm bg-brand-green flex items-center justify-center flex-shrink-0">
                <span className="font-playfair text-white font-semibold text-lg">{expert.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-inter font-semibold text-foreground text-base">{expert.name}</p>
                <p className="font-inter text-xs text-muted-foreground mt-0.5">{expert.role}</p>
              </div>
              <div className="flex items-center gap-3">
                <a href={`mailto:${expert.email}`} className="text-muted-foreground hover:text-brand-green transition-colors" title="E-mail">
                  <Mail className="w-4 h-4" />
                </a>
                <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-green transition-colors" title="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/#kennismaking"
            className="inline-flex items-center gap-3 bg-brand-green text-white font-inter font-medium text-sm px-7 py-3 rounded-sm hover:bg-brand-mid transition-colors duration-300"
          >
            Plan een kennismaking
          </Link>
        </div>
      </div>

      <footer className="bg-brand-charcoal border-t border-white/10 py-6 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-brand-green rounded-sm flex items-center justify-center">
              <span className="text-white font-inter font-bold text-xs">C</span>
            </div>
            <span className="font-inter text-xs text-white/40 tracking-wide">
              Conclusion Consulting — IT Architecture
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">Over ons</Link>
            <Link to="/contact" className="font-inter text-xs text-white/40 hover:text-white/70 transition-colors">Contact</Link>
            <p className="font-inter text-xs text-white/30">© {new Date().getFullYear()} Conclusion Consulting</p>
          </div>
        </div>
      </footer>
    </main>
  );
}