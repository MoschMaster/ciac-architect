import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import AwardsBadge from './AwardsBadge';

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end bg-brand-charcoal overflow-hidden">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.conclusion.com/hubfs/Conclusion%20Group%20website%20hero%20video%201920x600-1.mp4"
          type="video/mp4"
        />
      </video>

      {/* BCG-style deep green/black overlay — lighter on the right to reveal video */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f15]/90 via-[#0a2418]/70 to-[#0a1f15]/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#061a10]/60 via-transparent to-transparent" />

      {/* Top label */}
      <div className="absolute top-10 left-0 right-0 px-8 md:px-16 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-8 h-px bg-white/70" />
          <span className="font-inter text-xs font-medium tracking-[0.2em] uppercase text-white/70">
            Conclusion Consulting
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 md:px-16 pb-16 pt-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-sm">
              <span className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-white">
                CIAC
              </span>
            </div>
            <span className="font-inter text-xs tracking-[0.1em] uppercase text-white/60">
              IT Architecture
            </span>
          </div>

          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-8">
            Van complex IT-landschap naar strategische wendbaarheid
          </h1>

          <p className="font-inter text-lg text-white/80 font-light leading-relaxed max-w-2xl">
            We brengen structuur, maken keuzes inzichtelijk en zorgen dat IT-investeringen aantoonbaar bijdragen aan je strategische doelen.
          </p>

          <div className="mt-12 flex items-center gap-6">
            <a
              href="#kennismaking"
              className="inline-flex items-center gap-3 bg-white text-brand-green font-inter font-medium text-sm px-8 py-4 rounded-sm hover:bg-brand-light transition-colors duration-300"
            >
              Neem contact op
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#aanpak"
              className="inline-flex items-center gap-2 text-white/70 font-inter text-sm hover:text-white transition-colors duration-300"
            >
              Onze aanpak
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Hidden play/pause toggle for the background video */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pauzeer achtergrondvideo' : 'Speel achtergrondvideo af'}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white opacity-40 hover:opacity-100 transition-all duration-300"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
      </button>

      {/* Awards strip — prestigious recognition */}
      <AwardsBadge />
    </section>
  );
}