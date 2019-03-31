// 类型兼容性

// TypeScript里的类型兼容性是基于结构子类型的。
// TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。比如：
interface Named {
    name: string
}
let x: Named
let y = { name: 'Alice', location: 'Seattle' }
x = y
// 编译器检查x中的每个属性，看是否能在y中也找到对应属性
// 在这个例子中，y必须包含名字是name的string类型成员。y满足条件，因此赋值正确
// y有个额外的location属性，但这不会引发错误, 只有目标类型（这里是Named）的成员会被一一检查是否兼容


// 检查函数参数时使用相同的规则：
function greet(n: Named) {
    console.log('Hello, ' + n.name)
}
greet(y)


// 比较两个函数
let x1 = (a: number) => 0
let y1 = (b: number, s: string) => 0

// x1的每个参数必须能在y1里找到对应类型的参数
y1 = x1; // OK
// x1 = y1; // Error
// 第二个赋值错误，因为y有个必需的第二个参数，但是x并没有，所以不允许赋值。

// 为什么允许忽略参数，像例子y1 = x1中那样
// 原因是忽略额外的参数在JavaScript里是很常见的:如 forEach

let items = [1, 2, 3]
items.forEach((item, index, array) => console.log(item))
items.forEach(item => console.log(item))


// 下面来看看如何处理返回值类型，创建两个仅是返回值类型不同的函数：
let x2 = () => ({ name: 'Alice' })
let y2 = () => ({ name: 'Alice', location: 'Seattle' })

x2 = y2; // OK 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。
// y2 = x2; // Error, because x() lacks a location property


// 函数参数双向协变
enum EventType  { Mouse, Keyboard }
interface Event { timestamp: number }
interface MouseEvent extends Event { x3: number; y3: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) { /* ... */ }

listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y))
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y))
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)))
// listenEvent(EventType.Mouse, (e: number) => console.log(e))


// 可选参数及剩余参数
// 比较函数兼容性的时候，可选参数与必须参数是可互换的。
// 源类型上有额外的可选参数不是错误，目标类型的可选参数在源类型里没有对应的参数也不是错误。
// 当一个函数有剩余参数时，它被当做无限个可选参数。
function invokeLater(args: any[], callback: (...args: any[]) => void) {
  /* ... Invoke callback with 'args' ... */
}
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y))
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y))

// 对于有重载的函数，源函数的每个重载都要在目标函数上找到对应的函数签名。 这确保了目标函数可以在所有源函数可调用的地方调用。

// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。比如，
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let stat = Status.Ready;
// stat = Color.Green;  // Error


//  比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
class Animal {
  feet: number
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number
  constructor(numFeet: number) {}
}

let a: Animal
let s: Size
a = s;  // OK
s = a;  // OK


// 因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。比如，
interface Empty<T> {
}
let x4: Empty<number>;
let y4: Empty<string>;

x4 = y4;  // OK, because y matches structure of x

// 上面代码里，x和y是兼容的，因为它们的结构使用类型参数时并没有什么不同。
// 把这个例子改变一下，增加一个成员，就能看出是如何工作的了：

interface NotEmpty<T> {
  data: T;
}
let x5: NotEmpty<number>;
let y5: NotEmpty<string>;

// 不能将类型“NotEmpty<string>”分配给类型“NotEmpty<number>”。
// x5 = y5;  // Error 不能将类型“string”分配给类型“number”



