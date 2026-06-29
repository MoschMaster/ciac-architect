import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cases } from '@/lib/casesData';

export default function CasesSection() {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <div className="w-12 h-px bg-brand-green mb-8" />
          <h2 className="font-playfair text-4xl font-semibold text-foreground">
            Uit de praktijk
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/cases/${c.slug}`}
                className="group relative flex flex-col bg-white border border-border hover:border-brand-green/50 hover:shadow-[0_12px_32px_-12px_rgba(20,84,40,0.18)] transition-all duration-300 cursor-pointer h-full"
              >
                {/* Top accent bar that grows on hover */}
                <div className="relative h-1 w-full bg-brand-light overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-brand-green"
                    initial={{ width: '30%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="min-w-0">
                      <h3 className="font-playfair text-lg font-semibold text-foreground group-hover:text-brand-green transition-colors duration-300 leading-tight">
                        {c.client}
                      </h3>
                      <p className="font-inter text-[11px] text-muted-foreground mt-1 tracking-wide">
                        {c.sector}
                      </p>
                    </div>
                    {c.logo && (
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-brand-offwhite border border-border rounded-sm p-1.5">
                        <img
                          src={c.logo}
                          alt={`${c.client} logo`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>

                  <span className="font-inter text-[10px] font-medium tracking-wider text-brand-green bg-brand-light px-2 py-1 rounded-sm self-start mb-4">
                    {c.tag}
                  </span>

                  <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1">
                    {c.description}
                  </p>

                  {/* CTA button */}
                  <div className="mt-6 pt-5 border-t border-border/60">
                    <span className="inline-flex items-center gap-2 bg-brand-green text-white font-inter font-medium text-xs tracking-wide px-4 py-2.5 rounded-sm group-hover:bg-brand-mid transition-colors duration-300">
                      Lees de case
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}