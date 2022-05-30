---
emoji: 🌱
title: (CSS) 속성 4. 트랜지션(transition)
date: '2021-12-28 22:04:12'
author: 규자
tags: HTML CSS transition transform
categories: frontend css/html
---

## 1. `transition`
- 요소의 **전환**(시작과 끝) 효과를 지정하는 **단축 속성**
- <u>가상 선택자가 아닌 요소 원본을 제어하는 CSS 부분에 명시해주어야 함!</u>
```css
/* 
transition: {속성명} {지속시간} {타이밍함수} {대기시간}; 
이 때 지속시간은 반드시 명시해주어야 함.
*/
div {
    width: 100px;
    height: 100px;
    background-color: tomato;
    transition: 
        width 1s,
        background-color 2s;
}
div:hover {
    background-color: royalblue;
    width: 200px;
}
```
#### ✅ 개별 속성
- `transition-property`: 속성명
    - 기본값: `all`, 해당 요소의 모든 속성에 적용
    - 속성이름을 명시하여 전환 효과를 사용할 속성 이름을 따로 명시할 수 있음 (ex. 다른 속성은 모두 제외하고 요소의 가로 너비에만 전환 효과가 들어갔으면 좋겠어!)

- `transition-timing-function`: 타이밍함수
    - 기본값: `ease`, 느리게-빠르게-느리게
    - `linear`, `ease-in`, `ease-out`, `ease-in-out` 등
    - `cubic-bezier()` 값을 사용하여 직접 제어할 수도 있음 (어려움)

> 📌 CSS easing functions cheat sheet, easing functions mdn<br/>📌 Tweenmax easing - greensock.com

- `transition-delay`: 대기시간
    - 기본값: `0s`

<br/>

## 2. `transform`
- 요소의 **변환 효과**

```css
/* 
transform: [변환함수1] [변환함수2] [변환함수3]...;
원근법, 이동, 크리, 회전, 기울임 등
*/
div {
    width: 100px;
    height: 100px;
    background-color: tomato;
    transform:
        rotate(45deg),
        scale(1.3)
}
```
#### ✅ 2차원 변환 함수 
- `translate(x, y)`, `translateX(x)`, `translateY(y)`
    - X축 또는 Y축 이동
    - px등의 단위를 사용해 값 입력
- `scale(x, y)`
    - X축 및 Y축 방향 크기 제어
- `rotate(degree)`: 회전
- `skewX(x)`, `skewY(y)`: X축 또는 Y축 기울임
```css
div:hover {
    transform:
        transformX(40px),
        scale(1.5),
        rotate(45deg);
}
```

#### ✅ 3차원 변환 함수 
- `rotateX(x)`, `rotateY(y)`
    - X축 또는 Y축 회전
- `perspective(n)`: 원근법(거리)

```css
div:hover {
    transform:
        /* perspective 함수는 반드시 제일 앞에 작성해야 3D 회전 시 원근법이 반영됨 */
        perspective(500px),
        rotate(45deg), /* 2D 회전, 시계 또는 반시계방향 회전 */
        rotateX(45deg), /* 3D 회전, 축을 기준으로 3차원 회전 */
}
```
> 📌 `perspective` 속성과 함수의 차이 <br/>속성: `transform: perspective(600px)` <br/>함수: `perspective: 600px;` <br/>**함수**의 경우 원근 거리가 관찰 대상(transform 요소)의 정가운데를 기준으로 결정되며, **속성**의 경우에는 거리가 관찰 대상의 **부모**를 기준으로 결정된다. 여러 요소의 원근법을 통일감 있게 제어하기 위해서는 perspective **속성**을 통해 부모 요소에 원근 거리를 부여하는 것이 권장된다.

## 3. 기타 변환 관련 속성
- `backface-visibility`
    - 3D 회전(`rotateX`, `rotateY`)으로 인해 뒤집어진 요소의 뒷면이 보여지게 될 때, 화면에 출력할지 여부를 결정
        - 기본값: `visible`
        - `hidden` 값을 통해 뒷면은 출력되지 않도록 제어할 수 있음. 요소가 사라지는 것은 아니고 단지 시각적으로 보이지 않을 뿐!