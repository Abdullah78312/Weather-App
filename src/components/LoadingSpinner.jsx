import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader size={48} className="text-blue-400" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;