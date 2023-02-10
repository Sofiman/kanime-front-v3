<script>
    import { onMount, createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let src;
    export let alt;
    export let width;
    export let height;

    let thisImage;
    onMount(() => {
        if (thisImage.complete) {
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
    loading="lazy"
    decoding="async"
/>

<style>
    img {
        object-fit: cover;
    }
</style>
