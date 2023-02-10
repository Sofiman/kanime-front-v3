<script>
    import BlurhashImage from './../../blurhash/BlurhashImage.svelte'
    import { page } from '$app/stores';

    export let data;
</script>

<svelte:head>
    <title>Search - Kanime</title>
</svelte:head>

<div class="container">
    <div class="results">
        {#each data.results as anime (anime.id)}
            <a href={`/anime/${anime.id}`} class="result">
                <div class="img">
                    <BlurhashImage
                        src={`https://kanime.fr/media/cache/${anime.poster.key}`}
                        hash={anime.poster.placeholder}
                        width={64} height={64} />
                </div>
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

            .img {
                width: 64px;
                height: 64px;
            }

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
    }
</style>
