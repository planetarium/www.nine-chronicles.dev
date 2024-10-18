<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="image-container">
                <img src="/blacksmith-cat.png" alt="Nine Chronicles Game" class="game-image" />
            </div>

            <div class="text-container">
                <h1>Join Our Community</h1>
                <p>
                    We use <a href="https://bit.ly/4dNfsIz" target="_blank" class="highlight">Discord</a> as
                    our main community hub, and we encourage you to join and be part of the conversation.
                </p>
                <p>
                    All repositories <a href="/contributing/getting-started" class="highlight">related to Nine
                        Chronicles are open source</a>, and
                    we welcome your participation through discussions and issues on GitHub. <b>Your feedback and
                        questions
                        are always appreciated, and we're excited to see what ideas you bring!</b>
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
