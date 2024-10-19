<template>
    <div class="our-vision">
        <div class="content">
            <div class="buttons-container">
                <a href="https://github.com/planetarium/libplanet" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />
                    <div class="button-text">
                        <strong>Libplanet</strong>
                        <p>나인 크로니클에서 사용되는 블록체인 라이브러리</p>
                    </div>
                </a>
                <a href="https://github.com/planetarium/lib9c" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />

                    <div class="button-text">
                        <strong>Lib9c</strong>
                        <p>나인 크로니클의 블록체인 프로토콜을 확인해보세요</p>
                    </div>
                </a>
                <a href="https://github.com/planetarium/NCIPs" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />

                    <div class="button-text">
                        <strong>NCIP</strong>
                        <p>나인 크로니클에 의견을 내고 싶다면 NCIP를 확인해보세요</p>
                    </div>
                </a>
            </div>

            <div class="description">
                <h1>풀 블록체인 게임</h1>
                <p>
                    모든 데이터는 트랜잭션을 통해 <b>블록체인에 기록되어 투명하게 공개</b>하고 있습니다.<br />
                    트랜잭션들은 <b>검증자들에 의해 검증</b>되며, 탈중앙화된 방식으로 유저와 함께 네트워크를 운영합니다.<br />
                    자세한 네트워크 프로토콜은 Lib9c 레포지토리를 통해 공개 되어있습니다.<br />
                    만약 <a href="https://github.com/planetarium/NineChronicles" target="_blank" class="highlight">나인
                        크로니클</a> 같은 게임을 만들고 싶으시다면 Libplanet을 확인해보세요.
                </p>
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
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    gap: 40px;
    word-break: keep-all;
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

p {
    font-size: 14px;
    margin: 0;
}

.description {
    flex: 1;
}

.description h1 {
    font-size: 40px;
    margin-bottom: 20px;
}

.description p {
    font-size: 20px;
    line-height: 1.6;
}

a.highlight {
    color: #b81d82;
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}
</style>
