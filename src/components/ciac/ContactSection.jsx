const experts = [
  {
    name: 'Rutger de Valk',
    role: 'Lead IT Architecture',
    email: 'r.devalk@conclusion.nl',
    linkedin: '#',
    initial: 'R',
  },
  {
    name: 'Antoon van der Gouw',
    role: 'Senior Architect',
    email: 'a.vandergouw@conclusion.nl',
    linkedin: '#',
    initial: 'A',
  },
  {
    name: 'Mischa van Ek',
    role: 'Enterprise Architect',
    email: 'mischa.van.ek@conclusion.nl',
    linkedin: '#',
    initial: 'M',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-brand-charcoal">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="w-12 h-px bg-brand-green mb-8" />
            <h2 className="font-playfair text-4xl font-semibold text-white mb-6 leading-tight">
              Klaar voor de volgende stap?
            </h2>
            <p className="font-inter text-white/60 text-lg font-light leading-relaxed mb-10">
              Digitale transformatie vraagt om duidelijke keuzes en een stevige IT-architectuur. Neem contact op met onze experts.
            </p>
            <a
              href="mailto:ciac@conclusion.nl"
              className="inline-flex items-center gap-3 bg-brand-green text-white font-inter font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-mid transition-colors duration-300"
            >
              Neem contact op
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 font-inter text-sm text-white/40 hover:text-brand-green transition-colors duration-300"
              >
                Bekijk andere expertises →
              </a>
            </div>
          </div>

          {/* Right: Expert cards */}
          <div className="space-y-4">
            {experts.map((expert, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 border border-white/10 hover:border-brand-green/50 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-sm bg-brand-green flex items-center justify-center flex-shrink-0">
                  <span className="font-playfair text-white font-semibold text-lg">{expert.initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter font-semibold text-white text-base">{expert.name}</p>
                  <p className="font-inter text-xs text-white/50 mt-0.5">{expert.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${expert.email}`}
                    className="text-white/30 hover:text-brand-green transition-colors duration-200"
                    title="E-mail"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 4h12a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                  <a
                    href={expert.linkedin}
                    className="text-white/30 hover:text-brand-green transition-colors duration-200"
                    title="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6 8v5M6 6v.5M9 13V10a2 2 0 014 0v3M9 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}