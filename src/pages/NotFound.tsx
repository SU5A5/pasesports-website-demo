import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-void text-text-primary min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <h1 className="font-display text-[120px] md:text-[180px] leading-none text-accent/30 mb-4">404</h1>
        <h2 className="font-display text-4xl md:text-5xl mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-text-primary border border-accent hover:bg-accent transition-all font-bold text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
