import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, TrendingUp, TrendingDown, ArrowRight, X,
  Target, Network, Layers, GitBranch, Map, RotateCcw,
} from 'lucide-react';

// ─── TWO-model: 9 vlakken met individuele capabilities ─────────────────────────
// Canonieke nummering (1–9). Rij C = Onderscheidend, B = Wendbaar, A = Weerbaar.

const cells = [
  {
    id: 7, row: 'C', col: 'T',
    title: 'Genereer nieuwe waarde door continue innovatie',
    strategy: 'Systems of innovation',
    capabilities: [
      'Ontwikkel een tech-radarscherm',
      'Voer PoC’s en pilots uit op business use cases',
      'Experimenteer met opkomende technologieën',
    ],
  },
  {
    id: 8, row: 'C', col: 'W',
    title: 'Regisseer innovatief ondernemerschap',
    strategy: 'Trusted advisor',
    capabilities: [
      'Stimuleer duurzaam ondernemerschap',
      'IT als trusted advisor',
      'Iteratief MVP-proces',
      'Customer journey mapping & human centric design',
      'Open innovatie & partnerships',
    ],
  },
  {
    id: 9, row: 'C', col: 'O',
    title: 'Transformeer naar een digitale organisatie',
    strategy: 'Customer value creation',
    capabilities: [
      'Ontwikkel visie en digitaal leiderschap',
      'Bouw aan een innovatiecultuur',
      'Verken alternatieve businessmodellen',
      'Ontwerp business- & digitale roadmaps',
      'Cultuur van partnerschap en gedeelde doelen',
    ],
  },
  {
    id: 4, row: 'B', col: 'T',
    title: 'Creëer data-gedreven businessprocessen',
    strategy: 'Systems of differentiation',
    capabilities: [
      'Focus op end-to-end digitale ketens',
      '(Her)ontwerp en optimaliseer processen',
      'Definieer analytics- en integratiestrategie',
      'Eén datafundament',
      'Benut industry best practices',
    ],
  },
  {
    id: 5, row: 'B', col: 'W',
    title: 'Differentieer het voortbrengingsproces',
    strategy: 'Delivery & operations',
    capabilities: [
      'Cloud mindset / fit-to-standard',
      'Agile en/of waterfall',
      'DevOps / AIOps',
      'ITIL Service Operations',
      'AI-gedreven ontwikkeling',
      'Teststrategie en kwaliteitscontrole',
    ],
  },
  {
    id: 6, row: 'B', col: 'O',
    title: 'Werk aan een toekomstvast personeelsbestand',
    strategy: 'Future proof workforce',
    capabilities: [
      'Inventariseer bestaande & nieuwe rollen',
      'Continu leren en ontwikkelen',
      '(Her)definieer de resourcing-strategie',
      'Effectief resource management',
      'Skill assessment en ontwikkeling',
    ],
  },
  {
    id: 1, row: 'A', col: 'T',
    title: 'Migreer naar cloud & platforms',
    strategy: 'System of records',
    capabilities: [
      'Definieer doelarchitectuur',
      'Cloud-native roadmap',
      'Transitieplan naar S/4HANA',
      'Moderniseer SAP ECC-scope',
      'Rationaliseer technologie & consolidatie',
    ],
  },
  {
    id: 2, row: 'A', col: 'W',
    title: 'Beheers de bedrijfskritische kern',
    strategy: 'Business critical core',
    capabilities: [
      'Definieer kritische kern en capabilities',
      'IT-metrics voor business (SLA/XLA)',
      'Evalueer sourcing-strategie',
      'Security & privacy by design (NIS2)',
      'Risicomanagement en security',
      'Green IT en GreenOps',
    ],
  },
  {
    id: 3, row: 'A', col: 'O',
    title: 'Richt financiering & governance flexibel in',
    strategy: 'Financing & governance',
    capabilities: [
      'Transparantie op kosten en toegevoegde waarde',
      'IT-governance framework',
      'Waardering op basis van business impact',
      'Mandaat en budget voor IT',
      'Inzicht in ketenverantwoordelijkheid (CSRD)',
    ],
  },
];

// ─── Afhankelijkheden tussen de vlakken (pijlen) ───────────────────────────────
// type 'booster' = groen (versnelt), 'blocker' = rood (remt).
// bend stuurt de kromming zodat pijlen elkaar niet overlappen.

