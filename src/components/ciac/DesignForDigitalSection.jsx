import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Layers, Users, Network, Sparkles } from 'lucide-react';

// Vijf bouwblokken uit "Designed for Digital" (Ross, Beath, Mocker — MIT Press, 2019).
// Visualisatie geïnspireerd op figuur 1.1 uit het boek.
const blocks = [
  {
    id: 'backbone',
    number: '01',
    title: 'Operational Backbone',
    subtitle: 'Het fundament',
    icon: Database,
    short:
      'Een coherent geheel van gestandaardiseerde, geïntegreerde systemen, processen en data voor de kernoperatie.',
    bullets: [
      'End-to-end transactieverwerking',
      'Single source of truth voor masterdata',
      'Transparantie in kernprocessen',
      'Automatisering van repetitief werk',
    ],
    role: 'Levert betrouwbaarheid en efficiëntie',
  },
  {
    id: 'insights',
    number: '02',
    title: 'Shared Customer Insights',
    subtitle: 'Het kompas',
    icon: Sparkles,
    short:
      'Organisatiebreed leren over wat klanten waarderen en hoe digitale technologie daaraan kan bijdragen.',
    bullets: [
      'Continue stroom van experimenten',
      'Klant­journey­analyse en co-creatie',
      'Gedeelde learnings over silo\'s heen',
      'Visie verbonden aan klantwaarde',
    ],
    role: 'Verbindt techniek aan klantbehoefte',
  },
  {
    id: 'platform',
    number: '03',
    title: 'Digital Platform',
    subtitle: 'De motor',
    icon: Layers,
    short:
      'Een repository van herbruikbare business-, data- en infrastructuur­componenten voor snelle configuratie van digitale proposities.',
    bullets: [
      'Modulaire, API-enabled componenten',
      'Herbruikbare business- en datalogica',
      'Cloud-native infrastructuur',
      'Continue release van nieuwe features',
    ],
    role: 'Versnelt innovatie van proposities',
  },
  {
    id: 'accountability',
    number: '04',
    title: 'Accountability Framework',
    subtitle: 'De besturing',
    icon: Users,
    short:
      'Verdeling van verantwoordelijkheden voor digitale componenten die autonomie en alignment in balans brengt.',
    bullets: [
      'Empowered, multidisciplinaire teams',
      'Missie­gedreven i.p.v. hiërarchisch',
      'End-to-end eigenaarschap (living assets)',
      'Coaching i.p.v. command-and-control',
    ],
    role: 'Maakt creativiteit op schaal mogelijk',
  },
  {
    id: 'ecosystem',
    number: '05',
    title: 'External Developer Platform',
    subtitle: 'Het ecosysteem',
    icon: Network,
    short:
      'Een platform dat digitale componenten veilig openstelt voor externe partners en zo het ecosysteem activeert.',
    bullets: [
      'Open API\'s voor externe partners',
      'Banking-as-a-Service / industry platforms',
      'Partner-innovatie verlengt de propositie',
      'Schaalvoordelen via het ecosysteem',
    ],
    role: 'Vergroot bereik via partnerships',
  },
];

