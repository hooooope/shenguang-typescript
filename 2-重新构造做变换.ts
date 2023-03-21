// 在数组中push新类型
type Push<Arr extends unknown[], El> = [...Arr, El];
type PushResult = Push<[1, 2, 3], 4>;

// 在数组中unshift新类型
type Unshift<Arr extends unknown[], El> = [El, ...Arr];
type UnshiftResult = Unshift<[1, 2, 3], 0>;

// 合并拥有两个元素的两个数组[a,b],[c,d] => [[a,c],[b,d]]
type Zip<
  One extends [unknown, unknown],
  Other extends [unknown, unknown]
> = One extends [infer OneFirst, infer OneSecond]
  ? Other extends [infer OtherFirst, infer OtherSecond]
    ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
    : []
  : [];
type ZipResult = Zip<[1, 2], [3, 4]>;

// 合并拥有任意个元素的两个数组
type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]
    : []
  : [];
type Zip2Result = Zip2<[1, 2, 3, 4], ["h", "o", "p", "e"]>;

// 将字符串首字母转化为大写
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;
type CapitalizeStrResult = CapitalizeStr<"hope">;

// 将下划线分隔的字符串转化为小驼峰
type CamelCase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;
type CamelCaseResult = CamelCase<"not_too_late">;

// 删除字符串中的子串
type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? DropSubStr<`${Prefix}${Suffix}`, SubStr>
  : Str;
type DropSubStrResult = DropSubStr<"~~~hope~~~", "~">;

// 在函数中添加新参数
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;
type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>;

// 索引类型的值重映射
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};
type MappingResult = Mapping<{ a: 1; b: 2 }>;

// 索引类型的键重映射
type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};
type UppercaseKeyResult = UppercaseKey<{
  name: "hope";
  age: 18;
}>;

// 创建索引类型
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T;
};
type MyRecordResult = MyRecord<string, any>;

// 只读映射
type MyReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type MyReadonlyResult = MyReadonly<{
  name: string;
  age: number;
}>;

// 可选映射
type MyPartial<T> = {
  [Key in keyof T]?: T[Key];
};
type MyPartialResult = MyPartial<{
  name: string;
  age: number;
}>;

// 取消只读映射
type MyMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};
type MyMutableResult = MyMutable<{
  readonly name: string;
  readonly age: number;
}>;

// 取消可选映射
type MyRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
type MyRequiredResult = MyRequired<{
  name?: string;
  age?: number;
}>;

// 基于值的过滤映射
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};
type FilterByValueTypeResult = FilterByValueType<
  {
    name: string;
    age: number;
  },
  string
>;
