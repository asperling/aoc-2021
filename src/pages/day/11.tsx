import {
  getNoStepsUntilFirstSimultaneousFlash,
  octopusEnergyLevelStepProjectionAfterNumberOfSteps,
  string2projection,
} from '@/lib/day11';

import { input } from '@/data/day11';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

const puzzleStartdata = string2projection(input);
const flashes = octopusEnergyLevelStepProjectionAfterNumberOfSteps(
  puzzleStartdata,
  100
).flashes;

const stepsUntilSimultaneousFlash =
  getNoStepsUntilFirstSimultaneousFlash(puzzleStartdata);

export default function Day11() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={10} />
            <Solution part={1}>
              The total number of flashes is <strong>{flashes}</strong>.
            </Solution>
            <Solution part={2}>
              The octopusses first flash simultaneously at step{' '}
              <strong>{stepsUntilSimultaneousFlash}</strong>.
            </Solution>
          </div>
        </section>
      </main>
    </Layout>
  );
}
