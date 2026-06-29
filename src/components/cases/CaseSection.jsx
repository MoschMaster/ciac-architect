import { motion } from 'framer-motion';

// Herbruikbare section met genummerde eyebrow + titel + body.
export default function CaseSection({ number, eyebrow, title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-8"
    >
      <div className="flex items-baseline gap-3 mb-4">
        {number && (
          <span className="font-playfair text-2xl font-semibold text-brand-green/50">
            {number}
          </span>
        )}
        <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
        {title}
      </h2>
      <div className="prose-case">{children}</div>
    </motion.section>
  );
}