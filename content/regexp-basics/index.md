---
emoji: 🌱
title: (JavaScript) 정규표현식 개념과 문법
date: '2021-12-30 22:04:12'
author: 규자
tags: JavaScript Regexp 정규표현식
categories: JavaScript frontend
---

## 정규표현식이란?

### ✅ 정규식 (Regular Expression)

문자열에서 특정 문자 조합을 찾기 위한 패턴이다.

JavaScript에서는 <strong>정규 표현식도 객체</strong>로서, `RegExp`의 `exec()`와 `test()` 메서드를 사용할 수 있다.

### 역할

- 문자 검색 (search)
- 문자 대체 (replace)
- 문자 추출 (extract)

> 📌 테스트 사이트:<br/>https://regexr.com/

<br/>

## 자바스크립트 정규식 생성

```js
// 예제 문자

const str = `
010-1234-5678
practice@email.com
https://gyutato.github.io/
The quick brown fox jumps over the lazy dog.
abbcccdddd
`
```

### 1. 생성자 함수 방식

```js
// new RegExp('표현', '옵션')
// new RegExp('[a-z]', 'gi')

const regexp = new RegExp('the', 'gi')
console.log(str.match(regexp)) // 'The', 'the'
```

### 2. 리터럴(Literal) 방식

```js
// /표현/옵션
// /[a-z]/gi

const regexp = /the/gi
console.log(str.match(regexp)) // 'The', 'the'
```

<br/>

## 메소드

메소드 | 문법 | 설명
--|--|--
test | `정규식.test(문자열)` | 일치 여부(Boolean) 반환
match | `문자열.match(정규식)` | 일치하는 문자의 배열 (Array) 반환
replace | `문자열.replace(정규식, 대체문자)` | 일치하는 문자를 대체

```js
let regexp = /the/gi;
console.log(str.match(regexp));
console.log(regexp.test(str));
console.log(str.replace(regexp, 'AAA'));
console.log(str); // 원본 데이터는 손상되지 않았음

str = str.replace(regexp, 'AAA');
console.log(str); // 재할당해주면 데이터가 수정됨
```

<br/>

## 플래그(옵션)

플래그 | 설명
--|--
g | 문자열 전체에서 일치하는 모든 문자 (global)
i | 영어 대소문자 구분 없이 일치 (ignore case)
m | 여러 줄로 간주하여 탐색 (multi line)

```js
console.log(str.match(/.$/gi)) // 일치값 없음
console.log(str.match(/.$/gim)) // 일치값 1개 있음
```

<br/>

## 패턴(표현)

패턴 | 설명
--|--
^ab | 줄(Line) 시작에 있는 ab와 일치
ab$ | 줄(Line) 끝에 있는 ab와 일치
. | 임의의 한 문자와 일치
a&verbar;b | a 또는 b와 일치
ab? | b가 없거나 b와 일치
{n} | n개 연속 일치
{n,} | n개 이상 일치
{n, k} | n개 이상 k개 이하 일치
[abc] | a 또는 b 또는 c
[a-z] (또는 [A-Z]) | a부터 z(또는 A부터 Z)까지의 문자 구간 중 일치
[가-힣] | 가부터 힣까지의 한글 문자 구간 중 일치. 즉 단일 자/모음을 제외한 모든 한글 형태소
\w | 63개 문자(Word. 대소영문 52개 + 숫자 10개 + _)에 일치
\b | boundary. 63개 문자에 일치하지 않는 문자 경계 (공백 문자 등 포함)
\d | 숫자(Digit)에 일치
\s | 공백(Space, Tab, 개행문자 등)에 일치
(?=) | 앞쪽 일치(Lookahead)
(?<=) | 뒤쪽 일치(Lookbehind)

```js
console.log(
    str.match(/\bf\w{1,}\b/) // f로 시작하는 모든 영단어가 찾아짐
    str.match(/.{1,}(?=@)/g) // @ 앞에 있는 단어(공백 또는 개행 문자로 구분된 문자열)가 찾아짐 (practice)
    str.match(/(?<=@).{1,}/g) // @ 뒤에 있는 단어가 찾아짐 (email.com)
)
```