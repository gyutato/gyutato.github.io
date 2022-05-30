---
emoji: 🌱
title: (CSS) 속성 1. property basics
date: '2021-12-23 22:04:12'
author: 규자
tags: CSS 마크업 HTML
categories: frontend css/html
---

🙌 박스 모델, 글꼴, 문자, 배경, 배치, 플렉스(정렬), 전환, 변환, 띄움, 애니메이션, 그리드, 다단, 필터 등 속성 정리!

💡 코드로 작성되어 있는 속성을 보고 머릿속으로 어떻게 그려질 지 생각해보는 연습이 중요하다.

<br/>

## 1. `width`, `height`
- 기본값: `auto`
    - 요소에 이미 들어있는 속성의 값
    ㅡ 브라우저가 자동으로 요소의 너비를 계산
- px, em, vw 등 단위로 지정

```html
<link rel="stylesheet" href="./main.css">

<div></div>
<span></span>
```
```css
/* main.css */

div {
  height: 100px; /* width: auto; */
  background-color: orange;
}

span {
    height: 100px; /* width: auto; */
    background-color: royalblue;
}
```
- `div`와 같은 블록 요소의 경우:
    - `width: auto;`: **부모 요소의 크기만큼 자동으로 늘어남**
    - `height: auto`: 포함한 콘텐츠 크기만큼 자동으로 줄어듦
- `span`과 같은 블록 요소의 경우:
    - `width: auto;`: 포함한 콘텐츠 크기만큼 자동으로 줄어듦
    - `height: auto`: 포함한 콘텐츠 크기만큼 자동으로 줄어듦
- `max-width`, `max-height`
    - 기본값: `none`
    - px, em, vw 등 단위로 지정
- `min-width`, `min`
    - 기본값: `0`
    - px, em, vw 등 단위로 지정

```html
<link rel="stylesheet" href="./main.css">

<div class="parent">
  <div class="child"></div>
</div>
```
```css
/* main.css */

.parent {
  width:  300px;
  height: 200px;
  background-color: royalblue;
}

.child {
  height: 100px;
  min-width: 400px;
  background-color: orange;
}
```
- 위와 같이 자식 요소의 `min-width`가 부모 요소의 `width`보다 긴 경우, 부모 요소를 넘어 길어질 수 있다. (`height`도 당연히 마찬가지)

<br/>

## 2. `margin`, `padding`
- `margin`: 요소의 외부 여백(공간)을 지정하는 단축 속성
    - 기본값: `0`
    - `auto` 지정 가능
        - **세로** 너비(`height`)가 있는 요소의 가운데 정렬로 활용
    - 또는 px, em, vh 등 단위로 지정 가능
- **음수를 사용할 수도 있다!**
> 📌 단축 속성? <br/>: 서로 다른 여러 가지 CSS 속성의 값을 지정할 수 있는 CSS 속성<br/>예를 들어, `margin`은 `margin-top`부터 `margin-right`까지 4개의 개별 속성으로 이루어져 있는 단축 속성임
- `padding`: 요소의 외부 여백(공간)을 지정하는 단축 속성
    - 기본값, 값의 개수 등 `margin`과 동일
    - **padding의 너비만큼 요소의 크기를 키움**
- `padding`, `margin` 등의 속성은 값을 1개에서 4개까지 가질 수 있음
    - 1개: 모든 방향에 같은 너비의 여백
    - 2개: 상-하, 좌-우
    - 3개: 상, 좌-우, 하
    - 4개: 상, 우, 하, 좌 (위에서부터 시계 방향)

<br/>

## 3. `border`
```css
div {
    border: 선-두께 선-종류 선-색상;
}
```
- 요소의 테두리 선을 지정하는 단축 속성
    - `border-width`, `border-style`, `border-color` 등
        - `border-color`의 경우 `transparent`를 값으로 지정 가능
    - px, em, % 등 단위로 지정
