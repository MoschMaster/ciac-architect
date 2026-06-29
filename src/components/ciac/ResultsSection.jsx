const results = [
  { stat: '↓', label: 'Lagere operationele kosten', detail: 'door rationalisatie van applicaties' },
  { stat: '↓', label: 'Minder technical debt', detail: 'en betere beheersbaarheid van IT' },
  { stat: '↑', label: 'Hogere ROI', detail: 'op IT-investeringen' },
  { stat: '↑', label: 'Snellere besluitvorming', detail: 'door inzicht en samenhang' },
  { stat: '↑', label: 'Betere aansluiting', detail: 'tussen business en IT' },
  { stat: '↑', label: 'Wendbare organisatie', detail: 'die sneller kan inspelen op verandering' },
];

export default function ResultsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <div className="w-12 h-px bg-brand-green mb-8" />
            <h2 className="font-playfair text-4xl font-semibold text-foreground leading-tight">
              Wat CIAC oplevert
            </h2>
          </div>
          <p className="font-inter text-lg font-light text-muted-foreground leading-relaxed">
            Een organisatie die technologie niet meer ondergaat, maar actief inzet als strategische kracht.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, i) => (
            <div
              key={i}
              className="flex items-start gap-5 p-6 border border-border hover:border-brand-green/40 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-brand-green flex items-center justify-center flex-shrink-0">
                <span className="text-white font-inter font-bold text-base">{result.stat}</span>
              </div>
              <div>
                <p className="font-inter font-semibold text-foreground text-base leading-snug">{result.label}</p>
                <p className="font-inter text-sm text-muted-foreground mt-1">{result.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}