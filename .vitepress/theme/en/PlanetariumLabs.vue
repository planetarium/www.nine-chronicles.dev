<template>
    <div class="planetarium">
        <div class="content">
            <div class="image-container">
                <img src="/pl-logo.png" alt="GitHub logo" class="icon" />
            </div>
            <div class="description">
                At <a href="https://docs.nine-chronicles.com/introduction/planetarium-labs/team" target="_blank"
                    class="highlight">Planetarium Labs</a>, we're expanding the possibilities of gaming with
                blockchain technology.<br />
                We are passionately obsessed to deliver scalable, meaningful impact through our gaming experiences,
                <b>where you can create, share, own & earn.</b>
            </div>
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
    max-width: 1000px;
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

.description {
    font-size: 20px;
    color: #555;
    margin-top: 20px;
    line-height: 28px;
}

a.highlight {
    color: #b81d82;
    text-decoration: none;
}

a.highlight:hover {
    text-decoration: underline;
}
</style>
