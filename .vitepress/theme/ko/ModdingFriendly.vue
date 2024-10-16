<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="text-container">
                <h1>모딩 친화적</h1>
                <p>
                    나인 크로니클은 광범위한 <b>모딩 도구와 지원</b>을 제공하여 플레이어가 직접 콘텐츠와 수정 사항을 만들고 공유할 수 있습니다.<br />
                    <a href="/general/get-state/get-state-with-mimir-graphql" class="highlight">Mimir</a>를 사용해 GQL로 게임
                    데이터를 받거나, <a href="/general/chrono/how-to-use-chrono" class="highlight">Chrono</a>를 사용해 웹사이트에서 서명을
                    진행해 보세요.<br />
                    많은 모드들이 <a href="https://github.com/planetarium/awesome-9c" target="_blank" class="highlight">나인크로니클
                        생태계에서 제작</a>되고 있으며 모딩은 언제나 환영하고 있습니다.
                </p>
            </div>

            <div class="image-container">
                <img src="/dongli.png" alt="Nine Chronicles Game" class="game-image" />
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
    max-width: 300px;
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
