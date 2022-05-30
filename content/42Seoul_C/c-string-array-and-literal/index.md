---
emoji: 🌱
title: (C) 문자 배열과 문자열 리터럴
date: '2022-04-09 13:08:12'
author: 규자
tags: C
categories: C 42Seoul
---

## 🙌 (서론) 문자열의 끝
작년 IPv6 소켓 프로그래밍 때 초반에 가장 애먹었던 부분... 왜 `read()` 함수가 끝나질 않는가!

```cpp
char   buffer[1024];

/* send my stdID to server and receive next inquiry */
memset(buffer, 0x00, sizeof(buffer));
read(0,buffer,sizeof(buffer)); //fgets-fputs 방식의 경우 %s 뒤의 개행문자로 인해 입력이 종료됨 (서버가 반응할 수 없음)
printf("%s", buffer);
```
이게 소켓 클라이언트 코드의 일부로, 서버로부터 질문을 읽어들여 그에 대한 답변을 전송해야 했다.

`read()` 시스템 콜은 파일의 끝(`EOF`)를 알려주기 위해 `0`을 반환한다. 파일에 읽은 바이트가 더 이상 없을 경우에 해당하며 에러로 처리되지는 않는다. 다만, 파일을 읽을 데이터가 더 이상 없을 뿐임을 알려주는 것이다. 하지만, 파일 끝에 도달한 것과 달리 **파일에 len 바이트 만큼 읽으라고 요청하였지만 읽은 데이터가 없다면**, `read()` 함수는 읽은 바이트가 생길 때 까지 블록된다. 이 경우는 `EOF`와 다르다. 즉, 사용 가능한 데이터가 없다는 것과 파일의 끝이라는 것은 차이가 있다. 블록되는 경우는 읽기 과정에서 더 많은 데이터를 기다림을 의미하게 된다.

만약 단일 프로세스로 실행되는 프로그램이었다면, 예를 들어 위의 클라이언트와 같은 경우 서버로부터 읽을 데이터가 더 들어올 때까지 작동을 중단한다 (사실은 데이터를 기다리고 있는 것이다). 반대로 서버는 답변이 오지 않으니까 데이터를 더 보내지 않고... 노답 상태에 봉착하는 것이다. 

그래서 문자열의 끝을 프로그램에게 정확히 알려 주는 것도 중요하고, 반대로 문자열의 끝을 만난 경우 **더 이상 읽어들이지 않는 것**도 중요하다(고 생각한다).

<br/>

### 📌 그래서 왜 안되는건데?
```cpp
char   buffer[1024];

/* send my stdID to server and receive next inquiry */
memset(buffer, 0x00, sizeof(buffer));
read(0,buffer,sizeof(buffer)); 
read(0,buffer,sizeof(buffer)); // 한번 더 read()함 --> 프로세스 블록
printf("%s", buffer); // 실행 안됨
```

처음에 내가 오류를 냈던 코드는 이렇다. 이 `read()` 함수 한 줄이 프로그램 자체를 블록시켜서(;;) 애를 먹은 거다. 시스템 콜의 강력함을 배웠다. 암튼, 직관적으로 생각했을 때 서버와 클라이언트가 `read()`와 `write()` 시스템 콜로 통신한다는 것은 당연하게도 하나의 파일을 공유하고 있음을 의미한다. 서버는 `a`파일로 응답을 보내고 있는데 클라이언트는 `b`파일에다 요청을 보내면 당연히 소통이 이루어질 수 없으니까. 

그렇다면 또 당연하게도, 소통이 이어지려면 서버든 클라이언트든 자신이 어디까지 읽어들였는지 알고 있어야 '새롭게' 들어오는 응답 또는 요청에 반응할 수 있게 된다. 정말 당연하다. 그래서 `offset`을 이동시켜 답변을 읽어들이거나 요청 또는 응답을 작성할 새로운 위치를 표시한다. 

그러니까 나는 `read(0,buffer,sizeof(buffer));`로 모든 바이트를 읽어들였으므로 오프셋은 EOF 다음 바이트를 가리키게 된다. 그 다음 `read()`로 또 읽어들이면 EOF도 더 읽어들일 바이트도 없게 되어 프로세스가 블록되어버리는 것이다.

<br/>

### 📌 원하는 곳에 읽고 쓰기: `lseek()`
```cpp
#include <sys/types.h>
#include <unistd.h>
off_t lseek(int fd, off_t offset, int whence);
```
read/write할 file의 위치를 이동하거나 현재 파일의 읽거나 쓰기할 위치를 얻는 함수입니다. stdio.h의 ftell함수와 같은 읽기/쓰기 위치를 얻는 system call함수는 없으며, lseek(fd, 0, SEEK_CUR);의 return 값으로 현재 위치를 얻을 수 있다.

다만, 파일의 크기보다 큰 위치로 이동되어도 오류가 발생하지 않으며 파일의 크기도 바뀌지 않는다. 파일의 끝을 벗어난 곳에서 `write()`를 호출하면 그 위치에서 파일이 `write` 되며, 기존의 파일의 끝과 `write`한 곳 사이에는 `0x00`으로 값이 설정된다. 자나깨나 오버플로우 조심.

파일 입출력 시 유의할만한 내용들이므로 생각난김에 정리해 보았다. 하지만 아직 파일 입출력을 본격적으로 공부하지 않았으므로 일단 이 정도 개념만 얼추 파악해 놓고 추후 제대로 공부해봐야 한다.

