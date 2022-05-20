---
emoji: 🌱
title: (C) 문자열 리터럴의 수정과 메모리 할당
date: '2022-04-09 14:08:12'
author: 규자
tags: C stringliteral string literal constant memory rodata readonly
categories: C 42Seoul
---

## 🤔 궁금증: 문자열 리터럴은 상수인가?

> ✋ **잠깐 !** 이전 글을 읽어야 이 궁금증에 공감할 수 있을 것이다.

<br/>

```cpp
int i = 0;
while(i++ < 1000000)
    char *test = "hello"
```
위의 코드처럼 문자열을 마구 사용하면 1,000,000개의 "hello" 가 DATA 영역에 올라갈까? 스택오버플로우에서 이를 질문한 게시글을 찾았고, 답변은 다음과 같았다:

> In some situations, string literals need to be translated to static arrays of characters. This happens at compile time. Your loop cannot allocate the static memory a million times; it's just not possible. A static variable can only be allocated once.

우선, 어떤 경우 문자열 리터럴들은 문자(`char`)의 정적 배열로 변환된다. 미리 메모리의 어느 공간을 어느 크기만큼 사용할지 땅땅 정해놓고 값을 집어넣는다는 뜻이다. 

이 정적 배열, 즉 `static array`는 앞서 말했듯 함수가 아닌 프로그램과 수명을 같이 하는 정적 변수이므로 컴파일 단계에서 미리 메모리 할당이 이루어지는 Data 영역에 올라간다. 이렇게 할당된 메모리의 크기는 런타임 즉 실행 단계에서의 조작으로 늘리거나 줄일 수 없다.

> The compiler can allocate static memory for each string literal that it sees in the source code. The compiler *may* use the same static memory for identical string literals, so after `char* p = "Hello"; char* q = "Hello";` `p` and `q` *may* be equal or not equal. 

그래서 컴파일러는 문자열 리터럴에 대해 정적 메모리를 할당할 수 있다. 이 떄 컴파일러는 동일한(same이 아니라 identical) 문자열 리터럴에 대해 동일한 정적 메모리 위치를 **사용할 수도 있고 아닐 수도 있다**. 

즉 위 답변의 예시처럼 `"Hello"`를 한 개만 저장해서 `p`와 `q` 둘 다 같은 걸 가리키게 만들 수도 있다. 이 때 두 포인터 중 하나를 사용해서 리터럴의 값을 수정하면, 다른 한 포인터가 가리키는 값도 마찬가지로 변하게 된다. 이는 당연히 여러 가지 버그를 발생시킬 것이다.

> The compiler *may* use the same static memory for the same sequence of bytes, so after `char* p = "Hello"; char* q = "ello";` `&p[1]` and `&q[0]` may be equal or not equal.

또한 동일한 순서로 연속되는 바이트에 동일한 정적 메모리 위치를 **사용할 수도 있고 아닐 수도 있다**. 

<br/>

### 🧐 문자열 리터럴이 상수'는' 아니다

```cpp
char *test = "abcdef";
test[0] = 'A';
printf("%s", test); // Abcdef or Seg fault?
```
위의 코드를 실행시키면 대부분의 경우 Seg fault를 내뱉는다.

```cpp
test[0] = 'A';
```
 test[0]은 포인터가 가리키는 '값'이다. 이 값을 이것을 `'A'`로 바꾸는 연산은, 메모리의 어느 영역에 `'A'`라는 값으로 `write`를 하는 것이다. 물론, `Read`, `Write`가 가능한 영역이면 당연히 코드가 작동할 것이다. 즉 경우에 따라 수정이 가능할 수도 있으므로 엄밀히 '상수'라고 말하기는 어렵다.

**그러나 만약에 이 리터럴이 Read Only 영역에 들어가 있는 경우에는 어떻게 될까.** 

<br/>

### 🤷‍♀️ 문자열 리터럴을 수정(시도)하면?

어떤 문자열 리터럴이 메모리의 어느 영역에 저장되는지에 대한 답은 없다 (라고 스택오버플로우가 그랬다). 운이 좋게도, 쓸 수 있는 곳에 리터럴이 생성되었다면, 수정을 해도 별 문제가 없을 것이다 (여러 포인터가 공유하고 있지 않다면). 그렇지 않다면 access 위반이다. 어떤 상황이 벌어질 지 알 수 없다. 다시 말해, 정의되어 있지 않다.

