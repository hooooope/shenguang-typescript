// 分布式条件类型
// 将联合类型中的a转化为大写
type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;
type UppercaseAResult = UppercaseA<"a" | "b" | "c">;

// 下划线分隔字符串转化为小驼峰字符串
type Camelcase<Str extends string> =
  Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;
type CamelcaseResult = Camelcase<"aa_aa_aa">;

// 下划线分隔字符串数组转化为小驼峰字符串数组
type CamelcaseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [Camelcase<First & string>, ...CamelcaseArr<Rest>]
  : [];
type CamelcaseArrResult = CamelcaseArr<["aa_aa_aa", "bb_bb_bb", "cc_cc_cc"]>;

// 下划线分隔字符串联合类型转化为小驼峰字符串联合类型
type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;
type CamelcaseUnionResult = CamelcaseUnion<
  "aa_aa_aa" | "bb_bb_bb" | "cc_cc_cc"
>;

// 条件类型中如果左侧的类型是联合类型，会把每个元素单独传入做计算
type TestUnion<A, B = A> = A extends A ? { a: A; b: B } : never;
type TestUnionResult = TestUnion<"a" | "b" | "c">;

// 判断联合类型
// A extends A是为了触发分布式条件类型
// [B] extends [A]是为了防止触发分布式条件类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult1 = IsUnion<"a" | "b" | "c">;
type IsUnionResult2 = IsUnion<["a" | "b" | "c"]>;

// 数组转联合类型
// [number]按数字索引从数组中取值
type union = ["aaa", "bbb"][number];

// BEM
// BEM是CSS的命名规范，用block_element--modifier的形式来描述某个区块下面的某个元素的某个状态的样式
type BEM<
  Block extends string,
  Element extends string[],
  Modifier extends string[]
> = `${Block}_${Element[number]}--${Modifier[number]}`;
type BEMReslut = BEM<"hope", ["aaa", "bbb"], ["warning", "success"]>;

// 两个字符串的全组合
type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;
type CombinationResult = Combination<"a", "b">;

// 联合类型的全组合
type AllCombination<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombination<Exclude<B, A>>>
  : never;
type AllCombinationResult = AllCombination<"A" | "B">;
