<script>
    import Image from './Image.svelte'
    import blurHashToDataURL from './blurHashToDataUrl.ts'
    import { fade } from 'svelte/transition';

    let loaded = false;
    export let src;
    export let alt = "";
    export let hash;
    export let width = 32;
    export let height = 32;
    export let loading;
    export let blurhashWidth = 32;
    export let blurhashHeight = 32;
    $: placeholder = typeof hash === "string"
        && blurHashToDataURL(hash, blurhashWidth, blurhashHeight);
</script>

<div class="img">
    <Image
        on:imageLoaded={() => loaded = true}
        {loading}
        {src}
        {alt}
        {width}
        {height}
    />
    {#if !loaded && placeholder}
        <img transition:fade
            src={placeholder}
            class="placeholder"
            {width}
            {height}
            {alt} />
    {:else if !loaded}
        <div class="placeholder"
            style:width={width}
            style:height={height}>
        </div>
    {/if}
</div>

<style lang="scss">
    .img {
        position: relative;

        .placeholder {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>
