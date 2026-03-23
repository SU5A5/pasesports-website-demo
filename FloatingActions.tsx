import { MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-col gap-3">
      {/* Location Button */}
      <motion.a
        href="https://maps.google.com/?q=123+Arena+Boulevard,+Sports+District,+City+400001"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-surface/80 backdrop-blur-md border border-border flex items-center justify-center text-bright shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-bright hover:bg-surface transition-colors group relative"
        aria-label="Get Directions"
      >
        <MapPin size={24} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Get Directions
        </span>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-[#25D366]/10 backdrop-blur-md border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.15)] hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-colors group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-3 py-1.5 rounded-md bg-surface border border-border text-xs font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
