import { motion } from 'framer-motion';
import { AudioButton } from '../audio/AudioButton';
import type { NumberItem } from '../../types';

interface NumberCardProps {
  item: NumberItem;
  index: number;
}

export function NumberCard({ item, index }: NumberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="group relative bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700/50"
    >
      <div className="text-center">
        <p className="font-devanagari text-4xl sm:text-5xl font-bold text-teal dark:text-teal-light">
          {item.digit}
        </p>
        <p className="text-lg text-gray-400 dark:text-gray-500 mt-1">
          {item.number}
        </p>
        <p className="font-devanagari text-sm text-saffron dark:text-saffron-light font-medium mt-1">
          {item.word}
        </p>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <AudioButton src={item.audio} label={item.word} size="sm" variant="ghost" />
      </div>
    </motion.div>
  );
}
