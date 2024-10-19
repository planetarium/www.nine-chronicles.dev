<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="image-container">
                <img src="/blacksmith-cat.png" alt="Nine Chronicles Game" class="game-image" />
            </div>

            <div class="text-container">
                <h1 class="title">커뮤니티 드리븐</h1>
                <div class="description">
                    커뮤니티는 게임의 미래를 그려나가는데 중요한 역할을 하며, <b>플레이어들의 피드백과 기여가 게임을 이끌어 나갑니다.</b><br />
                    나인크로니클은 커뮤니티를 항상 중시하고 있습니다.
                </div>
                <div class="description">
                    <a href="https://bit.ly/4dNfsIz" target="_blank" class="highlight">Discord</a>에서 모더, 오픈소스 기여자 등 많은
                    개발자들과 소통하고 있습니다. 자리는 항상 비어있으니 언제든 들어와주세요.
                </div>
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
    word-break: keep-all;
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

.title {
    font-size: 40px;
    margin-bottom: 1rem;
    font-weight: 600;
}

.description {
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
