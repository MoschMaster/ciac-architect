import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import usePageMeta from '@/hooks/usePageMeta';

export default function AboutPage() {
  usePageMeta(
    'Over ons',
    'Leer meer over Conclusion IT Architecture Consulting (CIAC) — specialisten in enterprise architectuur, IT-strategie en digitale transformatie voor middelgrote en grote organisaties in Nederland.'
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
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-8 leading-tight">
          Over Conclusion IT Architecture Consulting
        </h1>

        <div className="space-y-6 font-inter text-base text-muted-foreground leading-relaxed">
          <p>
            Conclusion IT Architecture Consulting (CIAC) is de architectuurdiscipline binnen Conclusion Consulting, gericht op organisaties die meer grip willen op hun IT-landschap en strategische wendbaarheid willen vergroten. We verbinden bedrijfsstrategie aan technologische keuzes — zodat IT niet volgt, maar leidt.
          </p>
          <p>
            Onze dienstverlening richt zich op middelgrote en grote organisaties die te maken hebben met een groeiend IT-landschap, complexe afhankelijkheden tussen systemen, of de behoefte aan een heldere digitale koers. We werken voor organisaties in de publieke sector, financiële dienstverlening, industrie en zorg — overal waar IT een strategische rol speelt.
          </p>
          <p>
            CIAC biedt vier kernservices: strategie & governance, business- en IT-landscaping, architectuurassessments, en Enterprise Architecture as a Service (EaaS). Bij elk traject werken we in co-creatie met jouw organisatie — we brengen expertise mee, maar zorgen ook dat jouw mensen de regie kunnen voeren nadat wij ons werk hebben gedaan.
          </p>
          <p>
            Onze architecten combineren jarenlange ervaring in enterprise architectuur met een pragmatische aanpak. We geloven niet in architectuur die alleen op papier bestaat. Architectuur moet werken in de praktijk: het moet besluitvorming versnellen, complexiteit verminderen en investeringen aantoonbaar rechtvaardigen.
          </p>
          <p>
            CIAC maakt deel uit van het bredere Conclusion-ecosysteem, een groep van gespecialiseerde IT-bedrijven in Nederland. Dat geeft ons het voordeel van diepgaande specialisatie in architectuur, gecombineerd met de breedte van een groot netwerk van technologie- en implementatiepartners.
          </p>
          <p>
            Wil je weten of wij het juiste architectuurpartner zijn voor jouw vraagstuk? Gebruik de assistent op onze hoofdpagina voor een vrijblijvend kennismakingsgesprek, of neem direct contact op via onze contactpagina.
          </p>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-brand-green text-white font-inter font-medium text-sm px-7 py-3 rounded-sm hover:bg-brand-mid transition-colors duration-300"
          >
            Contact opnemen
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-inter text-sm text-brand-green hover:text-brand-mid transition-colors"
          >
            Bekijk onze diensten →
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