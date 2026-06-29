// Tussen secties: ruimte voor een projectafbeelding met onderschrift.
export default function CaseImage({ src, alt, caption }) {
  if (!src) {
    // Lege placeholder zodat de layout ook werkt zonder afbeelding (later toe te voegen).
    return (
      <figure className="my-4">
        <div className="aspect-[16/9] w-full bg-brand-offwhite border border-dashed border-border rounded-sm flex items-center justify-center">
          <span className="font-inter text-xs tracking-[0.2em] uppercase text-muted-foreground/50">
            Projectafbeelding
          </span>
        </div>
        {caption && (
          <figcaption className="font-inter text-xs text-muted-foreground mt-3 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-4">
      <div className="overflow-hidden border border-border rounded-sm">
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto object-cover"
        />
      </div>
      {caption && (
        <figcaption className="font-inter text-xs text-muted-foreground mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}