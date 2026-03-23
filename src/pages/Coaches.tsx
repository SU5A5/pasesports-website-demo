import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

const COACHES = [
  { id: 1, name: 'David Miller', sport: 'Tennis', experience: '15 Years', achievements: ['Former ATP Top 200', 'National Coach of the Year 2022', 'Trained 5 State Champions'], image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800&auto=format&fit=crop', bio: 'David brings 15 years of professional touring experience to Pase Sports. His philosophy centers on aggressive baseline play and mental toughness. He has successfully transitioned 5 junior players to the collegiate level.', quote: 'The game is won before you step on the court. Preparation is everything.' },
  { id: 2, name: 'Sarah Jenkins', sport: 'Badminton', experience: '10 Years', achievements: ['2x National Champion', 'BWF Certified Level 2', 'Head Coach, State Team'], image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop', bio: 'Sarah is a former 2x National Champion known for her tactical brilliance and footwork. She focuses on building a strong foundation and explosive movement for her students.', quote: 'Speed is an asset, but anticipation is a weapon.' },
  { id: 3, name: 'Marcus Chen', sport: 'Pickleball', experience: '8 Years', achievements: ['Pro Tour Finalist 2023', 'PPA Certified Instructor', 'Pioneered "The Drop" Clinic'], image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', bio: 'Marcus transitioned from collegiate tennis to professional pickleball 8 years ago. He is a master of the soft game and strategic positioning, making him one of the most sought-after coaches in the region.', quote: 'Patience at the kitchen line wins championships.' },
  { id: 4, name: 'Elena Rodriguez', sport: 'Football', experience: '12 Years', achievements: ['UEFA A License', 'Former Pro Player (Liga F)', 'Academy Director'], image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', bio: 'Elena holds a UEFA A License and brings European tactical rigor to our football academy. She emphasizes technical proficiency, spatial awareness, and quick decision-making under pressure.', quote: 'Football is played with the head. Your feet are just the tools.' },
  { id: 5, name: 'Vikram Singh', sport: 'Cricket', experience: '20 Years', achievements: ['Former First-Class Cricketer', 'BCCI Level 3 Coach', 'Specialist Batting Consultant'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop', bio: 'Vikram is a seasoned first-class cricketer with two decades of coaching experience. He specializes in batting technique and mental conditioning for high-pressure match situations.', quote: 'A solid defense is the foundation of a destructive offense.' },
  { id: 6, name: 'James Wilson', sport: 'Tennis', experience: '10 Years', achievements: ['NCAA Division 1 Player', 'USPTA Elite Professional', 'Junior Development Specialist'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop', bio: 'James specializes in junior development, focusing on biomechanics and injury prevention. His energetic coaching style makes learning fun while instilling discipline and a strong work ethic.', quote: 'Hard work beats talent when talent doesn\'t work hard.' },
];

export default function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[0] | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => setSelectedCoach(null), []);

  // Focus trap + Escape key for modal
  useEffect(() => {
    if (!selectedCoach) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus the modal on open
    modalRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCoach, closeModal]);

  return (
    <div className="bg-void text-text-primary min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-[44px] sm:text-6xl md:text-[80px] leading-[0.9] tracking-[-0.02em] mb-4 sm:mb-8"
          >
            Coached By<br />The Best In<br />The Game.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl text-text-secondary leading-relaxed"
          >
            Every coach at Pase Sports has competed, won, and dedicated their career to producing the next generation of champions.
          </motion.p>
        </div>
      </section>

      {/* Coach Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {COACHES.map((coach, i) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-xl overflow-hidden bg-surface border border-border hover:-translate-y-3 hover:shadow-[0_24px_48px_rgba(43,91,168,0.3),0_0_0_1px_rgba(58,123,213,0.4)] transition-all duration-300"
            >
              <div className="h-[240px] sm:h-[280px] lg:h-[320px] relative overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-bright mb-1 sm:mb-2 block">{coach.sport} · {coach.experience}</span>
                  <h3 className="font-display text-3xl sm:text-4xl text-text-primary">{coach.name}</h3>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {coach.achievements.map((achievement, j) => (
                    <li key={j} className="flex items-start gap-3 text-[13px] sm:text-sm text-text-secondary">
                      <span className="w-[2px] h-4 bg-primary mt-0.5 sm:mt-1 shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedCoach(coach)}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-transparent text-bright border border-primary hover:bg-primary/15 hover:border-accent hover:text-text-primary transition-all font-bold text-sm flex items-center justify-center gap-2"
                >
                  View Full Profile <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coach Modal */}
      <AnimatePresence>
        {selectedCoach && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCoach(null)}
              className="fixed inset-0 z-50 bg-void/80 backdrop-blur-md"
            />
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="coach-modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-50 inset-2 sm:inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] overflow-y-auto bg-surface-raised border border-border rounded-2xl shadow-2xl outline-none"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[200px] sm:h-[260px] md:h-full relative">
                  <img src={selectedCoach.image} alt={selectedCoach.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-surface-raised via-transparent to-transparent" />
                </div>
                <div className="p-5 sm:p-8 md:p-10 lg:p-12 relative">
                  <button
                    onClick={() => setSelectedCoach(null)}
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Close profile"
                  >
                    <X size={24} />
                  </button>

                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-bright mb-3 sm:mb-4 block">
                    {selectedCoach.sport} · {selectedCoach.experience}
                  </span>
                  <h2 id="coach-modal-title" className="font-display text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-8">{selectedCoach.name}</h2>

                  <div className="mb-4 sm:mb-8">
                    <h4 className="font-bold text-xs sm:text-sm text-text-secondary mb-2 sm:mb-4 uppercase tracking-wider">Biography</h4>
                    <p className="text-text-primary leading-relaxed text-[13px] sm:text-sm">{selectedCoach.bio}</p>
                  </div>

                  <div className="mb-4 sm:mb-8">
                    <h4 className="font-bold text-xs sm:text-sm text-text-secondary mb-2 sm:mb-4 uppercase tracking-wider">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedCoach.achievements.map((achievement, j) => (
                        <li key={j} className="flex items-start gap-3 text-[13px] sm:text-sm text-text-primary">
                          <span className="w-[2px] h-4 bg-primary mt-0.5 sm:mt-1 shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary text-[13px] sm:text-base mb-6 sm:mb-12">
                    "{selectedCoach.quote}"
                  </blockquote>

                  <a
                    href="https://playo.co/venues/near-pes-university-bengaluru/pase-academy-near-pes-university-bengaluru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 sm:py-4 rounded-md bg-primary text-text-primary border border-accent hover:bg-accent hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(58,123,213,0.3)] hover:shadow-[0_0_40px_rgba(58,123,213,0.5)] font-bold text-sm flex items-center justify-center gap-2"
                  >
                    Book a Session <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
