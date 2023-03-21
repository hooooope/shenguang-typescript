// 提取嵌套Promise的值类型
type DeepPromiseValueType1<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType1<ValueType>
    : ValueType
  : never;
type DeepPromiseValueTypeResult1 = DeepPromiseValueType1<
  Promise<Promise<Promise<Record<string, any>>>>
>;

// 简化
type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;
type DeepPromiseValueTypeResult2 = DeepPromiseValueType2<
  Promise<Promise<Promise<number>>>
>;

// 数组反转
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : Arr;
type ReverseArrResult = ReverseArr<[1, 2, 3]>;

// 数组查找元素
type IncludeItem<Arr extends unknown[], Item> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, Item> extends true
    ? true
    : IncludeItem<Rest, Item>
  : false;
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type IncludeArrResult1 = IncludeItem<[1, 2, 3], 2>;
type IncludeArrResult2 = IncludeItem<[1, 2, 3], 4>;

// 数组删除元素
type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;
type RemoveItemResult = RemoveItem<[1, 2, 2, 3], 2>;

// 数组构造
type BuildArr<
  Length extends number,
  El = unknown,
  Result extends unknown[] = []
> = Result["length"] extends Length
  ? Result
  : BuildArr<Length, El, [...Result, El]>;
type BuildArrResult = BuildArr<5, number>;

// 字符串替换
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${ReplaceAll<Suffix, From, To>}`
  : Str;
type ReplaceAllResult = ReplaceAll<"hope hope hope", "hope", "epoh">;

// 字符串分隔成联合类型
type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;
type StringToUnionResult = StringToUnion<"hope">;

// 字符串反转
type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str;
type ReverseStrResult = ReverseStr<"hope">;

// 索引类型深层只读
type DeepReadonly1<Obj extends Record<string, any>> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? Obj[Key] extends Function
      ? Obj[Key]
      : DeepReadonly1<Obj[Key]>
    : Obj[Key];
};
type DeepReadonlyResult1 = DeepReadonly1<{
  a: {
    b: {
      c: {
        d: {
          e: {
            name: string;
          };
        };
        f: () => string;
      };
    };
  };
}>;

type DeepReadonly2<Obj extends Record<string, any>> = Obj extends any
  ? {
      readonly [Key in keyof Obj]: Obj[Key] extends object
        ? Obj[Key] extends Function
          ? Obj[Key]
          : DeepReadonly2<Obj[Key]>
        : Obj[Key];
    }
  : never;
type DeepReadonlyResult2 = DeepReadonly2<{
  a: {
    b: {
      c: {
        d: {
          e: {
            name: string;
          };
        };
        f: () => string;
      };
    };
  };
}>;

export {};