const dependencies = [
  { id: 1, from: 9, to: 6, type: 'booster', bend: 0.9,
    label: 'Visie versnelt workforce',
    observation: 'Digitaal leiderschap en een heldere visie versnellen de opbouw van een toekomstvast personeelsbestand: mensen weten waar de organisatie naartoe beweegt en welke vaardigheden nodig zijn.' },
  { id: 2, from: 3, to: 9, type: 'blocker', bend: 1.6,
    label: 'Budgettering remt transformatie',
    observation: 'Starre, op projecten gebaseerde jaarbudgettering remt de transformatie naar een digitale organisatie — innovatie krijgt geen structurele financiering en blijft afhankelijk van incidentele potjes.' },
  { id: 3, from: 3, to: 6, type: 'blocker', bend: 1.1,
    label: 'Geen mandaat → geen resourcing',
    observation: 'Zonder mandaat en toegewezen IT-budget blijft de (her)inrichting van de resourcing-strategie steken; rollen kunnen niet worden ingevuld of omgeschoold.' },
  { id: 4, from: 9, to: 8, type: 'booster', bend: -0.8,
    label: 'Visie voedt ondernemerschap',
    observation: 'Een gedragen digitale visie geeft innovatief ondernemerschap richting en legitimiteit in de dagelijkse werkwijze — experimenteren wordt aangemoedigd in plaats van afgestraft.' },
  { id: 5, from: 4, to: 5, type: 'blocker', bend: 0.7,
    label: 'Geen datafundament remt delivery',
    observation: 'Een ontbrekend datafundament blokkeert een data-gedreven, gedifferentieerd voortbrengingsproces — teams bouwen op onbetrouwbare data en herstellen achteraf.' },
  { id: 6, from: 5, to: 6, type: 'booster', bend: -0.7,
    label: 'DevOps versterkt skills',
    observation: 'Volwassen DevOps- en agile-werkwijzen versterken de ontwikkeling van nieuwe rollen, skills en een lerende organisatie — werkwijze en mensontwikkeling lopen in elkaar over.' },
  { id: 7, from: 8, to: 5, type: 'blocker', bend: 0.8,
    label: 'Innovatie botst met delivery',
    observation: 'Innovatie-initiatieven zonder aansluiting op een gestandaardiseerd voortbrengingsproces botsen met de bestaande delivery en lopen vast bij opschaling naar productie.' },
  { id: 8, from: 3, to: 2, type: 'blocker', bend: -1.1,
    label: 'Zwakke governance ondermijnt kern',
    observation: 'Onvoldoende ketenverantwoordelijkheid en governance ondermijnt de beheersing van de bedrijfskritische kern; risico’s en eigenaarschap worden niet expliciet belegd.' },
  { id: 9, from: 2, to: 6, type: 'booster', bend: 0.9,
    label: 'SLA-sturing maakt capaciteit zichtbaar',
    observation: 'Heldere SLA/XLA-sturing op de kritische kern maakt effectief resource management mogelijk en maakt de werkelijke capaciteitsbehoefte expliciet.' },
  { id: 10, from: 1, to: 2, type: 'booster', bend: -0.7,
    label: 'Cloudplatform versterkt kern',
    observation: 'Een gestandaardiseerd cloud- en S/4HANA-platform versterkt een veilige, beheersbare en goed te monitoren kritische kern — minder uitzonderingen, meer grip.' },
  { id: 11, from: 1, to: 5, type: 'blocker', bend: 0.9,
    label: 'Legacy-migratie vertraagt',
    observation: 'De last van legacy-migratie slokt capaciteit op en vertraagt de doorontwikkeling van het voortbrengingsproces — verandering staat in de wacht tot de migratie klaar is.' },
  { id: 12, from: 4, to: 1, type: 'blocker', bend: -0.8,
    label: 'Geen rationalisatie → risicovolle migratie',
    observation: 'Zonder rationalisatie en een helder datafundament blijft cloud-migratie complex en risicovol — technische schuld verhuist gewoon mee naar de cloud.' },
];

