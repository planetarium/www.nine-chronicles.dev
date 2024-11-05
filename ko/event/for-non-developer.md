# 비개발자를 위한 2024 Modathon 참여 안내! 🎉

Nine Chronicles Modathon에 관심이 있는 비개발자 여러분, 환영합니다! 코딩이 처음이라도 걱정하지 마세요. 저희가 Nine Chronicles의 아바타 정보를 표시하는 간단한 웹사이트를 처음부터 끝까지 만들어보는 가이드를 만들었습니다. 🌟

가이드를 다 끝내고 나면, Modathon에 참가해 프로젝트를 제출할 수 있을 것입니다. 혹시 멋진 모드 아이디어가 있지만 너무 어렵다고 느껴진다면, Discord의 **#mod-ideas** 채널에서 개발자들과 협력할 수 있으니 걱정 마세요!

## 모딩 설정 및 목표

저희의 목표는 Nine Chronicles 아바타 정보를 표시할 수 있는 웹사이트를 만들기 위한 환경을 구성한 다음 [아바타 정보 Dapp 가이드](../tutorials/modding/avatar-information-dapp-guide)를 따라 웹사이트를 만들어볼겁니다.

튜토리얼이 끝나고 나서 본인의 아이디어를 추가한 새로운 앱을 만들어보세요!

## 1단계: 자바스크립트 및 Node.js 설치