export default function DesignForDigitalSection() {
  const [activeId, setActiveId] = useState('backbone');
  const active = blocks.find((b) => b.id === activeId);

  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-brand-green" />
            <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green">
              Designed for Digital
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-foreground mb-5 leading-tight">
            Het Design for Digital-model
          </h2>
          <p className="font-inter text-lg font-light text-muted-foreground leading-relaxed">
            De vijf bouwblokken uit het MIT-onderzoek van Ross, Beath en Mocker (
            <em className="italic">Designed for Digital</em>, MIT Press 2019) vormen samen
            het architectuurmodel voor blijvende digitale wendbaarheid. Hover of klik op een
            blok voor de toelichting.
          </p>
        </div>

        {/* Model visualization */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT: visual model — fixed positions, stable layout */}
          <div className="relative">
            <div className="relative aspect-[5/4] w-full">
              {/* SVG connector lines behind blocks */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 400"
                preserveAspectRatio="none"
              >
                {/* Backbone bottom band (foundation) */}
                <line x1="40" y1="340" x2="460" y2="340" stroke="hsl(142, 60%, 25%)" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" />
                {/* Vertical spine connecting platform to backbone */}
                <line x1="250" y1="195" x2="250" y2="290" stroke="hsl(142, 60%, 25%)" strokeWidth="1" opacity="0.25" />
                {/* Insights → Platform */}
                <line x1="120" y1="115" x2="200" y2="170" stroke="hsl(142, 60%, 25%)" strokeWidth="1" opacity="0.25" />
                {/* Accountability → Platform */}
                <line x1="380" y1="115" x2="300" y2="170" stroke="hsl(142, 60%, 25%)" strokeWidth="1" opacity="0.25" />
                {/* Ecosystem ring around platform */}
                <line x1="250" y1="50" x2="250" y2="160" stroke="hsl(142, 60%, 25%)" strokeWidth="1" opacity="0.2" />
              </svg>

              {/* Ecosystem — top center */}
              <ModelBlock
                block={blocks[4]}
                activeId={activeId}
                setActiveId={setActiveId}
                position="absolute top-0 left-1/2 -translate-x-1/2"
                size="w-[34%]"
                variant="outline"
              />

              {/* Insights — upper left */}
              <ModelBlock
                block={blocks[1]}
                activeId={activeId}
                setActiveId={setActiveId}
                position="absolute top-[20%] left-0"
                size="w-[38%]"
                variant="light"
              />

              {/* Accountability — upper right */}
              <ModelBlock
                block={blocks[3]}
                activeId={activeId}
                setActiveId={setActiveId}
                position="absolute top-[20%] right-0"
                size="w-[38%]"
                variant="light"
              />

              {/* Platform — center (the motor) */}
              <ModelBlock
                block={blocks[2]}
                activeId={activeId}
                setActiveId={setActiveId}
                position="absolute top-[42%] left-1/2 -translate-x-1/2"
                size="w-[40%]"
                variant="primary"
              />

              {/* Backbone — bottom foundation, full width */}
              <ModelBlock
                block={blocks[0]}
                activeId={activeId}
                setActiveId={setActiveId}
                position="absolute bottom-0 left-0 right-0"
                size="w-full"
                variant="dark"
                wide
              />
            </div>
          </div>

          {/* RIGHT: detail card — switches based on active block */}
          <div className="lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-border rounded-sm overflow-hidden shadow-[0_4px_24px_-8px_rgba(20,84,40,0.12)]"
              >
                {/* Top accent */}
                <div className="h-1 bg-brand-green" />

                <div className="p-7">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 rounded-sm bg-brand-light flex items-center justify-center flex-shrink-0">
                      <active.icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-inter text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-green">
                        Bouwblok {active.number} — {active.subtitle}
                      </span>
                      <h3 className="font-playfair text-2xl font-semibold text-foreground mt-1 leading-tight">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  <p className="font-inter text-sm text-foreground leading-relaxed mb-6">
                    {active.short}
                  </p>

                  <div className="border-t border-border pt-5">
                    <p className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                      Wat dit blok levert
                    </p>
                    <ul className="space-y-2.5">
                      {active.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                          <span className="font-inter text-sm text-foreground leading-relaxed">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-border">
                    <p className="font-inter text-xs italic text-brand-green">
                      Rol in het model: {active.role.toLowerCase()}.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="font-inter text-xs text-muted-foreground leading-relaxed mt-6 px-1">
              Bron: Jeanne W. Ross, Cynthia M. Beath & Martin Mocker —{' '}
              <em className="italic">
                Designed for Digital: How to Architect Your Business for Sustained Success
              </em>{' '}
              (MIT Press, 2019).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual block in the visual model
function ModelBlock({ block, activeId, setActiveId, position, size, variant, wide }) {
  const Icon = block.icon;
  const isActive = activeId === block.id;

  const variants = {
    dark: {
      base: 'bg-brand-charcoal text-white border border-brand-charcoal',
      active: 'ring-2 ring-brand-green ring-offset-2 ring-offset-brand-offwhite',
      accent: 'text-brand-green',
      sub: 'text-white/60',
    },
    primary: {
      base: 'bg-brand-green text-white border border-brand-green',
      active: 'ring-2 ring-brand-charcoal ring-offset-2 ring-offset-brand-offwhite',
      accent: 'text-white',
      sub: 'text-white/70',
    },
    light: {
      base: 'bg-white text-foreground border border-border hover:border-brand-green/50',
      active: 'border-brand-green ring-2 ring-brand-green/20',
      accent: 'text-brand-green',
      sub: 'text-muted-foreground',
    },
    outline: {
      base: 'bg-white text-foreground border-2 border-dashed border-brand-green/60 hover:border-brand-green',
      active: 'border-solid ring-2 ring-brand-green/20',
      accent: 'text-brand-green',
      sub: 'text-muted-foreground',
    },
  };

  const v = variants[variant];

  return (
    <button
      onClick={() => setActiveId(block.id)}
      onMouseEnter={() => setActiveId(block.id)}
      className={`${position} ${size} group transition-all duration-300`}
    >
      <motion.div
        animate={{ scale: isActive ? 1.04 : 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className={`${v.base} ${isActive ? v.active : ''} rounded-sm shadow-[0_4px_14px_-6px_rgba(20,84,40,0.2)] ${
          wide ? 'px-6 py-4' : 'px-4 py-3.5'
        } text-left transition-all`}
      >
        <div className={`flex items-start gap-3 ${wide ? 'md:items-center' : ''}`}>
          <div className="flex-shrink-0">
            <Icon className={`w-4 h-4 ${v.accent}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`font-inter text-[9px] font-semibold tracking-[0.2em] uppercase ${v.accent}`}>
                {block.number}
              </span>
              <span className={`font-inter text-[9px] tracking-[0.15em] uppercase ${v.sub} truncate`}>
                {block.subtitle}
              </span>
            </div>
            <h4
              className={`font-playfair font-semibold leading-tight ${
                wide ? 'text-base md:text-lg' : 'text-sm md:text-[15px]'
              }`}
            >
              {block.title}
            </h4>
          </div>
        </div>
      </motion.div>
    </button>
  );
}