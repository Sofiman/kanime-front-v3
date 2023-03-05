<script lang="ts">
    import { page } from '$app/stores';
    $: error = $page?.error?.message || "Unknown error";
</script>

<svelte:head>
    <title>Error {$page.status} - Kanime</title>
    <meta property="description" content={error} />
</svelte:head>

<div>
    <h1>{$page.status}</h1>
    <p>{error}</p>
</div>

<style>
    div {
        text-align: center;
    }
    h1 {
        font-size: 6rem;
    }
</style>
