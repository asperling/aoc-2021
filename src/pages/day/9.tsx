import {
  findLowPointsAndBasins,
  mapInput2Points,
  riskLevelSumOfLowPoints,
} from '@/lib/day9';

import { input } from '@/data/day9';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

const mapped = mapInput2Points(input);
const lowPoints = findLowPointsAndBasins(mapped);

export default function Day9() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={9} />
            <Solution part={1}>
              The sum of the risk levels is{' '}
              <strong>{riskLevelSumOfLowPoints(lowPoints)}</strong>.
            </Solution>
            <Solution part={2}>
              The sum of all decoded signals is <strong>{1}</strong>.
            </Solution>
          </div>
          <pre>{input}</pre>
        </section>
      </main>
    </Layout>
  );
}
