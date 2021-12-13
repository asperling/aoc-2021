import {
  getBadSyntaxScoreOfLines,
  getCompletionScoreOf,
  interpretBracketsSyntax,
} from '../day10';

describe('Day 10', () => {
  const lines = [
    '[({(<(())[]>[[{[]{<()<>>', // 0
    '[(()[<>])]({[<{<<[]>>(', // 1
    '{([(<{}[<>[]}>{[]{[(<()>', // 2
    '(((({<>}<{<{<>}{[]{[]{}', // 3
    '[[<[([]))<([[{}[[()]]]', // 4
    '[{[{({}]{}}([{[{{{}}([]', // 5
    '{<[[]]>}<{[{[{[]{()[[[]', // 6
    '[<(<(<(<{}))><([]([]()', // 7
    '<{([([[(<>()){}]>(<<{{', // 8
    '<{([{{}}[<[[[<>{}]]]>[]]', // 9
  ];

  test(lines[2] + ' - Expected ], but found } instead.', () => {
    expect(interpretBracketsSyntax(lines[2])).toEqual({
      valid: false,
      line: lines[2],
      expected: ']',
      found: '}',
    });
  });

  test(lines[4] + ' - Expected ], but found } instead.', () => {
    expect(interpretBracketsSyntax(lines[4])).toEqual({
      valid: false,
      line: lines[4],
      expected: ']',
      found: ')',
    });
  });

  test(lines[5] + ' - Expected ], but found } instead.', () => {
    expect(interpretBracketsSyntax(lines[5])).toEqual({
      valid: false,
      line: lines[5],
      expected: ')',
      found: ']',
    });
  });

  test(lines[7] + ' - Expected ], but found } instead.', () => {
    expect(interpretBracketsSyntax(lines[7])).toEqual({
      valid: false,
      line: lines[7],
      expected: '>',
      found: ')',
    });
  });

  test(lines[8] + ' - Expected ], but found } instead.', () => {
    expect(interpretBracketsSyntax(lines[8])).toEqual({
      valid: false,
      line: lines[8],
      expected: ']',
      found: '>',
    });
  });

  test(
    'Completion of ' + lines[0] + ' should be }}]])})] with a score of 288957',
    () => {
      const interpretation = interpretBracketsSyntax(lines[0]);
      expect(interpretation).toEqual({
        valid: false,
        line: lines[0],
        missing: '}}]])})]',
      });
      expect(getCompletionScoreOf(interpretation)).toBe(288957);
    }
  );

  test(
    'Completion of ' + lines[1] + ' should be )}>]}) with a score of 5566',
    () => {
      const interpretation = interpretBracketsSyntax(lines[1]);
      expect(interpretation).toEqual({
        valid: false,
        line: lines[1],
        missing: ')}>]})',
      });
      expect(getCompletionScoreOf(interpretation)).toBe(5566);
    }
  );

  test(
    'Completion of ' +
      lines[3] +
      ' should be }}>}>)))) with a score of 1480781',
    () => {
      const interpretation = interpretBracketsSyntax(lines[3]);
      expect(interpretation).toEqual({
        valid: false,
        line: lines[3],
        missing: '}}>}>))))',
      });
      expect(getCompletionScoreOf(interpretation)).toBe(1480781);
    }
  );

  test(
    'Completion of ' + lines[6] + ' should be ]]}}]}]}> with a score of 995444',
    () => {
      const interpretation = interpretBracketsSyntax(lines[6]);
      expect(interpretation).toEqual({
        valid: false,
        line: lines[6],
        missing: ']]}}]}]}>',
      });
      expect(getCompletionScoreOf(interpretation)).toBe(995444);
    }
  );

  test(
    'Completion of ' + lines[9] + ' should be ])}> with a score of 294',
    () => {
      const interpretation = interpretBracketsSyntax(lines[9]);
      expect(interpretation).toEqual({
        valid: false,
        line: lines[9],
        missing: '])}>',
      });
      expect(getCompletionScoreOf(interpretation)).toBe(294);
    }
  );

  test('Score for syntax errors of example data should be 26397', () => {
    expect(getBadSyntaxScoreOfLines(lines)).toBe(26397);
  });
});
