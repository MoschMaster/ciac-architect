import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const layers = [
  {
    id: 'strategy',
    layer: 'Strategie',
    accent: 'Richting',
    blocks: [
      {
        id: 'vision',
        title: 'Visie & Ambitie',
        short: 'Wat wil de organisatie bereiken?',
        detail:
          'We vertalen de bedrijfsdoelen naar een heldere digitale visie. Door ambities, marktcontext en stakeholderbelangen te combineren ontstaat een gedeeld beeld dat richting geeft aan elke architectuurkeuze.',
        outcomes: ['Digitale noordster', 'Strategische prioriteiten', 'Gedeeld referentiekader'],
      },
      {
        id: 'principles',
        title: 'Architectuur Principes',
        short: 'De kaders waarbinnen we bouwen.',
        detail:
          'Een set van ontwerpprincipes die besluitvorming stuurt: van cloud-first tot data-as-a-product. Principes zorgen voor consistentie zonder starheid — teams weten wat wel en niet past.',
        outcomes: ['Consistente keuzes', 'Snellere besluitvorming', 'Minder architectuurschuld'],
      },
      {
        id: 'governance',
        title: 'Governance',
        short: 'Hoe borgen we regie?',
        detail:
          'We richten besluitvormingsstructuren in waarin architectuur, business en IT samen sturen. Architectuur boards, review processen en escalatiepaden worden lichtgewicht maar effectief.',
        outcomes: ['Heldere beslisrechten', 'Gedragen keuzes', 'Transparante trade-offs'],
      },
    ],
  },
  {
    id: 'business',
    layer: 'Business Architectuur',
    accent: 'Waarde',
    blocks: [
      {
        id: 'capabilities',
        title: 'Capability Model',
        short: 'Wat moet de organisatie kunnen?',
        detail:
          'Een capability map legt bloot welke vermogens de organisatie nodig heeft om haar strategie te realiseren. Hiermee wordt zichtbaar waar investeren loont en waar overlap of gaten zitten.',
        outcomes: ['Heatmap van prioriteiten', 'Onderbouwde investeringen', 'Focus op differentiators'],
      },
      {
        id: 'processes',
        title: 'Processen & Value Streams',
        short: 'Hoe vloeit waarde door de organisatie?',
        detail:
          'We brengen end-to-end value streams in kaart en koppelen deze aan ondersteunende processen. Dit laat zien waar friction zit en welke proces-IT combinaties het meeste effect hebben.',
        outcomes: ['End-to-end inzicht', 'Knelpunten zichtbaar', 'Gerichte optimalisatie'],
      },
    ],
  },
  {
    id: 'information',
    layer: 'Informatie & Applicaties',
    accent: 'Samenhang',
    blocks: [
      {
        id: 'applications',
        title: 'Applicatielandschap',
        short: 'Welke systemen ondersteunen de business?',
        detail:
          'We brengen het applicatieportfolio in kaart inclusief functionaliteit, eigenaarschap en levenscyclus. Met rationalisatie-scenario\'s maken we keuzes om te consolideren, moderniseren of uitfaseren.',
        outcomes: ['Applicatie rationalisatie', 'Lifecycle planning', 'Lagere TCO'],
      },
      {
        id: 'data',
        title: 'Data Architectuur',
        short: 'Hoe beheren we data als asset?',
        detail:
          'Data-domeinen, ownership, kwaliteit en flows: we structureren data zodat het betrouwbaar, vindbaar en bruikbaar wordt. Cruciaal voor analytics, AI en regelgeving zoals AVG en NIS2.',
        outcomes: ['Data als product', 'Hogere datakwaliteit', 'AI/analytics ready'],
      },
      {
        id: 'integration',
        title: 'Integratie & APIs',
        short: 'Hoe praten systemen met elkaar?',
        detail:
          'Een integratiestrategie gebaseerd op API-first en event-driven patronen. We ontwerpen hoe systemen loskoppelbaar samenwerken zodat veranderen mogelijk blijft zonder dominosteen-effecten.',
        outcomes: ['Loose coupling', 'Herbruikbare APIs', 'Sneller nieuwe ketens'],
      },
    ],
  },
  {
    id: 'technology',
    layer: 'Technologie & Infrastructuur',
    accent: 'Fundament',
    blocks: [
      {
        id: 'cloud',
        title: 'Cloud & Platform',
        short: 'Waar draait onze IT?',
        detail:
          'Een cloud- en platformstrategie die schaalbaarheid, kosten en soevereiniteit in balans brengt. Van hybride scenario\'s tot platform engineering voor developer productivity.',
        outcomes: ['Elastische capaciteit', 'Kostentransparantie', 'Developer velocity'],
      },
      {
        id: 'security',
        title: 'Security & Compliance',
        short: 'Hoe blijven we weerbaar?',
        detail:
          'Zero-trust, identity management en compliance-by-design worden in de architectuur verankerd. Veiligheid is geen bijzaak maar een ontwerpuitgangspunt dat wendbaarheid versterkt.',
        outcomes: ['Zero-trust gereed', 'Compliance in control', 'Aantoonbare weerbaarheid'],
      },
    ],
  },
];

