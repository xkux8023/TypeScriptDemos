// 命名空间
// “内部模块”现在叫做“命名空间”。
// 任何使用 module关键字来声明一个内部模块的地方都应该使用namespace关键字来替换

// (也就是说 module X {} 相当于现在推荐的写法 namespace X {})。


// 使用命名空间的验证器
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }
  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s)
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
  }
}

let strings = ["Hello", "98052", "101"]

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {}
validators["ZIP code"] = new Validation.ZipCodeValidator()
validators["Letters only"] = new Validation.LettersOnlyValidator()

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
    console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
  }
}



// 当涉及到多文件时，我们必须确保所有编译后的代码都被加载了。 我们有两种方式。

// 第一种方式，把所有的输入文件编译为一个输出文件，需要使用--outFile标记：
// tsc --outFile sample.js Test.ts

// 编译器会根据源码里的引用标签自动地对输出进行排序。你也可以单独地指定每个文件
// tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts



// 别名
// 另一种简化命名空间操作的方法是使用import q = x.y.z给常用的对象起一个短的名字


namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

import polygons = Shapes.Polygons;
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"

// 外部命名空间
// 为了让TypeScript编译器识别它的类型，我们使用外部命名空间声明。 比如，我们可以像下面这样写：

// D3.d.ts (部分摘录)


declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;