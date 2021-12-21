import { useEffect, useState } from 'react';

import {
  calculateResult,
  getPacketHierarchyFromHexString,
  sumOfVersions,
} from '@/lib/day16';

import { input } from '@/data/day16';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
export default function Day16() {
  const [part1, setPart1] = useState<number>();
  const [part2, setPart2] = useState<number>();

  useEffect(() => {
    // part 1
    const packet = getPacketHierarchyFromHexString(input);
    setPart1(sumOfVersions(packet));
    setPart2(calculateResult(packet));
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='flex flex-col items-center justify-center layout min-h-screen text-center'>
            <Header day={16} />
            {part1 && (
              <Solution part={1}>
                The sum of the versions of the packet and its subpackets is?
                <br />
                <strong>{part1}</strong>
              </Solution>
            )}
            {part2 && (
              <Solution part={2}>
                What do you get if you evaluate the expression represented by
                your hexadecimal-encoded BITS transmission?
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