<br/>

## 🔚 (본론) 문자 배열과 문자열 상수
**질문:**
- 우리가 흔히 문자열이라고 부르는 `"abcdef"`와 같은 값들은 C언어 내부에서 어떤 자료형으로, 어떻게 처리될까?
- 아래 코드의 두 변수의 차이를 구분할 수 있는가?
```cpp
char *test = "abcdef";
char test[] = "abcdef";
```
이제부터 ARABOZA!

<br/>

### 1. 문자열 리터럴
바로 위의 코드를 다시 보자:
```cpp
char *test = "abcdef";
char test[] = "abcdef";
```

우선, `char *test`든 `char test[]`든 초기화에 사용한 값은 `"abcdef"`로 같다. 여기서 `"abcdef"`같은 형태의 값을 **문자열 리터럴** 이라고 한다. 즉 메모리 어딘가에 이 문자열 리터럴의 값을 먼저 올린다. 문자열 리터럴이 메모리에서 차지할 크기를 먼저 알지 못하면 `char test[]`에게 얼만큼의 공간이 할당되어야 하는지 알 수가 없다.

즉 변수 초기화 시 먼저 `"abcdef"`가 `const char` 문자열 리터럴로 `DATA`에 저장되고, 프로그램과 라이프타임을 같이 하게 된다.

<br/>

### 2. 배열 변수를 문자열 리터럴로 초기화
우리는 이를 일반적으로 그냥 '문자열'이라고 부르지만, 이렇게 메모리에 올라 있는 문자열 리터럴을 **배열의 초기값**으로 사용하는 경우 이 변수는 '문자 배열'이 된다. 

다만 `int arr[4] = {1, 2, 3, 4};`와 같이 각 원소를 한 개씩 배열 항목에 대입하는 것과는 조금 다른 방식이 사용된다. **이 `abcdef` 문자열 리터럴이 저장된 메모리 '시작'주소를 이용해서 배열 변수에 (문자열 길이)+1 크기의 메모리를 복사**하는 것이다.

중요한 것은 그 문자열 리터럴을 직접 가리키는 것이 아니라 **복사**해온다는 점이다! 이렇게 복사된 값을 `char`배열에 저장함으로써 `[]`를 이용한 포인터 연산 시 `char`자료형의 크기만큼 잘 읽어들여 사용하거나 변경할 수 있는 것이다.

> 이 때의 `"abcdef"`는 배열 `test[]`의 초기화리스트로 사용되어 STACK에 할당된다. 라이프타임은 함수와 함께한다.

이러한 문자 배열은 그 배열의 끝에 문자열이 끝났음을 알려주는 **종료 문자**를 갖고 있다. 그래서 위에서 **(문자열 길이)+1 크기의 메모리**를 복사한 것이다. 이 종료 문자는 아스키 값이 `0` 이고, `\0` 라고도 나타낸다. 절대 문자 `'0'` 하고 헷갈리면 안된다! 문자 `'0'` 은 아스키 코드 값이 `0` 이 아니라 `48` 이다. 흔히, 이 종료 문자를 가리켜서 `널(Null)` 이라고 부른다.

```cpp
char null_1 = '\0';  // 이 3 개는 모두 동일하다
char null_2 = 0;
char null_3 = (char)NULL;
```
이 `NULL` 문자가 들어갈 공간이 있어야 하기 때문에 n글자짜리 문자열을 위해 총 n+1칸의 배열이 필요하다. n글자 문자열을 n칸짜리 배열에 넣으면 배열 끝에 `NULL`이 들어가지 않으므로 문자열을 벗어난 메모리 범위를 읽게 되는 문제가 발생한다.

```cpp
char sentence[6] = "Hello";
printf("sentence : %s \n", sentence);
```
따라서 이처럼 `%c`가 아닌 `%s`, 즉 '문자열'로 출력해 달라는 것은 NULL이 나올 때 까지 배열의 원소들을 쭈루룩 출력해 달라는 뜻이 된다.

<br/>

### 3. 포인터 변수를 문자열 리터럴로 초기화
```cpp
char *test = "abcdef";
```
그럼 앞서 본 '문자 배열'과 위의 코드는 뭐가 다를까? 여기서 다시 한번 자료형의 중요성을 알 수 있다. 문자 배열은 `char[]`형이었다면, 여기서 변수 `test`는 `char *`자료형이다. 즉 값은 똑같이 문자열 리터럴으로 주어졌지만, 배열은 그 값을 '복사'해서 배열의 메모리 주소에 저장한 것이고 포인터는 이 문자열 리터럴 자체의 주소를 고대로 가리키고 있는 것이다. 

이 문자열을 가리키는 포인터의 자료형이 `char`이기 때문에,  `[]`를 이용한 포인터 연산으로 각 철자를 읽어 오는 것은 배열과 동일하게 가능하다. 그러나 이 메모리 공간의 값은 읽을 수만 있고 변경은 불가능하다.

<br/>

## 🤔 To be continue(궁금증)

여기까지 문자열을 얼추 정리했다면, 고생길을 여는 궁금증을 하나 생각해볼 수 있겠다. **문자열 리터럴 메모리 공간의 값은 왜 읽을 수만 있는가?** 다음 글부터 길고 복잡한 구글링의 여정을 떠나 볼 것이다. 
<br/>

```toc
```