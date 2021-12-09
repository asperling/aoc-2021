import { input as input1 } from '@/data/day1';
import { input as input2 } from '@/data/day2';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
import Submarine from '@/components/svg/Submarine';

// result from Day 1
const sonarData = input1.split(/\n/).map((data) => parseInt(data));

const maxDepth = sonarData.reduce((previous, current) =>
  Math.max(previous, current)
);
const readingGap = 5;
const topographicPath =
  sonarData
    .map((dataPoint, index) => {
      if (index === 0) return 'M0 0';
      return ' L' + index * readingGap + ' ' + dataPoint;
    })
    .join('') +
  ' L' +
  sonarData.length * readingGap +
  ' ' +
  maxDepth +
  ' L0 ' +
  maxDepth;

// day 2
const p1Movement = input2.split(/\n/).map((move: string) => {
  return {
    x: move.includes('forward') ? parseInt(move.split(' ')[1]) : 0,
    y: move.includes('down')
      ? parseInt(move.split(' ')[1])
      : move.includes('up')
      ? parseInt(move.split(' ')[1]) * -1
      : 0,
  };
});

const p1FinalMovement = p1Movement.reduce((previous, current) => {
  return {
    x: previous.x + current.x,
    y: previous.y + current.y,
  };
});

interface Movement {
  aim: number;
  h: number;
  x: number;
  y: number;
}

const p2Movement = input2.split(/\n/).map((move: string) => {
  return {
    aim: move.includes('down')
      ? parseInt(move.split(' ')[1])
      : move.includes('up')
      ? parseInt(move.split(' ')[1]) * -1
      : 0,
    h: move.includes('forward') ? parseInt(move.split(' ')[1]) : 0,
    x: 0,
    y: 0,
  };
});

const p2FinalMovement: Movement = p2Movement.reduce(
  (previous: Movement, current: Movement) => {
    return {
      aim: previous.aim + current.aim,
      h: 0,
      // add previous.h in case the first movement is just forward
      x: current.h
        ? previous.x + current.h + previous.h
        : previous.x + previous.h,
      y: current.h ? previous.y + previous.aim * current.h : previous.y,
    };
  }
);

export default function Day4() {
  return (
    <Layout>
      <Seo />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        section { 
          background-image: url("data:image/svg+xml;utf8,<svg class='editorial' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='none' viewBox='${`0 0 ${
            sonarData.length * readingGap
          } ${maxDepth}`}'><path fill='%23DFDFDF' d='${topographicPath}' /></svg>");
          background-attachment: fixed;
          background-size: cover; 
        }
      `,
        }}
      />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={2} />
            <Solution part={1}>
              The result of multiplying the final depth of{' '}
              <strong>{p1FinalMovement.y}</strong> and the final horizontal
              movement of <strong>{p1FinalMovement.x}</strong> is{' '}
              <strong>{p1FinalMovement.x * p1FinalMovement.y}</strong>.
            </Solution>
            <Solution part={2}>
              The multiplication of the final horizontal position{' '}
              <strong>{p2FinalMovement.x}</strong> by the final depth of{' '}
              <strong>{p2FinalMovement.y}</strong> is{' '}
              <strong>
                {(p2FinalMovement.x as number) * p2FinalMovement.y}
              </strong>
              .
            </Solution>
            <Submarine className='absolute right-24 bottom-32 w-12' />
          </div>
        </section>
      </main>
    </Layout>
  );
}
