import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { articles } from '@/lib/blogData';
import usePageMeta from '@/hooks/usePageMeta';

export default function BlogPage() {
  usePageMeta(
    'Inzichten & Artikelen',
    'Praktische artikelen over enterprise architectuur, IT-strategie, digitale transformatie en het bouwen van wendbare organisaties. Geschreven door de architecten van CIAC – Conclusion Consulting.'
  );
  return (
    <main className="font-inter bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-charcoal pt-16 pb-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-green font-inter text-sm transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar overzicht
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-green" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green">
              Inzichten
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] mb-6 max-w-3xl">
            Artikelen & perspectieven
          </h1>
          <p className="font-inter text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Praktische inzichten over IT-architectuur, digitale strategie en het ontwerpen van
            wendbare en weerbare organisaties.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((a, i) => (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to={`/inzichten/${a.slug}`}
                  className="group relative flex flex-col bg-white border border-border hover:border-brand-green/50 hover:shadow-[0_12px_32px_-12px_rgba(20,84,40,0.18)] transition-all duration-300 h-full"
                >
                  <div className="relative h-1 bg-brand-light overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-brand-green"
                      initial={{ width: '20%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-5 flex-wrap">
                      <span className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-green bg-brand-light px-2 py-1 rounded-sm">
                        {a.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-inter text-[11px] text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {a.readingTime}
                      </span>
                    </div>

                    <h2 className="font-playfair text-2xl font-semibold text-foreground group-hover:text-brand-green transition-colors duration-300 leading-snug mb-4">
                      {a.title}
                    </h2>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1">
                      {a.excerpt}
                    </p>

                    <div className="mt-7 pt-5 border-t border-border/60 flex items-center justify-between">
                      <span className="font-inter text-xs text-muted-foreground">
                        Door {a.author}
                      </span>
                      <span className="inline-flex items-center gap-2 font-inter font-medium text-xs text-brand-green group-hover:gap-3 transition-all duration-300">
                        Lees artikel
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