import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const highlights = [
  {
    id: 'discipline',
    phrase: 'discipline',
    tooltip: 'De bron van strategisch voordeel',
    side: 'right',
  },
  {
    id: 'strategie',
    phrase: 'bedrijfsstrategie aan technologische keuzes',
    tooltip: 'Gedreven door CIO en Business',
    side: 'left',
  },
  {
    id: 'transformeren',
    phrase: 'continu kunnen transformeren',
    tooltip: 'Nooit af!',
    side: 'right',
  },
  {
    id: 'complexiteit',
    phrase: 'complexiteit structureel verminderen',
    tooltip: 'De rode draad in elk architectuurprincipe',
    side: 'left',
  },
  {
    id: 'fundament',
    phrase: 'onderscheidend, wendbaar en weerbaar digitaal (IT) fundament',
    tooltip: 'Het einddoel',
    side: 'right',
  },
];

function HighlightWord({ id, phrase, isActive, onEnter, onLeave, registerRef }) {
  return (
    <span
      ref={(el) => registerRef(id, el)}
      className="relative inline cursor-default transition-colors duration-300"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        background: isActive
          ? 'linear-gradient(to bottom, transparent 15%, hsl(142, 60%, 25%) 15%, hsl(142, 60%, 25%) 95%, transparent 95%)'
          : 'linear-gradient(to bottom, transparent 15%, hsl(142, 55%, 55%) 15%, hsl(142, 55%, 55%) 95%, transparent 95%)',
        color: isActive ? '#fff' : 'inherit',
        padding: '2px 4px',
        borderRadius: '2px',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {phrase}
    </span>
  );
}

