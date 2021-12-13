import {
  getNumberOfPaths,
  isPathFinal,
  isPathValidPart1,
  isPathValidPart2,
  string2PathSegments,
} from '../day12';

const exampleInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testPathsValidPart1 = [
  'start,A,b,A,c,A,end',
  'start,A,b,A,end',
  'start,A,b,end',
  'start,A,c,A,b,A,end',
  'start,A,c,A,b,end',
  'start,A,c,A,end',
  'start,A,end',
  'start,b,A,c,A,end',
  'start,b,A,end',
  'start,b,end',
];

const testPathsValidPart2 = [
  ...testPathsValidPart1,
  'start,A,b,A,b,A,c,A,end',
  'start,A,b,A,b,A,end',
  'start,A,b,A,b,end',
  'start,A,b,A,c,A,b,A,end',
  'start,A,b,A,c,A,b,end',
  'start,A,b,A,c,A,c,A,end',
  'start,A,b,d,b,A,c,A,end',
  'start,A,b,d,b,A,end',
  'start,A,b,d,b,end',
  'start,A,c,A,b,A,b,A,end',
  'start,A,c,A,b,A,b,end',
  'start,A,c,A,b,A,c,A,end',
  'start,A,c,A,b,d,b,A,end',
  'start,A,c,A,b,d,b,end',
  'start,A,c,A,c,A,b,A,end',
  'start,A,c,A,c,A,b,end',
  'start,A,c,A,c,A,end',
  'start,b,A,b,A,c,A,end',
  'start,b,A,b,A,end',
  'start,b,A,b,end',
  'start,b,A,c,A,b,A,end',
  'start,b,A,c,A,b,end',
  'start,b,A,c,A,c,A,end',
  'start,b,d,b,A,c,A,end',
  'start,b,d,b,A,end',
  'start,b,d,b,end',
];

const testPathsInvalidPart1 = [
  'A,b,A,b,A,end',
  'start,A,b,A,c,c',
  'A,start,b,end,end',
  'start,a,start,A,c,A,b,A',
];

const testPathsInvalidPart2 = [
  'start,a,start,end',
  'start,A,b,A,b,A,c,B,c,end',
  'A,start,b,C,b,C,b,end',
];

const testPathsNotFinal = ['start', 'end', 'end,start'];

describe('Day 12', () => {
  test('String 2 paths', () => {
    expect(string2PathSegments(exampleInput)).toEqual({
      A: ['start', 'c', 'b', 'end'],
      b: ['start', 'A', 'd', 'end'],
      c: ['A'],
      d: ['b'],
      end: ['A', 'b'],
      start: ['A', 'b'],
    });
  });

  testPathsValidPart1.forEach((path) => {
    test(path + ' should be a valid path for part 1', () => {
      expect(isPathValidPart1(path.split(','))).toBe(true);
    });
  });

  testPathsValidPart2.forEach((path) => {
    test(path + ' should be a valid path for part 2', () => {
      expect(isPathValidPart2(path.split(','))).toBe(true);
    });
  });

  testPathsValidPart1.forEach((path) => {
    test(path + ' should be a final path', () => {
      expect(isPathFinal(path.split(','))).toBe(true);
    });
  });

  testPathsInvalidPart1.forEach((path) => {
    test(path + ' should be an invalid path for part 1', () => {
      expect(isPathValidPart1(path.split(','))).toBe(false);
    });
  });

  testPathsInvalidPart2.forEach((path) => {
    test(path + ' should be an invalid path for part 2', () => {
      expect(isPathValidPart1(path.split(','))).toBe(false);
    });
  });

  [...testPathsInvalidPart1, ...testPathsNotFinal].forEach((path) => {
    test(path + ' should not be final path', () => {
      expect(isPathFinal(path.split(','))).toBe(false);
    });
  });

  test('Small example data should result in 10 valid and final paths for part 1', () => {
    expect(getNumberOfPaths(string2PathSegments(exampleInput))).toBe(10);
  });

  test('Small example data should result in 36 valid and final paths for part 2', () => {
    expect(
      getNumberOfPaths(string2PathSegments(exampleInput), isPathValidPart2)
    ).toBe(36);
  });

  test('Larger example data should result in 226 paths for part 1', () => {
    const largerExampleInput = string2PathSegments(
      'fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW'
    );
    expect(getNumberOfPaths(largerExampleInput)).toBe(226);
  });

  test('Larger example data should result in 3509 paths for part 2', () => {
    const largerExampleInput = string2PathSegments(
      'fs-end\nhe-DX\nfs-he\nstart-DX\npj-DX\nend-zg\nzg-sl\nzg-pj\npj-he\nRW-he\nfs-DX\npj-RW\nzg-RW\nstart-pj\nhe-WI\nzg-he\npj-fs\nstart-RW'
    );
    expect(getNumberOfPaths(largerExampleInput, isPathValidPart2)).toBe(3509);
  });
});
