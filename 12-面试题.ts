type Zip<One extends unknown[], Another extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Another extends [infer AnotherFirst, ...infer AnotherRest]
    ? [[OneFirst, AnotherFirst], ...Zip<OneRest, AnotherRest>]
    : []
  : [];

type Mutable<Obj> = {
  -readonly [Key in keyof Obj]: Obj[Key];
};

function zip(target: unknown[], source: unknown[]): unknown[];

function zip<
  Target extends readonly unknown[],
  Source extends readonly unknown[]
>(target: Target, source: Source): Zip<Mutable<Target>, Mutable<Source>>;

function zip(target: unknown[], source: unknown[]): unknown[] {
  if (!target.length || !source.length) {
    return [];
  }
  const [one, ...rest1] = target;
  const [another, ...rest2] = source;
  return [[one, another], ...zip(rest1, rest2)];
}

const zipResult1 = zip([1, 2, 3] as const, [4, 5, 6] as const);
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const zipResult2 = zip(arr1, arr2);