export default function CIACDefinition() {
  const [activeId, setActiveId] = useState(null);
  const [positions, setPositions] = useState({});
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const wordRefs = useRef({});
  const tooltipRefs = useRef({});

  const registerWordRef = (id, el) => {
    wordRefs.current[id] = el;
  };
  const registerTooltipRef = (id, el) => {
    tooltipRefs.current[id] = el;
  };

  const measure = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const next = {};

    highlights.forEach((h) => {
      const wordEl = wordRefs.current[h.id];
      const tipEl = tooltipRefs.current[h.id];
      if (!wordEl || !tipEl) return;

      const wordRect = wordEl.getBoundingClientRect();
      const tipRect = tipEl.getBoundingClientRect();

      // For multi-line phrases, take the last client rect on the correct side
      const clientRects = wordEl.getClientRects();
      let anchorRect = wordRect;
      if (clientRects.length > 1) {
        if (h.side === 'right') {
          // last line (lowest rect) to exit right side
          anchorRect = clientRects[clientRects.length - 1];
        } else {
          // first line to exit left side
          anchorRect = clientRects[0];
        }
      }

      const tipY = tipRect.top + tipRect.height / 2 - containerRect.top;
      const tipX =
        h.side === 'right'
          ? tipRect.left - containerRect.left
          : tipRect.right - containerRect.left;

      // Compute line-height and font-size to find the empty gap between text lines
      const paragraphEl = wordEl.closest('p');
      const pStyle = paragraphEl ? getComputedStyle(paragraphEl) : null;
      const computedLH = pStyle ? parseFloat(pStyle.lineHeight) : 60;
      const fontSize = pStyle ? parseFloat(pStyle.fontSize) : 20;
      // Actual rendered text glyph height ~= fontSize * 1.2 (em-box)
      const textHeight = fontSize * 1.2;
      // Empty space between adjacent text rows
      const emptyGap = computedLH - textHeight;
      // Distance from word center (wordMidY) to the middle of the empty gap above/below it
      // = half the text + half the empty gap
      const gapOffset = textHeight / 2 + emptyGap / 2;

      const wordMidY = anchorRect.top + anchorRect.height / 2 - containerRect.top;
      const exitFromTop = tipY < wordMidY;
      // Start the line from the top/bottom edge of the highlighted word
      const wordY = exitFromTop
        ? anchorRect.top - containerRect.top
        : anchorRect.bottom - containerRect.top;
      const wordX =
        h.side === 'right'
          ? anchorRect.right - containerRect.left - 8
          : anchorRect.left - containerRect.left + 8;
      // Turn line centered in the empty gap between text lines
      // from word's center: gapOffset, but we start from word edge, so subtract half the word height
      const edgeToGapCenter = gapOffset - anchorRect.height / 2;

      next[h.id] = { wordX, wordY, tipX, tipY, side: h.side, exitFromTop, gapOffset: edgeToGapCenter };
    });

    setPositions(next);
  };

  useLayoutEffect(() => {
    measure();
  }, []);

  useEffect(() => {
    const handle = () => measure();
    window.addEventListener('resize', handle);
    // Re-measure after fonts load
    const t = setTimeout(measure, 100);
    return () => {
      window.removeEventListener('resize', handle);
      clearTimeout(t);
    };
  }, []);

  const getHighlight = (id) => highlights.find((h) => h.id === id);

  return (
    <div className="py-20 px-6 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-foreground mb-14 max-w-4xl mx-auto">
          Wat we bedoelen met Conclusion IT Architecture Consulting
        </h2>

        <div
          ref={containerRef}
          className="relative grid grid-cols-[minmax(140px,200px)_1fr_minmax(140px,200px)] gap-6 md:gap-10 items-start"
        >
          {/* SVG connector overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ overflow: 'visible' }}
          >
            <AnimatePresence>
              {activeId && positions[activeId] && (
                <motion.path
                  key={activeId}
                  d={(() => {
                    const p = positions[activeId];
                    // Route horizontally in the middle of the gap between text lines
                    const gapOffset = p.exitFromTop ? -p.gapOffset : p.gapOffset;
                    const turnY = p.wordY + gapOffset;
                    return `M ${p.wordX} ${p.wordY} L ${p.wordX} ${turnY} L ${p.tipX} ${turnY} L ${p.tipX} ${p.tipY}`;
                  })()}
                  stroke="hsl(142, 60%, 25%)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </svg>

          {/* Left tooltip column */}
          <div ref={leftColRef} className="relative flex flex-col gap-6 pt-4">
            {highlights
              .filter((h) => h.side === 'left')
              .map((h) => (
                <TooltipBox
                  key={h.id}
                  id={h.id}
                  text={h.tooltip}
                  isActive={activeId === h.id}
                  registerRef={registerTooltipRef}
                  side="left"
                />
              ))}
          </div>

          {/* Center: paragraph */}
          <div className="relative z-10">
            <p
              className="font-inter text-lg md:text-xl font-light text-foreground tracking-wide"
              style={{ lineHeight: '2.6' }}
            >
              Conclusion IT Architecture Consultancy is de{' '}
              <HighlightWord
                id="discipline"
                phrase={getHighlight('discipline').phrase}
                isActive={activeId === 'discipline'}
                onEnter={() => setActiveId('discipline')}
                onLeave={() => setActiveId(null)}
                registerRef={registerWordRef}
              />{' '}
              van het verbinden van{' '}
              <HighlightWord
                id="strategie"
                phrase={getHighlight('strategie').phrase}
                isActive={activeId === 'strategie'}
                onEnter={() => setActiveId('strategie')}
                onLeave={() => setActiveId(null)}
                registerRef={registerWordRef}
              />{' '}
              zodat organisaties hun IT-landschap{' '}
              <HighlightWord
                id="transformeren"
                phrase={getHighlight('transformeren').phrase}
                isActive={activeId === 'transformeren'}
                onEnter={() => setActiveId('transformeren')}
                onLeave={() => setActiveId(null)}
                registerRef={registerWordRef}
              />{' '}
              en{' '}
              <HighlightWord
                id="complexiteit"
                phrase={getHighlight('complexiteit').phrase}
                isActive={activeId === 'complexiteit'}
                onEnter={() => setActiveId('complexiteit')}
                onLeave={() => setActiveId(null)}
                registerRef={registerWordRef}
              />{' '}
              om zo over tijd een{' '}
              <HighlightWord
                id="fundament"
                phrase={getHighlight('fundament').phrase}
                isActive={activeId === 'fundament'}
                onEnter={() => setActiveId('fundament')}
                onLeave={() => setActiveId(null)}
                registerRef={registerWordRef}
              />{' '}
              te bouwen.
            </p>
          </div>

          {/* Right tooltip column */}
          <div ref={rightColRef} className="relative flex flex-col gap-6 pt-4">
            {highlights
              .filter((h) => h.side === 'right')
              .map((h) => (
                <TooltipBox
                  key={h.id}
                  id={h.id}
                  text={h.tooltip}
                  isActive={activeId === h.id}
                  registerRef={registerTooltipRef}
                  side="right"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TooltipBox({ id, text, isActive, registerRef, side }) {
  return (
    <motion.div
      ref={(el) => registerRef(id, el)}
      animate={{
        opacity: isActive ? 1 : 0.25,
        scale: isActive ? 1 : 0.98,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white border rounded-sm px-3 py-2 ${
        isActive ? 'border-brand-green shadow-md' : 'border-border'
      } ${side === 'left' ? 'text-left' : 'text-left'}`}
    >
      <p
        className={`font-inter text-xs italic leading-tight ${
          isActive ? 'text-brand-green' : 'text-muted-foreground'
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}