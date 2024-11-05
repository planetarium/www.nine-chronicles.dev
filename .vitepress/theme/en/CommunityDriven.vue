<template>
    <div class="what-is-nine-chronicles">
        <div class="content">
            <div class="image-container">
                <img src="/blacksmith-cat.png" alt="Nine Chronicles Game" class="game-image" />
            </div>

            <div class="text-container">
                <h1 class="title">Join Our Community</h1>
                <div class="description">
                    We use <a href="https://bit.ly/4dNfsIz" target="_blank" class="highlight">Discord</a> as
                    our main community hub, and we encourage you to join and be part of the conversation.
                </div>
                <div class="description">
                    All repositories <a href="/guide/contributing/getting-started" class="highlight">related to Nine
                        Chronicles are open source</a>, and
                    we welcome your participation through discussions and issues on GitHub. <b>Your feedback and
                        questions
                        are always appreciated, and we're excited to see what ideas you bring!</b>
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
    padding: 0 20px;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 60px;
    word-break: keep-all;
    flex-wrap: wrap;
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
