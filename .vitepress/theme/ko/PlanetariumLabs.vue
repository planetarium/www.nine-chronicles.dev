<template>
    <div class="planetarium">
        <div class="content">
            <div class="image-container">
                <img src="/pl-logo.png" alt="GitHub logo" class="icon" />
            </div>
            <p>
                <a href="https://docs.nine-chronicles.com/introduction/planetarium-labs/team" target="_blank"
                    class="highlight">플라네타리움 랩스</a>은 커뮤니티 중심의 Web3 게임 회사입니다.<br />
                저희는 플레이어가 창작하고, 공유하며, 소유하고, 보상받을 수 있는 게임 경험을 통해 확장 가능하고 의미 있는 영향을 제공하는 것에 몰두하고 있습니다.<br />
            </p>
        </div>
    </div>
</template>

<style scoped>
.planetarium {
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

.image-container img {
    width: 200px;
    display: block;
    margin: 0 auto;
}

.image-container {
    width: 100%;
}

h1 {
    font-size: 36px;
    margin-bottom: 1rem;
    line-height: 64px;
}

p {
    font-size: 18px;
    color: #555;
}

a.highlight {
    color: #b81d82;
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}
</style>
