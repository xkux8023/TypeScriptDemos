// 泛型

// 使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据
function indentity<T>(arg: T): T {
  return arg
}

// 第一种是，传入所有的参数，包含类型参数：
let output = indentity<string>("myString")
console.log(typeof output)  // string

// 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output2 = indentity('myString')
console.log(typeof output) // string

// 使用泛型变量

// 如果我们想同时打印出arg的长度。 我们很可能会这样做
function logginIdentity<T>(arg: T): T {
  // console.log(arg.length) // Error: 类型 T 不存在属性『length』
  return arg
}
// 此时应该操作 T 类型的数组
function logginIdentity2<T>(arg: T[]): T[] {
  console.log(arg.length) // 此时则正常了
  return arg
}

// 还有下面这种写法：
function logginIdentity3<T>(arg: Array<T>): Array<T> {
  console.log(arg.length) // 此时则正常了
  return arg
}


// 泛型接口
interface GenericIndentityFn {
  <T>(arg: T): T
}
function identity4<T>(arg: T): T {
  return arg
}
let myIdentity: GenericIndentityFn = identity4


// 把泛型参数当作整个接口的一个参数
// 这样我们就能清楚的知道使用的具体是哪个泛型类型
// 比如： Dictionary<string>而不只是Dictionary
// 改版写法如下：
interface GenericIndentityFn2<T> {
  (arg: T): T
}
function identity5<T>(arg: T): T {
  return arg
}
let myIdentity5: GenericIndentityFn2<number> = identity5


// 泛型类
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。
// 类有两部分：静态部分和实例部分
// 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型

class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) {
  return x + y
}

let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = "0"
stringNumeric.add = function (x, y) {
  return x + y
}
console.log(stringNumeric.add(stringNumeric.zeroValue, 'test'))


// 泛型约束
// 定义一个接口来描述约束条件
// 使用这个接口和extends关键字来实现约束：如下：

interface Lengthwise {
  length: number
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}
// 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
// loggingIdentity(3) // Error, number doesn't have a .length property
// 我们需要传入符合约束类型的值，必须包含必须的属性：
loggingIdentity({ length: 10, value: 3 })


// 在泛型约束中使用类型参数
// 你可以声明一个类型参数，且它被另一个类型参数所约束
// 比如，现在我们想要用属性名从对象里获取这个属性
// 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束。
// function getProperty(obj: T, key: K) {
//   return obj[key]
// }
// let x = { a: 1, b: 2, c: 3, d: 4 }
// getProperty(x, "a"); // okay
// getProperty(x, "m") // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.



// 在泛型里使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: { new(): T; }): T {
  return new c()
}
class Student {
  constructor() {
    console.log("student")
  }
}

let student = create<Student>(Student)


// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
class BeeKeeper {
  hasMask: boolean
  constructor(hasMask: boolean) {
    this.hasMask = hasMask
  }
}

class ZooKeeper {
  nametag: string
  constructor(nametag: string) {
    this.nametag = nametag
  }
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper
  constructor() {
    super()
    this.keeper = new BeeKeeper(true)
  }
}

class Lion extends Animal {
  keeper: ZooKeeper
  constructor() {
    super()
    this.keeper = new ZooKeeper("avc")
  }
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!