export default function BuildingBlocksSection() {
  const [activeBlock, setActiveBlock] = useState(layers[0].blocks[0]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="mb-16 max-w-3xl">
          <div className="w-12 h-px bg-brand-green mb-8" />
          <h2 className="font-playfair text-4xl font-semibold text-foreground mb-4">
            De bouwstenen van onze architectuur
          </h2>
          <p className="font-inter text-lg font-light text-muted-foreground leading-relaxed">
            Klik op een bouwsteen om te ontdekken hoe we samen werken aan een wendbaar en weerbaar IT-fundament.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Diagram */}
          <div className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.id} className="border border-border bg-brand-offwhite">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-white">
                  <div className="flex items-center gap-3">
                    <span className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-green">
                      {layer.accent}
                    </span>
                    <span className="font-playfair text-lg font-semibold text-foreground">
                      {layer.layer}
                    </span>
                  </div>
                  <span className="font-inter text-xs text-muted-foreground">
                    {layer.blocks.length} bouwstenen
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
                  {layer.blocks.map((block) => {
                    const isActive = activeBlock.id === block.id;
                    return (
                      <button
                        key={block.id}
                        onClick={() => setActiveBlock(block)}
                        className={`text-left p-5 bg-white transition-all duration-300 relative group ${
                          isActive ? 'bg-brand-light' : 'hover:bg-brand-offwhite'
                        }`}
                      >
                        <motion.div
                          className="absolute top-0 left-0 h-0.5 bg-brand-green"
                          initial={false}
                          animate={{ width: isActive ? '100%' : '0%' }}
                          transition={{ duration: 0.4 }}
                        />
                        <h4
                          className={`font-playfair text-base font-semibold leading-snug mb-2 ${
                            isActive ? 'text-brand-green' : 'text-foreground'
                          }`}
                        >
                          {block.title}
                        </h4>
                        <p className="font-inter text-xs text-muted-foreground leading-relaxed">
                          {block.short}
                        </p>
                        <div
                          className={`mt-3 inline-flex items-center gap-1 font-inter text-[10px] font-medium tracking-wider uppercase transition-colors ${
                            isActive ? 'text-brand-green' : 'text-muted-foreground/60 group-hover:text-brand-green'
                          }`}
                        >
                          {isActive ? 'Geselecteerd' : 'Bekijk detail'}
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-8 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBlock.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-brand-charcoal text-white p-8 border-t-2 border-brand-green"
              >
                <span className="font-inter text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-green">
                  Bouwsteen
                </span>
                <h3 className="font-playfair text-2xl font-semibold mt-2 mb-5 leading-tight">
                  {activeBlock.title}
                </h3>
                <p className="font-inter text-sm text-white/75 leading-relaxed mb-8">
                  {activeBlock.detail}
                </p>

                <div className="border-t border-white/10 pt-6">
                  <p className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
                    Wat het oplevert
                  </p>
                  <ul className="space-y-3">
                    {activeBlock.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <span className="font-inter text-sm text-white/90 leading-relaxed">
                          {outcome}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}