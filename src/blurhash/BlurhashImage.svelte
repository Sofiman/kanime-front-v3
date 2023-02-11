<script>
    import Image from './Image.svelte'
    import blurHashToDataURL from './blurHashToDataUrl.ts'

    let loaded = false;
    export let src;
    export let alt = "";
    export let hash;
    export let width = 32;
    export let height = 32;
    export let blurhashWidth = 32;
    export let blurhashHeight = 32;
    $: placeholder = typeof hash === "string"
        && blurHashToDataURL(hash, blurhashWidth, blurhashHeight);
</script>

<div class="img">
    <Image
        on:imageLoaded={() => loaded = true}
        {src}
        {alt}
        {width}
        {height}
    />
    {#if !loaded && placeholder}
        <img
            src={placeholder}
            class="placeholder"
            {width}
            {height}
            {alt} />
    {:else if !loaded}
        <div class="placeholder"
             style:width={`width: ${width}px`}
             style:height={`height: ${height}px`}>
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
        }
    }
</style>
