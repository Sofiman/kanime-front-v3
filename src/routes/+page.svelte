<script>
    import { goto } from '$app/navigation';

    let query;

    function performSearch() {
        let params = new URLSearchParams();
        params.set('q', query);
        goto(`/search?${params.toString()}`, { keepFocus: true });
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

<svelte:head>
    <title>Kanime</title>
</svelte:head>

<div class="container">
    <h2>Kanime</h2>
    <p>Check the anime/manga correspondence of your favorite series. Find out what episode or season to watch after or which volume to read.</p>
    <div class="input">
        <img src="/images/SearchIcon.svg" alt="" />
        <input bind:value={query} on:keyup={onKeyDown} placeholder="Search for an anime or manga" />
    </div>
</div>

<style lang="scss">
    div.container {
        display: flex;
        align-items: center;
        flex-flow: column;

        p {
            color: #A3A3B0;
            max-width: 450px;
            text-align: center;
        }
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
