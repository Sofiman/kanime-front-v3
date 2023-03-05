<script lang="ts">
    export let leftIcon: string | undefined;
    export let rightIcon: string | undefined;
    export let placeholder: string | undefined;
    export let disabled: boolean | undefined;
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
