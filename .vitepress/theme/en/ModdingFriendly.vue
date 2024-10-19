<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="text-container">
                <h1 class="title">Modding Friendly</h1>
                <div class="description">
                    <b>Nine Chronicles is modding-friendly</b>, making it easier for players and developers to create
                    mods with
                    various tools at their disposal.<br />
                    With <a href="/general/get-state/get-state-with-mimir-graphql" class="highlight">Mimir</a>, you
                    can easily access game data, and <a href="/general/chrono/how-to-use-chrono"
                        class="highlight">Chrono</a> allows you
                    to sign transactions seamlessly.<br />
                    Many mods are being actively developed within the <a
                        href="https://github.com/planetarium/awesome-9c" target="_blank" class="highlight">Nine
                        Chronicles Ecosystem</a>, and we encourage you to
                    try your hand at modding
                </div>
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
    word-break: keep-all;
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
