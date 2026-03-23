import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, MapPin } from 'lucide-react';
import Hero3D from '../components/Hero3D';

const SPORTS = ['Badminton', 'Pickleball', 'Tennis', 'Football', 'Cricket'];

const SPORT_IMAGES: Record<string, string> = {
  Badminton: `${import.meta.env.BASE_URL}badminton.avif`,
  Pickleball: `${import.meta.env.BASE_URL}pickleball.webp`,
  Tennis: `${import.meta.env.BASE_URL}tennis.jpg`,
  Football: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=800&auto=format&fit=crop',
  Cricket: `${import.meta.env.BASE_URL}cricket.avif`,
};

export default function Home() {
  const [activeSport, setActiveSport] = useState('Tennis');
  const [loaderFinished, setLoaderFinished] = useState(() => {
    return sessionStorage.getItem('loaderFinished') === 'true';
  });
  const showcaseRef = useRef<HTMLDivElement>(null);
  const hasHinted = useRef(false);

  useEffect(() => {
    if (loaderFinished) return;

    const timer = setTimeout(() => {
      setLoaderFinished(true);
      sessionStorage.setItem('loaderFinished', 'true');
    }, 1500);
    return () => clearTimeout(timer);
  }, [loaderFinished]);

  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasHinted.current) {
          hasHinted.current = true;
          setTimeout(() => {
            el.scrollTo({ left: 200, behavior: 'smooth' });
            setTimeout(() => {
              el.scrollTo({ left: 0, behavior: 'smooth' });
            }, 800);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollShowcase = (direction: 'left' | 'right') => {
    if (!showcaseRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    showcaseRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="bg-void text-text-primary overflow-x-hidden">
      {/* INTRO LOADER */}
      <AnimatePresence>
        {!loaderFinished && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="fixed inset-0 z-[2000] bg-void flex flex-col items-center justify-center px-4"
          >
            <motion.img
              src={`${import.meta.env.BASE_URL}logo.jpeg`}
              alt="Pase Sports"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-[100px] sm:w-[140px] md:w-[200px] object-contain rounded-full bg-white p-2"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="mt-4 sm:mt-6 font-mono text-[11px] sm:text-[13px] text-bright tracking-[0.3em] sm:tracking-[0.4em] uppercase"
            >
              Play Beyond Limits
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden">
        <Hero3D activeSport={activeSport} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto mt-12 sm:mt-16 lg:mt-0 flex flex-col items-center">
          {loaderFinished && (
            <>
              <motion.img
                src={`${import.meta.env.BASE_URL}logo.jpeg`}
                alt="Pase Sports Logo"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-[56px] sm:h-[70px] md:h-[80px] w-auto object-contain rounded-full bg-white p-1 sm:p-1.5 shadow-[0_0_40px_rgba(58,123,213,0.4)] mb-4 sm:mb-6"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-bright mb-3 sm:mb-4"
              >
                PASE SPORTS · PLAY BEYOND LIMITS
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="font-display text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] leading-[1.0] tracking-[-0.02em] mb-0"
              >
                WHERE CHAMPIONS<br />ARE FORGED
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-text-secondary max-w-[520px] mx-auto my-4 sm:my-6"
              >
                World-class courts. Elite coaching. Your game, elevated.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                className="font-mono text-[10px] sm:text-[11px] text-text-muted flex items-center gap-1.5 mb-2"
              >
                <a
                  href="https://maps.google.com/?q=Pase+Academy+near+PES+University+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-bright transition-colors"
                >
                  <MapPin size={12} className="text-bright" />
                  Bangalore, India
                </a>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-8 w-full sm:w-auto"
              >
                <a
                  href="https://playo.co/venues/near-pes-university-bengaluru/pase-academy-near-pes-university-bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-[10px] rounded-[6px] bg-primary text-text-primary border border-accent hover:bg-accent hover:-translate-y-[2px] transition-all duration-200 ease-out shadow-none hover:shadow-[0_0_20px_rgba(58,123,213,0.4)] font-sans font-bold text-[14px] flex items-center justify-center"
                >
                  Book Now
                </a>
                <button
                  onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-[10px] rounded-[6px] bg-transparent text-bright border border-primary hover:bg-primary/15 hover:border-accent hover:text-text-primary transition-all duration-200 ease-out font-sans font-bold text-[14px] flex items-center justify-center"
                >
                  Explore Facility
                </button>
              </motion.div>
            </>
          )}
        </div>

        {/* Sport Selector */}
        <div className="absolute bottom-16 sm:bottom-[72px] left-1/2 -translate-x-1/2 z-20 w-full lg:w-auto px-3 sm:px-4">
          <div className="flex justify-center overflow-x-auto pb-2 lg:pb-0 snap-x hide-scrollbar gap-1.5 sm:gap-2">
            {SPORTS.map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`snap-start shrink-0 px-3 sm:px-[20px] py-1.5 sm:py-[8px] rounded-[100px] font-sans text-[12px] sm:text-[14px] whitespace-nowrap transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  activeSport === sport
                    ? 'bg-primary text-text-primary border border-accent shadow-[0_0_16px_rgba(43,91,168,0.5)]'
                    : 'bg-transparent text-bright border border-border hover:bg-surface hover:text-bright'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
          <p className="text-center text-text-muted text-[10px] mt-1.5 lg:hidden">Swipe to see more sports</p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <span className="font-mono text-[10px] sm:text-[11px] text-text-muted mb-1">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-text-muted" />
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="w-full bg-surface border-y border-border py-6 sm:py-8 lg:py-[40px] px-4 sm:px-6 lg:px-[80px]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:divide-x divide-border">
          {[
            { label: 'Sports Disciplines', value: 5 },
            { label: 'Elite Coaches', value: 20 },
            { label: 'Athletes Trained', value: 500 },
            { label: 'Tournaments Hosted', value: 10 },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-2 sm:px-4">
              <span className="font-display text-[36px] sm:text-[44px] lg:text-[56px] text-accent mb-1 sm:mb-2">
                <CountUp value={stat.value} />+
              </span>
              <span className="font-sans text-[12px] sm:text-[14px] text-text-secondary">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SPORT SHOWCASE */}
      <section id="showcase" className="py-12 sm:py-16 lg:py-[96px] px-4 sm:px-6 lg:px-[80px] max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-8 sm:mb-12 lg:mb-[48px]">
          <div>
            <p className="font-mono text-[11px] text-bright uppercase mb-2 sm:mb-4">OUR FACILITIES</p>
            <h2 className="font-display text-[32px] sm:text-[48px] lg:text-[72px] leading-[1.05]">
              Five Sports.<br />One Arena.
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scrollShowcase('left')}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-border hover:border-bright text-text-secondary hover:text-bright transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollShowcase('right')}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-border hover:border-bright text-text-secondary hover:text-bright transition-colors flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div ref={showcaseRef} className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 sm:pb-12 snap-x hide-scrollbar">
          {SPORTS.map((sport, i) => (
            <div
              key={sport}
              className="snap-start shrink-0 w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[400px] h-[400px] sm:h-[480px] lg:h-[560px] rounded-xl overflow-hidden relative group cursor-pointer border border-border bg-surface transition-all duration-300 hover:-translate-y-3 hover:border-accent hover:shadow-[0_24px_48px_rgba(43,91,168,0.3)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-70 transition-all duration-700"
                style={{ backgroundImage: `url(${SPORT_IMAGES[sport]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent h-[70%] mt-auto" />

              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 px-3 py-1.5 rounded-[100px] bg-[rgba(13,27,42,0.9)] backdrop-blur-sm">
                <span className="font-mono text-[10px] sm:text-[11px] text-bright">{i + 2} Courts</span>
              </div>

              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 flex flex-col items-start">
                <h3 className="font-display text-[28px] sm:text-[36px] mb-4 sm:mb-6">{sport}</h3>
                <a
                  href="https://playo.co/venues/near-pes-university-bengaluru/pase-academy-near-pes-university-bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-100 transition-all duration-250 ease-out px-5 py-2.5 rounded-[6px] bg-primary text-text-primary border border-accent font-sans font-bold text-[13px] sm:text-[14px] flex items-center gap-2 hover:bg-accent hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(58,123,213,0.4)]"
                >
                  Book Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-text-muted text-xs md:hidden mt-2">Swipe to explore all sports</p>
      </section>

      {/* COACHING TEASER */}
      <section className="bg-[#060D1A] py-12 sm:py-16 lg:py-[96px] px-4 sm:px-6 lg:px-[80px] relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] text-bright uppercase mb-4 sm:mb-6">ACADEMY</p>
            <h2 className="font-display text-[32px] sm:text-[48px] lg:text-[72px] leading-[1.05] mb-4 sm:mb-8">
              Train Under<br />The Best.
            </h2>
            <p className="font-sans text-[14px] sm:text-[16px] lg:text-[18px] text-text-secondary max-w-[480px] mb-8 sm:mb-12 leading-[1.65]">
              Our coaches don't just teach the game. They've competed at national and professional levels — and now they're dedicated to producing the next generation of champions.
            </p>
            <Link
              to="/coaches"
              className="inline-flex items-center gap-3 text-bright font-sans font-bold tracking-wide hover:text-text-primary transition-colors group px-5 sm:px-6 py-2.5 sm:py-[10px] rounded-[6px] border border-primary hover:bg-primary/15"
            >
              Meet Our Coaches <ArrowRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-5 h-[280px] sm:h-[350px] lg:h-[500px] relative flex justify-center items-center">
            <motion.div
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              className="w-[200px] sm:w-[240px] lg:w-[280px] h-[260px] sm:h-[310px] lg:h-[360px] border-2 border-accent shadow-[0_0_40px_rgba(58,123,213,0.3)] rounded-full flex items-center justify-center bg-surface-raised relative overflow-hidden"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
               <div className="w-[120px] sm:w-[150px] lg:w-[180px] h-[120px] sm:h-[150px] lg:h-[180px] border border-primary rotate-45 absolute" />
               <div className="w-[90px] sm:w-[110px] lg:w-[140px] h-[90px] sm:h-[110px] lg:h-[140px] border border-bright rotate-12 absolute" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ALUMNI SPOTLIGHT */}
      <section className="py-12 sm:py-16 lg:py-[96px] px-4 sm:px-6 lg:px-[80px] max-w-[1600px] mx-auto bg-void">
        <div className="mb-8 sm:mb-16">
          <p className="font-mono text-[11px] text-bright uppercase mb-2 sm:mb-4">HALL OF PASE</p>
          <h2 className="font-display text-[32px] sm:text-[48px] lg:text-[72px] leading-[1.05]">
            Our Athletes.<br />Their Legacy.
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 sm:pb-12 snap-x hide-scrollbar">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="snap-start shrink-0 w-[220px] sm:w-[260px] md:w-[280px] h-[300px] sm:h-[340px] md:h-[360px] rounded-xl bg-surface border border-border overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-400 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent h-[60%] mt-auto" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                <h3 className="font-sans font-bold text-[17px] sm:text-[20px] text-white mb-1">Sarah Jenkins</h3>
                <p className="font-mono text-[10px] sm:text-[11px] text-bright mb-3 sm:mb-4">State Champion 2023</p>
                <Link to="/alumni" className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 font-sans text-[12px] sm:text-[13px] font-bold text-accent hover:text-bright flex items-center gap-1 transition-opacity duration-300">
                  View Profile <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2 sm:mt-4">
          <p className="text-text-muted text-xs md:hidden">Swipe to see more</p>
          <Link to="/alumni" className="font-sans text-[13px] sm:text-[14px] text-bright hover:text-text-primary transition-colors ml-auto">
            View All Alumni →
          </Link>
        </div>
      </section>

      {/* TOURNAMENT HOSTING CTA */}
      <section className="py-12 sm:py-16 lg:py-[120px] px-4 sm:px-6 lg:px-[80px] relative overflow-hidden text-center">
        <motion.div
          animate={{ backgroundColor: ['#0D1B2A', '#1B3A6B', '#0D1B2A'] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 opacity-80"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-mono text-[11px] text-bright uppercase mb-3 sm:mb-4">HOST WITH US</p>
          <h2 className="font-display text-[32px] sm:text-[44px] lg:text-[64px] leading-[1.05] mb-4 sm:mb-6">
            Host Your Next<br />Tournament With Us.
          </h2>
          <p className="font-sans text-[14px] sm:text-[16px] lg:text-[18px] text-text-secondary mb-8 sm:mb-12 max-w-[560px] mx-auto leading-[1.65]">
            Full facility access. Professional setup. Seamless organization from registration to finals.
          </p>
          <Link
            to="/get-a-quote?service=tournament"
            className="inline-flex px-8 sm:px-12 lg:px-[48px] py-3 sm:py-4 rounded-[6px] bg-primary text-text-primary border border-accent hover:bg-accent hover:-translate-y-[2px] transition-all shadow-none hover:shadow-[0_0_24px_rgba(58,123,213,0.4)] font-sans font-bold text-[15px] sm:text-[18px] items-center gap-3"
          >
            Get a Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    let startTime: number | null = null;
    const duration = 1200;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const el = document.getElementById(`counter-${value}`);
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return <span id={`counter-${value}`}>{count}</span>;
}
