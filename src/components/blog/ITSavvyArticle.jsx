import { motion } from 'framer-motion';
import { Mail, Cpu, Users, Briefcase, BarChart3, Globe2 } from 'lucide-react';

// IT Savvy artikel — gebaseerd op MIT CISR Research Briefing
// "How IT Savvy is Your Enterprise? Self Assessment and Benchmarking"
// Peter Weill & Sinan Aral, Vol. VI No. 1A, March 2006.

const competencies = [
  {
    icon: Mail,
    title: 'IT voor communicatie',
    text:
      'Intensief gebruik van elektronische kanalen — e-mail, intranet en mobiele apparaten — voor zowel interne communicatie als afstemming met klanten en leveranciers.',
  },
  {
    icon: Cpu,
    title: 'Digitale transacties',
    text:
      'Een hoge digitaliseringsgraad van repeterende transacties, met name verkoop, klantinteractie en inkoop.',
  },
  {
    icon: Globe2,
    title: 'Internet-gebruik',
    text:
      'Bredere inzet van internet-architecturen voor kernprocessen zoals sales force management, prestatiemeting, training en post-sales klantondersteuning.',
  },
  {
    icon: Users,
    title: 'Bedrijfsbrede IT-vaardigheden',
    text:
      'Nagenoeg alle medewerkers kunnen IT effectief inzetten. Sterke technische én business skills binnen IT, sterke IT-skills binnen business — én voldoende aanbod op de arbeidsmarkt.',
  },
  {
    icon: Briefcase,
    title: 'Constante betrokkenheid van management',
    text:
      'Senior management is sterk gecommitteerd aan effectieve IT-inzet en sponsort de belangrijke initiatieven. Business-managers zijn intensief betrokken bij IT-besluitvorming.',
  },
];

const portfolio = [
  {
    label: 'IT Infrastructure',
    color: 'bg-[hsl(220,40%,55%)]',
    desc: 'Gedeelde basis — netwerken, datacenters, identiteits- en integratielagen.',
  },
  {
    label: 'Transactional IT',
    color: 'bg-[hsl(0,55%,55%)]',
    desc: 'Systemen die de kerntransacties verwerken — ERP, orderverwerking, facturatie.',
  },
  {
    label: 'Informational IT',
    color: 'bg-[hsl(38,70%,60%)]',
    desc: 'Data, BI, rapportage — informatie voor besluitvorming en controle.',
  },
  {
    label: 'Strategic IT',
    color: 'bg-[hsl(142,55%,40%)]',
    desc: 'Onderscheidende investeringen — innovatie, nieuwe proposities, marktverschil.',
  },
];

