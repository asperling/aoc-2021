export interface RowOrColEntry {
  matched: boolean;
  number: number;
}

export interface Board {
  raw: string;
  list: Array<RowOrColEntry>;
  rows: Array<RowOrColEntry[]>;
  cols: Array<RowOrColEntry[]>;
  winner?: boolean;
}
