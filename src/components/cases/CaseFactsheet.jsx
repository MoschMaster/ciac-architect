import { ExternalLink } from 'lucide-react';

// Compacte factsheet (sticky zijbalk) — toont kerngegevens van de case.
export default function CaseFactsheet({ caseItem }) {
  const facts = [
    { label: 'Klant', value: caseItem.client },
    { label: 'Sector', value: caseItem.sector },
    { label: 'Type opdracht', value: caseItem.tag },
    caseItem.duration && { label: 'Doorlooptijd', value: caseItem.duration },
    caseItem.team && { label: 'Team', value: caseItem.team },
  ].filter(Boolean);

  return (
    <aside className="lg:sticky lg:top-8 h-fit">
      <div className="bg-brand-offwhite border border-border rounded-sm p-6">
        <p className="font-inter text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-green mb-5">
          Project in het kort
        </p>
        <dl className="space-y-4">
          {facts.map((f, i) => (
            <div key={i} className="border-b border-border/60 pb-4 last:border-b-0 last:pb-0">
              <dt className="font-inter text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                {f.label}
              </dt>
              <dd className="font-inter text-sm text-foreground leading-snug">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        {caseItem.website && (
          <a
            href={caseItem.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-inter text-xs font-medium text-brand-green hover:text-brand-mid transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {caseItem.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>
    </aside>
  );
}