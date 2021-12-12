type Digit = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type LowPoint = {
  point: Digit;
  basinSize: number;
};

export function mapInput2Points(input: string): Digit[][] {
  return input
    .split(/\n/)
    .map((row) => row.split('').map((cell) => parseInt(cell) as Digit));
}

export function findLowPointsAndBasins(map: Digit[][]): Array<LowPoint> {
  const points = [];
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
      const point = map[rowIndex][colIndex];
      // up
      if (
        rowIndex > 0 &&
        !(map[rowIndex - 1][colIndex] > map[rowIndex][colIndex])
      ) {
        continue;
      }
      // down
      if (
        rowIndex < map.length - 1 &&
        !(map[rowIndex + 1][colIndex] > map[rowIndex][colIndex])
      ) {
        continue;
      }
      // left
      if (
        colIndex > 0 &&
        !(map[rowIndex][colIndex - 1] > map[rowIndex][colIndex])
      ) {
        continue;
      }
      // right
      if (
        colIndex < map[rowIndex].length - 1 &&
        !(map[rowIndex][colIndex + 1] > map[rowIndex][colIndex])
      ) {
        continue;
      }
      // it's a low point - get to basin size
      let basinSize = 0;

      const searchCoords: Array<[number, number]> = [[rowIndex, colIndex]];
      while (searchCoords.length) {
        const [x, y] = searchCoords.shift() as [number, number];
        if (
          x >= 0 &&
          x < map.length &&
          y >= 0 &&
          y < map[0].length &&
          map[x][y] !== -1 &&
          map[x][y] !== 9
        ) {
          basinSize += 1;
          map[x][y] = -1;
          [
            [x, y - 1],
            [x, y + 1],
            [x - 1, y],
            [x + 1, y],
          ].forEach(([xn, yn]) => {
            searchCoords.push([xn, yn]);
          });
        }
      }

      points.push({
        point,
        basinSize,
      });
    }
  }
  return points;
}

export function riskLevelSumOfLowPoints(lowPoints: Array<LowPoint>): number {
  return lowPoints?.length
    ? lowPoints.map(({ point }) => point + 1).reduce((p, c) => p + c)
    : 0;
}
