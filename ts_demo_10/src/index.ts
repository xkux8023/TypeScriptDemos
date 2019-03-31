// 高级类型
// 交叉类型（Intersection Types） 交叉类型是将多个类型合并为一个类型
//  例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable

// 下面是如何创建混入（mixins）的一个简单例子：
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>first)[id]
    }
  }
  return result
}

class Person {
  constructor(public name: string) {}
}
interface Loggable { log(): void }
class ConsoleLogger implements Loggable {
  log() {}
}
var jim = extend(new Person("Jim"), new ConsoleLogger())
var n = jim.name
console.log(jim)
// jim.log()


// 联合类型（Union Types）
function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
padLeft("Hello world", 4) // returns "    Hello world"

// 代替 any， 我们可以使用 联合类型做为 padding的参数：
function padLeft2(value: string, padding: string | number) { }

// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
function getSmallPet(): Fish | Bird {
  return /* ... */;
}
let pet = getSmallPet()
// pet.layEggs(); // okay
// pet.swim();    // errors 类型“Bird | Fish”上不存在属性“swim”


// 类型保护与区分类型（Type Guards and Differentiating Types）
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined
}

// typeof类型保护
// 使用联合类型书写 padLeft代码
function isNumber(x: any): x is number {
  return typeof x === "number"
}
function isString(x: any): x is string {
  return typeof x === 'string'
}
function padLeft3(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}


// instanceof类型保护
// instanceof类型保护是通过构造函数来细化类型的一种方式。 比如，我们借鉴一下之前字符串填充的例子：
interface Padder {
  getPaddingString(): string
}
class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ")
  }
}
class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value
  }
}
function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}
// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}
/*
* instanceof的右侧要求是一个构造函数，TypeScript将细化为：
*   1.此构造函数的 prototype属性的类型，如果它的类型不为 any的话
*   2.构造签名所返回的类型的联合
*/



// 可以为null的类型
let s = "foo";
s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'

// 可选参数和可选属性
// 使用了 --strictNullChecks，可选参数会被自动地加上 | undefined:
function f(x: number, y?: number) {
  return x + (y || 0);
}
f(1, 2);
f(1);
f(1, undefined);
f(1, null); // error, 'null' is not assignable to 'number | undefined'


// 可选属性也会有同样的处理：
class C {
  a: number;
  b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'


// 类型保护和类型断言
// 由于可以为null的类型是通过联合类型实现，那么你需要使用类型保护来去除 null
function f2(sn: string | null): string {
  if (sn == null) {
    return "default";
  }
  else {
    return sn;
  }
}

// 这里很明显地去除了 null，你也可以使用短路运算符：
function f3(sn: string | null): string {
  return sn || "default";
}

// 如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除
// 语法是添加 !后缀： identifier!从 identifier的类型里去除了 null和 undefined：
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // error, 'name' is possibly null
  }
  name = name || 'Bob'
  return postfix("great")
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet // ok
  }
  name = name || 'Bob'
  return postfix('great')
}
// 类型别名 类型别名会给一个类型起个新名字。
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
