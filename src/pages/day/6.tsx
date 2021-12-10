import SimpleBar from 'simplebar-react';

import { input } from '@/data/day6';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

type Population = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

let population: Population = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const populationEvolution: Array<number> = [];

function projectionOfDay(population: Population): Population {
  const evolvedPopulation: Population = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  [1, 2, 3, 4, 5, 6, 7, 8].forEach(
    (internalCounter) =>
      (evolvedPopulation[internalCounter - 1] = population[internalCounter])
  );
  evolvedPopulation[8] = population[0];
  evolvedPopulation[6] = evolvedPopulation[6] + population[0];
  return evolvedPopulation;
}

// initial Population
input.forEach(
  (internalCounter) =>
    (population[internalCounter] = population[internalCounter] + 1)
);
populationEvolution.push(population.reduce((p, c) => p + c));

for (let i = 1; i <= 256; i++) {
  population = projectionOfDay(population);
  populationEvolution.push(population.reduce((p, c) => p + c));
}

export default function Day6() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={6} />

            <Solution part={1}>
              The population number after 80 days is{' '}
              <strong>{populationEvolution[80]}</strong>.
            </Solution>
            <Solution part={2}>
              The population number after 256 days is{' '}
              <strong>{populationEvolution[256]}</strong>.
            </Solution>
            <div className='w-full'>
              <SimpleBar forceVisible='y' autoHide={false}>
                <svg
                  width={populationEvolution.length * 12 + 4}
                  viewBox={`0 0 ${populationEvolution.length * 12 + 4} 100`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='black'
                  className='mb-3'
                >
                  <g transform={`rotate(-90) translate(-100 0)`}>
                    {populationEvolution.map((count, i) => (
                      <text
                        fontSize={10}
                        key={i}
                        fontFamily='monospace'
                        y={12 + i * 12}
                        x='0'
                      >
                        {populationEvolution[i]}
                      </text>
                    ))}
                  </g>
                </svg>
              </SimpleBar>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
