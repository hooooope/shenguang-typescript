type KebabCaseToCamelCase<S extends string> =
  S extends `${infer Item}-${infer Rest}`
    ? `${Item}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : S;
type KebabCaseToCamelCaseResult =
  KebabCaseToCamelCase<"what-are-you-talking-about">;

type CamelCaseToKebabCase<S extends string> =
  S extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}`
      : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : S;
type CamelCaseToKebabCaseResult =
  CamelCaseToKebabCase<"whatAreYouTalkingAbout">;

type Chunk<
  Arr extends unknown[],
  ItemLen extends number,
  CurItem extends unknown[] = [],
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? CurItem["length"] extends ItemLen
    ? Chunk<Rest, ItemLen, [First], [...Result, CurItem]>
    : Chunk<Rest, ItemLen, [...CurItem, First], Result>
  : [...Result, CurItem];
type ChunkResult = Chunk<[1, 2, 3, 4, 5], 2>;

type TupleToNestedObject<Tuple extends unknown[], Value> = Tuple extends [
  infer First,
  ...infer Rest
]
  ? {
      [Key in First as Key extends keyof any
        ? Key
        : never]: TupleToNestedObject<Rest, Value>;
    }
  : Value;
type TupleToNestedObjectResult1 = TupleToNestedObject<["a", "b", "c"], "hello">;
type TupleToNestedObjectResult2 = TupleToNestedObject<
  ["a", undefined, "c"],
  "hello"
>;

type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
type PartialObjectPropByKeys<
  Obj extends Record<string, any>,
  Key extends keyof any
> = Copy<Partial<Pick<Obj, Extract<keyof Obj, Key>>> & Omit<Obj, Key>>;
type PartialObjectPropByKeysResult = PartialObjectPropByKeys<
  {
    name: "hope";
    age: 18;
    gender: true;
  },
  "age" | "gender"
>;