- `padding`과 마찬가지로 요소의 크기를 키움
- `border-radius`: 모서리 깎기
    - 모서리에 **지정된 픽셀만큼을 반지름으로 갖는 원**을 배치하고, 원을 초과한 모서리 부분을 깎는 개념
    - 마찬가지로 단축 속성임 (특정한 모서리만 깎을 수 있음)

<br/>

## 4. `box-sizing`
- `content-box`, `border-box`의 두 가지
    - `content-box`: 기본값. 요소의 내용(content)으로 크기 계산
        - 이 경우, padding은 내부 여백이긴 하지만 내용 바깥의 요소이므로 결국 요소 전체의 크기를 키우게 되는 것
    - `border-box`: 요소의 내용 + padding + border로 크기 계산

<br/>

## 5. `overflow`
- 요소의 크기 이상으로 내용이 넘쳤을 때, 보여짐을 제어하는 단축 속성
    - `visible`: 기본값. 넘친 내용을 그대로 보여줌
    - `hidden`: 넘친 영역을 잘라내어 화면에 아예 안 보이도록 감춤
    - `scroll`: x축, y축 모두에 스크롤바 생성
        - 어느 한 축에는 넘친 내용이 없더라도 두 축 모두 스크롤바 생성
    - `auto`: 넘친 부분만 스크롤바 생성

<br/>

## 6. `display`
- 요소의 화면 출력(보여짐) 특성
- 대부분 각 요소마다 이미 값이 지정되어 있음
    - `block`: `div` 등. 상자(**레이아웃**) 요소
    - `inline`: `span` 등. 글자 요소
    - `inline-block`: `input` 등. 글자 요소 특성 일부 + 상자 요소 특성 일부
- 따로 지정해서 사용하는 값이 존재
    - `flex`: 플렉스 박스. 1차원 레이아웃
    - `grid`: 그리드. 2차원 레이아웃
    - `none`: 보여짐 특성 없음 = 화면에서 사라짐 (아예 차지하는 영역이 없어짐)

<br/>

## 7. `opacity`
- 요소 투명도
- 기본값은  `1` 이며, 0~1사이의 소수점 숫자(`float`)를 넣어서 투명도 조절
    - `0`에 가까울수록 투명, `1`에 가까울수록 불투명
    - 소수점 앞의 0은 생략할 수 있음 (0.05 = .05)

<br/>

## 8. 글꼴(font)
- style, weight, family 등 글꼴을 제어하는 여러 속성이 존재
- `font-style`: 글자의 기울기
    - 기본값 `none`. 기울이려면 `italic`
- `font-weight`
    - 기본값 `normal` = 400
    - `bold` = 700
    - 100~900까지 100단위의 숫자 9개 중 임의로 입력 가능. 
- `font-size`
    - 기본값 `16px`
    - px, em, rem 등 단위로 지정
- `line-height`
    - 행간과 **유사**한 개념
    - 한 줄의 높이. 이 때 텍스트는 기본적으로 줄의 세로 정가운데에 정렬됨
    - 기본값으로는 브라우저의 기본 정의(1)를 사용
    - 임의의 숫자를 입력하여 **글꼴 크기의 배수로 지정**
    - px, em, rem 등 단위로 지정
```css
p {
    font-size: 30px;
    line-height: 1.5;
}
/* 폰트 크기의 1.4배만큼이 한 줄의 높이 */
```
  - 특히 px 등 단위를 직접 명시하여 지정하는 것보다, 1.5 내지는 150% 등 배수 단위로 지정하는 것이 권장됨
  - `font-family`: 글꼴 지정
    - 콤마로 구분하여 여러 값 지정 가능. 이 때 가장 앞의 폰트부터 우선적으로 적용됨
    - 폰트 이름에 띄어쓰기 등 특수문자가 포함된 경우 ""로 묶어야 함
    - **가장 마지막에는 글꼴계열을 반드시 작성해주어야 함**
        - 명시되어 있는 글꼴들 중 사용할 수 있는 서체가 아무것도 없는 경우, 마지막에 명시된 해당 글꼴계열 중 브라우저가 사용할 수 있는 폰트가 임의로 적용됨
