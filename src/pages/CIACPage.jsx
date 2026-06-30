import { Link } from 'react-router-dom';
import usePageMeta from '@/hooks/usePageMeta';
import HeroSection from '@/components/ciac/HeroSection';
import IntroSection from '@/components/ciac/IntroSection';
import ApproachSection from '@/components/ciac/ApproachSection';
import QuoteSection from '@/components/ciac/QuoteSection';
import CIACDefinition from '@/components/ciac/CIACDefinition';
import ServicesSection from '@/components/ciac/ServicesSection';
import BuildingBlocksSection from '@/components/ciac/BuildingBlocksSection';
import CasesSection from '@/components/ciac/CasesSection';
import InsightsTeaserSection from '@/components/ciac/InsightsTeaserSection';
import ConsultationFormSection from '@/components/ciac/ConsultationFormSection';
import ConsultationCoachWidget from '@/components/ciac/ConsultationCoachWidget';
import LanguageToggle from '@/components/LanguageToggle';

export default function CIACPage() {
  usePageMeta(
    'IT Architecture Consulting',
    'CIAC helpt organisaties hun IT-landschap structureren en strategisch wendbaar te worden. Enterprise architectuur, IT-strategie en digitale transformatie — van Conclusion Consulting.'
  );
  return (
    <main className="font-inter">
      <HeroSection />
      <IntroSection />
      <ApproachSection />
      <QuoteSection />
      <CIACDefinition />
      <ServicesSection />
      <BuildingBlocksSection />
      <CasesSection />
      <InsightsTeaserSection />
      <ConsultationFormSection />

      {/* Footer bar */}
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
            <LanguageToggle />
            <p className="font-inter text-xs text-white/30">© {new Date().getFullYear()} Conclusion Consulting</p>
          </div>
        </div>
      </footer>

      <ConsultationCoachWidget />
    </main>
  );
}