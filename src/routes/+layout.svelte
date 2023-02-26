<script>
    import { ProgressBar } from '@prgm/sveltekit-progress-bar'
    import { goto } from '$app/navigation';
    import { page, navigating } from '$app/stores';

    $: searchPage = $page.url.pathname === "/search";
    let searching = false;
    let query;
    $: if($navigating && $navigating.from.url.pathname !== "/search" &&
        $navigating.to.url.pathname === "/search") {
        let q = $page.url.searchParams.get('q');
        if (q) {
            query = q;
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

<header>
    <ProgressBar color="#F18FF3" />
    <a href="/">
        <img src="/images/KanimeLogo.svg" alt="Kanime" class="img logo" />
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
    <div class="hidden"></div>
</header>
<main>
    <slot />
</main>
<footer>
    <p>Version 1.0. Developed by <span>Sofiman</span> with <b>♥</b></p>
    <p>
        <a href="/">Privacy</a> •
        <a href="https://documenter.getpostman.com/view/21781515/2s93CPrCQ7"
            target="_blank" rel="noreferrer">Developers</a> •
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
        --background-color: #181820;
        background: var(--background-color);
        color: #FFFFFF;
        font-size: 100%;
        height: 100%;
    }

    :global(body) {
        display: flex;
        flex-direction: column;
        height: 100%;
        font-weight: 500;
        line-height: 1.55;
        color: #FFFFFF;
        --header-height: 72px;
        --body-top-margin: var(--header-height);
        --input-background-color: #393949;
    }

    :global(button) {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        padding: 12px 16px;
        border: none;
        border-radius: 4px;
        color: #181820;
        background-color: #F18FF3;
        font-weight: bold;
        transition: all .1s;
        margin: 4px 0;
        cursor: pointer;

        &:focus {
            box-shadow: 0 0 0 3px #F18FF360;
        }

        &:hover {
            outline: 2px solid #F18FF3;
            outline-offset: 2px;
        }

        &:disabled {
            opacity: 0.75;
            cursor: auto;
        }
    }

    :global(button.neutral) {
        color: #A3A3B0;
        background-color: #393949; 

        &:focus {
            box-shadow: 0 0 0 3px #39394960;
        }

        &:hover {
            outline: 2px solid #393949;
        }
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
      font-size: 2.488rem;
    }

    :global(h2) {font-size: 2.074rem;}

    :global(h3) {font-size: 1.728rem;}

    :global(h4) {font-size: 1.44rem;}

    :global(h5) {font-size: 1.2rem;}

    :global(small, .text_small) {font-size: 0.833rem;}

    :global(a) {
        color: #FFF;
        text-decoration: none;
    }

    :global(.img) {
        display: flex;
        user-select: none;
        border-radius: 4px;
        overflow: hidden;
    }

    :global(div.input) {
        display: flex;
        padding: 0 16px;
        border-radius: 4px;
        background-color: var(--input-background-color);
        align-items: center;
        gap: 16px;
        user-select: none;

        &:focus-within {
            box-shadow: 0 0 0 3px #F18FF360;
        }

        :global(img) {
            width: 18px;
            height: 18px;
        }

        :global(input) {
            padding: 0;
            border: none;
            font-size: 16px;
            background-color: transparent;
            padding: 16px 0;
            color: #FFFFFF;
            width: 100%;
            font-weight: 500;

            &:focus {
                outline: none;
            }

            &::placeholder {
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                line-height: 1.3;
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
        margin-top: var(--body-top-margin);
    }

    header {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        gap: 16px;
        height: var(--header-height);
        padding: 8px 24px;
        background-color: var(--background-color);
        box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.16);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;

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

        .logo {
            transition: transform .1s ease-in-out;
            width: 32px;
            height: 32px;
            object-fit: contain;
        }
    }

    @media screen and (max-width: 600px) {
        header {
            display: flex;
            justify-content: space-between;
            padding: 8px 16px;

            div.input {
                flex-grow: 1;
            }

            .hidden {
                display: none;
            }

            a span {
                display: none;
            }
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
