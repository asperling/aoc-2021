import { input } from '@/data/day1';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
import Submarine from '@/components/svg/Submarine';

const sonarData = input.split(/\n/).map((data) => parseInt(data));

// sadly this is already the answer (to part 1)
const increases = sonarData
  .filter((dataPoint, index) => {
    if (index === 0) return false;
    return dataPoint > sonarData[index - 1];
  })
  .reduce((previous) => previous + 1, 0);

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

const p2SonarData: Array<number> = [];
for (let index = 0; index < sonarData.length - 2; index++) {
  p2SonarData.push(
    sonarData[index] + sonarData[index + 1] + sonarData[index + 2]
  );
}

const p2Increases = p2SonarData
  .filter((dataPoint, index) => {
    if (index === 0) return false;
    return dataPoint > p2SonarData[index - 1];
  })
  .reduce((previous) => previous + 1, 0);

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
            <Header day={1} />
            <Solution part={1}>
              The provided sonar data has <strong>{increases}</strong> increases
              in depth.
            </Solution>
            <Solution part={2}>
              The provided sonar data has <strong>{p2Increases}</strong>{' '}
              increases if inspected
              <br />
              using the three-measurement sliding window method.
            </Solution>
            <Submarine className='absolute top-20 left-32 w-12' />
          </div>
        </section>
      </main>
    </Layout>
  );
}
