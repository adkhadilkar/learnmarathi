import { motion } from 'framer-motion';
import { AudioButton } from '../audio/AudioButton';
import type { JodaksharaItem } from '../../types';

interface JodaksharaCardProps {
  item: JodaksharaItem;
  index: number;
}

export function JodaksharaCard({ item, index }: JodaksharaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-dark-card rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700/50"
    >
      {/* Conjunct display */}
      <div className="text-center mb-4">
        <p className="font-devanagari text-5xl font-bold text-saffron dark:text-saffron-light">
          {item.conjunct}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.transliteration}</p>
      </div>

      {/* Formation breakdown */}
      <div className="flex items-center justify-center gap-2 mb-4 py-2 bg-gray-50 dark:bg-dark-bg rounded-xl">
        <span className="font-devanagari text-xl text-gray-700 dark:text-gray-300">{item.parts[0]}</span>
        <span className="text-gray-400">+</span>
        <span className="font-devanagari text-xl text-gray-700 dark:text-gray-300">{item.parts[1]}</span>
        <span className="text-gray-400">=</span>
        <span className="font-devanagari text-xl font-bold text-teal dark:text-teal-light">{item.conjunct}</span>
      </div>

      {/* Example word */}
      <div className="text-center">
        <p className="font-devanagari text-lg text-gray-800 dark:text-gray-200">{item.exampleWord}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{item.exampleMeaning}</p>
      </div>

      {/* Audio button */}
      <div className="flex justify-center mt-3">
        <AudioButton src={item.audio} label={item.conjunct} size="md" />
      </div>
    </motion.div>
  );
}
