type ParseQueryString<S extends string> =
  S extends `${infer Param}&${infer Rest}`
    ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
    : ParseParam<S>;

type ParseParam<S extends string> = S extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : Record<string, any>;

type MergeParams<
  OneParam extends Record<string, any>,
  OtherParam extends Record<string, any>
> = {
  [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

type MergeValues<OneValue, OtherValue> = OneValue extends OtherValue
  ? OneValue
  : OtherValue extends unknown[]
  ? [OneValue, ...OtherValue]
  : [OneValue, OtherValue];

function parseQueryString<S extends string>(s: S): ParseQueryString<S>;
function parseQueryString(s: string) {
  if (!s || !s.length) {
    return {};
  }
  const ret = {};
  const pairs = s.split("&");
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (ret[key]) {
      if (Array.isArray(ret[key])) {
        ret[key].push(value);
      } else {
        ret[key] = [ret[key], value];
      }
    } else {
      ret[key] = value;
    }
  }
  return ret;
}

// string类型
// let s = "name=hope&age=18&hobbies=coding&hobbies=running";
// const parseQueryStringResult = parseQueryString(s);
// 字符串字面量类型
const s = "name=hope&age=18&hobbies=coding&hobbies=running";
const parseQueryStringResult = parseQueryString(s);

interface PromiseConstructor {
  all<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{
    -readonly [K in keyof T]: Awaited<T[K]>;
  }>;
  race<T extends readonly unknown[] | []>(
    values: T
  ): Promise<Awaited<T[number]>>;
}

const allResult = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);

const raceResult = Promise.race([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]);

declare function curry<F>(
  fn: F
): F extends (...args: infer Params) => infer Return
  ? CurriedFn<Params, Return>
  : never;

type CurriedFn<Params, Return> = Params extends [infer Arg, ...infer Rest]
  ? (arg: Arg) => CurriedFn<Rest, Return>
  : Return;

const fn = (a: string, b: number, c: boolean) => {};
const curryResult = curry(fn);
