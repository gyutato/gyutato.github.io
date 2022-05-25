---
emoji: 🌱
title: (React) 리액트 공식문서 따라하기 4. 컴포넌트의 특성과 장점
date: '2022-05-22 23:27:12'
author: 규자
tags: Basics 리액트 react 자바스크립트 프론트엔드 javascript jsx node npm
categories: frontend react
---

> 📌 [(React) 리액트 공식 자습서 따라하기 3. 컴포넌트와 props](https://gyutato.github.io/react/react_official/tutorial_3/)에서 이어지는 글입니다.

[조은](https://euncho.medium.com/about) 님의 [프론트엔드 학습 로드맵](https://euncho.medium.com/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%95%99%EC%8A%B5-%EB%A1%9C%EB%93%9C%EB%A7%B5-91c3bc11dec0)에 따른 첫 번째 스프린트로, [리액트 공식 튜토리얼](https://ko.reactjs.org/docs/hello-world.html) 을 추가로 공부했다.

<br/>

# 🐥 개요 3. 컴포넌트의 특성과 장점
리액트의 뼈대를 이루는 **`엘리먼트`** 와 **`컴포넌트`**, `props` 그리고 `state`를 알아보자 !

여기서는 그 중에서도 **`컴포넌트`** 의 **특성과 장점** 에 대해 설명한다.

<br/>

## 1. 컴포넌트의 장점

React의 '컴포넌트' 개념은 이 프레임워크를 이해하고 활용하는 데 있어 가장 중요한 특성이자 장점이다. 어떤 기술을 사용하든, 그 기술이 이전까지의 다른 기술과 어떤 점에서 다르고, 어떤 점에서 더 활용도가 높은지 이해하고 사용하는 것은 **아주** 중요하다고 생각한다.

그렇다면, 이렇게 앱을 컴포넌트 단위로 나누는 방식의 장점은 무엇일까?


<br/>

### 🤦‍♀️ 기존 방식의 단점

이전에 우리가 화면, 즉 뷰를 HTML 등의 마크업 언어로 구성하던 경우를 생각해 보자.

```JSX
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

위 코드는 리턴하려는 요소를 <u>기존 마크업 방식</u>처럼 적은 경우다. 형태를 보면 구성요소들이 모두 **중첩 구조**로 이루어져 있다. 근본적으로 DOM 모델은 <u>트리 형태</u>로 표현되는 구조인 만큼, 상위 노드가 하위 노드를 포함하는 형태다. 그래서 화면에 요소가 많아지면 많아질수록 점점 요소 간의 중첩 구조가 복잡해지고, 코드의 가독성 및 재사용성, 변경의 용이함 등이 모두 상당히 떨어지게 된다.

- `Avatar` 요소의 경우, 어트리뷰트를 3개나 가져야 해서 태그의 길이가 길어졌다.
	- 그 중 `className` 을 제외한 나머지 두 어트리뷰트는 동일하게 `props.author` 객체를 필요로 한다.
- 가장 상위의 `Comment` 요소의 구조를 보면,
	- `props.author` 객체를 필요로 하는 `UserInfo` 요소와, 
	- `props.text` 를 필요로 하는 `Comment-text` 요소,
	- `props.date` 를 필요로 하는 `Comment-date` 요소의 세 부분으로 분리할 수 있을 것 같다.
- 그 말인즉슨, 각 요소는 `Comment`에 주어지는 `props`의 각기 다른 값을 필요로 하고 있으므로, 각각 **개별적**인 **요소** 라고 볼 수 있다.

<br/>

### 🙆‍♀️ 컴포넌트 사용의 장점: '재사용성'
컴포넌트란 말 그대로 '부품', 즉 화면을 이루는 '요소'를 의미한다. 여러 요소들이 중첩되어 있는 복잡한 컴포넌트에서 몇 가지 컴포넌트를 추출하면, 화면이 어떻게 구성되는지 더 간결하고, 수정이 용이한 형태로 나타낼 수 있다.

또한 이 컴포넌트를 'props'에 따라 달라지는 하나의 **템플릿**이라고 생각한다면, 하나의 요소를 만들었을 때 화면의 여러 부분에서 재사용을 용이하게 할 수 있다는 장점도 크게 작용한다.

#### 1. `Avatar` 컴포넌트 추출
첫 번째로, 위의 코드에서 `Avatar` 부분을 하나의 컴포넌트로 추출해보자.

```JSX
// 추출 전
<img className="Avatar"
     src={props.author.avatarUrl}
     alt={props.author.name}
/>

//추출 및 컴포넌트화
function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}
```

위 코드의 `Avatar` 요소였던 `img` 태그를 함수 컴포넌트의 리턴 엘리먼트가 되도록 추출하여 컴포넌트화 시켰다. 
- `props`의 이름을 `author`에서 `user`로 변경했다.
    - `Avatar` 는 자신이 `Comment` 내에서 렌더링 된다는 것을 알 필요가 없다. 재사용성의 관점에서, 이 요소가 댓글창에 사용될지, 프로필창에 사용될지, 화면의 다른 부분에 사용될지는 매번 달라질 것이다. 
    - 이처럼 `props`의 이름은 사용될 맥락이 아닌 컴포넌트 자체의 독립적인 관점에서 짓는 것이 권장된다고 한다.

이렇게 컴포넌트를 추출하면, 맨 위에서 보았던 전체 코드는 아래와 같이 조금 단순해질 수 있다:

```JSX
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

#### 2. 다른 컴포넌트도 추출하여 마무리

```JSX
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

앞서 추출한 `Avatar` 컴포넌트를 포함하고 있는 `UserInfo` 요소를 하나의 컴포넌트로 추출하려고 한다. 같은 계층의 다른 요소인 `Comment-text`나 `Comment-date`와 복잡하게 얽혀있기보다 독립적으로 부모 요소로부터의 정보만 필요로 하고 있어 똑 떼어내서 컴포넌트화하기 좋은 조건이다. 

```JSX
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

맨 위에서 보았던 전체 코드가 바로 위 코드처럼 훨씬 짧아진 것을 확인할 수 있다. 

맨 위의 초기 코드에서 `UserInfo` 요소는 총 9줄이었으며, 해당 요소를 이루고 있는 모든 자식 요소들이 그대로 드러나고 중첩되어있어 전체적인 가독성을 떨어뜨렸다. 

크게 보면 `UserInfo` 요소는 `Avatar` 요소와 `UserInfo-name` 요소로 구성되며, **'`props.user` 정보를 받아 아바타와 이름을 리턴한다'** 라는 하나의 역할을 수행하고 있다. `UserInfo` 요소가 그 밑의 `Comment-text`나 `Comment-date`의 역할까지 함께 수행하느라 얽혀 있지 않다는 뜻이다.

이는 다시 말해, React에서는 '컴포넌트'를 기본 단위로 사용하여 **의존성이 낮고 재사용성과 범용성을 높인** 코드를 지향한다고 할 수 있겠다.

<br/>

### 🧐 컴포넌트로 만들 수 있는 코드란?

정리하자면 리액트는 **무수한 컴포넌트로 이뤄져 있다**. 컴포넌트를 잘 설계하는 것이 리액트 프로젝트를 잘 설계하는 부분에 큰 비중을 차지한다. 사전적 정의에 따르면 컴포넌트는 **재사용성**과 **범용성**을 위해서 만들어져야 한다.

#### 1. 관심사를 분리하고 **단일책임**으로 설계하기

컴포넌트가 재사용성과 범용성을 가지기 위해서는 먼저, <u>관심사에 따라 딱 한가지의 역할만 수행시키기</u>를 권장한다(이를 객체지향에서는 단일 책임 원칙이라고 한다). 리액트 컴포넌트는 단순하게 보면 `props`를 받아서 `DOM 렌더`를 시키는 `JSX`를 리턴하는 함수이다. 그 결과 엘리먼트가 생성된다. 

`props`는 읽기 전용이라고 했던 [이전 글](https://gyutato.github.io/react/react_official/tutorial_3/)에서 **순수 함수**의 개념을 잠깐 언급했다. 컴퓨터 프로그래밍에서 순수함수란

- 동일한 인자에는 항상 같은 값을 리턴하며,
- 사이드 이펙트를 내지 않는다.

리액트 컴포넌트가 딱 한가지 역할만 수행하기 위해서는 이 순수함수의 특성과 같이 동일한 `props`를 받으면 동일한 `JSX`를 리턴하는 순수함수로 이뤄져야 한다. 

즉 컴포넌트 내부에서 별도의 로직에 따라 자체적으로 `props`를 수정하거나, `props`를 변경시키는 다른 로직에 의존하고 있으면 안 된다. 

잘 격리하고 역할을 잘 정의해서 컴포넌트를 만들면 코드가 너무 광범위한 역할을 수행하고 복잡해지는 걸 방지해 준다. 단일 책임을 가지는 순수 컴포넌트들은 테스트하기 좋고 가독성도 좋다고 한다.

#### 2. 제어 위임

제어를 외부에 위임할수록 컴포넌트의 유연성과 재사용성이 높아진다. 

흔히 쓰는 부트스트랩이나 Ant Design을 생각해보자. 필요한 `props`만 받아서 설정대로 움직이고 제어까지 `setState`를 받아서 해당 컴포넌트 제어가 가능하다. 핵심 로직은 해당 컴포넌트를 `import`한 컴포넌트에 의해서 제어가 된다. 

마찬가지로 우리가 만드는 컴포넌트도 제어를 위임에 맡길수록 비즈니스 로직을 맡는 컴포넌트에 `import` 해서 재사용이 가능해진다.

반면, 제어를 위임하면 할수록 위임한 코드를 사용 하는 코드에 대한 이해가 어려워지고, 가독성이 떨어진다는 문제도 있다. 위임과 사용 용이성의 중심을 잘 잡는게 중요하다고 한다.

<br/>

참고:
- [Components와 Props](https://ko.reactjs.org/docs/components-and-props.html)
- [리액트 설계 가이드](https://www.stevy.dev/react-design-guide/)

```toc
```
