import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { SectionHeader } from '../components/common/SectionHeader';
import { StorybookReader } from '../components/stories/StorybookReader';
import type { Story } from '../components/stories/StorybookReader';
import storiesData from '../data/stories.json';

const data = storiesData as Story[];

// Cover gradient per story for a colorful bookshelf
const COVERS: Record<string, string> = {
  'story-1': 'from-emerald-200 to-teal-300 dark:from-emerald-800 dark:to-teal-900',
  'story-2': 'from-sky-200 to-blue-300 dark:from-sky-800 dark:to-blue-900',
  'story-3': 'from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900',
  'story-4': 'from-rose-200 to-pink-300 dark:from-rose-800 dark:to-pink-900',
  'story-5': 'from-violet-200 to-purple-300 dark:from-violet-800 dark:to-purple-900',
};

export function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div>
      <AnimatePresence mode="wait">
        {!selectedStory ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SectionHeader
              emoji="📚"
              title="गोष्टी — Story Library"
              subtitle="Pick a book. Read it page by page, listen along, and earn a sticker when you finish!"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
              {data.map((story, idx) => (
                <motion.button
                  key={story.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -8, rotate: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedStory(story)}
                  className="group text-left"
                >
                  {/* Book cover */}
                  <div className={clsx(
                    'relative aspect-[3/4] rounded-2xl rounded-l-md bg-gradient-to-br shadow-[0_10px_22px_rgba(60,40,150,.15)] overflow-hidden border border-white/40 dark:border-white/10',
                    COVERS[story.id] ?? 'from-grape/20 to-rose/20'
                  )}>
                    {/* Spine */}
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/10 dark:bg-black/30" />
                    {/* Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Emoji */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-6xl sm:text-7xl drop-shadow-md"
                        whileHover={{ scale: 1.15, rotate: 6 }}
                      >
                        {story.emoji}
                      </motion.span>
                    </div>
                    {/* Level chip */}
                    <div className="absolute top-2.5 right-2.5">
                      <span className={clsx(
                        'px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur',
                        story.level === 'beginner'
                          ? 'bg-white/70 dark:bg-black/40 text-jade-dark dark:text-jade-light'
                          : 'bg-white/70 dark:bg-black/40 text-grape dark:text-grape-light'
                      )}>
                        {story.level === 'beginner' ? '🌱' : '🌿'} {story.level}
                      </span>
                    </div>
                    {/* Bottom title bar */}
                    <div className="absolute left-0 right-0 bottom-0 p-3 pt-6 bg-gradient-to-t from-black/40 to-transparent">
                      <div className="font-devanagari font-bold text-lg text-white leading-tight drop-shadow">
                        {story.title}
                      </div>
                    </div>
                  </div>
                  {/* Under-book caption */}
                  <div className="mt-2.5 px-1">
                    <p className="font-round font-bold text-sm text-ink dark:text-white truncate">{story.titleEnglish}</p>
                    <p className="text-xs text-ink-muted font-semibold flex items-center gap-1">
                      <span>📖 {story.sentences.length} pages</span>
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <StorybookReader key="reader" story={selectedStory} onBack={() => setSelectedStory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
