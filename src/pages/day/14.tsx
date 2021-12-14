import { useEffect, useState } from 'react';

import {
  calculateResult,
  input2PolymerProcess,
  iteratePolymerTemplateNoOfTimes,
  PElement,
} from '@/lib/day14';

import { input } from '@/data/day14';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

export default function Day14() {
  const [part1, setPart1] = useState<number>();
  const [part2, setPart2] = useState<number>();

  useEffect(() => {
    const { template, rules, derivedFrom } = input2PolymerProcess(input);
    const lastElement = derivedFrom.slice(-1) as PElement;
    const after10Iterations = iteratePolymerTemplateNoOfTimes(
      10,
      template,
      rules
    );
    const after40Iterations = iteratePolymerTemplateNoOfTimes(
      30,
      after10Iterations,
      rules
    );
    setPart1(calculateResult(after10Iterations, lastElement));
    setPart2(calculateResult(after40Iterations, lastElement));
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={14} />
            {part1 && (
              <Solution part={1}>
                The quantity of the most common element subtracted by the
                quantity of the least common element after 10 iterations is{' '}
                <strong>{part1}</strong>.
              </Solution>
            )}
            {part1 && (
              <Solution part={2}>
                The quantity of the most common element subtracted by the
                quantity of the least common element after 40 iterations is{' '}
                <strong>{part2}</strong>.
              </Solution>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
