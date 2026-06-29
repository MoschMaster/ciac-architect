const challenges = [
  'Versnipperde systemen en gebrek aan overzicht',
  'IT-investeringen zonder duidelijke koppeling aan strategie',
  'Oplopende technical debt en hoge beheerkosten',
  'Moeizame besluitvorming door afhankelijkheden in het landschap',
  'Beperkte wendbaarheid bij nieuwe businessbehoeften',
];

export default function IntroSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left: Intro text */}
          <div>
            <div className="w-12 h-px bg-brand-green mb-8" />
            <p className="font-inter text-lg font-light text-foreground leading-relaxed">
              Enterprises staan onder druk om sneller te veranderen, slimmer te investeren en waarde uit technologie te halen. Maar in de praktijk groeien IT-landschappen vaak ongecontroleerd: systemen stapelen zich op, afhankelijkheden nemen toe en strategische keuzes worden steeds lastiger.
            </p>
            <p className="font-inter text-lg font-light text-foreground leading-relaxed mt-6">
              Met CIAC helpen we jouw organisatie om grip te krijgen op deze complexiteit. We brengen structuur, maken keuzes inzichtelijk en zorgen dat IT-investeringen aantoonbaar bijdragen aan je strategische doelen — op de korte <em>en</em> lange termijn.
            </p>
          </div>

          {/* Right: Challenges */}
          <div>
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-8">
              Complexiteit vertraagt verandering
            </h2>
            <p className="font-inter text-base text-muted-foreground mb-6 leading-relaxed">
              Veel organisaties willen versnellen in hun digitale transformatie, maar lopen vast in hun eigen IT-landschap. Herkenbare uitdagingen zijn:
            </p>
            <ul className="space-y-4">
              {challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2 w-5 h-5 rounded-sm bg-brand-light flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-brand-green" />
                  </div>
                  <span className="font-inter text-base text-foreground leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}