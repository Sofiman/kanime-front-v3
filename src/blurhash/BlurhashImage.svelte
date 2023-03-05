<script lang="ts">
    import Image from './Image.svelte'
    import blurHashToDataURL from './blurHashToDataUrl.js'
    import { fade } from 'svelte/transition';

    let loaded = false;
    export let src: string | null;
    export let alt: string = "";
    export let hash: string;
    export let width: number | string = 32;
    export let height: number | string = 32;
    export let loading: "lazy" | "eager" | undefined = "lazy";
    export let blurhashWidth: number = 32;
    export let blurhashHeight: number = 32;
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
        z-index: 0;

        .placeholder {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
        }
    }
</style>
