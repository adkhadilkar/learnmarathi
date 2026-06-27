import { SectionHeader } from '../components/common/SectionHeader';
import { NumberCard } from '../components/cards/NumberCard';
import numbersData from '../data/numbers.json';
import type { NumberItem } from '../types';

const data = numbersData as NumberItem[];

export function NumbersPage() {
  return (
    <div>
      <SectionHeader
        emoji="🔢"
        title="अंक — Numbers"
        subtitle="Learn Marathi numerals (०–२०) and their pronunciation."
      />

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
        {data.map((item, index) => (
          <NumberCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
