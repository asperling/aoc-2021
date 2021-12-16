import { TypedPriorityQueue } from 'typedpriorityqueue';

export type Point = {
  x: number;
  y: number;
  risk: number;
};
type Path = Point[];

type QueueElement = {
  priority: number;
  point: Point;
};

type PointHashmap = {
  [x: string]: Point;
};

type Grid = number[][];

export function input2Grid(input: string): Grid {
  return input.split(/\n/).map((e) => e.split('').map((e) => parseInt(e)));
}

export function expandGrid(input: Grid): Grid {
  const grid: Grid = Array.from({ length: input.length * 5 }, () => []).map(
    () => Array.from({ length: input[0].length * 5 }, () => 0)
  );

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const orig = input[y % input.length][x % input[0].length];
      const expanded =
        orig + Math.floor(y / input.length) + Math.floor(x / input[0].length);
      const expandedNormed = expanded % 9 === 0 ? 9 : expanded % 9;
      grid[y][x] = expandedNormed;
    }
  }
  return grid;
}

function compareQueueElements(a: QueueElement, b: QueueElement): boolean {
  return b.priority > a.priority;
}

function reconstructPath(cameFrom: PointHashmap, current: Point): Path {
  const path: Path = [current];
  while (cameFrom[pointHash(current)]) {
    current = cameFrom[pointHash(current)];
    path.unshift(current);
  }
  return path;
}

function pointHash(point: Point): string {
  return [point.x, '-', point.y].join('');
}

/*
 * A* Search Algorithmus implemented from pseudo code,
 * see https://en.wikipedia.org/wiki/A*_search_algorithm
 */
export function aStar(
  start: Point,
  goal: Point,
  grid: Grid
  //, h: (p: Point) => number
): Path {
  // Moved inside scope of function as all the information is stored in grid itself.
  function h(p: Point): number {
    return Math.abs(goal.x - p.x) + Math.abs(goal.y - p.y);
  }

  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  const openSet = new TypedPriorityQueue<QueueElement>(compareQueueElements);
  openSet.add({
    priority: 0,
    point: start,
  });
  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  const cameFrom: PointHashmap = {};
  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  const gScore = grid.map((r) => r.map(() => Number.MAX_VALUE));
  gScore[start.y][start.x] = 0;

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  const fScore = grid.map((r) => r.map(() => Number.MAX_VALUE));
  fScore[start.y][start.x] = 0; // start has no cost, otherwise: h(start);

  while (!openSet.isEmpty()) {
    // the node with the lowest fScore (prio) in the queue
    const current = (openSet.poll() as QueueElement).point;
    if (current.x === goal.x && current.y === goal.y) {
      return reconstructPath(cameFrom, current);
    }
    //for each neighbor of current
    [
      [current.x - 1, current.y], // left
      [current.x, current.y - 1], // top
      [current.x + 1, current.y], // right
      [current.x, current.y + 1], // bottom
    ].forEach(([xn, yn]) => {
      if (!grid[yn] || !grid[yn][xn]) return;
      const neighbor: Point = {
        x: xn,
        y: yn,
        risk: grid[yn][xn],
      };
      // d(current,neighbor) is the weight of the edge from current to neighbor
      const d = neighbor.risk;
      // tentative_gScore is the distance from start to the neighbor through current
      const tentativeGScore = gScore[current.y][current.x] + d;
      if (tentativeGScore < gScore[neighbor.y][neighbor.x]) {
        // This path to neighbor is better than any previous one. Record it!
        gScore[neighbor.y][neighbor.x] = tentativeGScore;
        fScore[neighbor.y][neighbor.x] = tentativeGScore + h(neighbor);

        // if neighbor not in openSet
        if (!cameFrom[pointHash(neighbor)]) {
          openSet.add({
            point: neighbor,
            priority: fScore[neighbor.y][neighbor.x],
          });
        }
        cameFrom[pointHash(neighbor)] = current;
      }
    });
  }
  throw new Error('Open set is empty but goal was never reached');
}
