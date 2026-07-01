import { motion } from 'framer-motion';
import { useAudio } from '../../hooks/useAudio';
import type { NumberItem } from '../../types';

interface NumberCardProps {
  item: NumberItem;
  index: number;
  /** Called after the card is tapped — lets the page track counting streaks. */
  onPlayed?: (item: NumberItem) => void;
}

export function NumberCard({ item, index, onPlayed }: NumberCardProps) {
  const { play, isPlaying } = useAudio();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => {
        play(item.audio, item.word);
        onPlayed?.(item);
      }}
      aria-label={`Play ${item.word}`}
      className="group relative w-full bg-white dark:bg-dark-card rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700/50 cursor-pointer"
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

      {/* Speaker affordance — always visible so it's tappable on touch devices */}
      <span
        className={`absolute top-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
          isPlaying ? 'bg-teal text-white' : 'bg-gray-100 dark:bg-dark-bg text-gray-500 dark:text-gray-400 group-hover:bg-teal/10 group-hover:text-teal'
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
      </span>
    </motion.button>
  );
}
