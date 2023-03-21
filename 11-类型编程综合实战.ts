import { type } from "os";

// 'a' | 'b' -> 'a' & 'b'
type UnionToIntersection<U> = (
  U extends U ? (arg: U) => unknown : never
) extends (arg: infer R) => unknown
  ? R
  : never;
// 'a' | 'b' -> () => 'a' & () => 'b'
type UnionToFuncIntersection<T> = UnionToIntersection<
  T extends T ? () => T : never
>;
// 'a' | 'b' -> ['a', 'b']
type UnionToTuple<T> = UnionToFuncIntersection<T> extends () => infer Return
  ? [...UnionToTuple<Exclude<T, Return>>, Return]
  : [];
type UnionToTupleResult = UnionToTuple<"a" | "b" | "c">;

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>;
type JoinType<
  Items extends unknown[],
  Delimiter extends string,
  Result extends string = ""
> = Items extends [infer Cur, ...infer Rest]
  ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${Cur & string}`>
  : RemoveFirstDelimiter<Result>;
type RemoveFirstDelimiter<S extends string> =
  S extends `${infer _}${infer Rest}` ? Rest : S;
const joinResult = join("-")("what", "are", "you", "talking", "about");

type DeepCamelize<Obj extends Record<string, any>> = Obj extends unknown[]
  ? CamelizeArr<Obj>
  : {
      [Key in keyof Obj as Key extends `${infer First}_${infer Rest}`
        ? `${First}${Capitalize<Rest>}`
        : Key]: DeepCamelize<Obj[Key]>;
    };
type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
  ? // @ts-ignore
    [DeepCamelize<First>, ...CamelizeArr<Rest>]
  : [];
type DeepCamelizeResult = DeepCamelize<{
  aaa_bbb: string;
  bbb_ccc: [
    {
      ccc_ddd: string;
    },
    {
      ddd_eee: string;
      eee_fff: {
        fff_ggg: string;
      };
    }
  ];
}>;

type AllKeyPath<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Key extends string
    ? Obj[Key] extends Record<string, any>
      ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
      : Key
    : never;
}[keyof Obj];
type AllKeyPathResult = AllKeyPath<{
  a: {
    b: {
      b1: string;
      b2: string;
    };
    c: {
      c1: string;
      c2: string;
    };
  };
}>;

type Defaultize<A, B> = Pick<A, Exclude<keyof A, keyof B>> &
  Partial<Pick<B, Extract<keyof A, keyof B>>> &
  Partial<Pick<B, Exclude<keyof B, keyof A>>>;
type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
type DefaultizeResult = Copy<
  Defaultize<
    {
      aaa: 111;
      bbb: 222;
    },
    {
      bbb: 222;
      ccc: 333;
    }
  >
>;
