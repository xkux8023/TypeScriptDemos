// 枚举 使用枚举我们可以定义一些带名字的常量
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
// 此时：Direction.Up的值为 1， Down为 2， Left为 3， Right为 4。

enum Directio2 {
  Up,
  Down,
  Left,
  Right
}
// Directio2.Up的值为 0， Down为 1， Left为 2， Right为 3。
// 使用枚举很简单：通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型：


enum Response2 {
  No = 0,
  Yes = 1,
}
function respond(recipient: string, message: Response2): void {
  console.log(`${recipient} ${message}`)
}
respond('Princess Caroline', Response2.Yes)


// 字符串枚举
//  在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化
enum Direction {
  DUp = "DUP",
  DDown = "DDOWN",
  DLeft = "DLEFT",
  DRight = "DRIGHT",
}

// 计算的和常量成员
// 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。
// 当满足如下条件时，枚举成员被当作是常量：


// 它是枚举的第一个成员且没有初始化器，这种情况下它被赋予值 0：
// E.X is constant:
enum E { X }

// 它不带有初始化器且它之前的枚举成员是一个 数字常量。
// 这种情况下，当前枚举成员的值为它上一个枚举成员的值加1。
enum E1 { X, Y, Z }

enum E2 {
  A = 1, B, C
}

// 运行时的枚举
function f(obj: { X: number }) {
  return obj.X;
}
f(E1) // Works, since 'E' has a property named 'X' which is a number.

// 反向映射
// 除了创建一个以属性名做为对象成员的对象之外，数字枚举成员还具有了 反向映射，从枚举值到枚举名字
// 要注意的是 不会为字符串枚举成员生成反向映射。
enum Enum3 {
  A
}
let a = Enum3.A
let nameOfA = Enum3[a]
console.log(nameOfA) // "A"

// const枚举
// 常量枚举不允许包含计算成员。
const enum Enum {
  A = 1,
  B = A * 2
}

const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]
console.log(directions) // [0, 1, 2, 3]


// 外部枚举 外部枚举用来描述已经存在的枚举类型的形状。
declare enum Enum4 {
  A = 1,
  B,
  C = 2
}