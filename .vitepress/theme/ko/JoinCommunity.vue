<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="image-container">
                <img src="/blacksmith-cat.png" alt="Nine Chronicles Game" class="game-image" />
            </div>

            <div class="text-container">
                <h1>커뮤니티 지원</h1>
                <p>
                    <a href="https://bit.ly/4dNfsIz" target="_blank" class="highlight">Discord</a>에서 모더, 오픈소스 기여자 등 많은
                    개발자들과 소통하고 있습니다. 자리는 항상 비어있으니 언제든 들어와주세요.
                </p>
                <p>
                    <a href="/contributing/getting-started" class="highlight">나인크로니클과 관련된 모든 레포지토리</a>는 전부 오픈소스 입니다.<br />
                    Discussions 또는 Issue를 통해 오픈소스에 참가하실 수 있으며 피드백과 질문은 언제나 환영합니다.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.what-is-nine-chronicles {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
}

.image-container {
    flex: 1;
    max-width: 400px;
}

.game-image {
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 15px;
}

.text-container {
    flex: 1;
}

h1 {
    font-size: 40px;
    margin-bottom: 1rem;
}

p {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 1rem;
}

a.highlight {
    color: #b81d82;
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}
</style>
