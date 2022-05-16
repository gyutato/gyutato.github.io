---
emoji: 🌱
title: (React) 리액트 공식문서 따라하기 1. 개발 환경 셋팅
date: '2022-05-21 15:27:12'
author: 규자
tags: Basics 리액트 react 자바스크립트 프론트엔드 javascript jsx node npm
categories: frontend react
---

[조은](https://euncho.medium.com/about) 님의 [프론트엔드 학습 로드맵](https://euncho.medium.com/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%95%99%EC%8A%B5-%EB%A1%9C%EB%93%9C%EB%A7%B5-91c3bc11dec0)에 따른 첫 번째 스프린트로, [React 공식 자습서](https://ko.reactjs.org/tutorial/tutorial.html#lifting-state-up-again)를 읽고 따라해보았다.

React에 대한 어떤 지식도 가정하지 않는다고 쓰여있긴 하지만, 꽤 불친절하게 다짜고짜 함수와 코드부터 제시하는 부분이 다수 있어서 공부가 필요한 부분들을 정리해가며 따라했다.

[리액트 공식 튜토리얼](https://ko.reactjs.org/docs/hello-world.html) 을 추가로 공부했다.

<br/>

# 🛠 자습서 환경설정: React 개발 환경 셋팅
이라고 쓰고 <u>`node.js`와 `npm` 뜯어보기</u> 라고 읽을 것이다.

<br/>

## 0. `create-react-app`
`create-react-app` 이란 React를 개발 및 관리하고 있는 페이스북이 좀 더 쉽고 빠르게 React 프로젝트를 시작할 수 있도록 제공하고 있는 툴이다. <u>자바스크립트</u>로 <u>웹 앱</u>을 다루는 데 사용된다는 특성상, 맨 땅에 React 프로젝트를 개발하고 실행하려면 `Babel`, `Webpack` 등 많은 설정을 거쳐야 하기 때문이다.

공식 가이드는 [여기](https://create-react-app.dev/)에서 확인할 수 있다.

<br/>

### 0-1. 🧐 `Node.js`, `npm`?

`create-react-app`을 사용하여 React 프로젝트를 개발하기 위해서는 `Node.js`를 설치해야 한다. 

#### 🤷‍♀️ 왜?
`Node.js`는 **JavaScript runtime environment**다. 기본적으로 자바스크립트의 런타임(실행) 환경은 브라우저이다. 각 브라우저들은 자바스크립트를 읽고 해석하기 위해 엔진들을 가지고 있는데, 그중 구글 크롬에서 사용되던 **v8 자바스크립트 구동엔진**을 따로 때어내서 출시했다. 이것이 `Node.js`이다.

즉, 브라우저 위에서 자바스크립트 엔진을 돌리는 것에서 벗어나, 로컬 PC에서 바로 자바스크립트를 읽고 해석할 수 있게 된 것이다.

이 `Node.js`를 설치하면 `NPM(Node Package Manager)`이 함께 설치되는데, 이 `NPM`을 통해 다양한 모듈(패키지)들을 다운받아 사용할 수 있다.

#### 🤷‍♀️ npm만 설치하면 안 될까?

React는 클라이언트 기반 라이브러리기 때문에, 그냥 `NPM`만 설치해도 `react`와 `react-dom` 라이브러리를 사용할 수 있다. 하지만 `Node.js`가 있으면 **`babel`(바벨)** 이라는 컴파일러 도구를 추가로 다운받아 <u>JS</u> 대신 **JSX**를 사용할 수 있다. 또한 ES6 문법을 ES5로 변환하는 기능을 갖고 있어, React를 다양한 브라우저 환경에서 실행시키는 것이 가능해진다. 

#### 🤷‍♀️ JSX?

`JSX`는 자바스크립트에 XML을 추가한 확장한 문법으로, 리액트로 프로젝트를 개발할 때 사용된다. 즉 공식적인 문법은 아니다. 브라우저에서 실행되기 전에 앞서 말한 `babel`을 사용하여 일반 자바스크립트 형태의 코드로 변환되어야 한다. **물론 [React 개발에서 JSX가 필수는 아니다](https://ko.reactjs.org/docs/react-without-jsx.html#gatsby-focus-wrapper)**.

<br/>

### 0-2. 🛠 `Node.js`를 조금만 더 이해해보자

#### 🗂 패키지?

자바스크립트에는 태생적으로 모듈 기능이 없다. 다만 `Node.js`는 CommonJS를 따르는 모듈 시스템을 채택하여 `Node.js`에서 사용할 수 있는 모듈인 **패키지**를 개발자들이 업로드 또는 다운로드할 수 있도록 `NPM`을 제공하는 것이다.

모듈이란 애플리케이션을 구성하는 개별적 요소를 말한다. 일반적으로 파일 단위로 분리되어 있으며 필요에 따라 애플리케이션은 명시적으로 모듈을 로드한다. 

모듈은 애플리케이션에 분리되어 개별적으로 존재하다가 애플리케이션의 로드에 의해 비로소 애플리케이션의 일원이 된다. 모듈은 기능별로 분리되어 작성되므로 개발효율성과 유지보수성의 향상을 기대할 수 있다.

이러한 모듈을 사용할 수 없다는 치명적 단점을 해결하기 위해 `Node.js`는 CommonJS를 따르는 모듈 시스템을 채택하였고, 모듈 단위로 각 기능을 분할할 수 있게 되었다.

이에 따라 `Node.js`에서 사용할 수 있는 모듈들을 **패키지화**하여 모아둔 저장소 역할과 패키지 설치 및 관리를 위한 CLI(Command line interface)를 제공하는 것이 바로 `NPM`이다.

자신이 작성한 패키지를 공개할 수도 있고 필요한 패키지를 검색하여 재사용할 수도 있다.

다운로드는 `npm cli`를 이용해 명령어를 입력하면 `npmjs.com` 사이트의 `npm registry`에 접근하여 이루어진다고 한다. 이를 통해 
`NPM` 생태계에 올라와 있는 다른 개발자들의 간편한 모듈 및 라이브러리들을 손쉽게 사용할 수 있다.

<br/>

#### 💽 패키지 설치와 `node_modules`

Node.js에서 사용할 수 있는 모듈인 패키지를 설치할 때에는 npm install 명령어 뒤에 설치할 패키지 이름을 지정한다.

```bash
$ npm install <package>
```

npm install 명령어에는 지역(local) 설치와 전역(global) 설치 옵션이 있다. 옵션을 별도로 지정하지 않으면 지역으로 설치되며, 프로젝트 루트 디렉터리에 `node_modules` 디렉터리가 자동 생성되고 그 안에 패키지가 설치된다. 

지역으로 설치된 패키지는 해당 프로젝트 내에서만 사용할 수 있다.

```bash
# 지역 설치
$ npm install <package>
```

전역에 패키지를 설치하려면 `npm install` 명령어에 `-g` 옵션을 지정한다. 전역으로 설치된 패키지는 전역에서 참조할 수 있다. 모든 프로젝트가 공통 사용하는 패키지는 지역으로 설치하지 않고 전역에 설치한다.

```bash
# 전역 설치
$ npm install -g <package>
```

전역에 설치된 패키지는 OS에 따라 설치 장소가 다르다.

- macOS의 경우
    - `/usr/local/lib/node_modules`
- 윈도우의 경우
    - `c:\Users\%USERNAME%\AppData\Roaming\npm\node_modules`

<br/>

#### `package.json`
`Node.js` 프로젝트에서는 많은 패키지를 사용하게 되고, 패키지의 버전도 빈번하게 업데이트되므로 프로젝트가 의존하고 있는 패키지를 일괄 관리할 필요가 있다. 

`NPM`은 `package.json` 파일을 통해서 프로젝트 정보와 패키지의 의존성(dependency)을 관리한다. 이미 작성된 `package.json`이 있다면 팀 내에 배포하여 동일한 개발 환경을 빠르게 구축할 수 있는 장점이 있다.

package.json을 생성하려면 프로젝트 루트에서 npm init 명령어를 실행한다.

```bash
$ npm init
```
```bash
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: {package} # 임의의 패키지 이름
```
위처럼, `npm init` 명령어를 사용하면 기본적인 설명과 함께 `package name`, `version`, `description` 등 여러가지 정보를 입력하도록 요구받는다. 이때 입력된 정보를 바탕으로 npm은 package.json 파일을 생성한다.

일단 기본 설정값으로 `package.json` 파일을 생성하고, 필요한 부분만 수정하는 방법이 더 편리할 수 있으므로 `npm init` 명령어에 `--yes` 또는 `-y` 옵션을 추가한다. 그러면 **기본 설정값**으로 `package.json` 파일을 생성한다.

```bash
$ npm init -y
```

`create-react-app`으로 생성한 `my-app` 디렉토리 내부에서 다시 한번 `npm init -y` 명령을 실행해본 결과는 다음과 같다:

```json
Wrote to /Users/gyuwonlee/Desktop/FE/react_tutorial/my-app/package.json:

{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.2.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "description": "This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).",
  "main": "index.js",
  "devDependencies": {},
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

`package.json`에서 가장 중요한 항목은 `name`과 `version`이다. 이것으로 패키지의 고유성을 판단하므로 생략할 수 없다. 

그리고 `dependencies` 항목에는 해당 프로젝트가 **의존**하는 패키지들의 이름과 버전을 명시한다. 여기서 의존하는 패키지란 <u>해당 프로젝트에서 참조하는 모듈</u>을 의미한다.

프로젝트를 진행할 때는 이미 만들어진 여러 패키지를 참조해서 사용하는데, `package.json` 파일의 `dependencies` 항목에 해당 패키지의 이름과 버전을 명시함으로써 의존성을 설정하는 것이다.

`devDependencies`에는 개발 시에만 사용하는 개발용 의존 패키지를 명시한다. 예를 들어 TypeScript와 같은 트랜스파일러는 개발 단계에서만 필요하고 배포할 필요는 없으므로 `devDependencies`에 포함시킨다.

package.json 파일에 명시된 의존 패키지들은 npm install 명령어를 사용하여 한번에 설치할 수 있으며, 설치된 패키지는 `node_modules` 폴더에서 찾아볼 수 있다.

<br/>

```toc
```
