//  TypeScript支持内嵌，类型检查以及将JSX直接编译为JavaScript。

// 回想一下怎么写类型断言：
var foo = <foo>bar;

// 由于不能够在.tsx文件里使用上述语法，因此我们应该使用另一个类型断言操作符：as。
// 上面的例子可以很容易地使用as操作符改写：
var foo = bar as foo


// 类型检查
// 1.对于React，固有元素会生成字符串（React.createElement("div")），然而由你自定义的组件却不会生成（React.createElement(MyComponent)）。
// 2. 传入JSX元素里的属性类型的查找方式不同。 固有元素属性本身就支持，然而自定义的组件会自己去指定它们具有哪个属性。


// 固有元素使用特殊的接口JSX.IntrinsicElements来查找
// 如果这个接口没有指定，会全部通过，不对固有元素进行类型检查。
// 如果这个接口存在，那么固有元素的名字需要在JSX.IntrinsicElements接口的属性里查找, 如:

declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}
<foo />; // 正确
<bar />; // 错误
// 在上例中，<bar />会报错，因为它没在JSX.IntrinsicElements里指定。

// 注意：你也可以在JSX.IntrinsicElements上指定一个用来捕获所有字符串索引：
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}




// 基于值的元素会简单的在它所在的作用域里按标识符查找。
import MyComponent from "./myComponent";

<MyComponent />; // 正确
<SomeOtherComponent />; // 错误


// 有两种方式可以定义基于值的元素： 1.无状态函数组件 (SFC) 2.类组件

// 无状态函数组件,组件被定义成JavaScript函数，它的第一个参数是props对象。
// TypeScript会强制它的返回值可以赋值给JSX.Element。

interface FooProp {
    name: string;
    X: number;
    Y: number;
}

declare function AnotherComponent(prop: {name: string});
function ComponentFoo(prop: FooProp) {
    return <AnotherComponent name={prop.name} />;
}
const Button = (prop: {value: string}, context: { color: string }) => <button>


// 由于无状态函数组件是简单的JavaScript函数，所以我们还可以利用函数重载。
interface ClickableProps {
    children: JSX.Element[] | JSX.Element
}
interface HomeProps extends ClickableProps {
    home: JSX.Element;
}
interface SideProps extends ClickableProps {
    side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
    // ...
}



// 定义类组件的类型: 元素类的类型和元素实例的类型。
// 如果MyComponent是ES6的类，那么类类型就是类的构造函数和静态部分。
// 如果MyComponent是个工厂函数，类类型为这个函数。

class MyComponent {
    render() {}
}

// 使用构造签名
var myComponent = new MyComponent();
// 元素类的类型 => MyComponent
// 元素实例的类型 => { render: () => void }




function MyFactoryFunction() {
    return {
        render: () => {}
    }
}

// 使用调用签名
var myComponent = MyFactoryFunction();
// 元素类的类型 => FactoryFunction
// 元素实例的类型 => { render: () => void }


// 元素的实例类型很有趣，因为它必须赋值给JSX.ElementClass或抛出一个错误。
// 默认的JSX.ElementClass为{}，但是它可以被扩展用来限制JSX的类型以符合相应的接口。

declare namespace JSX {
    interface ElementClass {
        render: any;
    }
}

class MyComponent {
    render() {}
}
function MyFactoryFunction() {
    return { render: () => {} }
}

<MyComponent />; // 正确
<MyFactoryFunction />; // 正确

class NotAValidComponent {}
function NotAValidFactoryFunction() {
    return {};
}

<NotAValidComponent />; // 错误
<NotAValidFactoryFunction />; // 错误


// 属性类型检查

// 属性类型检查的第一步是确定元素属性类型。 这在固有元素和基于值的元素之间稍有不同。
declare namespace JSX {
    interface IntrinsicElements {
        foo: { bar?: boolean }
    }
}

// `foo`的元素属性类型为`{bar?: boolean}`
<foo bar />;


// 对于基于值的元素，就稍微复杂些。 它取决于先前确定的在元素实例类型上的某个属性的类型。
//  TypeScript 2.8，如果未指定JSX.ElementAttributesProperty，那么将使用类元素构造函数或SFC调用的第一个参数的类型


