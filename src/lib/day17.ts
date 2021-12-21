
export function getPossibleXVelocities(targetXMin: number, targetXMax: number): number[] {
  function test(x: number, min: number, max: number): boolean {
    let sum = 0;
    while (x > 0) {
      sum += x;
      if (sum >= min && sum <= max) {
        return true;
      }
      if (sum > max) {
        return false;
      }
      x -= 1;
    }
    return false;
  }
  const xes = [];
  let velocity = 0;
  while (velocity <= targetXMax) {
    if (test(velocity, targetXMin, targetXMax)) {
      xes.push(velocity);
    }
    velocity = velocity + 1;
  }

  return xes;
}

export function getPossibleTrajectories(targetXMin: number, targetXMax: number, targetYMin: number, targetYMax: number): number[][][] {
  const xVelocities = getPossibleXVelocities(targetXMin, targetXMax);
  const trajectories: number[][][] = [];
  xVelocities.forEach(xVelocity => {
    
    for (let yVelocity = targetYMin; yVelocity <= Math.abs(targetYMin); yVelocity++) {
      let [x, y] = [0, 0];
      const trajectory: number[][] = [];
      let [vx, vy] = [xVelocity, yVelocity];
      for (let step = 0;; step++) {
        vx = (xVelocity - step > 0) ? xVelocity - step : 0;
        vy = yVelocity - step;
        [x, y] = [x + vx, y + vy];
        trajectory.push([x, y]);
        if (x >= targetXMin && x <= targetXMax && y >= targetYMin && y <= targetYMax) {
          // WINNER
          trajectories.push(trajectory)
          break;
        } else if ( x > targetXMax || y < targetYMin) {
          break;
        }
      }
    }

  })
  return trajectories;
}

export function getHighestPointFromTrajectories(trajectories: number[][][]): number {
  
  let highest = 0;

  console.log(trajectories.length);

  trajectories.forEach(path => {
    path.forEach(([, y]) => { if (y > highest) highest = y; });
  });

  return highest;
}