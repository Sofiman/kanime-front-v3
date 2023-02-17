<script>
    export let leftIcon;
    export let rightIcon;
    export let placeholder;
    export let disabled;
    export let value = "";
</script>

<div class="input">
    {#if leftIcon}
        <img src={leftIcon} alt="" />
    {/if}
    <input type="text" {placeholder} bind:value={value} {disabled}>
    {#if rightIcon}
        <img src={leftIcon} alt="" />
    {/if}
</div>
