type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ParametersResult = Parameters<(name: string, age: number) => {}>;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;
type ReturnTypeResult = ReturnType<() => "hope">;

type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
interface Person {
  name: string;
  age: number;
}
interface PersonConstructor {
  new (name: string): Person;
}
type ConstructorParametersResult = ConstructorParameters<PersonConstructor>;

type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;
type InstanceTypeResult = InstanceType<PersonConstructor>;

type ThisParameterType<T> = T extends (this: infer U, ...args: any) => any
  ? U
  : never;
type Foo = (this: Person, name: string) => any;
type ThisParameterTypeResult = ThisParameterType<Foo>;

type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
type OmitThisParameterResult = OmitThisParameter<Foo>;

type Partial<T> = {
  [P in keyof T]?: T[P];
};
type PartialResult = Partial<{
  name: string;
  age: number;
}>;

type Required<T> = {
  [P in keyof T]-?: T[P];
};
type RequiredResult = Required<{
  name?: string;
  age?: number;
}>;

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyResult = Readonly<{
  name: string;
  age: number;
}>;

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type PickResult = Pick<
  {
    name: string;
    age: number;
    gnder: boolean;
  },
  "name" | "age"
>;

// keyof any = string | number | symbol
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type RecordResult = Record<"a" | "b", number>;

type Exclude<T, U> = T extends U ? never : T;
type ExcludeResult = Exclude<"a" | "b" | "c", "b">;

type Extract<T, U> = T extends U ? T : never;
type ExtractResult = Extract<"a" | "b" | "c", "a" | "c">;

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type OmitResult = Omit<
  {
    name: string;
    age: number;
  },
  "name"
>;

type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T;
type AwaitedResult = Awaited<Promise<Promise<number>>>;

type DeepPromiseValue<T> = T extends Promise<infer V> ? DeepPromiseValue<V> : T;
type DeepPromiseValueResult = DeepPromiseValue<Promise<Promise<number>>>;

type NonNullable<T> = T extends null | undefined ? never : T;
type NonNullableResult1 = NonNullable<null>;
type NonNullableResult2 = NonNullable<{ name: string }>;

type Uppercase<S extends string> = intrinsic;
type UppercaseResult = Uppercase<"hope">;

type Lowercase<S extends string> = intrinsic;
type LowercaseResult = Lowercase<"HOPE">;

type Capitalize<S extends string> = intrinsic;
type CapitalizeResult = Capitalize<"hope">;

type Uncapitalize<S extends string> = intrinsic;
type UncapitalizeResult = Uncapitalize<"Hope">;

export {};
