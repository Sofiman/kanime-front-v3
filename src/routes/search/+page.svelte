<script>
    import BlurhashImage from 'svelte-blurhash/src/BlurhashImage.svelte'
    import { tick } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let data;
    let query = decodeURIComponent($page.url.searchParams.get('q'));

    function performSearch() {
        let params = new URLSearchParams();
        params.set('q', query);
        goto(`?${params.toString()}`, { keepFocus: true });
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

<div class="container">
    <div class="input">
        <img src="/images/SearchIcon.svg" alt="" />
        <input bind:value={query} on:keyup={onKeyDown} placeholder="Search for an anime or manga" />
    </div>
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

    div.input {
        width: 50vw;
    }

    @media screen and (max-width: 700px) {
        div.input {
            width: 90vw;
        }
    }
</style>
