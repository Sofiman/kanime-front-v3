<script>
    import { page } from '$app/stores';
</script>

<div>
    <h1>{$page.status}</h1>
    <p>{$page.error.message}</p>
</div>

<style>
    div {
        text-align: center;
    }
    h1 {
        font-size: 6rem;
    }
</style>