const colConfig = {
  T: { label: 'Technologie', sub: 'Als aanjager', bg: 'bg-[hsl(190,55%,28%)]' },
  W: { label: 'Werkwijze', sub: 'Als versneller', bg: 'bg-[hsl(152,48%,28%)]' },
  O: { label: 'Organisatie', sub: 'Als fundament', bg: 'bg-[hsl(218,48%,32%)]' },
};

const rowConfig = {
  C: { label: 'C — Onderscheidend', sub: 'Verkennen / Vernieuwen', accent: 'border-l-[hsl(190,55%,28%)]' },
  B: { label: 'B — Wendbaar', sub: 'Verbinden / Versnellen', accent: 'border-l-[hsl(152,48%,28%)]' },
  A: { label: 'A — Weerbaar', sub: 'Versimpelen / Verstevigen', accent: 'border-l-[hsl(218,48%,32%)]' },
};

const COLORS = {
  booster: 'hsl(152,54%,33%)',
  blocker: 'hsl(2,72%,52%)',
};

const cellById = (id) => cells.find((c) => c.id === id);

// ─── Geometrie helpers voor de pijlen ──────────────────────────────────────────

function center(r) {
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
}

// Punt op de rand van rechthoek r, in de richting van 'toward', met marge m naar buiten.
function edgePoint(r, toward, m = 4) {
  const c = center(r);
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const sx = dx !== 0 ? (r.w / 2) / Math.abs(dx) : Infinity;
  const sy = dy !== 0 ? (r.h / 2) / Math.abs(dy) : Infinity;
  const s = Math.min(sx, sy);
  const bx = c.x + dx * s;
  const by = c.y + dy * s;
  const len = Math.hypot(dx, dy) || 1;
  return { x: bx + (dx / len) * m, y: by + (dy / len) * m };
}

