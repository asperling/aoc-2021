import { useEffect, useState } from 'react';

import { input } from '@/data/day5';

import Button from '@/components/buttons/Button';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';

interface Point {
  x: number;
  y: number;
}

type Line = {
  from: Point;
  to: Point;
  vector: Point;
};

type PartData = {
  diagram: { [x: string]: number };
  maxX: number;
  maxY: number;
  graph: string;
  numberOfDangerousAreas: number;
};

const lines: Array<Line> = input.split(/\n/).map((raw) => {
  const [from, to] = raw.split(' -> ').map((rawPoint): Point => {
    const [x, y] = rawPoint.split(',');
    return { x: parseInt(x), y: parseInt(y) };
  });
  const vector = {
    x: !(to.x - from.x) ? 0 : (to.x - from.x) / Math.abs(to.x - from.x),
    y: !(to.y - from.y) ? 0 : (to.y - from.y) / Math.abs(to.y - from.y),
  };
  return {
    from,
    to,
    vector,
  };
});

const linesStraight = lines.filter(
  ({ from, to }) => from.x === to.x || from.y === to.y
);

function calculateDiagram(lines: Array<Line>) {
  let maxX = 0,
    maxY = 0;
  const diagram: { [x: string]: number } = {};

  function addCoordToDiagram(point: Point) {
    const coord = [point.x, point.y].join('/');
    diagram[coord] = diagram[coord] ? diagram[coord] + 1 : 1;
  }

  for (const { from, to, vector } of lines) {
    maxX = Math.max(maxX, from.x, to.x);
    maxY = Math.max(maxY, from.y, to.y);

    let drawPoint = from;

    while (drawPoint.x !== to.x || drawPoint.y !== to.y) {
      addCoordToDiagram(drawPoint);
      drawPoint = {
        x: drawPoint.x + vector.x,
        y: drawPoint.y + vector.y,
      };
    }
    addCoordToDiagram(to);
  }
  return { diagram, maxX, maxY };
}

export default function Day5() {
  function getPartData(lines: Line[]) {
    const { diagram, maxX, maxY } = calculateDiagram(lines);
    const numberOfDangerousAreas = Object.entries(diagram).filter(
      ([, intersections]) => intersections > 1
    ).length;
    const graph = lines
      .map(({ from, to }) => {
        return `M${from.x} ${from.y} L${to.x} ${to.y}`;
      })
      .join(' ');
    return {
      diagram,
      maxX,
      maxY,
      graph,
      numberOfDangerousAreas,
    };
  }

  const [part, setPart] = useState<number>();
  const [data, setData] = useState<PartData>();
  useEffect(() => {
    if (part === 1) {
      setData(getPartData(linesStraight));
    } else if (part === 2) {
      setData(getPartData(lines));
    }
  }, [part]);

  return (
    <Layout>
      <Seo />
      {data && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
        section { 
          background-image: url("data:image/svg+xml;utf8,<svg class='editorial' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' preserveAspectRatio='none' viewBox='${`0 0 ${data.maxX} ${data.maxY}`}'><path stroke='%23DFDFDF' d='${
              data?.graph
            }' /></svg>");
          background-attachment: fixed;
          background-size: cover; 
        }
      `,
          }}
        />
      )}
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={5} />
            <div className='mt-32'>
              <div>
                <Button
                  variant='primary'
                  onClick={() => {
                    setPart(1);
                  }}
                  className='m-2'
                >
                  Part 1
                </Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    setPart(2);
                  }}
                  className='m-2'
                >
                  Part 2
                </Button>
              </div>
              {part && (
                <Solution part={part}>
                  The sum of the more dangerous areas is{' '}
                  <strong>{data?.numberOfDangerousAreas}</strong>.
                </Solution>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
