export type PElement =
  | 'B'
  | 'C'
  | 'C'
  | 'F'
  | 'H'
  | 'K'
  | 'N'
  | 'O'
  | 'P'
  | 'S'
  | 'V';
export type PRules = { [x: string]: PElement };
export type PSequence = { [x: string]: number };

export function input2PolymerProcess(str: string): {
  template: PSequence;
  rules: PRules;
  derivedFrom: string;
} {
  const [tpl, r] = str.split(/\n\n/);
  const rules: PRules = {};
  r.split(/\n/)
    .map((e) => e.split(' -> '))
    .forEach((e) => (rules[e[0]] = e[1] as PElement));
  const template: PSequence = {};
  for (let i = 0; i < tpl.length - 1; i++) {
    const sequence = tpl.substring(i, i + 2);
    template[sequence] ? (template[sequence] += 1) : (template[sequence] = 1);
  }
  return {
    template,
    rules,
    derivedFrom: tpl,
  };
}

export function iteratePolymerTemplate(
  template: PSequence,
  rules: PRules
): PSequence {
  const tpl: PSequence = {};
  Object.entries(template).forEach(([sequence, count]) => {
    // NN, 3
    let [first, second] = sequence.split('');
    first += rules[sequence];
    second = rules[sequence] + second;
    [first, second].forEach((e) => {
      tpl[e] = tpl[e] === undefined ? (tpl[e] = count) : (tpl[e] += count);
    });
  });
  return tpl;
}

export function iteratePolymerTemplateNoOfTimes(
  no: number,
  template: PSequence,
  rules: PRules
): PSequence {
  let templateIterated = template;
  for (let i = 1; i <= no; i++) {
    templateIterated = iteratePolymerTemplate(templateIterated, rules);
  }
  return templateIterated;
}

export function calculateResult(template: PSequence, last: PElement): number {
  const countMap: { [x: string]: number } = {};
  const sequences = Object.entries(template);
  sequences.forEach(([sequence, count]) => {
    const e = sequence.split('')[0];
    countMap[e] !== undefined ? (countMap[e] += count) : (countMap[e] = count);
  });
  countMap[last] !== undefined ? (countMap[last] += 1) : (countMap[last] = 1);
  const sorted = Object.entries(countMap).sort(([, av], [, bv]) => av - bv);
  return sorted[sorted.length - 1][1] - sorted[0][1];
}
