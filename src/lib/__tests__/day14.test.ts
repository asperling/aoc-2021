import {
  calculateResult,
  input2PolymerProcess,
  iteratePolymerTemplate,
  iteratePolymerTemplateNoOfTimes,
  PElement,
} from '../day14';

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe('Day 14', () => {
  const polymerProcess = input2PolymerProcess(input);
  const after4thIteration = iteratePolymerTemplateNoOfTimes(
    4,
    polymerProcess.template,
    polymerProcess.rules
  );

  test('Template should be extracted correctly', () => {
    expect(polymerProcess.template).toEqual({
      NN: 1,
      NC: 1,
      CB: 1,
    });
  });

  test('It should extract rules correctly from input', () => {
    expect(Object.entries(polymerProcess.rules).length).toBe(16);
    expect(polymerProcess.rules['CH']).toEqual('B');
    expect(polymerProcess.rules['HC']).toEqual('B');
    expect(polymerProcess.rules['CC']).toEqual('N');
  });

  test('Example data should have a valid result after one iteration', () => {
    expect(
      iteratePolymerTemplate(polymerProcess.template, polymerProcess.rules)
    ).toEqual({
      // NCNBCHB
      NC: 1,
      CN: 1,
      NB: 1,
      BC: 1,
      CH: 1,
      HB: 1,
    });
  });

  test('Example data should have a valid result after 4 steps', () => {
    expect(after4thIteration).toEqual({
      // NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
      BB: 9,
      BC: 4,
      BH: 3,
      BN: 6,
      CB: 5,
      CC: 2,
      CN: 3,
      HC: 3,
      HH: 1,
      HN: 1,
      NB: 9,
      NC: 1,
      NH: 1,
    });
  });

  test('Example data should have a part1 solution of 1588', () => {
    const templateIterated = iteratePolymerTemplateNoOfTimes(
      10,
      polymerProcess.template,
      polymerProcess.rules
    );
    expect(
      calculateResult(
        templateIterated,
        polymerProcess.derivedFrom.slice(-1) as PElement
      )
    ).toBe(1588);
  });
});