저희는 웹사이트를 만들기 위해 **JavaScript (JS)**를 사용해야하지만 개발 편의성이 더 향상된 버전인 **TypeScript (TS)**를 사용할 예정입니다. TypeScript는 코드 작성 중 발생할 수 있는 오류를 미리 찾아주기 때문에 더 쉽고 안정적으로 개발할 수 있습니다. TypeScript에 대해 더 알고 싶다면 [여기](https://www.typescriptlang.org/)를 참고하세요.

이제 **Node.js**와 패키지 관리자인 **npm**을 설치해야 합니다. 이 도구들은 웹사이트를 만들기 위해 필요한 라이브러리들을 관리하는 역할을 합니다.

[여기](https://nodejs.org/en)에서 Node.js(npm 포함)를 다운로드하세요.

Node.js와 npm이 설치되면, 다음 단계로 넘어가시면 됩니다!  
![Node.js 설치](/images/event/2024modathon/install-nodejs.png){width=240}

## 2단계: 코드 에디터 설치 (VS Code)

이제 코드를 작성할 텍스트 에디터가 필요합니다. 저희는 **Visual Studio Code (VS Code)**라는 프로그램을 사용하길 적극 권장합니다. VS Code는 무료이고 처음 개발을 시작하기에 가장 적합한 에디터입니다.

1. [여기](https://code.visualstudio.com/)에서 VS Code를 다운로드하여 설치하세요.
2. 설치가 완료되면, VS Code를 열어 시작해보세요!  
![VS Code 설치](/images/event/2024modathon/install-vscode.png)

## 3단계: 새 폴더 생성 및 열기

VS Code에서 프로젝트를 위한 새 폴더를 만들고, 폴더를 열어 작업을 시작할 수 있습니다.

1. 컴퓨터에 작업을 진행할 프로젝트 폴더를 새로 만드세요.
2. VS Code를 열고, [가이드](https://code.visualstudio.com/docs/getstarted/getting-started#_step-1-open-a-folder-in-vs-code)를 따라 폴더를 여세요.

이제 코딩할 준비가 되었습니다!

## 4단계: npm이 제대로 작동하는지 확인

이제, 우리가 설치한 **npm**이 잘 작동하는지 확인할 차례입니다. VS Code에서 [터미널 > 새 터미널](https://code.visualstudio.com/docs/terminal/getting-started)을 클릭해 터미널을 엽니다.

터미널에서 아래 명령어를 입력하세요:

```bash
npm --version
```

버전 번호가 나타나면, 모든 설정이 올바르게 완료된 것입니다!  
![npm 버전 확인](/images/event/2024modathon/npm-version.png)

## 5단계: 웹사이트 만들기

이제 [React](https://react.dev/)라는 도구를 사용해 웹사이트를 만들 것입니다. React는 동적인 웹사이트를 쉽게 만들 수 있게 도와주는 라이브러리입니다.

터미널에서 아래 명령어를 입력해 프로젝트를 생성하세요:

```bash
npx create-react-app your-project-name --template @planetarium/9c-mimir-gql
```

`your-project-name`은 여러분이 원하는 프로젝트 이름으로 변경하세요! 이 명령어는 저희가 만들어둔 아바타 정보 웹사이트 템플릿을 다운로드합니다.

완료되면 **VS Code**에서 해당 폴더를 열어보세요:

1. **VS Code**에서 **파일 > 폴더 열기**를 클릭하세요.
2. 프로젝트 폴더(`your-project-name`)로 이동해 선택하고 열어주세요.

그다음, 아래 명령어들을 입력해 코드를 생성하고 프로젝트를 시작합니다:

```bash
npm run codegen
npm run start
```

이 명령어를 실행하면, 브라우저에 새로운 탭이 열리며 여러분이 만든 웹사이트를 볼 수 있을 것입니다! 🎉

이제 모든 준비가 완료되었으니, [아바타 정보 Dapp 가이드](../tutorials/modding/avatar-information-dapp-guide.md))를 따라 웹사이트를 완성해보세요.

가이드에서 **GQL** 같은 기술 용어를 볼 수 있을 텐데, 걱정하지 말고 단계별로 따라 하시면 웹사이트를 성공적으로 만들 수 있습니다.  
튜토리얼을 마친 후에 자신이 만들었던 웹사이트가 어떻게 동작하는지 이해해보세요.

## 6단계: README 파일 만들기

프로젝트를 GitHub에 업로드하기 전에 **README.md** 파일을 만들어야 합니다. README 파일은 프로젝트를 설명하고, 사용 방법 등 중요한 정보를 제공하는 문서입니다.

1. VS Code에서 프로젝트 폴더를 열고, 우클릭하여 **새 파일**을 선택하세요.
2. 파일 이름을 `README.md`로 설정하세요.

이제 `README.md` 파일을 열고, 프로젝트에 대한 기본적인 정보를 추가하세요. 예시:

```markdown
# 아바타 정보 웹사이트

이 웹사이트는 Nine Chronicles 아바타의 자세한 정보를 보여줍니다.

## 기능
- Nine Chronicles의 아바타 정보를 표시합니다.

## 사용 방법
1. 웹사이트에 접속해 아바타 주소를 입력하세요.
```

프로젝트 설명을 작성한 후 파일을 저장하세요. README 파일은 다른 사람들이 여러분의 모드가 어떤 것인지 이해하는 데 도움을 줍니다.

## 7단계: GitHub 계정 만들기 및 프로젝트 업로드

이제 여러분이 만든 웹사이트를 **GitHub**에 업로드할 차례입니다. GitHub는 개발자들이 프로젝트를 저장하고 협업하는 플랫폼으로, Modathon 제출을 위해 여러분의 프로젝트를 여기에 업로드할 수 있습니다.

### 1. GitHub 계정 만들기

1. [GitHub](https://github.com/)에 방문해 **Sign Up** 버튼을 클릭하세요.
2. 계정을 만드는 과정은 간단하니 따라 진행하시면 됩니다!

### 2. GitHub에 프로젝트 업로드

**레포지토리 생성하기**

1. GitHub 상단 오른쪽의 **New** 버튼을 클릭하세요.  
   ![레포지토리 생성](/images/event/2024modathon/create-repo-button.png)
2. 레포지토리에 이름(예: `my-avatar-website`)을 지정하고 간단한 설명을 추가한 후, 레포지토리를 **Public**으로 설정하세요.
3. **Create repository**를 클릭하세요.

**Git 설정하기**

프로젝트를 업로드하려면 컴퓨터에 Git이 설치되어 있어야 합니다. [여기](https://git-scm.com/)에서 Git을 다운로드하세요.  

Git 설치 후:

1. 터미널 또는 명령 프롬프트를 열고 이름과 이메일을 설정하세요 (GitHub 계정에서 사용한 이름과 이메일을 입력하세요):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**토큰(PAT) 생성하기**

업로드를 위해 개인 액세스 토큰(PAT)을 생성해야합니다. 아래 과정을 따라해주세요:

1. [GitHub Personal Access Token 설정 페이지](https://github.com/settings/tokens)로 이동하세요.
2. **Generate new token (classic)**을 클릭하고 필요한 권한을 선택하세요. 일반적인 사용을 위해서는 `repo` 권한이 필요합니다.
3. 토큰을 생성하고 복사하세요. **이 페이지를 떠난 후에는 다시 볼 수 없으니 안전한 곳에 저장하세요.**

**토큰 사용하기**

1. `git push` 명령어 실행 중에 Git에서 사용자 이름과 비밀번호를 요청할 때, **GitHub 사용자 이름**을 입력하세요.
2. 비밀번호 대신 **Personal Access Token**을 붙여넣으세요.

**프로젝트 GitHub에 업로드하기**

![레포지토리 생성](/images/event/2024modathon/created-repo.png)  
Remote Repository 설정을 위해 위의 **두 번째 명령어**를 사용하세요.

1. 터미널을 열고 아래 명령어를 실행하세요:

```bash
git remote add origin git@github.com:{UserName}/{Repository}.git
git branch -M main
git push -u origin main


```
2. `git push` 명령어 실행 중에 Git에서 사용자 이름과 토큰을 요청하면 입력하세요.

이제 여러분의 프로젝트가 GitHub에 업로드되어 다른 사람들이 볼 수 있게 되었습니다!

## 8단계: 계속 배우고 더 나아가기!

아바타 정보를 표시하는 간단한 웹사이트를 만드는 것도 훌륭한 첫 프로젝트이지만, 이 예제를 넘어서 학습을 이어가면 더욱 멋진 프로젝트를 만들 수 있습니다. 비슷한 예제로 제출된 항목은 Modathon 심사에서 중복으로 간주되어 불이익을 받을 수 있으니 주의하세요.

### 다음 단계: 자바스크립트 기본 학습 📚

기본적인 **JavaScript (JS)**의 문법과 사용법을 배우면 더 많은 웹 애플리케이션을 만들 수 있습니다. 또한 이번 가이드에서 사용한 **TypeScript (TS)**도 더 자세히 공부해보세요. TS와 JS의 차이점, 그리고 **React**의 동작 원리를 이해하면 웹사이트를 만드는 데 더 큰 도움이 될 것입니다.

다음과 같은 개념들을 공부해보세요:
- **JavaScript 문법**: JavaScript 코드를 작성하는 규칙과 구조.
- **TypeScript**: 타입이 추가된 자바스크립트로, 오류를 미리 방지해주어 개발을 더욱 원활하게 만듭니다.
- **React**: 동적이고 상호작용이 가능한 웹 페이지를 쉽게 만들 수 있는 라이브러리.

### 여러분이 만든 것 이해하기 🛠️

이 가이드에서 따라 한 작업이 어떻게 동작하는지 이해해보세요. Nine Chronicles 아바타 정보를 어떻게 가져오고 표시하는지 탐색하고, 더 많이 이해할수록 나중에 새로운 기능을 추가할 때도 쉽게 할 수 있을 것입니다.

### 마지막 단계: 웹사이트 배포하기!

최종적으로 여러분이 만든 웹사이트를 다른 사람들이 볼 수 있게 배포해야합니다. 저희는 **GitHub Pages**를 이용해 웹사이트를 배포하는 것을 적극 추천합니다.

"deploy React app to GitHub Pages"를 검색해보면 단계별로 배포 방법을 알려주는 다양한 튜토리얼을 찾아볼 수 있을겁니다.

## 9단계: Modathon 참가하기!
아바타 정보를 표시하는 간단한 웹사이트는 훌륭한 학습 프로젝트지만, 동일하거나 매우 유사한 프로젝트는 Modathon에서 중복으로 간주되어 불이익을 받을 수 있습니다.  
계속해서 학습하고, 여러분만의 독특한 방법으로 프로젝트를 발전시켜 보세요!

::: tip
인벤토리 조회 기능이나 현재 월드 보스 상태 표시 등 기존 예제를 넘어서는 기능을 추가해보세요. 작은 변화도 큰 차이를 만들 수 있으며, 그 과정에서 많은 것을 배울 수 있을 것입니다!
:::

여러분만의 특별한 변화를 더하면 Modathon에 제출할 준비가 끝난 것입니다. 행운을 빕니다, 그리고 즐거운 Modathon 되세요!
