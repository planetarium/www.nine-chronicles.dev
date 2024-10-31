<template>
    <div class="our-vision">
        <div class="content">
            <div class="buttons-container">
                <a href="https://github.com/planetarium/libplanet" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />
                    <div class="button-text">
                        <strong>Libplanet</strong>
                        <div class="button-description">나인 크로니클에서 사용되는 블록체인 라이브러리</div>
                    </div>
                </a>
                <a href="https://github.com/planetarium/lib9c" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />
                    <div class="button-text">
                        <strong>Lib9c</strong>
                        <div class="button-description">나인 크로니클의 블록체인 프로토콜을 확인해보세요</div>
                    </div>
                </a>
                <a href="https://github.com/planetarium/NCIPs" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />
                    <div class="button-text">
                        <strong>NCIP</strong>
                        <div class="button-description">나인 크로니클에 의견을 내고 싶다면 NCIP를 확인해보세요</div>
                    </div>
                </a>
            </div>

            <div class="description-container">
                <h1 class="title">풀 블록체인 게임</h1>
                <div class="description">
                    모든 데이터는 트랜잭션을 통해 <b>블록체인에 기록되어 투명하게 공개</b>하고 있습니다.<br />
                    트랜잭션들은 <b>검증자들에 의해 검증</b>되며, 탈중앙화된 방식으로 유저와 함께 네트워크를 운영합니다.<br />
                    자세한 네트워크 프로토콜은 Lib9c 레포지토리를 통해 공개 되어있습니다.<br />
                    만약 <a href="https://github.com/planetarium/NineChronicles" target="_blank" class="highlight">나인
                        크로니클</a> 같은 게임을 만들고 싶으시다면 Libplanet을 확인해보세요.
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.our-vision {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 120px;
    padding: 0 20px;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 40px;
    word-break: keep-all;
    flex-wrap: wrap;
}

.buttons-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    max-width: 450px;
}

.button {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: #333;
    transition: transform 0.2s;
}

.button:hover {
    transform: translateY(-5px);
    color: #b81d82;
}

.icon {
    width: 30px;
    height: 30px;
    margin-right: 15px;
}

.button-text {
    display: flex;
    flex-direction: column;
}

strong {
    font-size: 18px;
}

.description {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 1rem;
}

.button-description {
    font-size: 14px;
    margin: 0;
}

.description-container {
    flex: 1;
}

a.highlight {
    color: #b81d82;
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}

.title {
    font-size: 40px;
    margin-bottom: 1rem;
    font-weight: 600;
}

@media (max-width: 768px) {
    .content {
        flex-direction: column;
        gap: 30px;
    }

    .title {
        font-size: 32px;
    }

    .description {
        font-size: 18px;
        line-height: 28px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 28px;
    }

    .description {
        font-size: 16px;
        line-height: 24px;
    }
}
</style>