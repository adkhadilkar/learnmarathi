import { useRef, useCallback } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { NumberCard } from '../components/cards/NumberCard';
import numbersData from '../data/numbers.json';
import type { NumberItem } from '../types';

const data = numbersData as NumberItem[];

export function NumbersPage() {
  // 🥚 Count १ → १० in order for a surprise.
  const nextExpected = useRef(1);

  const handlePlayed = useCallback((item: NumberItem) => {
    if (item.number === nextExpected.current) {
      if (item.number === 10) {
        nextExpected.current = 1;
        window.dispatchEvent(
          new CustomEvent('shekru:egg', {
            detail: { message: '🔢 अंकवीर! You counted १ to १० in order! 🏆', confetti: true },
          }),
        );
      } else {
        nextExpected.current += 1;
      }
    } else {
      // Restart the streak — tapping १ always counts as a fresh start.
      nextExpected.current = item.number === 1 ? 2 : 1;
    }
  }, []);

  return (
    <div>
      <SectionHeader
        emoji="🔢"
        title="अंक — Numbers"
        subtitle="Learn Marathi numerals (०–२०) and their pronunciation. Tap a card to hear it!"
      />

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
        {data.map((item, index) => (
          <NumberCard key={item.id} item={item} index={index} onPlayed={handlePlayed} />
        ))}
      </div>
    </div>
  );
}
