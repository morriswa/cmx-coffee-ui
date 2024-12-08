

export type YesNo = 'y' | 'n';

export function yn(cond: boolean): YesNo {
  return cond? 'y' : 'n';
}
