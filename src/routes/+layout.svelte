<header>
    <a href="/"><img src="/images/KanimeLogo.svg" alt="Kanime" class="img" /></a>
</header>
<main>
    <slot />
</main>
<footer>
    <p>Version 1.0. Developed by <span>Sofiman</span> with <b>♥</b></p>
    <p>
        <a href="/">Privacy</a> •
        <a href="/">Developers</a> •
        <a href="mailto:contact@kanime.fr">Contact</a> •
        <a href="mailto:contact@kanime.fr">Submit a suggestion</a>
    </p>
</footer>

<style lang="scss">
    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    :global(html) {
        background: #181820;
        color: #FFFFFF;
        font-size: 100%;
        height: 100%;
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #181820;
        font-weight: 500;
        line-height: 1.55;
        color: #FFFFFF;
        padding: 12px 0;
    }

    :global(p) {margin-bottom: 1rem;}

    :global(h1, h2, h3, h4, h5) {
        margin: 3rem 0 1.38rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        line-height: 1.3;
    }

    :global(h1) {
        margin-top: 0;
        font-size: 3.052rem;
    }

    :global(h2) {font-size: 2.441rem;}

    :global(h3) {font-size: 1.953rem;}

    :global(h4) {font-size: 1.563rem;}

    :global(h5) {font-size: 1.25rem;}

    :global(small, .text_small) {font-size: 0.8rem;}

    :global(a) {
        color: #FFF;
        text-decoration: none;
    }

    :global(.img) {
        user-select: none;
        border-radius: 4px;
        overflow: hidden;
        width: fit-content;
        height: fit-content;
    }

    :global(div.input) {
        display: flex;
        padding: 0 16px;
        border-radius: 4px;
        background-color: #393949;
        gap: 16px;
        user-select: none;

        &:focus-within {
            box-shadow: 0 0 0 3px #F18FF360;
        }

        :global(input) {
            padding: 0;
            border: none;
            font-size: 16px;
            background-color: #393949;
            padding: 16px 0;
            color: #FFFFFF;
            width: 100%;

            &:focus {
                outline: none;
            }

            &::placeholder {
                text-align: center;
                color: #A3A3B0;
                user-select: none;
            }
        }
    }

    main {
        flex-basis: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        
        img {
            margin: 12px 24px;
            transition: transform .3s ease-in-out;

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    footer {
        p {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            color: #A3A3B0;
            gap: 3px;
            margin: 4px;

            span {
                color: #F18FF3;
                font-weight: bold;
            }

            b {
                color: #F53649;
            }

            a {
                font-weight: bold;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
