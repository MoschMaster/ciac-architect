import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsTeaserSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="mb-12">
          <div className="w-12 h-px bg-brand-green mb-8" />
          <h2 className="font-playfair text-4xl font-semibold text-foreground">
            Inzichten
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start border border-border rounded-sm p-8 md:p-12 bg-brand-offwhite hover:border-brand-green/40 transition-colors duration-300"
        >
          <div>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="inline-flex items-center gap-2 font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green bg-brand-light px-3 py-1 rounded-sm">
                <BookOpen className="w-3 h-3" />
                Uitgelicht artikel
              </span>
              <span className="font-inter text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                Architectuurmodellen · 8 min
              </span>
            </div>

            <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-4">
              Design for Digital: de vijf bouwblokken voor een wendbare organisatie
            </h3>

            <p className="font-inter text-base text-muted-foreground leading-relaxed max-w-2xl">
              Hoe MIT-onderzoekers Ross, Beath en Mocker laten zien dat blijvende digitale
              wendbaarheid niet draait om losse projecten, maar om vijf onderling
              versterkende bouwblokken — van Operational Backbone tot External Developer
              Platform.
            </p>
          </div>

          <Link
            to="/inzichten/design-for-digital"
            className="group self-end inline-flex items-center gap-2 bg-brand-green text-white font-inter font-medium text-sm tracking-wide px-6 py-3 rounded-sm hover:bg-brand-mid transition-colors duration-300 whitespace-nowrap"
          >
            Lees het artikel
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/inzichten"
            className="inline-flex items-center gap-2 font-inter text-sm font-medium text-brand-green hover:text-brand-mid transition-colors"
          >
            Alle artikelen bekijken
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}