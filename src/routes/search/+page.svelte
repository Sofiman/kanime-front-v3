<script>
    import { scale } from 'svelte/transition';
    import BlurhashImage from './../../blurhash/BlurhashImage.svelte'
    import { quintOut } from 'svelte/easing';
    import { page } from '$app/stores';
    import Highlight from './Highlight.svelte'

    export let data;
</script>

<svelte:head>
    <title>Search - Kanime</title>
    <meta property="description" content="Search for an anime or manga. Find out what episode or season to watch after or which volume or chapter to read." />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kanime" />
    <meta property="og:title" content="Search for an anime or manga" />
    <meta property="og:locale" content="en_GB" />
</svelte:head>

<div class="container">
    <div class="results" in:scale={{easing: quintOut}}>
        {#each data.results as anime (anime.id)}
            <a href={`/anime/${anime.id}`} class="result">
                <div class="poster">
                    <BlurhashImage
                        src={`https://media.kanime.fr/310x468/${anime.poster.key}.webp`}
                        hash={anime.poster.placeholder}
                        blurhashHeight={48}
                        width={155} height={234} />
                </div>
                <div class="details">
                    <h5>
                        <Highlight content={anime.titles}
                                   matches={anime.matchesPosition["titles"]} />
                    </h5>
                    <p>
                        <Highlight content={anime.author}
                            matches={anime.matchesPosition["author"]} />
                    </p>
                </div>
            </a>
        {:else}
            <div>
                <h5>Sorry... No results :(</h5>
                <p>Please note that Kanime is under active development and more
                    animes are yet to come!</p>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .results {
        display: flex;
        gap: 8px;
        margin: 0 8px;
        flex-flow: column wrap;

        .result {
            display: flex;
            flex-flow: row;
            color: #FFFFFF;
            align-items: center;
            gap: 16px;
            text-decoration: none;
            transition: transform .1s;

            .poster {
                width: 155px;
                height: 234px;
                overflow: hidden;
                box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
                border-radius: 4px;
            }

            &:hover, &:focus {
                transform: scale(1.1);
                z-index: 5;
            }

            .details {
                display: flex;
                flex-direction: column;

                h5, p {
                    display: inline-table;
                    margin: 0;
                }
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

    @media screen and (max-width: 350px) {
        .results .result {
            flex-direction: column;

            h5, p {
                text-align: center;
            }
        }
    }
</style>
