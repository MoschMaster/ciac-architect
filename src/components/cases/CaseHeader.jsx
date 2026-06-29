import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function CaseHeader({ caseItem }) {
  return (
    <section className="relative bg-brand-charcoal pt-12 pb-20 px-8 md:px-16 overflow-hidden">
      {/* Optional cover image as subtle background */}
      {caseItem.coverImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${caseItem.coverImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/85 to-brand-charcoal/60" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-brand-green font-inter text-sm transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar overzicht
        </Link>

        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green bg-brand-green/15 px-3 py-1 rounded-sm">
              {caseItem.tag}
            </span>
            <span className="font-inter text-[11px] tracking-[0.15em] uppercase text-white/50">
              {caseItem.sector}
            </span>
          </div>

          <div className="flex items-start gap-6 flex-wrap mb-8">
            {caseItem.logo && (
              <div className="bg-white rounded-sm p-3 flex items-center justify-center w-20 h-20 flex-shrink-0">
                <img
                  src={caseItem.logo}
                  alt={`${caseItem.client} logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.parentElement.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] mb-3">
                {caseItem.client}
              </h1>
              {caseItem.website && (
                <a
                  href={caseItem.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-green hover:text-white font-inter text-sm transition-colors"
                >
                  Bezoek website
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          <p className="font-inter text-lg md:text-xl text-white/75 font-light leading-relaxed">
            {caseItem.description}
          </p>
        </div>
      </div>
    </section>
  );
}