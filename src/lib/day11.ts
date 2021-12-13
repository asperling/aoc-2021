export type Digit = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function string2projection(str: string): Digit[][] {
  return str.split(/\n/).map((e) =>
    e.split('').map((e) => {
      const digit = parseInt(e);
      return digit > 0 && digit <= 9 ? digit : 0;
    })
  ) as Digit[][];
}

export function octopusEnergyLevelStepProjection(octopusses: Digit[][]): {
  projection: Digit[][];
  flashes: number;
} {
  const projection = octopusses.map((row) => [...row]);
  let flashes = 0;
  let toProject = [];

  for (let x = 0; x < projection.length; x++) {
    for (let y = 0; y < projection[x].length; y++) {
      if (projection[x][y] === 0) projection[x][y] = -1;
      toProject.push([x, y]);
    }
  }
  while (toProject.length) {
    const [px, py] = toProject.shift() as [Digit, Digit];
    if (projection[px] && projection[px][py] !== undefined) {
      if (projection[px][py] >= 9) {
        flashes = flashes + 1;
        projection[px][py] = 0;
        toProject = [
          ...toProject,
          [px - 1, py - 1],
          [px - 1, py],
          [px - 1, py + 1],
          [px, py - 1],
          [px, py + 1],
          [px + 1, py - 1],
          [px + 1, py],
          [px + 1, py + 1],
        ];
      } else if (projection[px][py] === -1) {
        projection[px][py] = 1;
      } else if (projection[px][py] > 0) {
        projection[px][py] += 1;
      }
    }
  }

  return { projection, flashes };
}

export function octopusEnergyLevelStepProjectionAfterNumberOfSteps(
  octopusses: Digit[][],
  steps: number
): { projection: Digit[][]; flashes: number } {
  let step = {
    projection: octopusses,
    flashes: 0,
  };
  for (let i = 1; i <= steps; i++) {
    const { projection, flashes } = octopusEnergyLevelStepProjection(
      step.projection
    );
    step = {
      projection: projection,
      flashes: step.flashes + flashes,
    };
  }
  return step;
}

export function getNoStepsUntilFirstSimultaneousFlash(
  octopusses: Digit[][]
): number {
  let steps = 1;
  let projection = octopusEnergyLevelStepProjection(octopusses).projection;
  const allFlashingString = JSON.stringify(
    octopusses.map((row) => row.map(() => 0))
  );
  while (JSON.stringify(projection) !== allFlashingString) {
    steps = steps + 1;
    projection = octopusEnergyLevelStepProjection(projection).projection;
  }
  return steps;
}
