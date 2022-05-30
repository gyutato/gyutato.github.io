---
emoji: 🌱
title: (SaSS) 기본과 필요성 (CSS와의 차이)
date: '2021-12-29 22:04:12'
author: 규자
tags: Basics CSS SaSS SCSS markup style nesting
categories: frontend css/html
---
> 📌 Syntactically Awesome StyleSheets!<br/> 대규모 스타일시트를 잘 구조화하여 사용할 수 있도록 효율셩을 향상시켜준다. 

<br/>

## 1. CSS / Sass(Scss)
### 🤔 CSS 코드가 한 파일로 제작된다면?
- 가독성 저하: 어디서부터 어디까지 어떤 스타일을 담당하고 있는지 파악하기 어려움 (네스팅 불가)
- 중복 코드 혹은 레거시 코드를 생성하기 쉬움
- 단순 수정에도 전체 코드를 일일히 확인해야 함
- 프로젝트가 커질수록 단순 CSS로는 작업하는 속도가 느려짐
    - **즉, Sass(Scss) 개발은 선택이 아닌 필수가 되어가고 있음**
```css
/* css */

p {
    color: red;
}

p span {
    color: blue;
}

a:hover, a:focus {
    color: blue;
}
```
```scss
/* Scss */

p
    color: red

    span
        color: blue

a   
    &:hover,
    &:focus
        color: blue

```

<br/>

## 2. Sass(Scss) 7-1 패턴
💡 파일명에 `_`가 붙는 경우 `@import`되어 사용될 것으로 파악
- `sass/`
    - `abstracts/`
        - 변수, 함수, 믹스인 등 추상화되어야 할 것들
    - `base/`
        - 전체 스타일 중 기본이 되는 것들
    - `components/`
        - 버튼, 드롭다운, 인풋 등 독립된 요소로 제어할 수 있는 것들
    - `layout/`
        - 컴포넌트보다 큰 개념으로, 보다 넓은 섹션 (헤더, 푸터, 네비게이터 등)
    - `pages/`
        - 한 사이트를 구성하는 각 페이지
    - `themes/`
        - 다크, 라이트 모드 등 테마와 관련된 것
    - `vendors/`
        - 필요에 의해 사용하는 **외부 스타일** (jQuery, bootstrap 등)
    - `main.scss`

<br/>

## 3. Sass(Scss) 핵심 선택자 몇 가지
### `&`: 상위 선택자 참조

부모 선택자를 포함하여, 상위에 있는 모든 조상 선택자를 참조한다.
```scss
.btn {
    position: absolute;
    &.active {
        color:red;
    }
}

.fs {
    &-small {font-size: 12px;}
    &-big {font-size: 20px;}
}
```
```css
.btn {
    position: absolute;
}
.btn.active {
    color: red;
}

.fs-small {
    font-size: 12px;
}
.fs-big {
    font-size: 20px;
}
```

<br/>

## 4. Sass(Scss) 핵심 속성 몇 가지
### 1. 중첩된 속성: `:{ };`

동일한 네임스페이스를 가진 속성들을 하나의 코드블록`{}`으로 묶어줄 수 있음
```scss
.box {
    font: {
        weight: bold;
        size: 10px;
        family: sans-serif;
    };
}
```
```css
.box {
   font-weight: bold;
   font-size: 10px;
   font-family: sans-serif;
}
```

### 2. 변수 생성자 `$`

변수를 사용하면 여러 값을 한 번에 변경할 수 있다.

SCSS(SaSS)에서의 변수 역시 유효범위를 갖는다는 점에 주의해야 한다! 해당 변수가 선언된 중괄호 안에서 유효하고, 이후 재할당이 가능하다. 

```scss
.container {
    $size: 200px;
    position: fixed;
    top: $size;
    .item {
        $size: 100px;
        width: $size;
        height: $size;
    }
    left: $size;
}
```
```css
.container {
    position: fixed;
    top: 200px;
    left: 100px; 
    /* .item 내부에서 $size의 값을 변경했으므로, 그보다 밑에 있는
    left의 $size는 변경된 값을 가리키게 된다. */
}
.container .item {
    width: 100px;
    height: 100px;
    transform: translateX(100px);
}
```

### 3. `@import`: 다른 스타일시트를 불러와서 사용
### 4. `@mixin`
간단히 말하자면, 자주 쓰는 코드들의 집합으로, SCSS를 재사용성에 있어 훨씬 유리하게 해주는 장치이다. 아래 예시 코드는 텍스트가 콘텐츠 범위를 넘어갈 때 넘치지 않고 말줄임표로 생략될 수 있도록 만든 스타일인데, 아래 세 개 속성이 한 덩어리로 같이 쓰이기 때문에 이처럼  `@mixin`으로 묶어두면 간편하게 사용할 수 있게 된다.


적용은 `@include`라는 키워드를 사용하여 할 수 있다.

```scss
@mixin ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```

📌 한편, `@mixin`은 함수처럼 변수를 받아서 값을 유연하게 변경할 수 있다는 점도 큰 장점이다!
```scss
@mixin box($size: 100px, $color: orange) { /* 기본값 지정 */
    width: $size;
    height: size;
    background-color: $color;
}

.container {
    @include box(200px);
    .item {
        @include box; /* 기본값 100px이 사용됨 */
    }
}

.box {
    @include box($color: green); /* 키워드 인수 */
}
```

<br/>

### 5. `@function`
이름 그대로 함수와 유사한 기능을 한다. 인자로 넘겨진 변수 또는 값을 연산하여 평가 값을 반환한다. 이를 속성의 값으로 사용할 수 있다.
```scss
@function half-opacity($color) {
    $color: rgba($color, .5);
    @return $color;
}

h1 {
    color: text-opacity(blue);
}

/* 이후 투명도를 .3으로 변경해야 하는 상황에서, 모든 선택자의 color 속성을 찾지 않고 함수의 .5부분만 변경하면 된다. */
```

