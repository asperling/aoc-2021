import {
  Digit,
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

function Day9({
  map,
  lowPoints,
}: {
  map: Digit[][];
  lowPoints: Array<LowPoint>;
}) {
  return (
    <Layout>
      <Seo />
      <style
        dangerouslySetInnerHTML={{
          __html: `
      section { 
        background-image: url("data:image/svg+xml;utf8,<svg class='editorial' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='none' viewBox='${`0 0 ${
          map[0].length * 10
        } ${map.length * 10}`}'>${map
            .map((row, rowIndex) =>
              row
                .map((col, colIndex) => {
                  return `<rect x='${colIndex * 10}' y='${
                    rowIndex * 10
                  }' width='10' height='10' fill='${
                    col === -1 ? '%23aa1212' : 'grey'
                  }'/>`;
                })
                .join(' ')
            )
            .join(' ')}</svg>");
        background-attachment: fixed;
        background-size: cover; 
      }
    `,
        }}
      />
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
  const map = mapInput2Points(input);
  return {
    map,
    lowPoints: findLowPointsAndBasins(map),
  };
};

export default Day9;