function buildPath(a, b, bend) {
  const ca = center(a);
  const cb = center(b);
  const start = edgePoint(a, cb);
  const end = edgePoint(b, ca);
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const offset = Math.min(90, len * 0.22) * (bend ?? 1);
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  const d = `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
  const badge = {
    x: 0.25 * start.x + 0.5 * cx + 0.25 * end.x,
    y: 0.25 * start.y + 0.5 * cy + 0.25 * end.y,
  };
  return { d, badge };
}

// ─── Interactieve TWO-grid met dependency-pijlen ───────────────────────────────

function TWOModelGrid() {
  const containerRef = useRef(null);
  const cellRefs = useRef({});
  const [rects, setRects] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedDep, setSelectedDep] = useState(null);

  const measure = () => {
    const c = containerRef.current;
    if (!c) return;
    const cb = c.getBoundingClientRect();
    const next = {};
    for (const [id, el] of Object.entries(cellRefs.current)) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      next[id] = { x: r.left - cb.left, y: r.top - cb.top, w: r.width, h: r.height };
    }
    setRects(next);
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 350);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasFilter = selectedDep !== null || selectedCell !== null;

  const activeDeps =
    selectedDep !== null
      ? dependencies.filter((d) => d.id === selectedDep)
      : selectedCell !== null
      ? dependencies.filter((d) => d.from === selectedCell || d.to === selectedCell)
      : dependencies;

  const litCells = new Set();
  if (hasFilter) activeDeps.forEach((d) => { litCells.add(d.from); litCells.add(d.to); });

  const activeDepObj = selectedDep !== null ? dependencies.find((d) => d.id === selectedDep) : null;

  const reset = () => { setSelectedCell(null); setSelectedDep(null); };

  const handleCell = (id) => {
    setSelectedDep(null);
    setSelectedCell((cur) => (cur === id ? null : id));
  };

  return (
    <div className="not-prose space-y-4">
      {/* Legend + instruction */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <svg width="26" height="10"><line x1="1" y1="5" x2="20" y2="5" stroke={COLORS.booster} strokeWidth="2.5" markerEnd="url(#lg-green)" /><defs><marker id="lg-green" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={COLORS.booster} /></marker></defs></svg>
            <span className="font-inter text-[11px] text-foreground">Booster — versnelt</span>
          </span>
          <span className="flex items-center gap-2">
            <svg width="26" height="10"><line x1="1" y1="5" x2="20" y2="5" stroke={COLORS.blocker} strokeWidth="2.5" markerEnd="url(#lg-red)" /><defs><marker id="lg-red" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={COLORS.blocker} /></marker></defs></svg>
            <span className="font-inter text-[11px] text-foreground">Blocker — remt</span>
          </span>
        </div>
        {hasFilter && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 font-inter text-[11px] font-medium text-brand-green hover:text-brand-mid transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Toon alle verbindingen
          </button>
        )}
      </div>

      <p className="font-inter text-xs text-muted-foreground">
        Klik op een vlak om alleen zijn verbindingen te tonen, of klik op een genummerde pijl voor de observatie.
      </p>

      {/* Grid + arrow overlay */}
      <div className="overflow-x-auto pb-1">
        <div ref={containerRef} className="relative min-w-[720px]">
          {/* Column headers */}
          <div className="grid grid-cols-[112px_1fr_1fr_1fr] gap-2 mb-2">
            <div className="flex items-end pb-1 px-1">
              <span className="font-inter text-[9px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Digitale strategie
              </span>
            </div>
            {['T', 'W', 'O'].map((col) => (
              <div key={col} className={`${colConfig[col].bg} text-white rounded-sm px-3 py-2.5`}>
                <p className="font-inter font-bold text-xs tracking-widest uppercase">{colConfig[col].label}</p>
                <p className="font-inter text-[9px] text-white/60 uppercase tracking-widest mt-0.5">{colConfig[col].sub}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {['C', 'B', 'A'].map((row) => (
            <div key={row} className="grid grid-cols-[112px_1fr_1fr_1fr] gap-2 mb-2">
              <div className={`flex flex-col justify-center border-l-4 ${rowConfig[row].accent} pl-3 py-2 bg-white rounded-sm`}>
                <p className="font-inter font-bold text-[10px] text-foreground leading-snug">{rowConfig[row].label}</p>
                <p className="font-inter text-[9px] text-muted-foreground mt-0.5">{rowConfig[row].sub}</p>
              </div>

              {['T', 'W', 'O'].map((col) => {
                const cell = cells.find((c) => c.row === row && c.col === col);
                if (!cell) return <div key={col} />;
                const isSelected = selectedCell === cell.id;
                const isLit = litCells.has(cell.id);
                const dimmed = hasFilter && !isLit && !isSelected;

                return (
                  <div
                    key={col}
                    ref={(el) => { cellRefs.current[cell.id] = el; }}
                    onClick={() => handleCell(cell.id)}
                    className={`relative z-10 cursor-pointer text-left rounded-sm border p-3 transition-all duration-200 ${
                      isSelected
                        ? 'border-brand-green bg-brand-green/5 shadow-sm'
                        : isLit
                        ? 'border-brand-green/50 bg-white'
                        : 'border-border bg-brand-offwhite hover:border-brand-green/30 hover:bg-white'
                    } ${dimmed ? 'opacity-35' : 'opacity-100'}`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`flex items-center justify-center w-5 h-5 rounded-sm flex-shrink-0 font-inter text-[10px] font-bold ${
                        isSelected || isLit ? 'bg-brand-green text-white' : 'bg-white border border-border text-muted-foreground'
                      }`}>
                        {cell.id}
                      </span>
                      <p className="font-inter text-[11px] font-semibold leading-tight text-foreground">
                        {cell.title}
                      </p>
                    </div>
                    <ul className="space-y-1 pl-0.5">
                      {cell.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-brand-green/50 mt-1.5 flex-shrink-0" />
                          <span className="font-inter text-[10px] text-muted-foreground leading-snug">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}

          {/* SVG arrow overlay */}
          <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" style={{ overflow: 'visible' }}>
            <defs>
              <marker id="ah-booster" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,0 L6,3 L0,6 Z" fill={COLORS.booster} />
              </marker>
              <marker id="ah-blocker" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,0 L6,3 L0,6 Z" fill={COLORS.blocker} />
              </marker>
            </defs>
            {activeDeps.map((dep) => {
              const a = rects[dep.from];
              const b = rects[dep.to];
              if (!a || !b) return null;
              const { d, badge } = buildPath(a, b, dep.bend);
              const color = COLORS[dep.type];
              const faint = !hasFilter;
              return (
                <g key={dep.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={color}
                    strokeWidth={faint ? 1.5 : 2.25}
                    strokeOpacity={faint ? 0.32 : 0.95}
                    markerEnd={`url(#ah-${dep.type})`}
                  />
                  <g
                    className="pointer-events-auto cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setSelectedCell(null); setSelectedDep((cur) => (cur === dep.id ? null : dep.id)); }}
                  >
                    <circle
                      cx={badge.x}
                      cy={badge.y}
                      r="10"
                      fill="white"
                      stroke={color}
                      strokeWidth="1.75"
                      opacity={faint ? 0.85 : 1}
                    />
                    <text
                      x={badge.x}
                      y={badge.y + 3.2}
                      textAnchor="middle"
                      className="font-inter"
                      style={{ fontSize: '10px', fontWeight: 700, fill: color }}
                    >
                      {dep.id}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detail panel for a selected dependency */}
      <AnimatePresence mode="wait">
        {activeDepObj && (
          <motion.div
            key={activeDepObj.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="border rounded-sm bg-white overflow-hidden"
            style={{ borderColor: COLORS[activeDepObj.type] }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-brand-offwhite">
              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-white font-inter text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: COLORS[activeDepObj.type] }}
                >
                  {activeDepObj.id}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 font-inter text-[10px] font-bold tracking-[0.15em] uppercase"
                  style={{ color: COLORS[activeDepObj.type] }}
                >
                  {activeDepObj.type === 'booster' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {activeDepObj.type === 'booster' ? 'Booster' : 'Blocker'}
                </span>
              </div>
              <button onClick={() => setSelectedDep(null)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-5">
              {/* From → To */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 bg-brand-offwhite border border-border rounded-sm px-3 py-2">
                  <p className="font-inter text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Vanuit · vlak {activeDepObj.from}</p>
                  <p className="font-inter text-xs font-semibold text-foreground leading-snug">{cellById(activeDepObj.from).title}</p>
                </div>
                <ArrowRight className="w-5 h-5 flex-shrink-0" style={{ color: COLORS[activeDepObj.type] }} />
                <div className="flex-1 bg-brand-offwhite border border-border rounded-sm px-3 py-2">
                  <p className="font-inter text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">Naar · vlak {activeDepObj.to}</p>
                  <p className="font-inter text-xs font-semibold text-foreground leading-snug">{cellById(activeDepObj.to).title}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 self-stretch rounded-sm flex-shrink-0" style={{ backgroundColor: COLORS[activeDepObj.type] }} />
                <p className="font-inter text-sm text-foreground leading-relaxed">{activeDepObj.observation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dependency chips */}
      {!activeDepObj && (
        <div className="flex flex-wrap gap-2">
          {dependencies
            .filter((d) => selectedCell === null || d.from === selectedCell || d.to === selectedCell)
            .map((dep) => (
              <button
                key={dep.id}
                onClick={() => { setSelectedCell(null); setSelectedDep(dep.id); }}
                className="inline-flex items-center gap-2 rounded-sm border border-border bg-white px-2.5 py-1.5 hover:border-brand-green/40 transition-colors"
              >
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full text-white font-inter text-[10px] font-bold flex-shrink-0"
                  style={{ backgroundColor: COLORS[dep.type] }}
                >
                  {dep.id}
                </span>
                <span className="font-inter text-[11px] text-foreground">{dep.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Article helpers ──────────────────────────────────────────────────────────

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

const roadmapSteps = [
  {
    num: '01', icon: Target, title: 'Start met de strategische vraag',
    body: 'De eerste stap is begrijpen welke strategische vraag de organisatie probeert te beantwoorden — niet het IT-landschap tekenen. Innovatieversnelling, ERP-transformatie, AI-adoptie of kostenreductie vragen elk om een andere combinatie van TWO en EA.',
  },
  {
    num: '02', icon: Network, title: 'Breng T, W en O in samenhang',
    body: 'Met het TWO-model worden de dominante thema’s zichtbaar. Waar zit de meeste spanning? Welke initiatieven lopen al? Waar zitten blockers en boosters? Dit levert een gedeeld beeld van de veranderopgave — vóórdat er gekozen wordt.',
  },
  {
    num: '03', icon: Layers, title: 'Verdiep met Enterprise Architectuur',
    body: 'De belangrijkste bevindingen worden feitelijk onderbouwd: welke processen, capabilities, applicaties, data en infrastructuur zijn geraakt? Hier ontstaat het verschil tussen gevoel en bewijs — en worden risico’s gekwantificeerd.',
  },
  {
    num: '04', icon: GitBranch, title: 'Vertaal naar keuzes, principes en scenario’s',
    body: 'Op basis van de analyse worden keuzes voorbereid. Welke architectuurprincipes gelden? Welke scenario’s zijn realistisch? Welke initiatieven leveren de meeste waarde en welke afhankelijkheden bepalen de volgorde?',
  },
  {
    num: '05', icon: Map, title: 'Bouw een uitvoerbare roadmap',
    body: 'De inzichten worden vertaald naar een samenhangend pad van huidige naar gewenste situatie — met businesswaarde, afhankelijkheden, risicoreductie, benodigde rollen en absorptievermogen als expliciete dimensies.',
  },
];

const eaCapabilities = [
  'Vertalen van business- en IT-strategie naar architectuurprincipes',
  'Visualiseren van capabilities, ketens, informatiestromen en applicatielandschappen',
  'Analyseren van risico’s, technische schuld en ketenafhankelijkheden',
  'Onderbouwen van scenario’s, investeringskeuzes en rationalisatie',
  'Opstellen van doelarchitecturen en transitie-roadmaps',
  'Inrichten van architectuurgovernance en besluitvorming',
  'Verbinden van portfolio-, programma- en solutionarchitectuur',
];

const challengeQuestions = [
  'Welke systemen ondersteunen onze meest kritieke processen?',
  'Waar zitten de grootste afhankelijkheden en risico’s in het landschap?',
  'Welke initiatieven dragen écht bij aan onze strategische doelen?',
  'Welke technische schuld belemmert toekomstige verandering?',
  'Wie is eigenaar van besluitvorming, data, processen en applicaties?',
  'Waar moeten we beginnen als alles met elkaar verbonden lijkt?',
];

// ─── Main export ──────────────────────────────────────────────────────────────

export default function TWOModelArticle() {
  return (
    <article className="bg-white">
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
              Digitale transformatie loopt zelden vast op één enkel probleem. Wie alleen naar{' '}
              <em className="italic">technologie</em> kijkt, mist de onderstroom in de organisatie.
              Wie alleen naar strategie en verandering kijkt, mist de feitelijke afhankelijkheden
              in processen, applicaties, data en infrastructuur. Juist op het snijvlak van beide
              werelden ontstaat de grootste waarde.
            </p>
          </motion.div>

          {/* Section 01 — De uitdaging */}
          <section>
            <SectionHeader number="01" eyebrow="De uitdaging" title="Organisaties zien losse symptomen, maar missen de samenhang" />
            <div className="prose-case">
              <p>
                Veel organisaties herkennen dezelfde signalen. Het IT-landschap is gegroeid door
                jarenlange keuzes, uitzonderingen, projecten en leveranciersafspraken. Applicaties
                zijn toegevoegd om acute problemen op te lossen. Data zit verspreid over systemen.
                Processen zijn deels formeel ingericht, deels afhankelijk van mensen die "weten hoe
                het werkt". Governance bestaat wel, maar wordt in de praktijk niet altijd gevolgd.
              </p>
              <p>
                Het gevolg is dat organisaties steeds vaker moeite hebben om antwoord te geven op
                ogenschijnlijk eenvoudige vragen:
              </p>
            </div>

            <div className="not-prose mt-6 bg-brand-offwhite border border-border rounded-sm p-6">
              <ul className="space-y-3">
                {challengeQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-sm bg-white border border-border flex items-center justify-center mt-0.5">
                      <span className="font-inter text-[9px] font-bold text-brand-green">{i + 1}</span>
                    </div>
                    <span className="font-inter text-sm text-foreground leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-border">
                <p className="font-inter text-xs text-muted-foreground leading-relaxed">
                  Dit zijn geen puur technische vragen. Het zijn ook geen puur organisatorische vragen.
                  Het zijn integrale vragen — en precies daarom vraagt de oplossing om een integrale aanpak.
                </p>
              </div>
            </div>
          </section>

          {/* Section 02 — TWO-model */}
          <section>
            <SectionHeader
              number="02"
              eyebrow="Het TWO-model"
              title="Negen vlakken — en de boosters en blockers die ze verbinden"
            />
            <div className="prose-case mb-10">
              <p>
                Het TWO-model kijkt naar digitale transformatie vanuit de samenhang tussen{' '}
                <strong>Technologie</strong>, <strong>Werkwijze</strong> en{' '}
                <strong>Organisatie</strong>, op drie strategische niveaus: onderscheidend,
                wendbaar en weerbaar. Dat levert negen vlakken op, elk met concrete capabilities.
              </p>
              <p>
                De werkelijke waarde zit niet in de vlakken zelf, maar in de{' '}
                <em className="italic">afhankelijkheden ertussen</em>. Een capability in het ene
                vlak kan een ander vlak <strong>versnellen</strong> (een booster, groene pijl) of
                juist <strong>remmen</strong> (een blocker, rode pijl). Door die pijlen expliciet
                te maken, wordt zichtbaar waar de transformatie vastloopt — en waar één gerichte
                ingreep meerdere vlakken in beweging zet. Klik op een pijl of vlak om de
                observatie te zien.
              </p>
            </div>

            <TWOModelGrid />
          </section>

          {/* Section 03 — Enterprise Architectuur */}
          <section>
            <SectionHeader
              number="03"
              eyebrow="Enterprise Architectuur"
              title="Feitelijke onderbouwing, risicoanalyse en uitvoerbare keuzes"
            />
            <div className="prose-case mb-8">
              <p>
                Waar het TWO-model helpt om het integrale gesprek te openen, brengt Enterprise
                Architectuur verdieping, structuur en toetsbaarheid. EA verbindt strategie,
                capabilities, processen, informatie, applicaties, integraties, data, infrastructuur
                en security. Het maakt zichtbaar hoe de organisatie feitelijk functioneert en waar
                afhankelijkheden, risico's en knelpunten zitten.
              </p>
              <p>
                Binnen CIAC gebruiken we Enterprise Architectuur niet als theoretische exercitie,
                maar als stuurinstrument. Architectuur moet helpen om betere besluiten te nemen —
                niet alleen oplossingen achteraf toetsen. Daarom richt EA zich op:
              </p>
            </div>

            <div className="not-prose grid gap-2.5">
              {eaCapabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-4 bg-brand-offwhite border border-border rounded-sm px-5 py-3.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                  <span className="font-inter text-sm text-foreground leading-relaxed">{cap}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 04 — De combinatie */}
          <section>
            <SectionHeader
              number="04"
              eyebrow="De kracht van combinatie"
              title="Zachte signalen en harde feiten versterken elkaar"
            />
            <div className="prose-case">
              <p>
                Los ingezet hebben beide aanpakken waarde. Maar gecombineerd ontstaat een
                krachtiger geheel. Het TWO-model helpt om{' '}
                <em className="italic">breed</em> te kijken: naar ambitie, onderstroom,
                veranderkracht en dominante thema's. Enterprise Architectuur helpt om{' '}
                <em className="italic">diep</em> te kijken: naar feitelijke afhankelijkheden,
                risico's, applicaties, data en governance.
              </p>
            </div>

            <div className="not-prose mt-8 border border-border rounded-sm overflow-hidden">
              <div className="bg-brand-charcoal px-6 py-4">
                <p className="font-inter text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-green mb-1">
                  Praktijkscenario
                </p>
                <p className="font-inter text-sm font-medium text-white">
                  Ontbrekend eigenaarschap in een outsourced IT-omgeving
                </p>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-4 h-4 text-brand-green" />
                    <p className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-green">
                      Enterprise Architectuur stelt vast
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Welke businessprocessen kritisch zijn',
                      'Welke applicaties en infrastructuur deze ondersteunen',
                      'Welke leveranciers en contracten betrokken zijn',
                      'Welke KPI’s en SLA’s ontbreken',
                      'Waar single points of failure zitten',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                        <span className="font-inter text-sm text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Network className="w-4 h-4 text-[hsl(218,48%,45%)]" />
                    <p className="font-inter text-[10px] font-semibold tracking-[0.2em] uppercase text-[hsl(218,48%,45%)]">
                      TWO-model verklaart waarom
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {[
                      'Eigenaarschap structureel niet goed belegd is',
                      'Business en IT verschillende definities van succes hanteren',
                      'Governance onvoldoende werkt in de praktijk',
                      'Welke gedrags- of leiderschapsfactoren verbetering remmen',
                      'Welke rollen nodig zijn om verantwoordelijkheid te dragen',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[hsl(218,48%,45%)] mt-2 flex-shrink-0" />
                        <span className="font-inter text-sm text-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-brand-offwhite border-t border-border">
                <p className="font-inter text-xs text-muted-foreground leading-relaxed">
                  De gecombineerde uitkomst is sterker dan een technisch rapport of een veranderkundige workshop
                  alleen. De organisatie krijgt zowel feitelijke analyse als inzicht in de oorzaken achter
                  het probleem — én een handelingsperspectief.
                </p>
              </div>
            </div>
          </section>

          {/* Section 05 — Werkwijze */}
          <section>
            <SectionHeader
              number="05"
              eyebrow="Gezamenlijke werkwijze"
              title="Van diagnose naar roadmap in vijf stappen"
            />
            <div className="not-prose grid gap-3">
              {roadmapSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-5 bg-brand-offwhite border border-border rounded-sm p-5"
                  >
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center">
                        <Icon className="w-4 h-4 text-brand-green" />
                      </div>
                      <span className="font-playfair text-xs font-semibold text-brand-green">{step.num}</span>
                    </div>
                    <div>
                      <h4 className="font-playfair text-lg font-semibold text-foreground mb-1.5 leading-tight">
                        {step.title}
                      </h4>
                      <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Quote block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-green text-white p-10 md:p-12 rounded-sm relative"
          >
            <div className="text-white/25 font-playfair text-6xl leading-none mb-2 select-none">"</div>
            <blockquote className="font-playfair text-xl md:text-2xl font-light italic leading-relaxed -mt-6">
              Enterprise Architectuur is niet een tekening aan de muur, maar het kompas waarmee
              een bedrijf koers houdt. Het laat zien hoe strategie, mensen, processen en
              technologie samenhangen — en geeft leiders de rust om met overtuiging te kiezen
              wat ze wél en níét doen.
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-px bg-white/40" />
              <p className="font-inter text-sm text-white/70">Conclusion IT Architecture Consulting</p>
            </div>
          </motion.div>

          {/* Section 06 — Waarom nu */}
          <section>
            <SectionHeader
              number="06"
              eyebrow="Waarom dit nu relevant is"
              title="AI, cloud, compliance en legacy raken elkaar steeds vaker"
            />
            <div className="prose-case">
              <p>
                De druk op organisaties neemt toe. AI, cloud, data, compliance, cybersecurity,
                legacy-modernisering, sourcing en kostenbeheersing raken elkaar steeds vaker.
                Tegelijkertijd willen organisaties sneller waarde leveren en minder vastlopen
                in complexiteit. Dat vraagt om een aanpak die niet vervalt in losse initiatieven.
              </p>
              <p>
                Een AI-roadmap zonder data- en architectuurfundament blijft kwetsbaar. Een
                ERP-transformatie zonder operating model en governance wordt traag. Een
                applicatierationalisatie zonder businessprioriteiten mist richting. Een digitale
                strategie zonder inzicht in technische afhankelijkheden blijft abstract.
              </p>
              <p>
                De combinatie van TWO en Enterprise Architectuur helpt om deze valkuilen te
                voorkomen. Het brengt de businessvraag, de organisatorische realiteit en het
                IT-landschap in één samenhangend verhaal — en vertaalt dat naar prioriteiten,
                keuzes en een uitvoerbare roadmap.
              </p>
            </div>
          </section>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-border rounded-sm overflow-hidden"
          >
            <div className="p-8 md:p-10">
              <p className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green mb-4">
                Plan een gesprek
              </p>
              <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-4 max-w-lg">
                Wil je weten waar jouw digitale transformatie vastloopt?
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-7 max-w-lg">
                Met de gecombineerde kracht van het TWO-model en Conclusion IT Architecture Consulting
                brengen we samenhang, risico's en kansen in beeld — en vertalen we die inzichten naar
                concrete architectuurkeuzes, governance en een uitvoerbare roadmap.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-green text-white font-inter text-sm font-semibold px-6 py-3 rounded-sm hover:bg-brand-mid transition-colors"
              >
                Neem contact op
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </article>
  );
}
