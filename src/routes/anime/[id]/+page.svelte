<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { getBlurHashCssGradient } from './utils.js'
    import BlurhashImage from './../../../blurhash/BlurhashImage.svelte'

    let locale;

    /** @type {import('./$types').LayoutData} */
    export let data;
    $: anime = data.anime;
    $: title = anime.titles[0];
    $: poster = `https://media.kanime.fr/fullres/${anime.poster.key}.webp`;
    $: desc = `Check the anime-manga correspondance for ${title}. Find out what episode or season to watch after or which volume or chapters to read.`;
    $: bg = getBlurHashCssGradient(anime.poster.placeholder, [24, 24, 32]);
    $: lastUpdated = locale && new Intl.DateTimeFormat(locale,
        { dateStyle: 'full', timeStyle: 'short' })
        .format(new Date(anime.updatedOn));

    onMount(() => {
        locale = (navigator && (navigator.languages || navigator.language)) || 'en-US';
    });

    let selectedMapping = 0;
    $: mapping = anime.mapping[selectedMapping];

    function next() {
        selectedMapping += 1;
        if (selectedMapping == anime.mapping.length)
            selectedMapping = anime.mapping.length - 1;
    }

    function prev(way) {
        selectedMapping -= 1;
        if (selectedMapping < 0)
            selectedMapping = 0;
    }
</script>

<svelte:head>
    <title>{title} anime/manga correspondance - Kanime</title>
    <meta property="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kanime" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:url" content={`https://kanime.fr/anime/${anime.id}`} />
    <meta property="og:image" content={`https://media.kanime.fr/pre/${anime.poster.key}.webp`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={`${title}'s poster`} />

    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#if anime}
<div class="body">
    <div class="header">
        <div class="poster">
            <BlurhashImage
                src={poster}
                hash={anime.poster.placeholder}
                blurhashHeight={48}
                alt={`${title}'s poster`}
                loading={"eager"}
                width={"auto"} height={"auto"} />
        </div>
        <h1 class="title">{title}</h1>
        <div class="background" style:background={bg}></div>
    </div>

    <div class="content">
        <h1 class="title">{title}</h1>

        <h2 class="subtitle">Information</h2>
        <div class="block info">
            <div>
                <div><span>Author:</span> {anime.manga.author}</div>
                <div><span>Volumes:</span> {anime.manga.volumes}</div>
                <div><span>Chapters:</span> {anime.manga.chapters}</div>
                <div><span>Manga Release:</span> {anime.manga.releaseYear}</div>
            </div>

            <div>
                <div><span>Studios:</span> {anime.anime.studios.join(', ')}</div>
                <div><span>Seasons:</span> {anime.anime.seasons}</div>
                <div><span>Episodes:</span> {anime.anime.episodes}</div>
                <div><span>Anime Release:</span> {anime.anime.releaseYear}</div>
            </div>
        </div>

        <h2 class="subtitle">Manga Correspondance</h2>

        <div class="block">
            <div class="selector">
                {#if selectedMapping > 0}
                    <button on:click={prev}>
                        <img src="/images/ChevronLeft.svg" alt="Prev" />
                    </button>
                {:else}
                    <div></div>
                {/if}
                {mapping.label}
                {#if selectedMapping < anime.mapping.length - 1}
                    <button on:click={next}>
                        <img src="/images/ChevronRight.svg" alt="Next" />
                    </button>
                {:else}
                    <div></div>
                {/if}
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

            <p>{mapping.label} (episodes {mapping.startEpisode} trough {mapping.endEpisode})
                starts at chapter {mapping.startChapter} in volume {mapping.startVolume} and
                ends at chapter {mapping.endChapter} in volume {mapping.endVolume}</p>
        </div>

        {#if lastUpdated}
            <div class="block">
                <small>Last updated: <span>{lastUpdated}</span></small>
            </div>
        {/if}
    </div>
</div>
{/if}

<style lang="scss">
    div.body {
        display: grid;
        grid-template-columns: 2fr 3fr;
    }

    div.content {
        .subtitle {
            margin-top: 24px;
        }

        .title {
            margin: 24px 0;
        }
    }

    div.header {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        color: #FFFFFF;
        gap: 16px;
        position: relative;
        z-index: 0;
        padding: 16px;

        .title {
            display: none;
        }

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
            height: 100%;

            :global(.img img) {
                max-height: 85vh;
                max-width: 50vw;
            }
        }
    }

    @media screen and (max-width: 900px) {
        div.body {
            display: flex;
            flex-flow: column wrap;

            div.header {
                padding: 0;
                padding-top: 16px;

                .title {
                    display: block;
                }

                .poster {
                    :global(.img img), :global(.img .placeholder)  {
                        width: 216px;
                        height: 324px;
                    }
                }
            }

            div.info {
                justify-content: start;
            }

            div.content .title {
                display: none;
            }
        }
    }

    h1 {
        margin: 0;
    }

    h1, h2, small {
        text-align: center;
        padding: 8px 16px;
    }

    p {
        color: #A3A3B0;
    }

    small {
        color: #A3A3B0;

        span {
            color: #F18FF3;
        }
    }

    h2.subtitle {
        font-size: 1.44rem;
        background-color: #f18ff329;
        color: #F18FF3;
        border-radius: 0 32px 32px 0;
        width: fit-content;
    }

    div.block {
        padding: 0 32px;
    }

    div.info {
        display: flex;
        flex-flow: row wrap;
        color: #A3A3B0;
        gap: 16px;
        justify-content: space-around;

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

            &:hover {
                animation: backgroundMove linear infinite 1s;
            }
        }

        .range.episodes {
            background: url(/images/EpisodeRangeBackground.png) repeat-x;
            background-clip: content-box;
            background-position-y: center;
            background-size: 12px 4px;

            .start, .end {
                box-shadow: inset 0 0 0 2px #FFFFFF;
                background-color: #181820;
            }
        }

        .range.chapters {
            background: url(/images/ChapterRangeBackground.png) repeat-x;
            background-clip: content-box;
            background-position-y: center;
            background-size: 12px 4px;

            .start, .end {
                color: #F18FF3;
                box-shadow: inset 0 0 0 2px #F18FF3;
                background-color: #181820;
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

    @keyframes backgroundMove {
        from {
            background-position-x: 0;
        }
        to {
            background-position-x: 12px;
        }
    }
</style>
