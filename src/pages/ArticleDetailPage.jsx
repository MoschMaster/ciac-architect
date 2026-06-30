import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { getArticleBySlug } from '@/lib/blogData';
import usePageMeta from '@/hooks/usePageMeta';
import DesignForDigitalSection from '@/components/ciac/DesignForDigitalSection';
import ITSavvyArticle from '@/components/blog/ITSavvyArticle';
import TWOModelArticle from '@/components/blog/TWOModelArticle';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  usePageMeta(article?.metaTitle || article?.title, article?.excerpt);

  if (!article) {
    return (
      <main className="font-inter min-h-screen bg-brand-offwhite flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <h1 className="font-playfair text-3xl font-semibold text-foreground mb-4">
            Artikel niet gevonden
          </h1>
          <Link
            to="/inzichten"
            className="inline-flex items-center gap-2 text-brand-green font-inter text-sm font-medium hover:text-brand-mid transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar artikelen
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="font-inter bg-white min-h-screen">
      {/* Header */}
      <section className="bg-brand-charcoal pt-16 pb-20 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/inzichten"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-green font-inter text-sm transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle artikelen
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-inter text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-green bg-brand-green/15 px-3 py-1 rounded-sm">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5 font-inter text-[11px] text-white/50">
              <Clock className="w-3 h-3" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white leading-[1.1] mb-6 max-w-3xl">
            {article.title}
          </h1>

          <p className="font-inter text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>

          <div className="mt-10 flex items-center gap-3 text-white/50 font-inter text-xs">
            <span>Door {article.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{new Date(article.publishedOn).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </section>

      {/* Body — special rendering per article type */}
      {article.type === 'design-for-digital' && (
        <div className="-mt-px">
          <DesignForDigitalSection />
        </div>
      )}
      {article.type === 'it-savvy' && <ITSavvyArticle />}
      {article.type === 'two-model' && <TWOModelArticle />}

      {/* Footer */}
      <footer className="bg-brand-charcoal border-t border-white/10 py-6 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-brand-green rounded-sm flex items-center justify-center">
              <span className="text-white font-inter font-bold text-xs">C</span>
            </div>
            <span className="font-inter text-xs text-white/40 tracking-wide">
              Conclusion Consulting — IT Architecture
            </span>
          </div>
          <p className="font-inter text-xs text-white/30">
            © {new Date().getFullYear()} Conclusion Consulting
          </p>
        </div>
      </footer>
    </main>
  );
}