export default function ITSavvyArticle() {
  return (
    <article className="bg-white">
      {/* Body section */}
      <section className="py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* Lead */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-px bg-brand-green mb-6" />
            <p className="font-playfair text-xl md:text-2xl font-normal text-foreground leading-relaxed">
              IT Savvy is een geheel van praktijken en competenties die <em className="italic">waarde
              toevoegen aan elke euro die in IT wordt geïnvesteerd</em>. Het onderscheidt
              organisaties die structureel meer rendement halen uit hun IT-portfolio van organisaties
              die jaar na jaar achterblijven — ongeacht sector, omvang of investeringsbudget.
            </p>
          </motion.div>

          {/* Section 01 — Het onderzoek */}
          <section>
            <SectionHeader number="01" eyebrow="Het onderzoek" title="Wat MIT CISR ontdekte" />
            <div className="prose-case">
              <p>
                MIT-onderzoekers Peter Weill en Sinan Aral bestudeerden gedurende vier jaar
                147 organisaties en verdeelden ze in drie groepen: <strong>hoge</strong>,{' '}
                <strong>gemiddelde</strong> en <strong>lage</strong> IT Savvy. Het verschil in
                financieel rendement bleek opvallend groot — en consistent over alle
                investeringscategorieën heen.
              </p>
              <p>
                Bedrijven in de top 5% op IT Savvy verdienden gemiddeld{' '}
                <strong>$250 per dollar</strong> geïnvesteerd in IT-infrastructuur in het jaar
                volgend op de investering. Bedrijven in de onderste 5% hadden daarentegen circa{' '}
                <strong>$900 lagere nettowinst</strong> per geïnvesteerde dollar — gecontroleerd
                voor sector, bedrijfsomvang en andere investeringen zoals R&amp;D en marketing.
              </p>
            </div>

            {/* Distribution box */}
            <div className="not-prose mt-8 grid grid-cols-3 gap-3">
              <DistributionCard score="60+" label="High IT Savvy" pct="16%" highlight />
              <DistributionCard score="45–59" label="Average" pct="65%" />
              <DistributionCard score="<45" label="Low IT Savvy" pct="19%" />
            </div>
          </section>

          {/* Section 02 — vijf competenties */}
          <section>
            <SectionHeader
              number="02"
              eyebrow="Vijf bouwstenen"
              title="De competenties van een IT Savvy organisatie"
            />
            <div className="prose-case mb-8">
              <p>
                IT Savvy is geen losse vaardigheid maar een <em className="italic">elkaar
                versterkend geheel</em> van vijf praktijken. Pas wanneer ze samen aanwezig zijn,
                ontstaat het structurele rendement.
              </p>
            </div>

            <div className="not-prose grid gap-4">
              {competencies.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-5 bg-brand-offwhite border border-border rounded-sm p-6"
                  >
                    <div className="w-11 h-11 rounded-sm bg-white border border-border flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-playfair text-lg font-semibold text-foreground mb-1.5 leading-tight">
                        {c.title}
                      </h4>
                      <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                        {c.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Section 03 — het IT portfolio */}
          <section>
            <SectionHeader
              number="03"
              eyebrow="IT-portfolio"
              title="Vier asset classes — één portefeuille"
            />
            <div className="prose-case mb-8">
              <p>
                Het model verdeelt IT-investeringen in vier categorieën, vaak gevisualiseerd als
                een piramide. Hoge IT Savvy levert in <em className="italic">elke</em> klasse
                meetbaar betere resultaten op — op winst, innovatie en marktwaarde.
              </p>
            </div>

            <div className="not-prose grid sm:grid-cols-2 gap-3">
              {portfolio.map((p, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white border border-border rounded-sm p-5"
                >
                  <div className={`${p.color} w-2 self-stretch rounded-sm flex-shrink-0`} />
                  <div>
                    <p className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      Asset class
                    </p>
                    <p className="font-playfair text-base font-semibold text-foreground mb-1.5">
                      {p.label}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Highlighted quote */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-green text-white p-10 md:p-12 rounded-sm relative"
          >
            <div className="text-white/30 font-playfair text-6xl leading-none mb-2 select-none">
              "
            </div>
            <blockquote className="font-playfair text-xl md:text-2xl font-light italic leading-relaxed -mt-6">
              IT Savvy is een geheel van elkaar versterkende praktijken — pas wanneer
              communicatie, digitale transacties, internet-architectuur, vaardigheden én
              management-betrokkenheid samenkomen, ontstaat blijvend rendement.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-px bg-white/40" />
              <p className="font-inter text-sm text-white/70">
                Naar Peter Weill &amp; Sinan Aral, MIT CISR (2006)
              </p>
            </div>
          </motion.div>

          {/* Section 04 — Self assessment */}
          <section>
            <SectionHeader
              number="04"
              eyebrow="Zelfbeoordeling"
              title="Hoe IT Savvy is uw organisatie?"
            />
            <div className="prose-case">
              <p>
                CISR ontwikkelde een korte self-assessment-tool, getest binnen meerdere MIT
                executive-programma's. Door minimaal tien business-leiders en tien IT-professionals
                de vragenlijst te laten invullen en de scores te vergelijken, ontstaat een
                betrouwbaar beeld van de IT Savvy van een organisatie of business unit. De vijf
                onderdelen — elektronische communicatie, HR-capability, management-capability,
                digitale transactie-intensiteit en internet-capability — leveren samen een score op
                die direct vergelijkbaar is met de benchmark uit het onderzoek.
              </p>
            </div>

            <div className="not-prose mt-8 bg-brand-offwhite border border-border rounded-sm p-7">
              <div className="flex items-center gap-3 mb-5">
                <BarChart3 className="w-5 h-5 text-brand-green" />
                <p className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-brand-green">
                  Vijf assessment-dimensies
                </p>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Elektronische communicatie (intern + met klanten/leveranciers)',
                  'HR-capability: technische én business-skills aan beide kanten',
                  'Management-capability: senior support en business-betrokkenheid',
                  'Digitale transactie-intensiteit: % elektronisch afgehandelde orders',
                  'Internet-capability: open standaarden voor kernprocessen',
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                    <span className="font-inter text-sm text-foreground leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 05 — Waarom dit ertoe doet */}
          <section>
            <SectionHeader
              number="05"
              eyebrow="Onze visie"
              title="Waarom dit bepalend is voor architectuurkeuzes"
            />
            <div className="prose-case">
              <p>
                Het onderzoek van Weill &amp; Aral leert ons dat IT-rendement geen kwestie is van
                méér investeren, maar van <strong>beter investeren</strong>. Voor IT-architectuur
                betekent dit dat het ontwerp niet alleen over systemen en integraties gaat, maar
                expliciet over: digitale transactiestromen, internet-architectuur, vaardigheden en
                besluitvorming.
              </p>
              <p>
                In ons werk gebruiken we deze vijf dimensies als toetsingskader bij landscaping,
                strategie en assessments. Ze maken zichtbaar waar een organisatie staat op de
                Savvy-schaal — en waar de grootste hefboom ligt om <em className="italic">elke
                IT-euro</em> meer te laten renderen.
              </p>
            </div>
          </section>

          {/* Source */}
          <p className="font-inter text-xs text-muted-foreground leading-relaxed pt-6 border-t border-border">
            Bron: Peter Weill &amp; Sinan Aral —{' '}
            <em className="italic">
              How IT Savvy is Your Enterprise? Self Assessment and Benchmarking
            </em>
            . MIT Sloan Center for Information Systems Research, Research Briefing Vol. VI No. 1A,
            maart 2006. Aanvullend: "Generating Premium Returns on Your IT Investments,"{' '}
            <em className="italic">MIT Sloan Management Review</em>, Vol. 47 No. 2, Winter 2006.
          </p>
        </div>
      </section>
    </article>
  );
}

function SectionHeader({ number, eyebrow, title }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-playfair text-sm font-semibold text-brand-green">{number}</span>
        <div className="w-8 h-px bg-brand-green" />
        <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground leading-tight">
        {title}
      </h2>
    </div>
  );
}

function DistributionCard({ score, label, pct, highlight }) {
  return (
    <div
      className={`rounded-sm p-4 text-center border ${
        highlight
          ? 'bg-brand-green text-white border-brand-green'
          : 'bg-brand-offwhite text-foreground border-border'
      }`}
    >
      <p
        className={`font-inter text-[9px] font-semibold tracking-[0.2em] uppercase mb-2 ${
          highlight ? 'text-white/70' : 'text-muted-foreground'
        }`}
      >
        {label}
      </p>
      <p className="font-playfair text-2xl font-semibold leading-none mb-1.5">{score}</p>
      <p
        className={`font-inter text-xs ${
          highlight ? 'text-white/80' : 'text-muted-foreground'
        }`}
      >
        {pct} van firms
      </p>
    </div>
  );
}