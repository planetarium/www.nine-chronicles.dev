<template>
    <div class="our-vision">
        <div class="content">
            <div class="buttons-container">
                <a href="https://github.com/planetarium/libplanet" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />
                    <div class="button-text">
                        <strong>Libplanet</strong>
                        <div class="button-description">Check the full blockchain game library</div>
                    </div>
                </a>
                <a href="https://github.com/planetarium/lib9c" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />

                    <div class="button-text">
                        <strong>Lib9c</strong>
                        <div class="button-description">See the Nine Chronicles blockchain protocol</div>
                    </div>
                </a>
                <a href="https://github.com/planetarium/NCIPs" target="_blank" class="button">
                    <img src="/github.svg" alt="GitHub logo" class="icon" />

                    <div class="button-text">
                        <strong>NCIP</strong>
                        <div class="button-description">Check out Nine Chronicles Improvement Proposals</div>
                    </div>
                </a>
            </div>

            <div class="description-container">
                <h1 class="title">Fully On-Chain</h1>
                <div class="description">
                    All data is transparently <b>recorded on the blockchain through transactions</b>.<br />
                    Transactions are <b>validated by validators</b>, and the network is operated in a decentralized
                    manner
                    together with users.<br />
                    Detailed network protocols are available in the Lib9c repository.<br />
                    If you’re interested in building a game like <a href="https://github.com/planetarium/NineChronicles"
                        target="_blank" class="highlight">Nine Chronicles</a>, check out libplanet.
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
</style>
