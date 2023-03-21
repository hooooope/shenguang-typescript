// any与任何类型的交叉类型都是any
type IsAny<T> = "epoh" extends T & "hope" ? true : false;
type IsAnyResult1 = IsAny<any>;
type IsAnyResult2 = IsAny<string>;

// any的特性导致错误的Equal判断
type IsEqualWrong<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);
type IsEqualResultWrong1 = IsEqualWrong<string, string>;
type IsEqualResultWrong2 = IsEqualWrong<any, string>;

// TODO
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;
type IsEqualResult1 = IsEqual<string, string>;
type IsEqualResult2 = IsEqual<any, any>;
type IsEqualResult3 = IsEqual<any, string>;

// 分布式条件类型
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;
type IsUnionResult1 = IsUnion<"a" | "b" | "c">;
type IsUnionResult2 = IsUnion<["a" | "b" | "c"]>;

// 若条件类型左侧的操作数为never，则直接返回never
type IsNever<T> = [T] extends [never] ? true : false;
type IsNeverResult = IsNever<never>;

// 若条件类型左侧的操作数为any，则返回条件类型的trueType | falseType
type AnyCondition<T> = T extends number ? 1 : 2;
type AnyConditionResult = AnyCondition<any>;

// tuple的length属性为数字字面量类型，array的length属性为number类型
type NotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? false
  : true;
type IsTuple<T> = T extends [...infer Els]
  ? NotEqual<Els["length"], number>
  : false;
type IsTupleResult1 = IsTuple<[number, string]>;
type IsTupleResult2 = IsTuple<number[]>;

// 父子关系之中，更具体的类型属于子类型，A&b为A|B的子类型
// 允许子类型赋值给父类型就叫协变
// 允许父类型赋值给子类型就叫逆变
// TypeScript中函数的函数属于逆变性质
type Union2Intersection<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;
type Union2IntersectionResult = Union2Intersection<
  { name: string } | { age: number }
>;

// 可选索引的值为undefined类型和值类型的联合类型
type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};
type GetOptionalResult = GetOptional<{
  name: string;
  age?: number;
}>;

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};
type GetRequiredResult = GetRequired<{
  name: string;
  age?: number;
}>;

// 索引签名不能构成字符串字面量类型，因为它没有名字，而其他索引可以
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};
type RemoveIndexSignatureResult = RemoveIndexSignature<{
  [index: string]: any;
  name: string;
}>;

// keyof只能获取class的public索引，无法获取protected和private的索引
type ClassPublicProps<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};
class Hope {
  public name: string;
  protected age: number;
  private gender: boolean;
}
type ClassPublicPropsResult = ClassPublicProps<Hope>;

// as const推导出来的类型带有readonly修饰符，通过模式匹配提取类型时也要加上readonly修饰符
const arr = [1, 2, 3] as const;
type ReverseArrWrong<Arr> = Arr extends [infer First, ...infer Rest]
  ? [...ReverseArrWrong<Rest>, First]
  : Arr;
type ReverseArrWrongResult = ReverseArrWrong<typeof arr>;

type ReverseArr<Arr> = Arr extends readonly [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : Arr;
type ReverseArrResult = ReverseArr<typeof arr>;

export {};
