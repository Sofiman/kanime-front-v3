<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let src: string | null | undefined;
    export let alt: string;
    export let onload: string | undefined;
    export let width: string | number | undefined;
    export let height: string | number | undefined;
    export let loading: "lazy" | "eager" | undefined = "lazy";
    export let decoding: "async" | "sync" | "auto" | undefined = "async";

    let thisImage: HTMLImageElement;
    onMount(() => {
        if (thisImage.complete && thisImage.naturalHeight !== 0) {
            dispatch("imageLoaded");
        } else {
            thisImage.decode().then(() => dispatch("imageLoaded"));
        }
    });
</script>

<img
    bind:this={thisImage}
    {src}
    {alt}
    {width}
    {height}
    {loading}
    {onload}
    {decoding}
/>

<style>
    img {
        object-fit: cover;
    }
</style>
