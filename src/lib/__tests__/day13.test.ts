import { foldBy, input2Manual } from '../day13';

describe('Day 13', () => {
  const input =
    '6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\n\nfold along y=7\nfold along x=5';
  const manual = input2Manual(input);

  test('input2Manual', () => {
    expect(manual.points.length).toBe(18);
    expect(manual.foldInstructions.length).toBe(2);
    expect(manual.points[3]).toEqual([0, 3]);
    expect(manual.points[10]).toEqual([10, 12]);
    expect(manual.foldInstructions[0]).toEqual(['y', 7]);
  });

  test('One time fold', () => {
    const afterFold = foldBy(manual.points, manual.foldInstructions[0]);
    expect(afterFold.length).toBe(17);
  });

  test('Second time fold', () => {
    const afterFold = foldBy(
      foldBy(manual.points, manual.foldInstructions[0]),
      manual.foldInstructions[1]
    );
    expect(afterFold.length).toBe(16);
  });
});
