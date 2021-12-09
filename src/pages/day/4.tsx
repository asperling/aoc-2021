import { useEffect, useState } from 'react';

import { Board, RowOrColEntry } from '@/lib/board';

import { calledNumbers, rawBoards } from '@/data/day4';

import BingoBoard from '@/components/BingoBoard';
import Button from '@/components/buttons/Button';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Solution from '@/components/Solution';
export default function Day4() {
  const initialBoards: Array<Board> = [];

  for (const raw of rawBoards) {
    const list: Array<RowOrColEntry> = raw
      .trim()
      .split(/\s+/)
      .map((item) => {
        return { number: parseInt(item), matched: false };
      });
    const cols = [0, 1, 2, 3, 4].map((colNumber) =>
      [0, 5, 10, 15, 20].map((listIndex) => list[colNumber + listIndex])
    );
    const rows = [0, 1, 2, 3, 4].map((rowNumber) =>
      [0, 1, 2, 3, 4].map((listIndex) => list[rowNumber * 5 + listIndex])
    );
    initialBoards.push({
      raw,
      cols,
      rows,
      list,
    });
  }

  function mapToMatched(
    list: RowOrColEntry[],
    called: number
  ): RowOrColEntry[] {
    return list.map(
      (entry): RowOrColEntry => ({
        number: entry.number,
        matched: entry.matched || entry.number === called,
      })
    );
  }

  function setDataForPart(partNumber: number) {
    setPart(partNumber);
    setWinner(undefined);
    setBoards(initialBoards);
    setCalledNumber(calledNumbers[0]);
  }

  const [boards, setBoards] = useState(initialBoards);
  const [winner, setWinner] = useState<Board>();
  const [lastFoundWinnerIndex, setLastFoundWinnerIndex] = useState<number>(-1);
  const [calledNumber, setCalledNumber] = useState<number>(calledNumbers[0]);
  const [part, setPart] = useState<number>();

  useEffect(() => {
    if (!part || winner) return;
    const timer = setTimeout(() => {
      const newIndex = calledNumbers.indexOf(calledNumber) + 1;
      if (newIndex >= calledNumbers.length) return;
      const newNumber = calledNumbers[newIndex];
      setCalledNumber(newNumber);
    }, 1000);
    return () => clearTimeout(timer);
  }, [calledNumber, winner, part, boards]);

  useEffect(() => {
    if (!part) return;

    const newBoards = boards.map((board, boardIndex) => {
      const newBoard: Board = {
        winner: board.winner,
        raw: board.raw,
        cols: board.cols.map((col) => mapToMatched(col, calledNumber)),
        rows: board.rows.map((row) => mapToMatched(row, calledNumber)),
        list: mapToMatched(board.list, calledNumber),
      };
      // check for winner
      if (
        !newBoard.winner &&
        (newBoard.cols.filter((col) => {
          for (const entry of col) {
            if (!entry.matched) return false;
          }
          return true;
        }).length ||
          newBoard.rows.filter((row) => {
            for (const entry of row) {
              if (!entry.matched) return false;
            }
            return true;
          }).length)
      ) {
        newBoard.winner = true;
        setLastFoundWinnerIndex(boardIndex);
      }

      return newBoard;
    });

    const winningBoards = newBoards.filter((board) => board.winner);

    if (part === 1 && winningBoards.length === 1) {
      setWinner(winningBoards[0]);
    } else if (
      part === 2 &&
      winningBoards.length === boards.length &&
      lastFoundWinnerIndex >= 0
    ) {
      setWinner(boards[lastFoundWinnerIndex]);
    }

    setBoards(newBoards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calledNumber, part, lastFoundWinnerIndex]);

  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <Header day={4} />
            <div className='mt-32'>
              <div>
                <Button
                  variant='primary'
                  onClick={() => {
                    setDataForPart(1);
                  }}
                  className='m-2'
                >
                  Part 1
                </Button>
                <Button
                  variant='primary'
                  onClick={() => {
                    setDataForPart(2);
                  }}
                  className='m-2'
                >
                  Part 2
                </Button>
              </div>
              {part && (
                <Solution part={part}>
                  Looking for <strong>{calledNumber}</strong>, which is the{' '}
                  <strong>{calledNumbers.indexOf(calledNumber) + 1}. </strong>
                  called number.
                  <br />
                  {winner && (
                    <>
                      Found a winner! Sum of unmarked numbers times the last
                      matching number is{' '}
                      <strong>
                        {winner.list
                          .filter(
                            (entry) =>
                              !entry.matched && entry.number !== calledNumber
                          )
                          .reduce((a, b) => a + b.number, 0) *
                          calledNumber}{' '}
                      </strong>
                      .
                    </>
                  )}
                  {!winner && <>Didn&apos;t find a winner yet!</>}
                </Solution>
              )}
            </div>
            <div className='3xl:w-3xl lg:w-lg xl:w-xl 2xl:w-2xl'>
              <div className='3xl:grid-cols-12 grid grid-cols-4 gap-2 mb-10 text-xs lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10'>
                {boards.map((board, index) => (
                  <BingoBoard key={index} data={board} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
