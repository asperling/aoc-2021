import { decodeSignal } from '../day8';

describe('Decoding digits of part1 example', () => {
  test('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'be',
          'cfbegad',
          'cbdgef',
          'fgaecd',
          'cgeb',
          'fdcge',
          'agebfd',
          'fecdb',
          'fabcd',
          'edb',
        ],
        output: ['fdgacbe', 'cefdb', 'cefbgd', 'gcbe'],
      })
    ).toBe(8394);
  });

  test('edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'edbfga',
          'begcd',
          'cbg',
          'gc',
          'gcadebf',
          'fbgde',
          'acbgfd',
          'abcde',
          'gfcbed',
          'gfec',
        ],
        output: ['fcgedb', 'cgb', 'dgebacf', 'gc'],
      })
    ).toBe(9781);
  });

  test('fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'fgaebd',
          'cg',
          'bdaec',
          'gdafb',
          'agbcfd',
          'gdcbef',
          'bgcad',
          'gfac',
          'gcb',
          'cdgabef',
        ],
        output: ['cg', 'cg', 'fdcagb', 'cbg'],
      })
    ).toBe(1197);
  });

  test('fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'fbegcd',
          'cbd',
          'adcefb',
          'dageb',
          'afcb',
          'bc',
          'aefdc',
          'ecdab',
          'fgdeca',
          'fcdbega',
        ],
        output: ['efabcd', 'cedba', 'gadfec', 'cb'],
      })
    ).toBe(9361);
  });

  test('aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'aecbfdg',
          'fbg',
          'gf',
          'bafeg',
          'dbefa',
          'fcge',
          'gcbea',
          'fcaegb',
          'dgceab',
          'fcbdga',
        ],
        output: ['gecf', 'egdcabf', 'bgf', 'bfgea'],
      })
    ).toBe(4873);
  });

  test('fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'fgeab',
          'ca',
          'afcebg',
          'bdacfeg',
          'cfaedg',
          'gcfdb',
          'baec',
          'bfadeg',
          'bafgc',
          'acf',
        ],
        output: ['gebdcfa', 'ecba', 'ca', 'fadegcb'],
      })
    ).toBe(8418);
  });

  test('dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'dbcfg',
          'fgd',
          'bdegcaf',
          'fgec',
          'aegbdf',
          'ecdfab',
          'fbedc',
          'dacgb',
          'gdcebf',
          'gf',
        ],
        output: ['cefg', 'dcbef', 'fcge', 'gbcadfe'],
      })
    ).toBe(4548);
  });

  test('bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'bdfegc',
          'cbegaf',
          'gecbf',
          'dfcage',
          'bdacg',
          'ed',
          'bedf',
          'ced',
          'adcbefg',
          'gebcd',
        ],
        output: ['ed', 'bcgafe', 'cdgba', 'cbgef'],
      })
    ).toBe(1625);
  });

  test('egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'egadfb',
          'cdbfeg',
          'cegd',
          'fecab',
          'cgb',
          'gbdefca',
          'cg',
          'fgcdab',
          'egfdb',
          'bfceg',
        ],
        output: ['gbdfcae', 'bgc', 'cg', 'cgb'],
      })
    ).toBe(8717);
  });

  test('gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce should be decoded correctly', () => {
    expect(
      decodeSignal({
        usp: [
          'gcafb',
          'gcf',
          'dcaebfg',
          'ecagb',
          'gf',
          'abcdeg',
          'gaef',
          'cafbge',
          'fdbac',
          'fegbdc',
        ],
        output: ['fgae', 'cfgab', 'fg', 'bagce'],
      })
    ).toBe(4315);
  });
});
