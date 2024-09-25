<template>
    <div class="logo">
        <img src="/assets/images/logo.png" alt="Homebrew Logo" />
        <h1>Homebrew</h1>
    </div>
</template>

<style lang="scss">
.logo {
    display: flex;
    gap: 0.6rem;
    height: 3.2rem;
    align-items: center;

    img {
        position: relative;
        height: 2.4rem;
        top: -0.2rem;
    }

    h1 {
        color: var(--color-on-surface);
        font-family: var(--font-logo);
        font-size: 2.8rem;
        font-weight: 400;
    }
}
</style>
