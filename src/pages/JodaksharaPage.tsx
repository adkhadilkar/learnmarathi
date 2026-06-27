import { SectionHeader } from '../components/common/SectionHeader';
import { JodaksharaCard } from '../components/cards/JodaksharaCard';
import jodaksharaData from '../data/jodakshara.json';
import type { JodaksharaItem } from '../types';

const data = jodaksharaData as JodaksharaItem[];

export function JodaksharaPage() {
  return (
    <div>
      <SectionHeader
        emoji="🔗"
        title="जोडाक्षरे — Jodakshara"
        subtitle="Conjunct consonants — two consonants joined without a vowel. Learn how they form and sound."
      />

      {/* Info card */}
      <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-teal/5 dark:from-purple-900/20 dark:to-teal/10 border border-purple-100 dark:border-purple-800/30">
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
          <strong className="text-purple-700 dark:text-purple-300">How it works:</strong> When a consonant appears before another consonant without a vowel, 
          it takes a <em>half form</em> (using ्) and attaches to the next consonant. 
          Children who can read jodakshara can read most real Marathi text!
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <JodaksharaCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
