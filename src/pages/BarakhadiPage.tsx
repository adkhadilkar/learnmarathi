import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { SectionHeader } from '../components/common/SectionHeader';
import { AudioButton } from '../components/audio/AudioButton';
import barakhadiData from '../data/barakhadi.json';
import type { BarakhadiRow } from '../types';

const data = barakhadiData as BarakhadiRow[];

const MATRAS_HEADER = ['अ', 'आ (ा)', 'इ (ि)', 'ई (ी)', 'उ (ु)', 'ऊ (ू)', 'ए (े)', 'ऐ (ै)', 'ओ (ो)', 'औ (ौ)', 'अं (ं)', 'अः (ः)'];

export function BarakhadiPage() {
  const [selectedRow, setSelectedRow] = useState(0);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const currentRow = data[selectedRow];

  return (
    <div>
      <SectionHeader
        emoji="📝"
        title="बाराखडी — Barakhadi"
        subtitle="Each consonant combines with 12 vowel sounds. Select a consonant to explore all forms."
      />

      {/* View mode toggle */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-teal dark:text-teal-light">{data.length}</span> consonants × 
          <span className="font-semibold text-teal dark:text-teal-light"> 12</span> forms = 
          <span className="font-semibold text-saffron dark:text-saffron-light"> {data.length * 12}</span> syllables
        </p>
        <div className="flex gap-1 bg-gray-100 dark:bg-dark-card rounded-lg p-1">
          <button
            onClick={() => setViewMode('card')}
            className={clsx(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'card' ? 'bg-white dark:bg-dark-surface shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={clsx(
              'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
              viewMode === 'table' ? 'bg-white dark:bg-dark-surface shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            Table
          </button>
        </div>
      </div>

      {/* Consonant selector - scrollable */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-max">
          {data.map((row, idx) => (
            <button
              key={row.consonant}
              onClick={() => setSelectedRow(idx)}
              className={clsx(
                'w-11 h-11 rounded-xl font-devanagari text-lg font-bold transition-all duration-200 flex-shrink-0',
                idx === selectedRow
                  ? 'bg-saffron text-white shadow-lg scale-110 ring-2 ring-saffron/30'
                  : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:bg-saffron/10 dark:hover:bg-saffron/20 border border-gray-150 dark:border-gray-600'
              )}
            >
              {row.consonant}
            </button>
          ))}
        </div>
      </div>

      {/* Selected consonant display */}
      <motion.div
        key={currentRow.consonant}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="font-devanagari text-4xl font-bold text-saffron dark:text-saffron-light">
            {currentRow.consonant}
          </span>
          <span className="text-gray-400 dark:text-gray-500">—</span>
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {currentRow.forms[0]?.transliteration} row
          </span>
        </div>

        {viewMode === 'card' ? (
          /* Card view */
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {currentRow.forms.map((form, idx) => (
              <motion.div
                key={form.text}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                className="group bg-white dark:bg-dark-card rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700/50 text-center relative overflow-hidden"
              >
                {/* Matra indicator */}
                {form.matra && (
                  <div className="absolute top-1 left-1.5 text-[10px] font-devanagari text-teal dark:text-teal-light bg-teal/10 dark:bg-teal/20 px-1.5 py-0.5 rounded-md">
                    {form.matra}
                  </div>
                )}
                <p className="font-devanagari text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                  {form.text}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-mono">
                  {form.transliteration}
                </p>
                {form.exampleWord && (
                  <p className="font-devanagari text-[11px] text-gray-400 dark:text-gray-500 mt-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {form.exampleWord}
                  </p>
                )}
                <div className="mt-2 flex justify-center">
                  <AudioButton src={form.audio} label={form.text} size="sm" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Table view */
          <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-dark-card">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700/50">
                  {MATRAS_HEADER.map((h, i) => (
                    <th key={i} className="px-2 py-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 font-normal font-devanagari">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {currentRow.forms.map(form => (
                    <td key={form.text} className="px-2 py-3 text-center border-r last:border-r-0 border-gray-50 dark:border-gray-700/30">
                      <p className="font-devanagari text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {form.text}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">{form.transliteration}</p>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
