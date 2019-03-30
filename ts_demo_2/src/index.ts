
// 布尔值
let isDone: boolean = false

// 数字
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

// 字符串
let aname: string = "bob"
aname = "smith"

let cname: string = `Gene`
let age: number = 37
let sentence: string = `Hello, my name is ${cname}.
I'll be ${age+1} years old next month.`

console.log(sentence)

// 数组
let list: number[] = [1, 2, 3]
console.log(list)
let list2: Array<number> = [1, 2, 3]
console.log(list2)

// 元祖 Tuple
let x: [string, number]
x = ['hello', 10]
// x = [10, 'hello'] 错误示范

console.log(x[0].substr(1))
console.log(x[1].toString().substr(1))
// x[3] = 'world' // 编译器会报错，不过可正常变异
// console.log(x[3])

// 枚举
enum Color { Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green
console.log(c)  // 2
console.log(Color[1]) // Red
console.log(Color[0]) // undefined


// Any
let notSure: any = 4
notSure = "hello world"
console.log(notSure)
notSure = false
console.log(notSure)

let list3: any[] = [1, true, 'free']
list3[1] = 100
console.log(list3)    //[1, 100, "free"]


// Void
function warnUser(): void {
  console.log("This is my warning message")
}

// Null 和 Undefined
// undefined和null两者各自有自己的类型分别叫做undefined和null
let u: undefined = undefined
let n: null = null


// Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
// 推断的返回值类型为never
function fail() {
  return error("Something failed")
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// Object
// declare function create(o: object | null): void;

// create({ prop: 0 }) // OK
// create(null)  // OK
// create(false)  // Error


// 类型断言
let someValue: any = "this is a string"
console.log(someValue)
let strLength: number = (<string>someValue).length
console.log(strLength)
