import { input } from '@/data/day3';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

const diagnosticsRaw: Array<number[]> = input
  .split(/\n/)
  .map((raw) => raw.split('').map((s) => parseInt(s)));
const diagnosticsSums = diagnosticsRaw.reduce((previous, current) => {
  return previous.map((num, i) => num + current[i]);
});

const gamma = parseInt(
  diagnosticsSums
    .map((sum) => (sum > diagnosticsRaw.length / 2 ? 1 : 0))
    .join(''),
  2
);
const eplsilon = parseInt(
  diagnosticsSums
    .map((sum) => (sum > diagnosticsRaw.length / 2 ? 0 : 1))
    .join(''),
  2
);

let oxygenGeneratorRatingCandidates = diagnosticsRaw;
let o2Index = 0;
while (oxygenGeneratorRatingCandidates.length > 1 && o2Index <= 11) {
  const common =
    oxygenGeneratorRatingCandidates
      .map((elem) => elem[o2Index])
      .reduce((p, c) => p + c) >=
    oxygenGeneratorRatingCandidates.length / 2
      ? 1
      : 0;
  oxygenGeneratorRatingCandidates = oxygenGeneratorRatingCandidates.filter(
    (elem) => elem[o2Index] === common
  );
  o2Index = o2Index + 1;
}
const oxygenGeneratorRating = parseInt(
  oxygenGeneratorRatingCandidates[0].join(''),
  2
);

let co2ScrubberRatingCandidates = diagnosticsRaw;
let co2Index = 0;
while (co2ScrubberRatingCandidates.length > 1 && co2Index <= 11) {
  const common =
    co2ScrubberRatingCandidates
      .map((elem) => elem[co2Index])
      .reduce((p, c) => p + c) <
    co2ScrubberRatingCandidates.length / 2
      ? 1
      : 0;
  co2ScrubberRatingCandidates = co2ScrubberRatingCandidates.filter(
    (elem) => elem[co2Index] === common
  );
  co2Index = co2Index + 1;
}
const co2ScrubberRating = parseInt(co2ScrubberRatingCandidates[0].join(''), 2);

export default function Day4() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={3} />
            <Solution part={1}>
              Gamma is <strong>{gamma}</strong>, epsilon is{' '}
              <strong>{eplsilon}</strong> and the power consumption is{' '}
              <strong>{gamma * eplsilon}</strong>
            </Solution>
            <Solution part={2}>
              The Oxygen Generator Rating is{' '}
              <strong>{oxygenGeneratorRating}</strong>, the CO2 Scrubber Rating
              is <strong>{co2ScrubberRating}</strong> and the Life Support
              Rating is{' '}
              <strong>{oxygenGeneratorRating * co2ScrubberRating}</strong>
            </Solution>
          </div>
        </section>
      </main>
    </Layout>
  );
}
