import { useState } from 'react';
import { motion } from 'framer-motion';

const axes = [
  {
    number: '01',
    title: 'Strategie',
    subtitle: 'sturen op samenhang',
    description:
      'We helpen je om de business- en IT-strategie met elkaar te verbinden. Samen brengen we ambities, prioriteiten en afhankelijkheden in kaart en vertalen die naar heldere architectuurprincipes en keuzes.',
    icon: '◎',
  },
  {
    number: '02',
    title: 'Proces',
    subtitle: 'van inzicht naar besluitvorming',
    description:
      'We maken het IT-landschap inzichtelijk en bestuurbaar. Denk aan business/IT-landscaping, capability modelling en architectuurassessments. Zo ontstaat een gedeeld beeld dat helpt bij prioriteren, investeren en sturen.',
    icon: '◈',
  },
  {
    number: '03',
    title: 'Mens',
    subtitle: 'bouwen aan architectuurvermogen',
    description:
      'We werken schouder aan schouder met jouw team(s) en bouwen aan een duurzame architectuurcapability. Of het nu gaat om coaching, Enterprise Architecture-as-a-Service of het versterken van bestaande teams: we zorgen dat jouw organisatie zelf regie kan voeren.',
    icon: '◉',
  },
  {
    number: '04',
    title: 'Techniek',
    subtitle: 'keuzes die werken in de praktijk',
    description:
      'We vertalen strategie naar concrete architectuurkeuzes en roadmaps. Daarbij kijken we functioneel naar technologie: wat is nodig om processen en doelen optimaal te ondersteunen? Zo voorkomen we complexiteit en bouwen we aan een toekomstbestendig landschap.',
    icon: '◇',
  },
];

export default function ApproachSection() {
  const [activeAxis, setActiveAxis] = useState(0);

  return (
    <section id="aanpak" className="py-24 bg-brand-charcoal">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="mb-16">
          <div className="w-12 h-px bg-brand-green mb-8" />
          <h2 className="font-playfair text-4xl font-semibold text-white mb-4">
            Onze aanpak: richting, structuur en executiekracht
          </h2>
          <p className="font-inter text-white/60 text-lg font-light max-w-2xl leading-relaxed">
            Met CIAC combineren we strategisch inzicht met hands-on uitvoering. We werken altijd in co-creatie met jouw organisatie en zorgen dat architectuur niet alleen op papier bestaat, maar daadwerkelijk werkt in de praktijk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-1">
          {axes.map((axis, i) => (
            <motion.div
              key={i}
              className="relative p-8 border border-white/10 cursor-pointer group overflow-hidden"
              onMouseEnter={() => setActiveAxis(i)}
              whileHover={{ borderColor: 'hsl(142, 60%, 25%)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Background fill on hover */}
              <motion.div
                className="absolute inset-0 bg-brand-green/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeAxis === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-inter text-xs font-medium tracking-[0.2em] text-brand-green">
                    {axis.number}
                  </span>
                  <span className="text-white/20 text-xl">{axis.icon}</span>
                </div>

                <h3 className="font-playfair text-2xl font-semibold text-white mb-1">
                  {axis.title}
                </h3>
                <p className="font-inter text-sm text-brand-green mb-4">
                  {axis.subtitle}
                </p>

                <motion.div
                  animate={{ maxHeight: activeAxis === i ? 120 : 44 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    animate={{ opacity: activeAxis === i ? 0.7 : 0.35 }}
                    transition={{ duration: 0.35 }}
                    className="font-inter text-sm text-white leading-relaxed"
                  >
                    {axis.description}
                  </motion.p>
                </motion.div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-brand-green"
                initial={{ width: 0 }}
                animate={{ width: activeAxis === i ? '100%' : 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}