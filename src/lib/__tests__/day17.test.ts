import { getHighestPointFromTrajectories, getPossibleTrajectories, getPossibleXVelocities } from "../day17";

describe('Day 17', () => {
  
  test('Get possible X Values', () => {
    expect(getPossibleXVelocities(20, 30)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  });

  test('Get climax', () => {
    const trajectories = getPossibleTrajectories(20, 30, -10, -5);
    expect(trajectories.length).toBe(112);
    expect(getHighestPointFromTrajectories(trajectories)).toBe(45);
  });

});