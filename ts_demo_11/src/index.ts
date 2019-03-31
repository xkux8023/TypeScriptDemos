// 导入一个模块中的某个导出内容

import { ZipCodeValidator } from './ZipCodeValidator'

let myValidator = new ZipCodeValidator()

// 可以对导入内容重命名

import { ZipCodeValidator as ZCV } from './ZipCodeValidator'
let myValidator2 = new ZCV()


// 将整个模块导入到一个变量，并通过它来访问模块的导出部分
import * as validator from './ZipCodeValidator'
let myValidator3 = new validator.ZipCodeValidator()



// 默认导出
// 每个模块都可以有一个default导出: 例如：

/*  JQuery.d.ts
*     declare let $: JQuery;
*     export default $;
*
*   App.ts
*     import $ from "JQuery";
*     $("button.continue").html( "Next Step..." );
*/


// export = 和 import = require()
// CommonJS和AMD的环境里都有一个exports变量，这个变量包含了一个模块的所有导出内容。
// 为了支持CommonJS和AMD的exports, TypeScript提供了export =语法
// export =语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。
// 若使用export = 导出一个模块，则必须使用TypeScript的特定语法import module = require("module")来导入此模块


// 为了编译，我们必需要在命令行上指定一个模块目标
// 对于Node.js来说，使用--module commonjs；
// 对于Require.js来说，使用--module amd。
/*
* 比如：
*   tsc --module commonjs Test.ts
*/




// 要想描述非TypeScript编写的类库的类型，我们需要声明类库所暴露出的API。

/// <reference path="./node.d.ts"/>
// import * as URL from 'url'
// let myUrl = URL.parse('http://www.typescriptlang.org')



import { isPrime } from './math-lib'
isPrime(2)
// mathLib.isPrime(2) // 错误: 不能在模块内使用全局定义。




// 如果仅导出单个 class 或 function，使用 export default
// 如果一个模块就是为了导出特定的内容，那么你应该考虑使用一个默认导出



// 使用命名空间导入模式当你要导出大量内容的时候:
/*
*   export class Dog { ... }
*   export class Cat { ... }
*   export class Tree { ... }
*   export class Flower { ... }
*/



// 模块里不要使用命名空间

// 重新检查以确保你没有在对模块使用命名空间：
/*
*   文件的顶层声明是export namespace Foo { ... } （删除Foo并把所有内容向上层移动一层）
*   文件只有一个export class或export function （考虑使用export default）
*   多个文件的顶层具有同样的export namespace Foo { （不要以为这些会合并到一个Foo中！）
*/
