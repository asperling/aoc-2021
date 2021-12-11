//   0:       1:       2:       3:       4:
//    aaaa     ....     aaaa     aaaa     ....
//   b    c   .    c   .    c   .    c   b    c
//   b    c   .    c   .    c   .    c   b    c
//    ....     ....     dddd     dddd     dddd
//   e    f   .    f   e    .   .    f   .    f
//   e    f   .    f   e    .   .    f   .    f
//    gggg     ....     gggg     gggg     ....
//
//    5:       6:       7:       8:       9:
//    aaaa     aaaa     aaaa     aaaa     aaaa
//   b    .   b    .   .    c   b    c   b    c
//   b    .   b    .   .    c   b    c   b    c
//    dddd     dddd     ....     dddd     dddd
//   .    f   e    f   .    f   e    f   .    f
//   .    f   e    f   .    f   e    f   .    f
//    gggg     gggg     ....     gggg     gggg

const digits2number = new Map([
  ['abcefg', 0],
  ['cf', 1],
  ['acdeg', 2],
  ['acdfg', 3],
  ['bcdf', 4],
  ['abdfg', 5],
  ['abdefg', 6],
  ['acf', 7],
  ['abcdefg', 8],
  ['abcdfg', 9],
]);

export function decodeSignal(signal: {
  usp: Array<string>;
  output: Array<string>;
}): number {
  const map = new Map<string, string>();

  // counting occurences in usp
  const occurences = new Map<string, number>();
  signal.usp.forEach((pattern) =>
    pattern
      .split('')
      .forEach((char) => occurences.set(char, (occurences.get(char) || 0) + 1))
  );

  for (const [occurence, count] of Array.from(occurences)) {
    switch (count) {
      case 6:
        map.set('b', occurence);
        break;
      case 4:
        map.set('e', occurence);
        break;
      case 9:
        map.set('f', occurence);
        break;
      default:
        break;
    }
  }

  // a => not in 1 but in 7
  const scrambled1 = (
    signal.usp.filter((pattern) => pattern.length === 2).shift() as string
  ).split('');
  const scrambled7 = (
    signal.usp.filter((pattern) => pattern.length === 3).shift() as string
  ).split('');
  for (const char of scrambled7) {
    if (scrambled1.indexOf(char) === -1) {
      map.set('a', char);
      break;
    }
  }

  const scrambled4 = (
    signal.usp.filter((pattern) => pattern.length === 4).shift() as string
  ).split('');
  for (const [occurence, count] of Array.from(occurences)) {
    // c => 8 times but not a
    if (count === 8 && occurence !== map.get('a')) {
      map.set('c', occurence);
      continue;
    }
    // d => not in 4 but 7 times
    if (count === 7 && scrambled4.indexOf(occurence) !== -1) {
      map.set('d', occurence);
    }
  }

  // g => the remaining one
  map.set(
    'g',
    'abcdefg'
      .split('')
      .filter(
        (char) =>
          Array.from(map)
            .map(([, val]) => val)
            .indexOf(char) === -1
      )
      .shift() as string
  );

  const lookup = new Map<string, string>(
    Array.from(map).map(([a, b]) => [b, a])
  );

  let result = '';
  signal.output
    .map((pattern) => pattern.split(''))
    .forEach((outputSignal) => {
      result += digits2number.get(
        outputSignal
          .map((char) => lookup.get(char))
          .sort()
          .join('')
      );
    });

  return parseInt(result);
}
