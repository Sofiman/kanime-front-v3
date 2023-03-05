<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let src: string | null | undefined;
    export let alt: string;
    export let width: string | number | undefined;
    export let height: string | number | undefined;
    export let loading: "lazy" | "eager" | undefined = "lazy";

    let thisImage: HTMLImageElement;
    onMount(() => {
        if (thisImage.complete && thisImage.naturalHeight !== 0) {
            dispatch("imageLoaded");
        } else {
            thisImage.onload = () => dispatch("imageLoaded");
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
    decoding="async"
/>

<style>
    img {
        object-fit: cover;
    }
</style>
