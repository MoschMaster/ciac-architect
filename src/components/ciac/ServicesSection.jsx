const services = [
  {
    title: 'Enterprise Architecture as a Service (EAaaS)',
    description: 'Het structureel organiseren van architectuurondersteuning, capaciteit en expertise.',
  },
  {
    title: 'Strategisch advies en architectuur governance',
    description: 'Het bepalen van kaders, principes en besluitvorming rondom technologie en verandering.',
  },
  {
    title: 'Business- en IT-landscaping',
    description: 'Het in samenhang in kaart brengen van processen, applicaties, data en technologie.',
  },
  {
    title: 'Capability modelling',
    description: 'Het vertalen van strategie naar de benodigde organisatie- en IT-capabilities.',
  },
  {
    title: 'Roadmapping en investeringskeuzes',
    description: 'Het bepalen van de veranderroute, prioriteiten, fasering en investeringen.',
  },
  {
    title: 'Architectuurassessments',
    description: 'Uitvoeren van End-to-End/Top-Down/Bottom-Up assessments: beoordelen van risico\'s, volwassenheid, kansen en mate van koers.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <div className="w-12 h-px bg-brand-green mb-8" />
            <h2 className="font-playfair text-4xl font-semibold text-foreground">
              Hoe dit er in de praktijk uitziet
            </h2>
          </div>
          <div>
            <p className="font-inter text-lg font-light text-muted-foreground leading-relaxed">
              We ondersteunen organisaties met concrete en bewezen interventies. Altijd met één doel: betere besluitvorming en meer grip op digitale verandering.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white p-8 group hover:bg-brand-light transition-colors duration-300"
            >
              <div className="w-6 h-px bg-brand-green mb-6 group-hover:w-12 transition-all duration-300" />
              <h3 className="font-playfair text-lg font-semibold text-foreground mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}