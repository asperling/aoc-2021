import { useEffect, useState } from 'react';

import {
  getHighestPointFromTrajectories,
  getPossibleTrajectories,
} from '@/lib/day17';

import { input } from '@/data/day17';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
export default function Day17() {
  const [part1, setPart1] = useState<number>();
  const [part2, setPart2] = useState<number>();

  useEffect(() => {
    // part 1

    const { targetXMin, targetXMax, targetYMin, targetYMax } = input;

    const trajectories = getPossibleTrajectories(
      targetXMin,
      targetXMax,
      targetYMin,
      targetYMax
    );

    setPart1(getHighestPointFromTrajectories(trajectories));
    setPart2(trajectories.length);
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center layout min-h-screen text-center'>
            <Header day={17} />
            {part1 && (
              <Solution part={1}>
                The peak of the highest trajectory is <strong>{part1}</strong>.
              </Solution>
            )}
            {part2 && (
              <Solution part={2}>
                There are <strong>{part2}</strong> possible trajectories.
              </Solution>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
