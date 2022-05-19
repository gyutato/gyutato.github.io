---
emoji: 🌱
title: (React) 리액트 공식문서 따라하기 3. 컴포넌트와 props
date: '2022-05-22 19:27:12'
author: 규자
tags: Basics 리액트 react 자바스크립트 프론트엔드 javascript jsx node npm
categories: frontend react
---

> 📌 [(React) 리액트 공식 자습서 따라하기 2. React의 개념과 '엘리먼트'](https://gyutato.github.io/react/react_official/tutorial_2/)에서 이어지는 글입니다.

[조은](https://euncho.medium.com/about) 님의 [프론트엔드 학습 로드맵](https://euncho.medium.com/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%95%99%EC%8A%B5-%EB%A1%9C%EB%93%9C%EB%A7%B5-91c3bc11dec0)에 따른 첫 번째 스프린트로, [리액트 공식 튜토리얼](https://ko.reactjs.org/docs/hello-world.html) 을 추가로 공부했다.

<br/>

# 🐥 개요 2. 컴포넌트와 props
리액트의 뼈대를 이루는 **`엘리먼트`** 와 **`컴포넌트`**, `props` 그리고 `state`를 알아보자 !

여기서는 그 중에서도 **`컴포넌트`** 와 **`props`** 에 대해 설명한다.

<br/>

## 1. 컴포넌트

컴포넌트는 개념적으로 JavaScript 함수와 유사하다. **`props`를 input으로 하고 UI가 어떻게 보여야 하는지 정의하는 `React Element`를 output으로 하는 함수**라고 한다. 즉 **UI를 재사용할 수 있고 독립적인 단위로 쪼개어 생각**하게 한다.

#### 1-1. 컴포넌트와 엘리먼트의 차이

어떤 '단위', '요소' 등을 가리킨다는 점에서 **React 엘리먼트**와 유사하게 생각되지만, 이 둘은 분명히 다르다. 차이점을 구체적으로 알기 위해 많은 글들을 읽어보았지만, 아직 명확히 이해하지는 못했다. 다만 대다수의 글들이 입을 모아 강조하는 부분만 정리하면 대강 아래와 같다:

- `엘리먼트`
    - `instance`가 아니다. 
    - 변경 불가능(immutable)하다.
    - 컴포넌트 인스턴스나 DOM 노드를 기술하는 **순수한 객체**다.
    - 즉, 어떠한 메소드도 호출할 수 없는, 단지 **화면에 무엇이 어떻게 보여져야 하는지에 대한 정보만 담고 있는 객체**다. (immutable description object)
    - 엘리먼트는 `component type`과 그 `properties`, 그리고 그 내부의 `child element`에 대한 정보만 갖고 있다.

- `컴포넌트`
    - 컴포넌트는 `render()` 메서드가 있는 클래스나 함수로 정의될 수 있다.
    - 두 방식 모두 `props`를 인풋으로 받으며, `element tree`를 `output`으로 반환한다.

이를 위해 참고한 글들은 다음과 같다:
- [[리액트] 리액트 컴포넌트, 엘리먼트, 인스턴스](https://intrepidgeeks.com/tutorial/response-response-element-alias-instance)
- [React Element와 Component 차이](https://sambalim.tistory.com/117)
- [React Components, Elements, and Instances](https://alledy.netlify.app/posts/react-component-element-instances/)
- [React의 Components, Elements, Instances란?](https://simsimjae.tistory.com/449)

<br/>

### 1-2. 🤔 생각해볼 점: `props`와 `state`의 분리

컴포넌트는 두 가지 인스턴스 속성(property) `props`와 `state`를 가지고 있다. `props`는 DOM 객체가 생성되고 브라우저에 나타나는 Mount 단계와, 그렇게 만들어진 객체(컴포넌트)를 갱신하는 Update 시점에 값이 할당될 뿐 **컴포넌트 내부에서 값을 변경할 수 없다**. 

상황에 따라 변경되어야 하는 값들은 `state`를 이용해야 한다. 컴포넌트의 속성을 왜 이렇게 props와 state로 나누어 사용하도록 설계했을까, 무슨 이점이 있을까?

속성을 이렇게 두 가지로 구분하는 것은 먼저 개발자들이 **논리적으로 이치에 맞게 사고**하도록 돕는데 크게 기여한다.

만약 `input`으로 들어오는 `props`를 컴포넌트 내부에서 변경할 수 있다면 어떻게 되어야 할까? `props`를 내려주는 부모 컴포넌트에도 영향이 가야 할까? 

`state`가 없다면, 유저 이벤트에 맞춰 변경돼야 하는 값은 어떻게 관리할까? 

개발자는 이러한 질문에 고민할 필요가 없게 된다. 컴포넌트 간에는 무조건 `props`를 통해서만 데이터를 주고받고 `props`는 컴포넌트 내부에서 변경되지 않는다. 

따라서 위/아래 양쪽에 대해 동시에 고민할 필요가 없고 아래 한쪽 방향(uni-directional) 그리고 자기 자신에 대해서만 고민하면 된다.

<br/>

### 1-3. 🛠 함수 컴포넌트와 클래스 컴포넌트

> 📌 많은 부분 [리액트 공식문서: 단계별 학습하기](https://ko.reactjs.org/docs/hello-world.html)를 참고하였습니다.

컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것이다:

```JS
function greeting(props) { // 1. props 객체 인자를 받는다.
  return <h1>Hello, {props.name}</h1>; // 2. React 엘리먼트를 반환한다.
}
```

이 함수는 **(1) 데이터를 가진 하나의 `props` 객체 인자를 받은 후**, **(2) React 엘리먼트를 반환**하므로 유효한 React 컴포넌트다. 이러한 컴포넌트는 자바스크립트 함수이기 때문에 말 그대로 “함수 컴포넌트”라고 부를 수 있다.

다른 방법으로는 `ES6`에서 추가된 [`class`](https://jae04099.tistory.com/41)를 사용하여 컴포넌트를 정의할 수도 있다.

```JS
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### `extends`

여기서 `extends` 키워드는 클래스를 다른 클래스의 자식으로 만들기 위해 `class 선언` 또는 `class 식`에 사용된다. 이러면 부모 클래스의 기능은 사용하면서 거기서 부가적인 기능을 추가 또는 수정하여 사용할 수 있다.

#### `this`

자바스크립트 내에서 `this`는 쉽게 말해 '누가 나를 불렀느냐'를 뜻한다고 한다. **즉, 선언이 아닌 호출에 따라 달라진다**는 것이다.

따라서 호출이 되는 각 상황별로 `this`가 어디에 바인딩되는지가 달라지는데, 자주 사용되는 경우 몇 가지만 추려서 정리해두려고 한다.

- 단독으로 쓴 `this`
    - this를 단독으로 호출하는 경우엔 `global object`를 가리킨다. 브라우저에서 호출하는 경우 `object Window`가 될 것이다.
```JS
var x = this;
console.log(x); //Window
```

- 함수에서 쓴 `this`
    - 함수 안에서 `this`는 **함수의 주인**에게 바인딩된다. '함수' 말고, '함수의 **주인**' 이다.
    - 다만, 이 경우 `strict mode`에서는 함수 내의 `this`에 디폴트 바인딩이 없기 때문에 `undefined`가 된다.
```JS
function myFunction() {
  return this;
}
console.log(myFunction()); //Window
```

- 메서드 안에서 쓴 `this`
    - 메서드란, 객체 내 프로퍼티 중 **함수**인 프로퍼티다.
    - 메서드 호출 시 메서드 내부 코드에서 사용된 `this`는 **해당 메서드를 호출한 객체**로 바인딩된다.
```JS
fvar person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  },
};
 
person.fullName(); //"John Doe"
```

- 이벤트 핸들러 안에서 쓴 `this`
    - 이벤트 핸들러에서 `this`는 이벤트를 받는 HTML 요소를 가리킨다.
```JS
var btn = document.querySelector('#btn')
btn.addEventListener('click', function () {
  console.log(this); //#btn
});
```

- 생성자 함수 안에서 쓴 `this`
    - **생성자 함수가 생성하는 객체**로 `this`가 바인딩된다.
    - 생성자 함수란 쉽게 말해서 `new` 키워드와 함께 쓰이는 함수다. 이 때 함수의 이름은 관례적으로 대문자로 시작한다. 또한 이 생성자 함수는 **객체를 만드는 함수**다. 자바스크립트에서는 숫자, 문자열, 불리언, `undefined` 타입을 제외한 **모든 것이 객체**다.
    - `new` 키워드를 빼먹는 순간 일반 함수 호출과 같아지기 때문에, 이 경우는 `this`가 `window`에 바인딩된다.
```JS
function Person(name) {
  this.name = name;
}
 
var kim = new Person('kim');
var lee = new Person('lee');
 
console.log(kim.name); //kim
console.log(lee.name); //lee
```

<br/>

### 1-4. 🛠 컴포넌트 렌더링과 `props`

여기까지 우리는 React 엘리먼트를 나타내기 위해 `DOM` 태그만을 사용했다.

```JS
const element = <div />;
```

하지만 이제는 **사용자 정의 컴포넌트** 로도 React 엘리먼트를 나타낼 수 있다는 사실을 알게 되었다.

```JSX
const element = <Welcome name="Sara" />;
```

이 사실은 어떤 의미를 갖는가? 앞서 **`컴포넌트`**는 React 엘리먼트를 반환한다고 했다. 그러니 당연히 React 엘리먼트로 컴포넌트의 반환값을 사용할 수 있다. DOM 태그와 달리, 이처럼 사용자 정의 컴포넌트로 작성된 엘리먼트를 발견하면 React는 **JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달**한다. **이 객체의 이름이 `props`다.**

어트리뷰트란, JSX에서 엘리먼트의 여는 태그 내부에 정의해둔 여러가지 속성들이었다. 자식이란 여는 태그와 닫는 태그 안에 들어가 있는 데이터 및 다른 태그 등을 뜻한다. 여기서는 자식 없이 `name="Sara"` 라는 어트리뷰트만 `Welcome` 컴포넌트로 전달될 것이다. '전달'이란 어떤 의미일까?

```JSX
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

위 코드는 웹 페이지에 "Hello, Sara" 라는 텍스트를 렌더링하는 예시다.

- 함수 컴포넌트 `Welcome`은 `<h1>` 타입이며, 어트리뷰트는 없고, 자식으로 `Hello, ${props.name}` 을 갖는 엘리먼트를 리턴한다.
    - `return React.createElement('h1', null, 'Hello, ${props.name}');` 과 동일하다. (마크다운 표기로 인해 마지막 인자에 백틱 대신 작은따옴표를 사용했다. 실제로는 중괄호를 사용하기 위해 백틱 기호를 사용해야 한다.)
- `<Welcome name="Sara" />` 엘리먼트로 `ReactDOM.render()`를 호출한다.
- React는 `{name: 'Sara'}`를 `props`로 하여 `Welcome` 컴포넌트를 호출한다.
    - 여기서 앞서 가졌던 의문인 '전달'의 의미를 확인할 수 있다. 사용자 정의 컴포넌트로 엘리먼트를 작성하면, 이 엘리먼트가 정의될 때 React는 엘리먼트를 작성하는 데 필요한 정보를 **어트리뷰트**와 **자식**으로부터 받아와 하나의 객체 `props`로 묶어 컴포넌트에 전달하고, 해당 컴포넌트가 이 인자들을 바탕으로 연산하여 리턴한 반환값 (React 엘리먼트)을 우리가 엘리먼트로 사용하는 것이다.
- `Welcome` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환한다.
- `React DOM`은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 `DOM`을 업데이트한다.

> 컴포넌트의 이름은 항상 대문자로 시작해야 한다. React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리한다. 예를 들어 `<div />`는 HTML `div` 태그를 나타내지만, `<Welcome />`은 컴포넌트를 나타낸다.

<br/>

### 1-5. 🔴 **`props`는 읽기 전용이다**

함수 컴포넌트나 클래스 컴포넌트 모두 **컴포넌트의 자체 `props`를 수정해서는 안 된다.** 

먼저 간단한 예제로 **순수 함수**와 그렇지 않은 함수의 차이를 알아보자.

```JS
function sum(a, b) {
  return a + b;
}
```

이런 함수들은 **순수 함수**라고 불린다. **입력값을 바꾸려 하지 않고** 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문이다.

쉽게 말해, 함수가 받은 매개변수를 내부적으로 변화시키지 않는다는 것이다.

```JS
function withdraw(account, amount) {
  account.total -= amount;
}
```

이와 달리, 위의 함수는 받은 매개변수 `account`의 프로퍼티 `total`을 변경시키고 있기 때문에 순수 함수가 아니다. `account.total`은 입력값이 동일해도 `amount`에 따라 달라질 것이다. 반면 위의 순수 함수 코드에서 `a`는 `b`의 값에 관계없이 무조건 최초의 입력값 그대로 변함없을 것이다.

**모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.**

이 규칙을 지킴으로써 모든 컴포넌트끼리는 무조건 `props`를 통해 데이터를 주고 받으며 이때 **한 방향으로만 데이터가 흐를 수 있다.** 위에서 `props`와 `state`를 분리한 효과로 "위/아래 양쪽에 대해 동시에 고민할 필요가 없고 아래 한쪽 방향(uni-directional) 그리고 자기 자신에 대해서만 고민하면 된다"라고 한 이유가 이것이다. 

React 컴포넌트는 다음 장에서 다룰 `state`를 통해 이 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있다.

짧게 정리하자면, `props`는 부모 컴포넌트가 자식 컴포넌트에게 주는 값이다. 어떠한 값을 컴포넌트에 전달해주어야 할 때 사용하며, 할당된 후 컴포넌트 내부에서 값을 변경할 수 없다.

```toc
```