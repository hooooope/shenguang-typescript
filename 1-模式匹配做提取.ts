// get type of promise value
type GetValueType<P extends Promise<unknown>> = P extends Promise<infer Value>
  ? Value
  : never;
type GetValueResult = GetValueType<Promise<"hope">>;

// get type of first element in array
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;
type GetFirstResult1 = GetFirst<[1, 2, 3]>;
type GetFirstResult2 = GetFirst<[]>;

// get type of last element in array
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;
type GetLastResult1 = GetLast<[1, 2, 3]>;
type GetLastResult2 = GetLast<[]>;

// exclude last element, get type of rest element in array
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest, unknown]
  ? Rest
  : never;
type PopArrResult1 = PopArr<[1, 2, 3]>;
type PopArrResult2 = PopArr<[]>;

// exclude first element, get type of rest element in array
type ShiftArr<Arr extends unknown[]> = Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;
type ShiftArrResult1 = ShiftArr<[1, 2, 3]>;
type ShiftArrResult2 = ShiftArr<[]>;

// determine if str start with prefix
type StartWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;
type StratWithResult1 = StartWith<"hope", "ho">;
type StratWithResult2 = StartWith<"epoh", "ho">;

// replace "from" in "str" to "to"
type ReplaceStr<
  Str extends string,
  from extends string,
  to extends string
> = Str extends `${infer Prefix}${from}${infer Suffix}`
  ? `${Prefix}${to}${Suffix}`
  : Str;
type ReplaceStrResult1 = ReplaceStr<"hope", "o", "ooooo">;
type ReplaceStrResult2 = ReplaceStr<"hope", "b", "ooooo">;

// trim the space to the right side of the str
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;
type TrimStrRightResult = TrimStrRight<"hope     ">;

// trim the space to the left side of the str
type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;
type TrimStrLeftResult = TrimStrLeft<"     hope">;

// trim the space on either side of the str
type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>;
type TrimStrResult = TrimStr<"     hope     ">;

// get the type of the function arguments
type GetArguments<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;
type GetArgumentsResult = GetArguments<(name: string, age: number) => string>;

// get the type of the function return value
// 此处不能使用unknown，因为函数参数是逆变性质
type GetReturnValue<Func extends Function> = Func extends (
  ...args: any[]
) => infer Return
  ? Return
  : never;
type GetReturnValueResult = GetReturnValue<
  (name: string, age: number) => string
>;

// get the this type of class function
type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : never;
class Hope {
  name: string;
  constructor() {
    this.name = "hope";
  }
  hello(this: Hope) {
    return "hello, I'm" + this.name;
  }
}
const hope = new Hope();
type GetThisParameterTypeResult = GetThisParameterType<typeof hope.hello>;

// get the instance type of class constructor
type GetInstanceType<Constructor extends new (...args: any[]) => any> =
  Constructor extends new (...args: any[]) => infer InstanceType
    ? InstanceType
    : never;
interface Person {
  name: string;
}
interface PersonConstructor {
  new (name: string): Person;
}
type GetInstanceTypeResult = GetInstanceType<PersonConstructor>;

// get the arguments type of the constructor
type GetConstructorParameters<Constructor extends new (...args: any[]) => any> =
  Constructor extends new (...args: infer Args) => any ? Args : never;
type GetConstructorParametersResult =
  GetConstructorParameters<PersonConstructor>;

// get the type of ref
// 在ts3.0中，如果没有对应的索引，Obj[key]返回的是{}而不是never
// 所以这样做向下兼容处理
type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;
type GetRefPropsResult1 = GetRefProps<{ ref?: 1; name: "hope" }>;
type GetRefPropsResult2 = GetRefProps<{ ref?: undefined; name: "hope" }>;
