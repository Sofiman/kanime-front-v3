<script>
    import { ProgressBar } from '@prgm/sveltekit-progress-bar'
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    $: searchPage = $page.url.pathname === "/search";
    let searching = false;
    let query;
    $: {
        if (searchPage){
            query = decodeURIComponent($page.url.searchParams.get('q'));
        }
    }

    function performSearch() {
        let params = new URLSearchParams();
        params.set('q', query);
        searching = true;
        if (searchPage) {
            goto(`?${params.toString()}`, { keepFocus: true, noScroll: true })
                .then(() => searching = false);
        } else {
            goto(`/search?${params.toString()}`, { keepFocus: true })
                .then(() => searching = false);
        }
    }

    let debounce;
    function onKeyDown(e) {
        if (debounce){
            clearTimeout(debounce);
        }
        if (e.key === "Enter") {
            performSearch();
            return;
        }
        debounce = setTimeout(() => {
            debounce = undefined;
            performSearch();
        }, 500);
    }
</script>

<ProgressBar color="#F18FF3" />
<header>
    <a href="/">
        <img src="/images/KanimeLogo.svg" alt="Kanime" class="img" />
        <span>Kanime</span>
    </a>
    <div class="input">
        <img src="/images/SearchIcon.svg" alt="" />
        <input bind:value={query} on:keyup={onKeyDown} placeholder="Search for an anime or manga" />
        {#if searching}
            <div class="loader">
                <span class="spinner"></span>
            </div>
        {/if}
    </div>
    <div></div>
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

        :global(div.loader) {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F18FF3;

            :global(span.spinner) {
                width: 16px;
                height: 16px;
                border-width: 2px;
            }
        }
    }

    :global(span.spinner) {
        width: 24px;
        height: 24px;
        border: 3px solid currentColor;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: spinnerRotate 1s linear infinite;
    }

    @keyframes spinnerRotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    main {
        flex-basis: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        padding: 8px 24px;
        z-index: 3;

        a {
            display: flex;
            align-items: center;
            gap: 16px;

            span {
                font-weight: 800;
                background-image: linear-gradient(0deg, #F18FF3, #8E31E1);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }

            &:hover img, &:focus img {
                transform: scale(1.25);
            }
        }

        img {
            transition: transform .1s ease-in-out;
        }
    }

    footer {
        p {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            color: #A3A3B0;
            gap: 6px;
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
