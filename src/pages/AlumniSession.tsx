import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Star, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ALUMNI_SESSIONS = [
  { 
    id: 1, 
    name: 'Sarah Jenkins', 
    sport: 'Tennis', 
    achievement: 'State Champion 2023', 
    level: 'Professional', 
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    description: 'Experience high-intensity baseline drills and match-play strategy with a state champion. Perfect for advanced players looking to refine their competitive edge.',
    price: '₹2,500',
    duration: '60 mins'
  },
  { 
    id: 2, 
    name: 'Michael Chang', 
    sport: 'Badminton', 
    achievement: 'National Qualifier', 
    level: 'Collegiate', 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    description: 'Focus on footwork, agility, and explosive smash techniques. Michael brings collegiate-level intensity to every session.',
    price: '₹1,800',
    duration: '60 mins'
  },
  { 
    id: 3, 
    name: 'Aisha Patel', 
    sport: 'Football', 
    achievement: 'U-19 National Team', 
    level: 'Junior Pro', 
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    description: '1-on-1 tactical training, ball control, and finishing drills. Learn what it takes to play at the national level.',
    price: '₹2,000',
    duration: '90 mins'
  },
];

export default function AlumniSession() {
  const [activeSport, setActiveSport] = useState('All');

  const filteredSessions = activeSport === 'All' 
    ? ALUMNI_SESSIONS 
    : ALUMNI_SESSIONS.filter(s => s.sport === activeSport);

  return (
    <div className="bg-void text-text-primary min-h-screen pt-32 pb-24">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-bright mb-6"
        >
          Exclusive Experience
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-[80px] leading-[0.9] tracking-[-0.02em] mb-8"
        >
          Play With<br />The Pros.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-[16px] md:text-[18px] text-text-secondary max-w-[600px] mx-auto leading-[1.65]"
        >
          Step onto the court with Pase Sports alumni. Experience the intensity, learn their strategies, and elevate your game by training with those who have reached the top.
        </motion.p>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Trophy, title: 'Elite Experience', desc: 'Train with athletes who have competed at state, national, and professional levels.' },
            { icon: Star, title: 'Tactical Insights', desc: 'Learn the mental and strategic approaches that separate good players from champions.' },
            { icon: Users, title: '1-on-1 Focus', desc: 'Get personalized feedback and drills tailored specifically to your playstyle.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-surface border border-border rounded-xl p-8 text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-bright mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="font-display text-2xl mb-3">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Session Booking */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="font-display text-4xl">Available Sessions</h2>
          <div className="flex flex-wrap gap-3">
            {['All', 'Tennis', 'Badminton', 'Football'].map((sport) => (
              <button
                key={sport}
                onClick={() => setActiveSport(sport)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 border ${
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredSessions.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-surface border border-border flex flex-col hover:border-accent transition-all hover:shadow-[0_8px_32px_rgba(43,91,168,0.2)]"
            >
              <div className="h-64 relative overflow-hidden">
                <img src={session.image} alt={session.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-void/80 backdrop-blur-sm border border-border font-mono text-[10px] text-bright uppercase tracking-wider">
                  {session.sport}
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="font-display text-3xl mb-1">{session.name}</h3>
                  <p className="text-accent font-bold text-sm mb-1">{session.achievement}</p>
                  <p className="text-text-muted text-xs uppercase tracking-wider">{session.level}</p>
                </div>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">
                  {session.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-border mb-6">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Session Rate</p>
                    <p className="font-display text-2xl text-text-primary">{session.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted mb-1">Duration</p>
                    <p className="font-sans font-bold text-text-primary flex items-center gap-1">
                      <Calendar size={14} className="text-bright" /> {session.duration}
                    </p>
                  </div>
                </div>

                <Link 
                  to={`/get-a-quote?service=alumni-session&alumni=${encodeURIComponent(session.name)}`}
                  className="w-full py-3 rounded-md bg-primary/10 text-bright border border-primary hover:bg-primary hover:text-text-primary transition-all duration-300 font-sans font-bold text-sm flex items-center justify-center gap-2"
                >
                  Request Session <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
