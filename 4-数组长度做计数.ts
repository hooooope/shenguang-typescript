type BuildArr<
  Length extends number,
  El = unknown,
  Result extends unknown[] = []
> = Result["length"] extends Length
  ? Result
  : BuildArr<Length, El, [...Result, El]>;

// 数组长度实现加法
type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArr<Num1>,
  ...BuildArr<Num2>
]["length"];
type AddResult = Add<32, 25>;

// 数组长度实现减法
type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArr<Num1> extends [...BuildArr<Num2>, ...infer Rest]
  ? Rest["length"]
  : never;
type SubtractResult = Subtract<33, 12>;

// 数组长度实现乘法
type Mutiply<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num2 extends 0
  ? Result["length"]
  : Mutiply<Num1, Subtract<Num2, 1>, [...Result, ...BuildArr<Num1>]>;
type MutiplyResult = Mutiply<3, 222>;

// 数组长度实现除法
type Divide<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num1 extends 0
  ? Result["length"]
  : Divide<Subtract<Num1, Num2>, Num2, [...Result, unknown]>;
type DivideResult = Divide<30, 5>;

// 数组长度实现字符串长度
type StrLen<
  Str extends string,
  Result extends unknown[] = []
> = Str extends `${string}${infer Rest}`
  ? StrLen<Rest, [...Result, unknown]>
  : Result["length"];
type StrLenResult = StrLen<"hello world">;

// 数组长度实现大于运算符
type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num1 extends Num2
  ? false
  : Result["length"] extends Num2
  ? true
  : Result["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...Result, unknown]>;
type GreaterThanResult1 = GreaterThan<3, 4>;
type GreaterThanResult2 = GreaterThan<6, 4>;

// 数组长度实现斐波那契数列
/* 
  let pre = 1;
  let cur = 0;
  let idx = 0;
  let n = 1;
  
  pre = cur;
  cur = pre + cur;
  idx = idx + 1;

  pre = 0;
  cur = 1;
  idx = 1;

  pre = 1;
  cur = 1;
  idx = 2;

  pre = 1;
  cur = 2;
  idx = 3;

  pre = 3;
  cur = 3;
  idx = 4;
*/
type FibonacciLoop<
  PreArr extends unknown[],
  CurArr extends unknown[],
  IdxArr extends unknown[],
  Num extends number = 1
> = IdxArr["length"] extends Num
  ? CurArr["length"]
  : FibonacciLoop<CurArr, [...PreArr, ...CurArr], [...IdxArr, unknown], Num>;
type Fibonacci<Num extends number> = FibonacciLoop<[unknown], [], [], Num>;
// 1 1 2 3 5 8 13 21 34 ...
type FibonacciResult1 = Fibonacci<1>;
type FibonacciResult2 = Fibonacci<2>;
type FibonacciResult3 = Fibonacci<3>;
type FibonacciResult4 = Fibonacci<4>;
type FibonacciResult5 = Fibonacci<5>;
type FibonacciResult6 = Fibonacci<6>;
type FibonacciResult7 = Fibonacci<7>;
type FibonacciResult8 = Fibonacci<8>;
type FibonacciResult9 = Fibonacci<9>;

export {};
