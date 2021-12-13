import {
  getNoStepsUntilFirstSimultaneousFlash,
  octopusEnergyLevelStepProjection,
  octopusEnergyLevelStepProjectionAfterNumberOfSteps,
  string2projection,
} from '../day11';

describe('Day 11', () => {
  const testData = string2projection('11111\n19991\n19191\n19991\n11111');
  const largerTestData = string2projection(
    '5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526'
  );

  test('Simple one step projection should work', () => {
    const { projection, flashes } = octopusEnergyLevelStepProjection(testData);
    +expect(projection[0][0]).toBe(3);
    expect(projection[2][2]).toBe(0);
    expect(flashes).toBe(9);
  });

  test('Multiple steps with simple test data should be calculated correctly', () => {
    const beExpected = {
      projection: string2projection('45654\n51115\n61116\n51115\n45654'),
      flashes: 9,
    };
    expect(
      octopusEnergyLevelStepProjectionAfterNumberOfSteps(testData, 2)
    ).toEqual(beExpected);
  });

  test('Multiple steps with larger test data should be calculated correctly', () => {
    const beExpected = {
      projection: string2projection(
        '0481112976\n0031112009\n0041112504\n0081111406\n0099111306\n0093511233\n0442361130\n5532252350\n0532250600\n0032240000'
      ),
      flashes: 204,
    };
    expect(
      octopusEnergyLevelStepProjectionAfterNumberOfSteps(largerTestData, 10)
    ).toEqual(beExpected);
  });

  test('The number of steps until all octopusses flash simultaneously should be calculated correctly', () => {
    expect(getNoStepsUntilFirstSimultaneousFlash(largerTestData)).toBe(195);
  });
});
