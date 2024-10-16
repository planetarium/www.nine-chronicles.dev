<template>
  <div class="hero">
    <div class="content">
      <!-- <div class="modathon-button">
        <a href="/event/2024modathon" class="btn btn--border-only">🎁 Modathon 2024</a>
      </div> -->
      <img class="logo" src="/logo.png" alt="DevPortal Logo" width="200" height="200" />

      <h1>Welcome to <span class="title">Nine Chronicles</span></h1>
      <h3>
        Dive into our tutorials, guides, and open-source
      </h3>

      <div class="buttons">
        <a href="/modding/getting-started" class="btn">Get started</a>
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

.modathon-button {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
}

.btn--border-only {
  background-color: transparent;
  color: #000;
  padding: 2px 30px;
  border: 1px solid #b81d82;
  border-radius: 140px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
}

.btn--border-only:hover {
  color: #000;
}
</style>
