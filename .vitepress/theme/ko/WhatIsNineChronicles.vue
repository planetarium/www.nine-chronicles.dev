<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="image-container">
                <img src="/ninechronicles.jpeg" alt="Nine Chronicles Game" class="game-image" />
            </div>
            <div class="text-container">
                <div class="title">나인 크로니클이란?</div>
                <div class="description">
                    <a href="https://docs.nine-chronicles.com/introduction" target="_blank" class="highlight">나인 크로니클</a>은 <b>게이머들과 함께 운영하는 분산형 게임 네트워크</b> 위에서 돌아가는 오픈소스 온라인 RPG 입니다.<br/>
                    <b>게임 내 모든 정보는 블록체인에 기록되며</b>, 투명성과 보안을 제공합니다.
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
    margin-bottom: 120px;
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
    max-width: 500px;
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
    line-height: 2.5rem;
}

.description {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 1rem;
}

a.highlight {
    color: #b81d82;
    /* 강조를 위한 파란색 링크 */
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}
</style>
