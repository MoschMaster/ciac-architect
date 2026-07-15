import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCaseBySlug } from '@/lib/casesData';
import usePageMeta from '@/hooks/usePageMeta';
import JsonLd from '@/components/JsonLd';
import CaseHeader from '@/components/cases/CaseHeader';
import CaseFactsheet from '@/components/cases/CaseFactsheet';
import CaseSection from '@/components/cases/CaseSection';

export default function CaseDetailPage() {
  const { slug } = useParams();
  const caseItem = getCaseBySlug(slug);

  usePageMeta(
    caseItem ? `${caseItem.client} — klantcase` : 'Case niet gevonden',
    caseItem?.description,
    undefined,
    'article'
  );

  if (!caseItem) {
    return (
      <main className="font-inter min-h-screen bg-brand-offwhite flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <h1 className="font-playfair text-3xl font-semibold text-foreground mb-4">
            Case niet gevonden
          </h1>
          <p className="font-inter text-muted-foreground mb-8">
            Deze klantcase bestaat niet (meer).
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-green font-inter text-sm font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar overzicht
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="font-inter bg-white min-h-screen">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${caseItem.client} — ${caseItem.tag || 'klantcase'}`,
          description: caseItem.description,
          articleSection: caseItem.sector,
          author: { '@type': 'Organization', name: 'Conclusion IT Architecture Consulting' },
          publisher: { '@type': 'Organization', name: 'Conclusion IT Architecture Consulting' },
          about: { '@type': 'Organization', name: caseItem.client, url: caseItem.website },
        }}
      />
      <CaseHeader caseItem={caseItem} />

      {/* Two-column body: sticky factsheet + reading column */}
      <article className="py-20 px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* Left: factsheet */}
          <CaseFactsheet caseItem={caseItem} />

          {/* Right: reading column */}
          <div className="max-w-[680px] space-y-20">
            {/* Lead paragraph */}
            {caseItem.intro && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-px bg-brand-green mb-6" />
                <p className="font-playfair text-xl md:text-2xl font-normal text-foreground leading-relaxed">
                  {caseItem.intro}
                </p>
              </motion.div>
            )}

            {/* Challenge */}
            {caseItem.challenge && (
              <CaseSection number="01" eyebrow="Context" title={caseItem.challenge.title}>
                <p>{caseItem.challenge.text}</p>
              </CaseSection>
            )}

            {/* Approach */}
            {caseItem.approach && (
              <CaseSection number="02" eyebrow="Aanpak" title={caseItem.approach.title}>
                <p>{caseItem.approach.text}</p>
                {caseItem.approach.pillars && (
                  <div className="not-prose grid sm:grid-cols-2 gap-3 mt-8">
                    {caseItem.approach.pillars.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-brand-offwhite border border-border p-4 rounded-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <span className="font-inter text-sm text-foreground leading-relaxed">
                          {p}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CaseSection>
            )}

            {/* Quote */}
            {caseItem.quote && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-brand-green text-white p-10 md:p-12 rounded-sm relative"
              >
                <div className="text-white/30 font-playfair text-6xl leading-none mb-2 select-none">"</div>
                <blockquote className="font-playfair text-xl md:text-2xl font-light italic leading-relaxed -mt-6">
                  {caseItem.quote.text}
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-white/40" />
                  <p className="font-inter text-sm text-white/70">{caseItem.quote.author}</p>
                </div>
              </motion.section>
            )}

            {/* Results */}
            {caseItem.results && (
              <CaseSection number="03" eyebrow="Resultaat" title={caseItem.results.title}>
                <ul className="not-prose space-y-4">
                  {caseItem.results.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="font-inter text-base text-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            )}

          </div>
        </div>
      </article>

      {/* Footer */}
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
          <p className="font-inter text-xs text-white/30">
            © {new Date().getFullYear()} Conclusion Consulting
          </p>
        </div>
      </footer>
    </main>
  );
}