export function string2PathSegments(str: string): { [x: string]: string[] } {
  const lines = str.split(/\n/);
  const paths: { [x: string]: string[] } = {};
  lines.forEach((line) => {
    const [from, to] = line.split('-') as [string, string];
    if (!paths[from]) paths[from] = [];
    paths[from].push(to);
    if (!paths[to]) paths[to] = [];
    paths[to].push(from);
  });
  return paths;
}

export function isPathValidPart1(path: string[]): boolean {
  const smallCavesVisited: { [x: string]: number } = {};
  path.forEach((segment) => {
    if (segment === segment.toLowerCase()) {
      smallCavesVisited[segment] = smallCavesVisited[segment]
        ? smallCavesVisited[segment] + 1
        : 1;
    }
  });
  let valid = true;
  Object.keys(smallCavesVisited).forEach((smallCave) => {
    if (smallCavesVisited[smallCave] > 1) {
      valid = false;
    }
  });
  return valid;
}

export function isPathValidPart2(path: string[]): boolean {
  const smallCavesVisited: { [x: string]: number } = {};
  path.forEach((segment) => {
    if (segment === segment.toLowerCase()) {
      smallCavesVisited[segment] = smallCavesVisited[segment]
        ? smallCavesVisited[segment] + 1
        : 1;
    }
  });

  return (
    // start should only be visited once
    (!smallCavesVisited['start'] || smallCavesVisited['start'] === 1) &&
    // there should only be ONE small cave that was visited twice
    Object.keys(smallCavesVisited).filter((key) => smallCavesVisited[key] === 2)
      .length <= 1 &&
    // there should be no small cave visited more than twice
    Object.keys(smallCavesVisited).filter((key) => smallCavesVisited[key] > 2)
      .length === 0
  );
}

export function isPathFinal(path: string[]): boolean {
  if (path.length && path[0] === 'start' && path[path.length - 1] === 'end') {
    return true;
  }
  return false;
}

export function getNumberOfPaths(
  pathSegments: {
    [x: string]: string[];
  },
  isValidCallback?: (paths: string[]) => boolean
): number {
  if (!pathSegments['start'] || !pathSegments['end']) return 0;
  if (!isValidCallback) isValidCallback = isPathValidPart1;
  let paths = 0;
  const candidates = pathSegments['start'].map((to) => ['start', to]);
  while (candidates.length) {
    // take element from the end - they are more likely to final already
    const candidate = candidates.pop() as string[];
    if (isValidCallback(candidate)) {
      pathSegments[candidate[candidate.length - 1]].forEach((to) => {
        if (to === 'end') {
          if (isPathFinal([...candidate, to])) {
            paths = paths + 1;
          }
        } else if (to !== 'start') {
          candidates.push([...candidate, to]);
        }
      });
    }
  }
  return paths;
}
