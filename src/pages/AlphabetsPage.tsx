import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { SectionHeader } from '../components/common/SectionHeader';
import { AlphabetCard } from '../components/cards/AlphabetCard';
import alphabetsData from '../data/alphabets.json';
import type { AlphabetsData } from '../types';

const data = alphabetsData as AlphabetsData;

type Tab = 'vowels' | 'consonants';

export function AlphabetsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('vowels');

  const items = activeTab === 'vowels' ? data.vowels : data.consonants;

  return (
    <div>
      <SectionHeader
        emoji="🔤"
        title="अक्षरे — Alphabets"
        subtitle="Learn Marathi vowels (स्वर) and consonants (व्यंजन). Hover or tap to see example words."
      />

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab('vowels')}
          className={clsx(
            'px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border',
            activeTab === 'vowels'
              ? 'bg-saffron text-white shadow-md border-saffron'
              : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
          )}
        >
          <span className="font-devanagari">स्वर</span> — Vowels ({data.vowels.length})
        </button>
        <button
          onClick={() => setActiveTab('consonants')}
          className={clsx(
            'px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 border',
            activeTab === 'consonants'
              ? 'bg-saffron text-white shadow-md border-saffron'
              : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600'
          )}
        >
          <span className="font-devanagari">व्यंजन</span> — Consonants ({data.consonants.length})
        </button>
      </div>

      {/* Info banner for vowels */}
      {activeTab === 'vowels' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 sm:p-4 rounded-xl bg-saffron/5 dark:bg-saffron/10 border border-saffron/10 dark:border-saffron/20"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-saffron dark:text-saffron-light">💡 Tip:</span> Marathi has 15 vowels including 
            <span className="font-devanagari font-semibold"> ॲ</span> (as in bat) and 
            <span className="font-devanagari font-semibold"> ऑ</span> (as in rocket) which are unique additions.
          </p>
        </motion.div>
      )}

      {/* Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4"
      >
        {items.map((item, index) => (
          <AlphabetCard key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
}
