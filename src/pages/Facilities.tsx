import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Car, Shirt, Coffee, Dumbbell, UserCheck, ShoppingBag, ExternalLink } from 'lucide-react';

const SPORTS = ['All', 'Badminton', 'Pickleball', 'Tennis', 'Football', 'Cricket'];

const FACILITIES = [
  { id: 1, name: 'Court A — Tennis', sport: 'Tennis', surface: 'Hard Court', lighting: 'LED Floodlights', live: true, price: 800, img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Court B — Tennis', sport: 'Tennis', surface: 'Hard Court', lighting: 'LED Floodlights', live: false, price: 800, img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Turf 1 — Football', sport: 'Football', surface: 'AstroTurf', lighting: 'Stadium Lights', live: true, price: 1500, img: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Hall 1 — Badminton', sport: 'Badminton', surface: 'Wooden', lighting: 'Indoor LED', live: true, price: 500, img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Court 1 — Pickleball', sport: 'Pickleball', surface: 'Hard Court', lighting: 'LED Floodlights', live: true, price: 600, img: `${import.meta.env.BASE_URL}pickleball.webp` },
  { id: 6, name: 'Pitch A — Cricket', sport: 'Cricket', surface: 'Turf Wicket', lighting: 'Stadium Lights', live: false, price: 2000, img: `${import.meta.env.BASE_URL}cricket.avif` },
];

const AMENITIES = [
  { icon: Car, label: 'Parking' },
  { icon: Shirt, label: 'Changing Rooms' },
  { icon: Coffee, label: 'Cafeteria' },
  { icon: Dumbbell, label: 'Equipment Rental' },
  { icon: UserCheck, label: 'Coaching Available' },
  { icon: ShoppingBag, label: 'Pro Shop' },
];

export default function Facilities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sportParam = searchParams.get('sport');
  const [activeFilter, setActiveFilter] = useState(sportParam && SPORTS.includes(sportParam) ? sportParam : 'All');

  useEffect(() => {
    if (sportParam && SPORTS.includes(sportParam)) {
      setActiveFilter(sportParam);
    }
  }, [sportParam]);

  const handleFilterChange = (sport: string) => {
    setActiveFilter(sport);
    if (sport === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ sport });
    }
  };

  const filteredFacilities = activeFilter === 'All'
    ? FACILITIES
    : FACILITIES.filter(f => f.sport === activeFilter);

  return (
    <div className="bg-void text-text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[44px] sm:text-6xl md:text-[80px] leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-12"
        >
          OUR FACILITIES
        </motion.h1>

        {/* Sport Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {SPORTS.map((sport) => (
            <button
              key={sport}
              onClick={() => handleFilterChange(sport)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                activeFilter === sport
                  ? 'bg-primary text-text-primary border-bright shadow-[0_0_15px_rgba(58,123,213,0.4)]'
                  : 'bg-surface/50 text-bright/70 border-border hover:bg-surface hover:text-bright'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </section>

      {/* Facility Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredFacilities.map((facility, i) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-xl overflow-hidden bg-surface border border-border hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(43,91,168,0.3),0_0_0_1px_rgba(58,123,213,0.4)] transition-all duration-300"
            >
              <div className="h-[180px] sm:h-[200px] lg:h-[240px] relative overflow-hidden bg-surface-raised">
                <img
                  src={facility.img}
                  alt={facility.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:mix-blend-normal"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 rounded bg-surface/90 backdrop-blur-sm border border-border">
                  <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-bright">{facility.sport}</span>
                </div>
              </div>

              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="font-display text-2xl sm:text-3xl mb-3 sm:mb-4">{facility.name}</h3>

                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-[13px] sm:text-sm text-text-secondary">
                  <li className="flex justify-between">
                    <span>Surface</span>
                    <span className="text-text-primary">{facility.surface}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lighting</span>
                    <span className="text-text-primary">{facility.lighting}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Status</span>
                    <span className="flex items-center gap-2 text-text-primary">
                      {facility.live ? (
                        <><span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Live</>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-text-muted" /> Offline</>
                      )}
                    </span>
                  </li>
                </ul>

                <div className="flex items-center justify-between mt-4 sm:mt-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs text-text-muted">From</span>
                    <span className="font-bold text-bright text-lg sm:text-xl">{'\u20B9'}{facility.price}/hr</span>
                  </div>
                  <a
                    href="https://playo.co/venues/near-pes-university-bengaluru/pase-academy-near-pes-university-bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-md bg-primary text-text-primary border border-accent hover:bg-accent transition-colors font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2"
                  >
                    Book on Playo <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Amenities Strip */}
      <section className="bg-surface border-y border-border py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-mono text-[11px] text-bright tracking-[0.3em] uppercase text-center mb-8 sm:mb-12">AMENITIES</h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
            {AMENITIES.map((amenity, i) => {
              const Icon = amenity.icon;
              return (
                <div key={i} className="flex flex-col items-center text-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-surface-raised border border-border flex items-center justify-center text-bright">
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[11px] sm:text-sm font-bold text-text-secondary">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
