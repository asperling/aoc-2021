import {
  findLowPointsAndBasins,
  LowPoint,
  mapInput2Points,
  productOfLargestBasins,
  riskLevelSumOfLowPoints,
} from '@/lib/day9';

import { input } from '@/data/day9';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

function Day9({ lowPoints }: { lowPoints: Array<LowPoint> }) {
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
              The product of the three largest basins is{' '}
              <strong>{productOfLargestBasins(lowPoints)}</strong>.
            </Solution>
          </div>
          <pre>{input}</pre>
        </section>
      </main>
    </Layout>
  );
}

Day9.getInitialProps = () => {
  return { lowPoints: findLowPointsAndBasins(mapInput2Points(input)) };
};

export default Day9;
