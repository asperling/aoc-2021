import {
  getBadSyntaxScoreOfLines,
  getCompletionScoreOf,
  interpretBracketsSyntax,
} from '@/lib/day10';

import { input } from '@/data/day10';

import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
const lines = input.split(/\n/);

const sortedCompletedLineScores = lines
  .map((line) => interpretBracketsSyntax(line))
  .filter((interpreted) => interpreted.missing !== undefined)
  .map((interpreted) => getCompletionScoreOf(interpreted))
  .sort((a, b) => a - b);
const middleScore =
  sortedCompletedLineScores[Math.floor(sortedCompletedLineScores.length / 2)];

export default function Day10() {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={10} />
            <Solution part={1}>
              The total syntax error score for this file is{' '}
              <strong>{getBadSyntaxScoreOfLines(lines)}</strong> points.
            </Solution>
            <Solution part={2}>
              The middle score is <strong>{middleScore}</strong>.
            </Solution>
          </div>
        </section>
      </main>
    </Layout>
  );
}
