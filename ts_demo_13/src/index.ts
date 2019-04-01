// “声明合并”是指编译器将针对同一个名字的两个独立声明合并为单一声明。
// 合并后的声明同时拥有原先两个声明的特性。
// 任何数量的声明都可被合并；不局限于两个声明。

// 最简单也最常见的声明合并类型是接口合并
interface Box {
  height: number
  width: number
}

interface Box {
  scale: number
}

let box: Box = { height: 5, width: 5, scale: 10 }


// ---------------------------------------------------

class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}
class Sheep extends Animal {}

interface Cloner {
    clone(animal: Animal): Animal;
}

interface Cloner {
    clone(animal: Sheep): Sheep;
}

interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

// 这三个接口合并成一个声明：
// 注意每组接口里的声明顺序保持不变，
// 但各组接口之间的顺序是后来的接口重载出现在靠前位置。
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}

// ---------------------------------------------------

// 这个规则有一个例外是当出现特殊的函数签名时。
// 如果签名里有一个参数的类型是 单一的字符串字面量
// （比如，不是字符串字面量的联合类型），那么它将会被提升到重载列表的最顶端。

interface Document {
    createElement(tagName: any): Element;
}
interface Document {
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
}
interface Document {
    createElement(tagName: string): HTMLElement;
    createElement(tagName: "canvas"): HTMLCanvasElement;
}

// 合并后的 Document将会像下面这样：
interface Document {
    createElement(tagName: "canvas"): HTMLCanvasElement;
    createElement(tagName: "div"): HTMLDivElement;
    createElement(tagName: "span"): HTMLSpanElement;
    createElement(tagName: string): HTMLElement;
    createElement(tagName: any): Element;
}



// 合并命名空间
// 命名空间的合并: 模块导出的同名接口进行合并，构成单一命名空间内含合并后的接口。
// 命名空间里值的合并: 如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。

// Animals声明合并示例：
namespace Animals {
    export class Zebra { }
}

namespace Animals {
    export interface Legged { numberOfLegs: number; }
    export class Dog { }
}

// 等同于：
namespace Animals {
    export interface Legged { numberOfLegs: number; }

    export class Zebra { }
    export class Dog { }
}


// 合并之后，从其它命名空间合并进来的成员无法访问非导出成员。


// 因为 haveMuscles并没有导出，只有 animalsHaveMuscles函数共享了原始未合并的命名空间可以访问这个变量。 doAnimalsHaveMuscles函数虽是合并命名空间的一部分，但是访问不了未导出的成员。
namespace Animal {
    let haveMuscles = true;

    export function animalsHaveMuscles() {
        return haveMuscles;
    }
}

namespace Animal {
    export function doAnimalsHaveMuscles() {
        return haveMuscles;  // Error, because haveMuscles is not accessible here
    }
}


// 合并命名空间和类

// 这让我们可以表示内部类。
class Album {
    label: Album.AlbumLabel;
}
namespace Album {
    export class AlbumLabel { }
}
// 合并规则与上面 合并命名空间小节里讲的规则一致，
// 我们必须导出 AlbumLabel类，好让合并的类能访问。
// 合并结果是一个类并带有一个内部类。 你也可以使用命名空间为类增加一些静态属性。



// ----------------------------------

// 除了内部类的模式，你在JavaScript里，创建一个函数稍后扩展它增加一些属性也是很常见的。
// TypeScript使用声明合并来达到这个目的并保证类型安全。

function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let suffix = "";
    export let prefix = "Hello, ";
}

console.log(buildLabel("Sam Smith")); // "Hello, Sam Smith"


// 相似的，命名空间可以用来扩展枚举型：
enum Color {
    red = 1,
    green = 2,
    blue = 4
}

namespace Color {
    export function mixColor(colorName: string) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
}


// 你也以在模块内部添加声明到全局作用域中。
// observable.ts
export class Observable<T> {
    // ... still no implementation ...
}

declare global {
    interface Array<T> {
        toObservable(): Observable<T>;
    }
}

Array.prototype.toObservable = function () {
    // ...
}