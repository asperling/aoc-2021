export type FoldInstruction = ['x' | 'y', number];
export type Point = [number, number];

export function input2Manual(str: string): {
  points: Array<Point>;
  foldInstructions: Array<FoldInstruction>;
} {
  const [rawPoints, rawFoldInstructions] = str.split(/\n\n/);
  const points = rawPoints
    ?.split(/\n/)
    .map((e) => e.split(',').map((e) => parseInt(e)) as Point);
  const foldInstructions = rawFoldInstructions
    ?.split(/\n/)
    .map((e) => e.replace('fold along ', ''))
    .map((e) => e.split('='))
    .map((e) => [e[0], parseInt(e[1])] as FoldInstruction);

  return {
    points,
    foldInstructions,
  };
}

export function foldBy(
  points: Array<Point>,
  instruction: FoldInstruction
): Array<Point> {
  const [direction, fold] = instruction;
  const projection: { [x: string]: Point } = {};
  if (direction === 'y') {
    points.forEach(([x, y]) => {
      if (y < fold) {
        projection[[x, y].join(',')] = [x, y];
      } else if (y > fold && 2 * fold - y >= 0) {
        const yn = 2 * fold - y;
        projection[[x, yn].join(',')] = [x, yn];
      }
    });
  } else {
    points.forEach(([x, y]) => {
      if (x < fold) {
        projection[[x, y].join(',')] = [x, y];
      } else if (x > fold && 2 * fold - x >= 0) {
        const xn = 2 * fold - x;
        projection[[xn, y].join(',')] = [xn, y];
      }
    });
  }
  return Object.values(projection);
}
