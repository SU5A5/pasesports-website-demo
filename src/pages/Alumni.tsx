import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Quote } from 'lucide-react';

const ALUMNI = [
  { id: 1, name: 'Sarah Jenkins', sport: 'Tennis', year: '2023', achievement: 'State Champion 2023', level: 'Professional', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop', featured: true },
  { id: 2, name: 'Michael Chang', sport: 'Badminton', year: '2022', achievement: 'National Qualifier', level: 'Collegiate', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop', featured: true },
  { id: 3, name: 'Aisha Patel', sport: 'Football', year: '2024', achievement: 'U-19 National Team', level: 'Junior Pro', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', featured: true },
  { id: 4, name: 'David Kim', sport: 'Pickleball', year: '2021', achievement: 'Pro Tour Rookie', level: 'Professional', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 5, name: 'Rahul Sharma', sport: 'Cricket', year: '2020', achievement: 'Ranji Trophy Debut', level: 'First-Class', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', featured: false },
  { id: 6, name: 'Emily Davis', sport: 'Tennis', year: '2023', achievement: 'NCAA Div 1 Scholarship', level: 'Collegiate', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', featured: false },
];

const TESTIMONIALS = [
  { id: 1, quote: "Pase Sports didn't just improve my game; they completely rebuilt my mindset. The coaches here are world-class.", author: "Sarah Jenkins", role: "State Champion 2023" },
  { id: 2, quote: "The facilities are unmatched, but it's the community and the competitive environment that truly pushes you to the next level.", author: "Michael Chang", role: "National Qualifier" },
  { id: 3, quote: "I owe my national team selection to the rigorous training and tactical brilliance of the coaching staff at Pase.", author: "Aisha Patel", role: "U-19 National Team" },
];

export default function Alumni() {
  const [activeSport, setActiveSport] = useState('All');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const filteredAlumni = activeSport === 'All'
    ? ALUMNI.filter(a => !a.featured)
    : ALUMNI.filter(a => a.sport === activeSport && !a.featured);

  return (
    <div className="bg-void text-text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[44px] sm:text-6xl md:text-[80px] leading-[0.9] tracking-[-0.02em] mb-8 sm:mb-12"
        >
          The Champions<br />We've Built.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-row justify-center items-center gap-6 sm:gap-8 md:gap-16 text-text-secondary"
        >
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl text-text-primary">500+</span>
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">Athletes</span>
          </div>
          <div className="w-px h-8 sm:h-12 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl text-text-primary">12</span>
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">State Champions</span>
          </div>
          <div className="w-px h-8 sm:h-12 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl text-text-primary">3</span>
            <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">National Qualifiers</span>
          </div>
        </motion.div>
      </section>

      {/* Featured Alumni */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {ALUMNI.filter(a => a.featured).slice(0, 2).map((alumnus, i) => (
            <motion.div
              key={alumnus.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="sm:col-span-1 lg:col-span-6 h-[320px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden relative group bg-surface border border-border"
            >
              <img src={alumnus.image} alt={alumnus.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-bright mb-1 sm:mb-2 block">{alumnus.sport} · {alumnus.level}</span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-1 sm:mb-2">{alumnus.name}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm">{alumnus.achievement}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-bright group-hover:bg-primary group-hover:text-text-primary transition-colors shrink-0 ml-2">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {ALUMNI.filter(a => a.featured).slice(2, 3).map((alumnus) => (
            <motion.div
              key={alumnus.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sm:col-span-2 lg:col-span-12 h-[280px] sm:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden relative group bg-surface border border-border"
            >
              <img src={alumnus.image} alt={alumnus.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-bright mb-1 sm:mb-2 block">{alumnus.sport} · {alumnus.level}</span>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl mb-1 sm:mb-2">{alumnus.name}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm">{alumnus.achievement}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-bright group-hover:bg-primary group-hover:text-text-primary transition-colors shrink-0 ml-2">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Alumni Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4 sm:gap-6">
          <h2 className="font-display text-3xl sm:text-4xl">Alumni Roster</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {['All', 'Tennis', 'Badminton', 'Football', 'Pickleball', 'Cricket'].map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all duration-300 border ${
                  activeSport === sport
                    ? 'bg-primary text-text-primary border-bright'
                    : 'bg-surface/50 text-bright/70 border-border hover:bg-surface hover:text-bright'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAlumni.map((alumnus, i) => (
            <motion.div
              key={alumnus.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-xl overflow-hidden bg-surface border border-border p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-primary transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                <img src={alumnus.image} alt={alumnus.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="font-bold text-base sm:text-lg leading-tight truncate">{alumnus.name}</h4>
                  <span className="px-2 py-0.5 rounded bg-surface-raised border border-border text-[9px] sm:text-[10px] font-mono text-bright shrink-0">{alumnus.year}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-text-secondary mb-0.5 sm:mb-1">{alumnus.sport}</p>
                <p className="text-[10px] sm:text-xs font-mono text-bright uppercase tracking-wider truncate">{alumnus.achievement}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative">
        <Quote size={48} className="sm:w-16 sm:h-16 text-surface-raised mx-auto mb-4 sm:mb-8 opacity-50" />

        <div className="relative min-h-[200px] sm:min-h-[220px] md:min-h-[200px]">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: currentTestimonial === i ? 1 : 0,
                x: currentTestimonial === i ? 0 : -50,
                pointerEvents: currentTestimonial === i ? 'auto' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-tight mb-4 sm:mb-8 text-text-primary">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-base sm:text-lg">{t.author}</p>
                <p className="text-xs sm:text-sm text-text-secondary">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6 sm:mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentTestimonial === i ? 'bg-primary w-8' : 'bg-border hover:bg-text-secondary w-2.5'
              }`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
