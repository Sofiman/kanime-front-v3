<script>
    import Image from './Image.svelte'
    import blurHashToDataURL from './blurHashToDataUrl.ts'

    let loaded = false;
    export let src;
    export let alt = "";
    export let hash;
    export let width = 32;
    export let height = 32;
    export let fadeDuration = 200;
    export let blurhashWidth = 32;
    export let blurhashHeight = 32;
    $: placeholder = typeof hash === "string"
        && blurHashToDataURL(hash, blurhashWidth, blurhashHeight);

    const onImageLoaded = () => loaded = true;
</script>

<div class="img">
    <Image
        on:imageLoaded={onImageLoaded}
        {src}
        {alt}
        {width}
        {height}
        {fadeDuration}
    />
    {#if !loaded && placeholder}
        <img
            src={placeholder}
            class="placeholder"
            {width}
            {height}
            {alt} />
    {:else}
        <div class="placeholder"
             style:width={`width: ${width}px`}
             style:height={`height: ${height}px`}>
        </div>
    {/if}
</div>

<style>
    .img {
        position: relative;
    }
</style>
