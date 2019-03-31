import t from './MyClass'
import f from './MyFunc'
let x = new t()
console.log(f())


import { SomeType, someFunc } from './MyThings'
let x2 = new SomeType()
let y2 = someFunc()



import * as myLargeModule from './MyLargeModule'
let x3 = new myLargeModule.Dog()
