import {
  findLowPointsAndBasins,
  mapInput2Points,
  productOfLargestBasins,
  riskLevelSumOfLowPoints,
} from '../day9';

describe('Day 9', () => {
  const mapped = mapInput2Points(
    '2199943210\n3987894921\n9856789892\n8767896789\n9899965678'
  );
  const lowPoints = findLowPointsAndBasins(mapped);

  test('Mapping raw input to points should result in a two dimensional array', () => {
    expect(mapped[0][0]).toBeTruthy();
  });

  test('Mapping should have 5 rows', () => {
    expect(mapped.length).toBe(5);
  });

  test('Mapping should have 10 columns', () => {
    mapped.forEach((row) => expect(row.length).toBe(10));
  });

  test('Example data should contain 4 low points', () => {
    expect(lowPoints.length).toBe(4);
  });

  test('Low points of example data should be 1, 0, 5, and 5', () => {
    expect(lowPoints[0].point).toBe(1);
    expect(lowPoints[1].point).toBe(0);
    expect(lowPoints[2].point).toBe(5);
    expect(lowPoints[3].point).toBe(5);
  });

  test('The sum of the risk levels should be calculated correctly', () => {
    expect(riskLevelSumOfLowPoints(lowPoints)).toBe(15);
  });

  test('The basin size should be calculated correctly', () => {
    expect(lowPoints[0].basinSize).toBe(3);
    expect(lowPoints[1].basinSize).toBe(9);
    expect(lowPoints[2].basinSize).toBe(14);
    expect(lowPoints[3].basinSize).toBe(9);
  });

  test('The product of the 3 biggest basins should be calculated correctly', () => {
    expect(productOfLargestBasins(lowPoints)).toBe(1134);
  });
});
