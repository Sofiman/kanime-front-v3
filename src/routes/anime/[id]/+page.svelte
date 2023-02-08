<script>
    import { page } from '$app/stores';
    import { getBlurHashCssGradient } from './utils.js'
    import BlurhashImage from 'svelte-blurhash/src/BlurhashImage.svelte'

    /** @type {import('./$types').LayoutData} */
    export let data;
    $: anime = data.anime;
    $: bg = getBlurHashCssGradient(anime.poster.placeholder);

    let selectedMapping = 0;
    $: mapping = anime.mapping[selectedMapping];

    function gotoMap(way) {
        if (way === 1)
        {
            selectedMapping += 1;
            if (selectedMapping == anime.mapping.length)
                selectedMapping = anime.mapping.length - 1;
        }
        else if (way === -1) {
            selectedMapping -= 1;
            if (selectedMapping < 0)
                selectedMapping = 0;
        }
    }
</script>

<svelte:head>
    <title>{anime.titles[0]} - Kanime</title>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kanime" />
    <meta property="og:title" content={anime.titles[0]} />
    <meta property="og:url" content={`https://kanime.fr/anime/${anime.id}`} />
</svelte:head>

{#if anime}
<div class="header">
    <div class="img poster">
        <BlurhashImage
            src={`https://kanime.fr/media/cache/${anime.poster.key}`}
            hash={anime.poster.placeholder}
            width={216} height={324} />
    </div>
    <h2>{anime.titles[0]}</h2>
    <div class="background" style:background={bg}></div>
</div>

<h4>Information</h4>
<div class="block info">
    <div><span>Author:</span> {anime.manga.author}</div>
    <div><span>Volumes:</span> {anime.manga.volumes}</div>
    <div><span>Chapters:</span> {anime.manga.chapters}</div>
    <div><span>Manga Release:</span> {anime.manga.releaseYear}</div>

    <div class="separator"></div>

    <div><span>Studio:</span> {anime.anime.studios}</div>
    <div><span>Seasons:</span> {anime.anime.seasons}</div>
    <div><span>Episodes:</span> {anime.anime.episodes}</div>
    <div><span>Anime Release:</span> {anime.anime.releaseYear}</div>
</div>

<h4>Anime Correspondance</h4>

<div class="block">
    <div class="selector">
        <button on:click={gotoMap(-1)}>
            <img src="/images/ChevronLeft.svg" alt="Prev" />
        </button>
        {mapping.label}
        <button on:click={gotoMap(1)}>
            <img src="/images/ChevronRight.svg" alt="Next" />
        </button>
    </div>

    <div class="mapping">
        <div class="range episodes">
            <div class="start">{mapping.startEpisode}</div>
            <span>Episodes</span>
            <div class="end">{mapping.endEpisode}</div>
        </div>
        <div class="range chapters">
            <div class="start">{mapping.startChapter}</div>
            <span>Chapters</span>
            <div class="end">{mapping.endChapter}</div>
        </div>
        <div class="range vols">
            <div class="start">{mapping.startVolume}</div>
            <span>Volumes</span>
            <div class="end">{mapping.endVolume}</div>
        </div>
    </div>
</div>

{/if}

<style lang="scss">
    :global(header) {
        box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.16);
    }

    div.header {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        color: #FFFFFF;
        gap: 16px;
        position: relative;
        z-index: 0;
        padding-top: 32px;

        .background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            pointer-events: none;
        }

        .poster {
            box-shadow: 0 0 4px 0 rgba(0,0,0,.25);
        }
    }

    h2 {
        text-align: center;
        padding: 0 16px;
        margin: 0;
    }

    h4 {
        background-color: #f18ff329;
        color: #F18FF3;
        padding: 8px 32px;
        border-radius: 0 32px 32px 0;
        width: fit-content;
    }

    div.block {
        padding: 0 32px;
    }

    div.separator {
        margin-bottom: 16px;
    }

    div.info {
        color: #A3A3B0;

        span {
            color: #FFFFFF;
        }
    }

    div.selector {
        display: flex;
        justify-content: space-between;
        background-color: #393949;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: bold;
        padding: 8px;
        border-radius: 4px;

        button {
            border: none;
            background-color: transparent;
            cursor: pointer;
            border-radius: 32px;
            transition: transform .1s ease-in-out;
            padding: 4px 8px;

            img {
                display: block;
                width: 16px;
                height: 16px;
            }

            &:hover {
                transform: scale(1.25);
            }
        }
    }

    div.mapping {
        display: flex;
        flex-flow: column wrap;

        .range {
            display: flex;
            justify-content: space-between;
            padding: 8px;

            span {
                display: flex;
                align-items: center;
                color: #A3A3B0;
                font-weight: bold;
                border-radius: 16px;
                padding: 2px 8px;
                background-color: #21212B;
                text-transform: uppercase;
            }

            .start, .end {
                color: #FFFFFF;
                font-weight: bold;
                border-radius: 4px;
                padding: 4px 16px;
                text-align: center;
                background-color: #393949;
            }
        }

        .range.episodes {
            background: url(/images/EpisodeRangeBackground.png) repeat-x;
            background-clip: content-box;
            background-position-y: center;
            background-size: 12px 4px;
        }

        .range.chapters {
            background: url(/images/ChapterRangeBackground.png) repeat-x;
            background-clip: content-box;
            background-position-y: center;
            background-size: 12px 4px;

            .start, .end {
                color: #F18FF3;
                background-color: #3b2b41;
            }
        }

        .range.vols {
            background: url(/images/VolumeRangeBackground.png) repeat-x;
            background-clip: content-box;
            background-position-y: center;
            background-size: 12px 4px;

            .start, .end {
                color: #FFB8B8;
                box-shadow: inset 0 0 0 2px #FFB8B8;
                background-color: #181820;
            }
        }
    }
</style>
