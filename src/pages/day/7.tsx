import { input } from '@/data/day7';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

// part 1

const data = [...input].sort((a, b) => a - b);

const median = data[Math.round(data.length / 2)];
const fuelCost1 = data.reduce((p, c, i) => {
  const a = i === 1 ? Math.abs(p - median) : p;
  return a + Math.abs(c - median);
});

// part 2

function calcFuelCostFrom(distance: number) {
  distance = Math.abs(distance);
  let fuelCost = 0;
  while (distance >= 0) {
    fuelCost += distance;
    distance--;
  }
  return fuelCost;
}

const mean = Math.round(data.reduce((p, c) => p + c) / data.length);
const guessingRange = 10;
let fuelCostGuesses = [];

for (let i = mean - guessingRange; i <= mean + guessingRange; i++) {
  fuelCostGuesses.push({
    num: i,
    fuelCost: data.reduce((p, c, index) => {
      const a = index === 1 ? calcFuelCostFrom(p - i) : p;
      return a + calcFuelCostFrom(c - i);
    }),
  });
}

fuelCostGuesses = fuelCostGuesses.sort((a, b) => a.fuelCost - b.fuelCost);
const fuelCost2 = fuelCostGuesses.shift() as { num: number; fuelCost: number };

// svg

const max = Math.max(...data);

export default function Day4() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={7} />
            <Solution part={1}>
              The crabs need to align on position {median} (which is the median
              of the provided data set) and the fuel cost to do so is{' '}
              <strong>{fuelCost1}</strong>.
            </Solution>
            <Solution part={2}>
              The crabs need to align on position {fuelCost2.num} (which sadly
              is not the mean) and the fuel cost to do so is{' '}
              <strong>{fuelCost2.fuelCost}</strong>.
            </Solution>

            <svg
              className='absolute inset-x-0 bottom-0'
              xmlns='http://www.w3.org/2000/svg'
              viewBox={`0 0 ${input.length * 10 - 5} ${max + 5}`}
            >
              {input.map((point, i) => (
                <rect
                  key={i}
                  x={i * 10}
                  y={max - point}
                  width='5'
                  height={point}
                />
              ))}
              <path
                stroke='red'
                strokeWidth={10}
                d={`M0 ${max - median} L${input.length * 10 - 5} ${
                  max - median
                }`}
              />
              <text x={20} y={max - median - 20} fontSize={84}>
                P1 (Median)
              </text>
              <path
                stroke='red'
                strokeWidth={10}
                d={`M0 ${max - fuelCost2.num} L${input.length * 10 - 5} ${
                  max - fuelCost2.num
                }`}
              />
              <text x={20} y={max - fuelCost2.num - 20} fontSize={84}>
                P2
              </text>
            </svg>
          </div>
        </section>
      </main>
    </Layout>
  );
}
