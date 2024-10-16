<template>
  <div class="hero">
    <div class="content">
      <img class="logo" src="/logo.png" alt="DevPortal Logo" width="200" height="200" />

      <h1><span class="title">나인크로니클</span>에 오신것을 환영합니다</h1>
      <h3>
        각종 튜토리얼과 가이드들을 준비해두었습니다. 오픈소스에 참가해보세요!
      </h3>

      <div class="buttons">
        <a href="/modding/getting-started" class="btn">시작하기</a>
        <a href="https://github.com/planetarium" target="_blank" class="btn btn--outline">
          <img src="/github.svg" alt="GitHub logo" class="icon" />
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  color: #b81d82
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 100px;
}

.content {
  max-width: 800px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

h1 {
  font-size: 56px;
  margin-bottom: 1rem;
  line-height: 64px;
}

h3 {
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 2rem;
  color: #555;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 30px;
  background-color: #000;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 18px;
  transition: transform 0.3s ease, color 0.3s ease;
  will-change: transform;
}

.btn:hover {
  transform: translateY(-5px);
  color: white;
}

.btn--outline {
  background-color: #ebebef;
  color: #000;
}

.btn--outline:hover {
  color: #000;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  fill: #000;
}

.btn--outline:hover .icon {
  fill: white;
}
</style>
