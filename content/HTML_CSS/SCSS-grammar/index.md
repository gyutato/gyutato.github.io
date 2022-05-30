---
emoji: 🌱
title: (SCSS) 반복문, 함수 그리고 재활용
date: '2022-01-04 22:04:12'
author: 규자
tags: Basics CSS SaSS SCSS markup style nesting
categories: frontend css/html
---
> 📌 `@for`, `@mixin`, `@function` 등 코드의 재활용성을 높이는 키워드를 통해 vanilla CSS보다 훨씬 간결한 스타일 코드를 작성해 보자.

<br/>

## 🔁 반복문 

### 1. `@for`
반복문을 사용하면 `nth-child` 등 연속되는 여러 요소에 동일한 속성을 빠르게 적용할 수 있다.

`@for`, `from`, `through` 등의 키워드와 함께 사용하며, 보간법을 사용할 수 있어 유용하다.

다만, 자바스크립트의 보간법은 `${ }`이었다면 SCSS에서는 `#{ }`으로 사용해야 한다. SCSS에서 `$`는 이미 변수를 만드는 용도로 사용되고 있기 때문이다.

```scss
@for $i from 1 through 10 { /* 총 10번 반복. 제로베이스가 아니다! */
    .box:nth-child(#{$i}) { 
    /* 괄호 내부는 값을 적는 부분이 아니므로, # 을 통해 보간법을 사용한 것. */
        width: 100px * $i;
        /* 연산자 뒤는 값을 적는 부분이 맞으므로 보간법을 사용하지 않아도 된다. */
    }
}
```

### 2. `@each`
SCSS는 JS의 배열과 유사한 `list`, 객체와 유사한 `map`이라는 데이터 종류를 지원한다. `list`의 경우 SCSS에서 취급할 수 있는 기본적인 데이터를 **순서**대로 명시한 데이터이며, `map`의 경우 key-value 형태로 데이터를 취급할 수 있으며 순서(인덱스)가 없다.
```scss
$list: orange, royalblue, yellow;
$map: (
    o: orange,
    r: royalblue,
    y: yellow
);
```
이러한 데이터들에 대해 `@each` 키워드를 사용하면, 그 요소들을 반복적으로 순회할 수 있다. 
```scss
$list: orange, royalblue, yellow;
$map: (
    o: orange,
    r: royalblue,
    y: yellow
);

@each $k, $v in $map {
    .box-#{$k} {
        color: $v;
    }
}

/* CSS 변환 */
.box-o {
    color: orange;
}
.box-r {
    color: royalblue;
}
.box-y {
    color: yellow;
}
```

<br/>

## 🛠 함수

### 1. `@function`

여타 언어의 함수와 다를 것 없이, 파라미터를 받아 결과값을 연산해낸 후 이를 반환한다. 속성의 값으로 사용할 수 있다.

```scss
@function ratio($size, $ratio) {
    @return $size * $ratio
}

.box {
    $width: 100px;
    width: $width;
    height: radio($width, 1/2);
}
```

### 2. 색상 관련 내장 함수 🎨

#### 1) `mix`
주어지는 두 인수의 색상을 섞어서 새로운 색상을 내어 준다.
```scss
$color: royalblue;
.box {
    background-color: mix($color, red); 
    /* 보라색 계열의 색상이 적용될 것이다. */
}
```

#### 2) `lighten`, `darken`
원본 색상의 밝기를 밝거나 어둡게 조절할 때 사용할 수 있다. 주로 버튼에 커서를 올렸을 때와 같은 상황에서 유용하게 쓰일 수 있다.
```scss
$color: royalblue;
.btn {
    background-color: lighten($color, 10%); 
    /* 원본 색상보다 10% 밝은 색상을 적용 */
    &:hover {
        background-color: darken($color, 10%); 
        /* 원본 색상보다 10% 어두운 색상을 적용 */
    }
}
```

#### 3) `saturate`, `desaturate`, `grayscale`
원본 색상의 채도를 올리거나 내릴 때 사용할 수 있다. `grayscale`의 경우에는 흑백으로 만들 하나의 색상 인자만 필요하며, %와 같은 수치는 필요하지 않다.
```scss
$color: royalblue;
.btn {
    background-color: saturate($color, 40%); 
    /* 원본 색상보다 채도가 40% 올라간 색상을 적용 */
    &:hover {
        background-color: desaturate($color, 40%); 
        /* 원본 색상보다 채도가 40% 내려간 색상을 적용 */
    }
    &:focus {
        background-color: grayscale($color); 
        /* 해당 색상이 흑백으로 보여짐 */
    }
}
```

#### 3) `invert`
색상을 반전시킨다.
```scss
$color: royalblue;
.btn {
    background-color: invert($color);
    /* 파란색에서 반전되어 노란색 계열의 색이 적용된다. */
}
```

#### 4) `rgba`
색상의 투명도를 조절할 수 있다. 

```scss
$color: royalblue;
.btn {
    background-color: rgba($color, .5);
    /* 해당 색상이 반투명하게 적용된다. */
}
```

표준의 CSS에서도 rgba 함수를 사용할 수 있었는데, 이때 (0,0,0,.5)와 같은 식으로 4개의 인수를 사용하여 색상을 직접 명시해야 했다. 하지만 SCSS에서는 변수를 사용하여 오직 2개의 인수만으로 보다 편리하게 사용할 수 있다.


<br/>

## 🔄 재활용

### 1. `@mixin`
우리가 알고 있는 **CSS 코드의 모음**이다. 즉 CSS 속성과 값을 쭉 나열한 후 하나의 코드블록으로 묶어 여러 곳에 손쉽게 적용하고 재활용하는 것. 디자인에서의 preset과 유사하다.

한편, 위에서 본 `@function` 등의 함수는 실제로 어떤 값을 **연산**하여 **반환된 결과**를 사용하기 위해 만들어낸 개념이라고 생각할 수 있다.

즉, @mixin은 일반적으로 **CSS 스타일**을 다루는 용도, @function은 일반적인 **값**을 어떻게 처리할지에 대한 내용을 다루는 용도로 사용한다.

### 2. `@content`
`@mixin` 내부에서 `@content`를 선언하면, 이후 해당 믹스인을 `@include`하여 사용할 때 중괄호를 열어 해당 믹스인 내부의 `@content` 위치에 추가로 속성을 더할 수 있다.
```scss
@mixin left-top {
    position: absolute;
    top: 0;
    left: 0;
    @content;
}

.box {
    width: 200px;
    height: 300px;
    @include left-top {
        bottom: 0;
        right: 0;
        margin: auto;
        /* 이상 세 가지의 속성이 추가로 믹스인의 @content 위치에 더해져 CSS로 변환된다 */
    }
}
```


