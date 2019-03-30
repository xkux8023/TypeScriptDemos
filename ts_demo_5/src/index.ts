// 函数

// 为函数定义类型

function add(x: number, y: number): number {
  return x + y
}

let myAdd = function (x: number, y: number): number {
  return x + y
}

let myAdd2: (x: number, y: number) => number =
  function (x: number, y: number): number { return x + y }

let myAdd3: (baseValue: number, increment: number) => number =
  function (x: number, y: number): number {
    return x + y
  }

// 可选参数和默认参数
// TypeScript里传递给一个函数的参数个数必须与函数期望的参数个数一致
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName
}

// let result1 = buildName("Bob") // 错误，应有两个参数，你只传了一个参数
// let result2 = buildName('Bob', 'Adams', 'Sr.') // 错误，应有两个参数，你传了三个参数
let result3 = buildName('Bob', 'Adams')
console.log(result3)


// 可选参数必须跟在必须参数后面
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result4 = buildName2("Bob") // returns "Bob Smith"
// let result5 = buildName('Bob', 'Adams', 'Sr.') // 错误，应有两个参数，你传了三个参数
let result6 = buildName('Bob', undefined) // returns "Bob Smith"

//与普通可选参数不同的是，带默认值的参数不需要放在必须参数的后面
// 如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined值来获得默认值
function buildName3(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}
let result7 = buildName3(undefined, 'Adams') // okay and returns "Will Adams"


// 剩余参数
// 在TypeScript里，你可以把所有参数收集到一个变量里
function buildName4(firstName: string, ...restOfName: string[]) {
  return `${firstName} ${restOfName.join(" ")}`
}

let employeeName = buildName4("Joseph", "Sumuel", "Lucas", "Mackinzie")
console.log(employeeName)

// 剩余参数会被当做个数不限的可选参数
// 编译器创建参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组
function buildName5(firstName: string, ...restOfName: string[]) {
  return `${firstName} ${restOfName.join(' ')}`
}

let buildNameFn: (fname: string, ...rest: string[]) => string = buildName5


// this和箭头函数
// this 的错误示范如下：
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  crateCardPicker: function () {
    // createCardPicker返回的函数里的this被设置成了window而不是deck对象,这不是我们期望的
    return function () {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }

}

// let cardPicker = deck.crateCardPicker()
// let pickedCard = cardPicker()
// console.log('card: ' + pickedCard.card + ' of ' + pickedCard.suit)

// 为了解决上面栗子中的问题，可以用箭头函数
let deck2 = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker2 = deck2.createCardPicker()
let pickedCard2 = cardPicker2()

console.log('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)


// this 参数

interface Card {
  suit: string
  card: number
}
interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker(this: Deck): () => Card
}

let deck3: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuit = Math.floor(pickedCard / 13)
      return {
        suit: this.suits[pickedSuit],
        card: pickedCard % 13
      }
    }
  }
}

let cardPicker3 = deck3.createCardPicker()
let pickedCard3 = cardPicker3()

console.log('card: ' + pickedCard3.card + ' of ' + pickedCard3.suit)


// this参数在回调函数里的 this 报错原因：
// 因为当回调被调用的时候，它们会被当成一个普通函数调用， this将为undefined
// 首先，库函数的作者要指定 this的类型：
interface UIElement {
  addClickListener(onclick:(this: void, e: Event) => void): void
}

class Handler {
  info: string
  onClickGood = (e: Event) => {
    console.log(e)
    // this.info = e.toSting()
  }
}
let h = new Handler()
// uiElement.addClickListener(h.onClickGood)



// 重载：函数根据传入不同的参数而返回不同类型的数据
let suits = ['hearts', 'spades', 'clubs', 'diamonds']
function pickCard(x:any): any {
  if (typeof x == 'object') {
    let pickCard = Math.floor(Math.random() * x.length)
    return pickCard
  } else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pCard1 = myDeck[pickCard(myDeck)]
console.log('card1: ' + pCard1.card + ' of ' + pCard1.suit)

let pCard2 = pickCard(15)
console.log('card2: ' + pCard2.card + ' of ' + pCard2.suit)


// 为同一个函数提供多个函数类型定义来进行函数重载
// 下面我们来重载 pickCard函数
let suits3 = ['hearts', 'spades', 'clubs', 'diamonds']
function pickCard3(x: { suit: string; card: number; }[]): number;
function pickCard3(x: number): { suit: string; card: number };
function pickCard3(x: any): any {
  if (typeof x == 'object') {
    let pickCard = Math.floor(Math.random() * x.length)
    return pickCard
  } else if (typeof x == 'number') {
    let pickedSuit = Math.floor(x / 13)
    return { suit: suits[pickedSuit], card: x % 13 }
  }
}

let myDeckk = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pkCard3 = myDeckk[pickCard3(myDeckk)]
console.log('card3: ' + pkCard3.card + ' of ' + pkCard3.suit)

let pkCard4 = pickCard(15)
console.log('card4: ' + pkCard4.card + ' of ' + pkCard4.suit)