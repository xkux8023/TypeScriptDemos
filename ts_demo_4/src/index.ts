// 类

class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  greet() {
    let result = 'Hello, ' + this.greeting
    console.log(result)
    return result
  }
}

let greeter = new Greeter('world')
greeter.greet()



// 继承
class Animal {
  name: string
  constructor(theName: string) { this.name = theName }
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m`)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 5) {
    console.log('Slithering...')
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    console.log('Galloping...')
    super.move(distanceInMeters)
  }
}
let sam = new Snake("Sammy the Python")
let tom: Animal = new Horse('Tommy the Palomino')

sam.move()
tom.move(46)

// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 46m.

// 公共，私有与受保护的修饰符
class Animal2 {
  public name: string  //默认可见
  public constructor(theName: string) {
    this.name = theName
  }
  /**
   * move
   */
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}`)
  }
}

new Animal2("Cat").name

class Animal3 {
  private name: string //name' 是私有的
  public constructor(theName: string) {
    this.name = theName
  }
}

// new Animal3('Cat').name // 错误: 'name' 是私有的.



// 理解protected
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }
  /**
   * getName
   */
  public getName() {
    return this.name
  }
  /**
   * getElevatorPitch
   */
  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee("Howard", "Sales")
console.log(howard.getElevatorPitch())
// console.log(howard.name); // 错误
console.log(howard.getName()) // 正常
let john = new Person('John') // 正常

// 构造函数也可以被标记成 protected
class Person2 {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

// let john2 = new Person2('John2') // 错误: 'Person2' 的构造函数是被保护的.


// readonly修饰符
// 可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化

class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor(theName: string) {
    this.name = theName
  }
}

let dad = new Octopus('Man with the 8 strong legs')
// dad.name = 'Man with the 3-piece suit'  // 错误! name 是只读的.

// 参数属性，上面的栗子可以改版成如下：
class OctopusClone {
  readonly numberOfLegs: number = 8
  constructor(readonly name: string) { }
}

// 存取器 通过getters/setters来截取对对象成员的访问

let passcode = "secret passcode"
class Employeee {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }
  set fullName(newName: string) {
    if (passcode && passcode == 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update of employee!')
    }
  }
}

let employeee = new Employeee()
employeee.fullName = 'Bob Smith'
if (employeee.fullName) {
  console.log(employeee.fullName)
}


// 静态属性
class Grid {
  static origin = { x: 0, y: 0 }
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = point.x - Grid.origin.x
    let yDist = (point.x - Grid.origin.y)
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
  constructor(public scale: number) {

  }
}

let grid1 = new Grid(1.0)
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))
let grid2 = new Grid(5.0)
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }))

// 抽象类 
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
// 抽象类可以包含成员的实现细节
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法
abstract class Animal4 {
  abstract makeSound(): void
  moved(): void {
    console.log('roaming the earch...')
  }
}

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
// 抽象方法必须包含 abstract关键字并且可以包含访问修饰符
abstract class Department {
  constructor(public name: string) {

  }
  printName(): void {
    console.log(`Department name: ${this.name}`)
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    // 在派生类的构造函数中必须调用 super()
    super('Accounting and Auditing')
  }
  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }
  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
// department = new Department() // 错误: 不能创建一个抽象类的实例
let department2 = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department2.printMeeting()
department2.printName()
department2.generateReports()


// 高级技巧
class Grt {
  static standardGrt = "Hello, there"
  greeting: string
  greet() {
    if (this.greeting) {
      return `Hello, ${this.greeting}`
    } else {
      return Grt.standardGrt
    }
  }
}

let grt1: Grt
grt1 = new Grt()
console.log(grt1.greet())


let grtMaker: typeof Grt = Grt
grtMaker.standardGrt = "Hey there"

let grt2: Grt = new grtMaker()
console.log(grt2.greet())

// 把类当做接口使用
class Point2 {
  x: number
  y: number
}

interface Point3d extends Point2 {
  z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
