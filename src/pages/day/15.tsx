import { useEffect, useState } from 'react';

import { aStar, expandGrid, input2Grid, Point } from '@/lib/day15';

import { input } from '@/data/day15';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

export default function Day15() {
  const [part1, setPart1] = useState<number>();
  const [part2, setPart2] = useState<number>();

  useEffect(() => {
    const grid: number[][] = input2Grid(input);

    // part1
    const start: Point = {
      x: 0,
      y: 0,
      risk: grid[0][0],
    };
    const goal: Point = {
      x: grid[0].length - 1,
      y: grid.length - 1,
      risk: grid[grid.length - 1][grid[0].length - 1],
    };
    const path = aStar(start, goal, grid);
    const riskPart1 =
      path.map((e) => e.risk).reduce((p, c) => p + c) - path[0].risk;

    setPart1(riskPart1);

    // part 2
    const grid2 = expandGrid(grid);
    const goal2: Point = {
      x: grid2[0].length - 1,
      y: grid2.length - 1,
      risk: grid2[grid2.length - 1][grid2[0].length - 1],
    };
    const path2 = aStar(start, goal2, grid2);
    const riskPart2 =
      path2.map((e) => e.risk).reduce((p, c) => p + c) - path2[0].risk;
    setPart2(riskPart2);
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={15} />
            {part1 && (
              <Solution part={1}>
                What is the lowest total risk of any path from the top left to
                the bottom right?
                <br />
                <strong>{part1}</strong>
              </Solution>
            )}
            {part2 && (
              <Solution part={2}>
                What is the lowest total risk of any path from the top left to
                the bottom right of the expanded grid?
                <br />
                <strong>{part2}</strong>
              </Solution>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