declare namespace JSX {
    interface ElementAttributesProperty {
        props; // 指定用来使用的属性名
    }
}

class MyComponent {
    // 在元素实例类型上指定属性
    props: {
        foo?: string;
    }
}

// `MyComponent`的元素属性类型为`{foo?: string}`
<MyComponent foo="bar" />


// 元素属性类型用于的JSX里进行属性的类型检查。 支持可选属性和必须属性。

declare namespace JSX {
    interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number }
    }
}

<foo requiredProp="bar" />; // 正确
<foo requiredProp="bar" optionalProp={0} />; // 正确
<foo />; // 错误, 缺少 requiredProp
<foo requiredProp={0} />; // 错误, requiredProp 应该是字符串
<foo requiredProp="bar" unknownProp />; // 错误, unknownProp 不存在
<foo requiredProp="bar" some-unknown-prop />; // 正确, `some-unknown-prop`不是个合法的标识符

// 注意：如果一个属性名不是个合法的JS标识符（像data-*属性），并且它没出现在元素属性类型里时不会当做一个错误。


// JSX还会使用JSX.IntrinsicAttributes接口来指定额外的属性，这些额外的属性通常不会被组件的props或arguments使用- 比如React里的key
// JSX.IntrinsicClassAttributes<T>泛型类型也可以用来做同样的事情。这里的泛型参数表示类实例类型。
// React里，它用来允许Ref<T>类型上的ref属性。


// 延展操作符也可以使用：
var props = { requiredProp: 'bar' };
<foo {...props} />; // 正确

var badProps = {};
<foo {...badProps} />; // 错误


// 子孙类型检查: children是元素属性(attribute)类型的一个特殊属性(property)，子JSXExpression将会被插入到属性里
// JSX.ElementChildrenAttribute应该被声明在单一的属性(property)里。

declare namespace JSX {
    interface ElementChildrenAttribute {
        children: {};  // specify children name to use
    }
}

// 如不特殊指定子孙的类型，我们将使用React typings里的默认类型。
/**
    <div>
        <h1>Hello</h1>
    </div>;

    <div>
        <h1>Hello</h1>
        World
    </div>;

    const CustomComp = (props) => <div>props.children</div>
    <CustomComp>
        <div>Hello World</div>
        {"This is just a JS expression..." + 1000}
    </CustomComp>
**/


/**
    interface PropsType {
        children: JSX.Element
        name: string
    }

    class Component extends React.Component<PropsType, {}> {
        render() {
            return (
                <h2>
                {this.props.children}
                </h2>
            )
        }
    }

    // OK
    <Component>
        <h1>Hello World</h1>
    </Component>

    // Error: children is of type JSX.Element not array of JSX.Element
    <Component>
        <h1>Hello World</h1>
        <h2>Hello World</h2>
    </Component>

    // Error: children is of type JSX.Element not array of JSX.Element or string.
    <Component>
        <h1>Hello</h1>
        World
    </Component>

**/



// 要想一起使用JSX和React，你应该使用React类型定义。 这些类型声明定义了JSX合适命名空间来使用React。

/// <reference path="react.d.ts" />

interface Props {
    foo: string;
}

class MyComponent extends React.Component<Props, {}> {
    render() {
        return <span>{this.props.foo}</span>
    }
}

<MyComponent foo="bar" />; // 正确
<MyComponent foo={0} />; // 错误



// 工厂函数

// jsx: react编译选项使用的工厂函数是可以配置的。
// 可以使用jsxFactory命令行选项，或内联的@jsx注释指令在每个文件上设置。
// 比如，给createElement设置jsxFactory，<div />会使用createElement("div")来生成，而不是React.createElement("div")。


// 注释指令可以像下面这样使用（在TypeScript 2.8里）：
import preact = require("preact");
/* @jsx preact.h */
const x = <div />;


// 生成：
const preact = require("preact");
const x = preact.h("div", null);

// 工厂函数的选择同样会影响JSX命名空间的查找（类型检查）。
// 如果工厂函数使用React.createElement定义（默认），编译器会先检查React.JSX，之后才检查全局的JSX。
// 如果工厂函数定义为h，那么在检查全局的JSX之前先检查h.JSX。