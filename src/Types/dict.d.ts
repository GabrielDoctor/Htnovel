export interface DictEntry {
  word: string;
  pinyin: string;
  phonetic: string;
  compound: string | null;
  kind: string;
  measure: Measure;
  snym: Snym;
  content: Content[];
  topics: Topic[];
  cn_vi: string | null;
  examples: Example[];
}

export interface Example {
  id: string;
  e: string;
  m: string;
  p: string;
}

export interface Measure {
  measure: string;
  pinyin: string;
  example: string;
}

export interface Snym {
  anto: (string | null)[];
  syno: (string | null)[];
}

export interface Content {
  kind: string;
  means: Mean[];
}

export interface Mean {
  mean: string;
  explain: string;
  examples: number[];
}

export interface Topic {
  id: string;
  name: string;
}
