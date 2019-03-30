// 接口


function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: "Size 10 Object"}
printLabel(myObj)


// 使用接口来描述上面的栗子
interface LableValue {
  label: string
}

function printLabel2(labelledObj: LableValue) {
  console.log(labelledObj.label)
}
let myObj2= { size: 20, label: "Size 20 Object" }
printLabel(myObj2)



// 可选属性
interface SquareConfig {
  color?: string
  width?: number
}

function createSquare(config: SquareConfig): {color: string; area: number } {
  let newSquare = {color: "white", area: 100}
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  console.log(newSquare)  // {color: "black", area: 100}
  return newSquare
}

let mySquare = createSquare({color: "black"})


// 只读属性
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20}
// p1.x = 5 //Cannot assign to 'x' because it is a read-only property.

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!


// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}
console.log(mySearch("Hello", "He"))


// 可索引的类型
interface StringArray {
  [index: number]: string
}

let myArray: StringArray
myArray = ["Bob", "Fred"]
let myStr: string = myArray[0]
console.log(myStr)


// 将索引签名设置为只读,防止了给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myyArray: ReadonlyStringArray = ["Alice", "Bob"]
// myyArray[2] = "Mallory" // error! 因为索引签名是只读的

// 类类型
// 实现接口
interface ClockInterface {
  currentTime: Date
}
class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {
    
  }
}

// 在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样
interface ClockInt {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clo implements ClockInt {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}


// 类静态部分与实例部分的区别
interface ClockConstructor {
  new (hour: number, minute: number): Ckinterface
}

interface Ckinterface {
  tick(): void
}

function crateClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): Ckinterface {
  return new ctor(hour, minute)
}

class DigitalClock implements Ckinterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}
class AnalogClock implements Ckinterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock')
  }
}

let digital = crateClock(DigitalClock, 12, 17)
let analog = crateClock(AnalogClock, 2, 7)

console.log(digital.tick())
console.log(analog.tick())


// 接口继承
interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10
square.penWidth = 5.0
console.log(square)


// 混合类型
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0


// 接口继承类
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}
class Button extends Control implements SelectableControl {
  select() { }
}
class TextBox extends Control {
  select() { }
}
