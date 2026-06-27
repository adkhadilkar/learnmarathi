import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAudio } from '../../hooks/useAudio';

interface AudioButtonProps {
  src: string;
  /** Marathi text spoken via the browser if the audio clip can't be loaded. */
  text?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost';
}

export function AudioButton({ src, text, label, size = 'md', variant = 'primary' }: AudioButtonProps) {
  const { play, isPlaying } = useAudio();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => play(src, text ?? label)}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        sizeClasses[size],
        variant === 'primary'
          ? 'bg-teal text-white hover:bg-teal-dark shadow-sm hover:shadow-md'
          : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
        isPlaying && 'animate-pulse ring-2 ring-teal/50'
      )}
      aria-label={label ? `Play audio: ${label}` : 'Play audio'}
      title={label}
    >
      {isPlaying ? (
        <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      ) : (
        <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        </svg>
      )}
    </motion.button>
  );
}
