<template>
  <div class="hero">
    <div class="content">
      <img class="logo" src="/logo.png" alt="DevPortal Logo" width="200" height="200" />

      <h1 class="title">Welcome to <span class="highlight">Nine Chronicles</span></h1>
      <h3 class="sub-title">
        Dive into our tutorials, guides, and open-source
      </h3>

      <div class="buttons">
        <a href="/guide/getting-started" class="btn">Get started</a>
        <a href="/event/2024modathon" class="btn btn--outline">
          🎉 Modathon
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.highlight {
  color: #b81d82;
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
  word-break: keep-all;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.title {
  font-size: 56px;
  margin-bottom: 1rem;
  line-height: 64px;
  font-weight: 600;
}

.sub-title {
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
