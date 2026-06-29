import { motion } from 'framer-motion';

const awards = [
  {
    year: '2023',
    rank: 'Platinum',
    img: 'https://media.base44.com/images/public/69e66d152af4cc54da9137df/a6511b433_image.png',
  },
  {
    year: '2024',
    rank: 'Platinum',
    img: 'https://media.base44.com/images/public/69e66d152af4cc54da9137df/6e6dee6c1_image.png',
  },
  {
    year: '2025',
    rank: 'Diamond',
    img: 'https://media.base44.com/images/public/69e66d152af4cc54da9137df/2cb0d4684_image.png',
  },
];

export default function AwardsBadge() {
  return (
    <div className="relative z-10 border-t border-white/10 bg-gradient-to-r from-black/60 via-[#061a10]/50 to-black/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Label */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-6 h-px bg-brand-green" />
          <div>
            <p className="font-inter text-[10px] font-semibold tracking-[0.25em] uppercase text-brand-green">
              Erkend door Consultancy.nl
            </p>
            <p className="font-inter text-[11px] text-white/60 mt-0.5">
              Top Consulting Firm — IT Architecture
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-5 md:gap-7 md:ml-auto">
          {awards.map((a, i) => (
            <motion.div
              key={a.year}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -3, scale: 1.04 }}
              className="group flex items-center gap-3"
            >
              <div className="relative w-12 h-14 md:w-14 md:h-16 drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)]">
                <img
                  src={a.img}
                  alt={`Top Consulting Firm ${a.year} — ${a.rank}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-playfair text-sm font-semibold text-white leading-none">
                  {a.rank}
                </p>
                <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-white/50 mt-1">
                  {a.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}