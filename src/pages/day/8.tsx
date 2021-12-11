import { decodeSignal } from '@/lib/day8';

import { input } from '@/data/day8';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

const data = input.split(/\n/).map((entry) => {
  const splitted = entry.split(' | ');
  return {
    usp: splitted[0].split(' '),
    output: splitted[1].split(' '),
  };
});

// part 1

let appearancesOf147or8 = 0;
for (const entry of data) {
  entry.output.forEach((val) => {
    if ([2, 3, 4, 7].indexOf(val.length) !== -1) appearancesOf147or8 += 1;
  });
}

// part 2

const sumOfAllDecodedSignals = data
  .map((entry) => decodeSignal(entry))
  .reduce((p, c) => p + c);

export default function Day4() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={8} />
            <Solution part={1}>
              In the output values <em>1</em>, <em>4</em>, <em>7</em>, or{' '}
              <em>8</em> appear <strong>{appearancesOf147or8}</strong> times.
            </Solution>
            <Solution part={2}>
              The sum of all decoded signals is{' '}
              <strong>{sumOfAllDecodedSignals}</strong>.
            </Solution>
          </div>
        </section>
      </main>
    </Layout>
  );
}
