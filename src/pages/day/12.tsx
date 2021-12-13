import { useEffect, useState } from 'react';

import {
  getNumberOfPaths,
  isPathValidPart1,
  isPathValidPart2,
  string2PathSegments,
} from '@/lib/day12';

import { input } from '@/data/day12';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

function Day12() {
  const [part1, setPart1] = useState<number>();
  const [part2, setPart2] = useState<number>();

  useEffect(() => {
    const pathSegments = string2PathSegments(input);
    setPart1(getNumberOfPaths(pathSegments, isPathValidPart1));
    setPart2(getNumberOfPaths(pathSegments, isPathValidPart2));
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={12} />
            {part1 && (
              <Solution part={1}>
                There are <strong>{part1}</strong> paths through the cave
                system.
              </Solution>
            )}
            {part2 && (
              <Solution part={2}>
                There are <strong>{part2}</strong> paths through the cave
                system.
              </Solution>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Day12;