이에 관해 스택오버플로우에서 C99 N1256 문서의 "Initialization" 항목을 인용한 답변을 찾을 수 있었다:
<hr/>

**EXAMPLE 8: The declaration**

```cpp
char s[] = "abc", t[3] = "abc";
```
defines "plain" char array objects `s` and `t` whose elements are initialized with character string literals.

This declaration is identical to
```cpp
char s[] = { 'a', 'b', 'c', '\0' },
t[] = { 'a', 'b', 'c' };
```
The contents of the arrays are modifiable. On the other hand, the declaration
```cpp
char *p = "abc";
```
defines `p` with type "pointer to char" and initializes it to point to an object with type "array of const char" with length 4 whose elements are initialized with a character string literal. If an attempt is made to use `p` to modify the contents of the array, the behavior is undefined.
<hr/>

한 마디로 그냥 **문자열 리터럴로 초기화된 포인터 변수**를 역참조하여 값(리터럴)을 수정하려는 시도의 결과는 **정의되어 있지 않다**는 소리다.

그럼 대체 문자열 리터럴이 어디에 저장되어 있길래 '불가능'도 아니고 'undefined'일까??

<br/>

### 🤦‍♀️ 문자열 리터럴은 어디로 가는가
대표적인 C 언어 컴파일러 GCC는 `char` 파생 자료형을 다음 메모리 영역에 올린다:
<hr/>

- `char s[]`: stack
- `char *s`:
    - `.rodata` section of the object file
    - the same segment where the `.text` section of the object file gets dumped, which has Read and Exec permissions, but not Write

<hr/>

우리의 문자열 리터럴을 가리킬 `char *s`자료형은 `.rodata` 또는 `.text` 영역이 덮어씌워지는 영역에 올라간다고 한다. 

먼저 `.rodata`란 read-only-data를 뜻한다. 즉 여기에 올라가면 읽기만 가능하다. 두 번째, `.text` 영역은 메모리의 `code` 영역으로, 실행할 프로그램의 코드가 기계어로 번역되어 저장되어 있는 곳이다. 프로그램이 실행되면, 이 영역에 있는 코드들이 한 줄씩 실행된다. **여기는 read-only** 영역이라 데이터들이 변경될 수 없다. 그런데 이 `.text` 영역이 덮어씌워지는 영역도 `Read` 와 `Exec`만 가능하다고 한다 (당연하다)

그러니 GCC 컴파일러를 사용하는 이상 문자열 리터럴의 수정은 어렵겠다.

<br/>

## 🤔 To be continue(궁금증)

메모리 구조에 대해 제대로 숙지하지 못한 상태에서 이것들을 이해하려 하니 조금 엉키는 느낌이 있어서, C 언어에서의 메모리 구조에 대해 조금 더 자세히 알아보려고 한다. 투비컨티뉴...

<br/>

### 💡 사족

역시 C언어답게 메모리와 프로세스, 운영체제 등에 대한 이야기가 조금씩 엮여 가는 것이 너무 재밌다. 자바스크립트를 공부하다가 오랜만에 C를 보니 컴퓨터를 직접 제어한다는 면에서 더 직관적이라, 오히려 포인터 같이 낯선 개념만 조금 익히면 다른 언어보다 훨씬 재밌게 공부할 수 있을 것도 같다. 

비전공자이다 보니 컴퓨터 구조나 운영체제 과목들을 들을 수는 있어도, 청강 또는 KOCW같은 플랫폼을 통해 수강한 경우도 있어 과제나 시험을 통한 실습이 어렵다는 점이 마음 한켠에 찜찜함으로 남아 있었다. 이렇게 텍스트로만 이해해도 되는 건가? 싶기도 하고. 그런데 C 코드를 조금씩 건드리면서 컴퓨터의 메모리나 운영체제 등 IDE 너머의 영역들을 조금씩 제대로 마주하게 되는 것 같아 신나고 공부가 너무 즐겁다!
<br/>

```toc
```

