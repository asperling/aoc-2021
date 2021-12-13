import { foldBy, input2Manual, Point } from '@/lib/day13';

import { input } from '@/data/day13';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

const manual = input2Manual(input);
const part1 = foldBy(manual.points, manual.foldInstructions[0]).length;

let points: Array<Point> = manual.points;
for (const instruction of manual.foldInstructions) {
  points = foldBy(points, instruction);
}

let maxX = 0;
let maxY = 0;

points.forEach((point) => {
  if (point[0] > maxX) maxX = point[0];
  if (point[1] > maxY) maxY = point[1];
});

export default function Day13() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={13} />
            <Solution part={1}>
              There are <strong>{part1}</strong> points still visible after the
              first fold.
            </Solution>
            <Solution part={2}>
              There are <strong>{points.length}</strong> points still visible
              after all folds.
            </Solution>
            <svg
              className='mt-12'
              xmlns='http://www.w3.org/2000/svg'
              viewBox={`0 0 ${(maxX + 1) * 10} ${(maxY + 1) * 10}`}
              fill='#aa1212'
            >
              {points.map((point, i) => (
                <rect
                  key={i}
                  x={point[0] * 10}
                  y={point[1] * 10}
                  width='10'
                  height='10'
                />
              ))}
            </svg>
          </div>
        </section>
      </main>
    </Layout>
  );
}
