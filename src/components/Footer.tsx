import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border pt-10 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 sm:gap-6 sm:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img
                src="/logo.jpeg"
                alt="Pase Sports"
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-full bg-white p-0.5 sm:p-1"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <h2 className="font-display text-2xl sm:text-4xl tracking-wider text-text-primary">PASE SPORTS</h2>
            </div>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-bright">Play Beyond Limits</p>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            World-class courts. Elite coaching. Your game, elevated. The premier destination for athletes who demand the best.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/pase.blr/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="w-10 h-10 rounded-full bg-surface-raised border border-border flex items-center justify-center text-text-secondary hover:text-bright hover:border-bright transition-colors"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl mb-4 sm:mb-6 text-text-primary">Quick Links</h3>
          <ul className="flex flex-col gap-3 sm:gap-4">
            <li><Link to="/" className="text-text-secondary hover:text-bright transition-colors text-sm">Home</Link></li>
            <li><Link to="/facilities" className="text-text-secondary hover:text-bright transition-colors text-sm">Facilities</Link></li>
            <li><Link to="/coaches" className="text-text-secondary hover:text-bright transition-colors text-sm">Coaches</Link></li>
            <li><Link to="/alumni" className="text-text-secondary hover:text-bright transition-colors text-sm">Alumni</Link></li>
            <li><Link to="/get-a-quote" className="text-text-secondary hover:text-bright transition-colors text-sm">Get a Quote</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl mb-4 sm:mb-6 text-text-primary">Sports</h3>
          <ul className="flex flex-col gap-3 sm:gap-4">
            <li><Link to="/facilities?sport=Badminton" className="text-text-secondary hover:text-bright transition-colors text-sm">Badminton</Link></li>
            <li><Link to="/facilities?sport=Pickleball" className="text-text-secondary hover:text-bright transition-colors text-sm">Pickleball</Link></li>
            <li><Link to="/facilities?sport=Tennis" className="text-text-secondary hover:text-bright transition-colors text-sm">Tennis</Link></li>
            <li><Link to="/facilities?sport=Football" className="text-text-secondary hover:text-bright transition-colors text-sm">Football</Link></li>
            <li><Link to="/facilities?sport=Cricket" className="text-text-secondary hover:text-bright transition-colors text-sm">Cricket</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-display text-xl sm:text-2xl mb-4 sm:mb-6 text-text-primary">Contact</h3>
          <ul className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <li className="text-text-secondary">
              <a
                href="https://www.google.com/maps/place/pase+sports/data=!4m2!3m1!1s0x3bae3ff0c727491b:0x2f058acc39ccb113"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-bright transition-colors"
              >
                <MapPin size={18} className="text-bright shrink-0 mt-0.5 sm:w-5 sm:h-5" />
                <span className="text-sm">PASE - Sports Arena, Adjacent to BMIC<br />NICE Road, Pramod Layout,<br />Bengaluru, Karnataka 560026</span>
              </a>
            </li>
            <li className="text-text-secondary">
              <a href="tel:+919880871212" className="flex items-center gap-3 hover:text-bright transition-colors">
                <Phone size={18} className="text-bright shrink-0 sm:w-5 sm:h-5" />
                <span className="text-sm">+91 98808 71212</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-text-secondary">
              <Mail size={18} className="text-bright shrink-0 sm:w-5 sm:h-5" />
              <span className="text-sm">hello@pasesports.com</span>
            </li>
          </ul>
          <a
            href="https://wa.me/919880871212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors font-bold text-sm gap-2"
          >
            Chat on WhatsApp <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <p className="text-text-muted text-xs sm:text-sm">&copy; {new Date().getFullYear()} Pase Sports. All rights reserved.</p>
        <div className="flex items-center gap-2 text-text-muted text-xs sm:text-sm">
          Powered by Pase Sports <span className="w-1 h-1 rounded-full bg-border mx-2"></span> Bookings via Playo
        </div>
      </div>
    </footer>
  );
}
