import { motion } from 'framer-motion';
import { AudioButton } from '../audio/AudioButton';
import type { AlphabetItem } from '../../types';

interface AlphabetCardProps {
  item: AlphabetItem;
  index: number;
}

export function AlphabetCard({ item, index }: AlphabetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ scale: 1.07, y: -6 }}
      whileTap={{ scale: 0.95 }}
      className="group relative bg-white dark:bg-dark-card rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 cursor-pointer overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-teal/5 dark:from-saffron/10 dark:to-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative text-center">
        {/* Emoji illustration — wiggles hello on hover */}
        <div className="text-2xl sm:text-3xl mb-1 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          <span className="inline-block wiggle-on-hover">{item.emoji}</span>
        </div>

        {/* Main letter */}
        <p className="font-devanagari text-3xl sm:text-4xl lg:text-5xl font-bold text-saffron dark:text-saffron-light leading-tight select-none">
          {item.char}
        </p>

        {/* Transliteration */}
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide">
          {item.transliteration}
        </p>

        {/* Example word — always visible on touch, hover-reveal on desktop */}
        <div className="mt-2 min-h-[2.5rem] flex flex-col items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <p className="font-devanagari text-sm text-teal-dark dark:text-teal-light font-semibold">
            {item.exampleWord}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
            {item.exampleMeaning}
          </p>
        </div>
      </div>

      {/* Audio button - always visible on mobile, hover on desktop */}
      <div className="absolute top-1.5 right-1.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <AudioButton src={item.audio} label={item.char} size="sm" variant="ghost" />
      </div>
    </motion.div>
  );
}
