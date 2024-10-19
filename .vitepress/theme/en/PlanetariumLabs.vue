<template>
    <div class="planetarium">
        <div class="content">
            <div class="image-container">
                <img src="/pl-logo.png" alt="GitHub logo" class="icon" />
            </div>
            <p>
                At <a href="https://docs.nine-chronicles.com/introduction/planetarium-labs/team" target="_blank"
                    class="highlight">Planetarium Labs</a>, we're expanding the possibilities of gaming with
                blockchain technology.<br />
                We are passionately obsessed to deliver scalable, meaningful impact through our gaming experiences,
                <b>where you can create, share, own & earn.</b>
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
