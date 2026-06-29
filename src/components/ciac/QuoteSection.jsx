export default function QuoteSection() {
  return (
    <section className="py-24 bg-brand-green">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16 items-center">
          {/* Portrait */}
          <div className="relative mx-auto md:mx-0">
            <div className="absolute -inset-3 border border-white/30 rounded-sm" />
            <img
              src="https://media.base44.com/images/public/69e66d152af4cc54da9137df/fb7330c4b_AntoonvanderGouw.png"
              alt="Antoon van der Gouw"
              className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-sm grayscale-[20%]"
            />
          </div>

          {/* Quote */}
          <div>
            <div className="text-white/30 font-playfair text-7xl leading-none mb-2 select-none">"</div>
            <blockquote className="font-playfair text-2xl md:text-3xl text-white font-light leading-relaxed italic -mt-8">
              Enterprise Architecture is geen tekening aan de muur, maar het kompas waarmee een bedrijf koers houdt. Het laat zien hoe strategie, mensen, processen en technologie samenhangen — en geeft leiders de rust om met overtuiging te kiezen wat ze wél en níét doen.
            </blockquote>
            <div className="mt-10 flex flex-col items-start gap-2">
              <div className="w-12 h-px bg-white/40" />
              <a
                href="https://www.linkedin.com/in/antoonvandergouw/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 mt-3"
              >
                <p className="font-inter text-white font-semibold text-base group-hover:text-brand-light transition-colors">
                  Antoon van der Gouw
                </p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white/70 group-hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <p className="font-inter text-white/60 text-sm">Senior Architect, Conclusion Consulting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}