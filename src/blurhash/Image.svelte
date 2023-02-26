<script>
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let src;
    export let alt;
    export let width;
    export let height;
    export let loading = "lazy";

    let thisImage;
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
