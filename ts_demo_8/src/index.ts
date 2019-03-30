// 类型推论
// TypeScript里的类型推论。即，类型是在哪里如何被推断的。

let x = 3  // 变量x的类型被推断为数字


// 最佳通用类型
// 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，
let y = [0, 1, null]
// 为了推断 y 的类型，我们必须考虑所有元素的类型。 这里有两种选择： number和null


class Animal {
  constructor() {}
}
class Rhino extends Animal { }
class Elephant extends Animal {}
class Snake extends Animal {}

// 由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型。例如：
let zoo = [new Rhino(), new Elephant(), new Snake()]
// 这里，我们想让zoo被推断为Animal[]类型
let zoo2: Animal[] = [new Rhino(), new Elephant(), new Snake()]
// 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]


// 上下文类型
// TypeScript类型推论也可能按照相反的方向进行。 这被叫做“按上下文归类”
// 按上下文归类会发生在表达式的类型与所处的位置相关时。比如：
window.onmousedown = function (mouseEvent) {
  // console.log(mouseEvent.button) //<- Error
}
// 这个函数表达式有明确的参数类型注解，上下文类型被忽略。
// 这样的话就不报错了，因为这里不会使用到上下文类型。
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Now, no error is given
};

// 上下文归类会在很多情况下使用到
// 通常包含函数的参数，赋值表达式的右边，类型断言，对象成员和数组字面量和返回值语句。 
// 上下文类型也会做为最佳通用类型的候选类型。比如：
function createZoo(): Animal[] {
  return [new Rhino(), new Elephant(), new Snake()];
}
// 最佳通用类型有4个候选者：Animal，Rhino，Elephant和Snake。 
// 当然， Animal会被做为最佳通用类型。