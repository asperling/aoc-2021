type OpeningBracket = '(' | '{' | '[' | '<';
type ClosingBracket = ')' | '}' | ']' | '>';
type Bracket = OpeningBracket & ClosingBracket;

type Interpretation = {
  valid: boolean;
  line: string;
  missing?: string;
  expected?: ClosingBracket;
  found?: Bracket;
};

function translateOpen2Closed(bracket: OpeningBracket): ClosingBracket {
  switch (bracket) {
    case '(':
      return ')';
    case '{':
      return '}';
    case '[':
      return ']';
    case '<':
      return '>';
  }
}

export function interpretBracketsSyntax(line: string): Interpretation {
  const brackets: Array<Bracket> = [];

  for (const char of line.split('') as Array<Bracket>) {
    if ('<[({'.split('').indexOf(char) >= 0) {
      brackets.push(char);
    } else {
      const lastChar = brackets.pop() as Bracket;
      if (lastChar === undefined) {
        return {
          valid: false,
          line,
          expected: undefined,
          found: char,
        };
      }

      switch (char) {
        case ')':
          if (lastChar !== '(')
            return {
              valid: false,
              line,
              expected: translateOpen2Closed(lastChar),
              found: char,
            };
          break;

        case '}':
          if (lastChar !== '{') {
            return {
              valid: false,
              line,
              expected: translateOpen2Closed(lastChar),
              found: char,
            };
          }
          break;
        case ']':
          if (lastChar !== '[') {
            return {
              valid: false,
              line,
              expected: translateOpen2Closed(lastChar),
              found: char,
            };
          }
          break;
        case '>':
          if (lastChar !== '<') {
            return {
              valid: false,
              line,
              expected: translateOpen2Closed(lastChar),
              found: char,
            };
          }
          break;
      }
    }
  }

  if (brackets.length > 0) {
    return {
      valid: false,
      line,
      missing: brackets
        .reverse()
        .map((bracket) => translateOpen2Closed(bracket))
        .join(''),
    };
  }
  return {
    valid: true,
    line,
  };
}

export function getBadSyntaxScoreOfLines(lines: string[]): number {
  if (!lines || lines.length == 0) {
    return 0;
  }
  let sum = 0;
  lines.forEach((line) => {
    const interpretation = interpretBracketsSyntax(line);
    if (interpretation.found) {
      switch (interpretation.found) {
        case ')':
          sum = sum + 3;
          break;
        case ']':
          sum = sum + 57;
          break;
        case '}':
          sum = sum + 1197;
          break;
        case '>':
          sum = sum + 25137;
          break;
      }
    }
  });
  return sum;
}

export function getCompletionScoreOf({ missing }: Interpretation): number {
  if (!missing || missing.length === 0) {
    return 0;
  }
  let score = 0;
  missing.split('').forEach((bracket) => {
    switch (bracket) {
      case ')':
        score = score * 5 + 1;
        break;
      case ']':
        score = score * 5 + 2;
        break;
      case '}':
        score = score * 5 + 3;
        break;
      case '>':
        score = score * 5 + 4;
        break;
    }
  });
  return score;
}
