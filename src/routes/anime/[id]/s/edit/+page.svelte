<script>
    import BlurhashImage from './../../../../../blurhash/BlurhashImage.svelte'
    import { getBlurHashCssGradient } from '../../utils.js'
    import Input from './../../../../../common/Input.svelte'

    /** @type {import('./$types').PageData} */
    export let data;
    $: anime = data.anime;
    $: title = anime.titles[0];
    $: poster = `https://media.kanime.fr/fullres/${anime.poster.key}.webp`;
    $: bg = getBlurHashCssGradient(anime.poster.placeholder, [24, 24, 32]);

    let loading = false;

    async function patch(){
        if (loading)
            return;
        loading = true;
    }
</script>

<svelte:head>
    <title>{title} - Kanime</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if anime}
<div class="body">
    <div class="header">
        <div class="poster">
            <BlurhashImage
                src={poster}
                hash={anime.poster.placeholder}
                blurhashHeight={48}
                loading={"eager"}
                width={"auto"} height={"auto"} />
        </div>
        <h1 class="title">{title}</h1>
        <div class="background" style:background={bg}></div>
    </div>

    <div class="content">
        <h1 class="title">{title}</h1>

        <div class="actions">
            <button disabled={loading}>Delete</button>
            <button disabled={loading}>Export</button>
            <button on:click={patch} disabled={loading}>Save</button>
        </div>

        <h2 class="subtitle">Information</h2>
        <div class="block info">
            <div>
                <div>Author: <Input bind:value={anime.manga.author} /></div>
                <div>Volumes: <Input bind:value={anime.manga.volumes} /></div>
                <div>Chapters: <Input bind:value={anime.manga.chapters} /></div>
                <div>Manga Release: <Input bind:value={anime.manga.releaseYear} /></div>
            </div>

            <div>
                <div>Studio: <Input bind:value={anime.anime.studios} /></div>
                <div>Seasons: <Input bind:value={anime.anime.seasons} /></div>
                <div>Episodes: <Input bind:value={anime.anime.episodes} /></div>
                <div>Anime Release: <Input bind:value={anime.anime.releaseYear} /></div>
            </div>
        </div>
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

        .actions {
            display: flex;
            justify-content: center;
            gap: 8px;
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

            :global(.img img), :global(.img .placeholder) {
                height: 85vh;
                width: 100%;
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

            div.content .title {
                display: none;
            }
        }
    }

    h1 {
        margin: 0;
    }

    h1, h2 {
        text-align: center;
        padding: 8px 16px;
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
    }
</style>
