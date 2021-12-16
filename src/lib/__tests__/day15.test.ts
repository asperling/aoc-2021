import { aStar, expandGrid, Point } from '@/lib/day15';

describe('Day 15', () => {
  const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
  const grid: number[][] = input
    .split(/\n/)
    .map((e) => e.split('').map((e) => parseInt(e)));

  test('Grid expansion should work properly', () => {
    expect(expandGrid([[8]])).toEqual([
      [8, 9, 1, 2, 3],
      [9, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
      [2, 3, 4, 5, 6],
      [3, 4, 5, 6, 7],
    ]);
  });

  test('The total risk of the path with lowest risk through the example data should be 40', () => {
    const start: Point = {
      x: 0,
      y: 0,
      risk: grid[0][0],
    };
    const goal: Point = {
      x: grid[0].length - 1,
      y: grid.length - 1,
      risk: grid[grid.length - 1][grid[0].length - 1],
    };
    const path = aStar(start, goal, grid);
    expect(path.length).toBe(19);
    expect(path.map((e) => e.risk).reduce((p, c) => p + c) - path[0].risk).toBe(
      40
    );
  });
});
