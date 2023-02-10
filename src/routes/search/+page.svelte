<script>
    import BlurhashImage from './../../blurhash/BlurhashImage.svelte'
    import { page } from '$app/stores';

    export let data;
</script>

<svelte:head>
    <title>Search - Kanime</title>
    <meta property="description" content="Check the anime/manga correspondence of your favorite series. Find out what episode or season to watch after or which volume or chapter to read." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kanime" />
    <meta property="og:title" content="Search for anime or manga" />
</svelte:head>

<div class="container">
    <div class="results">
        {#each data.results as anime (anime.id)}
            <a href={`/anime/${anime.id}`} class="result">
                <BlurhashImage
                    src={`https://media.kanime.fr/310x468/${anime.poster.key}.webp`}
                    hash={anime.poster.placeholder}
                    width={64} height={64} />
                <h5>{anime.titles[0]}</h5>
            </a>
        {:else}
            <div class="result">
                <h5>Sorry... No results :(</h5>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .results {
        display: flex;
        gap: 8px;
        flex-flow: column wrap;

        .result {
            display: flex;
            flex-flow: row wrap;
            color: #FFFFFF;
            align-items: center;
            gap: 16px;

            h5 {
                margin: 0;
            }
        }
    }

    .container {
        display: flex;
        align-items: center;
        flex-flow: column;
        gap: 16px;
        margin-top: 16px;
    }
</style>
