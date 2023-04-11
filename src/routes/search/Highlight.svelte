<script lang="ts">
    interface Chunk {
        content: string,
        highlighted: bool
    };
    interface Range {
        start: number,
        length: number
    };
    export let content: string | undefined;
    export let query: string | undefined = undefined;
    export let matches: Array<Range> | undefined;

    $: q_parts = query ? query.normalize().toLowerCase().split(/\b\s+/) : [];

    function utf8Len(charCode: number): number {
        if (charCode <= 0x7F) {
            return 1;
        } else if (charCode <= 0x7FF) {
            return 2;
        } else if (charCode <= 0xFFFF) {
            return 3;
        }
        return 4;
    }

    function substr(str: string, startBIndex: number, endBIndex?: number): string {
        let byteCount = 0;
        let start = -1;
        let i = 0;
        while (i < str.length && start == -1) {
            const charCode = str.charCodeAt(i);
            byteCount += utf8Len(charCode);

            if (byteCount > startBIndex) {
                start = i;
            }
            i++;
        }
        if (start == -1) return "";
        if (!endBIndex) return str.substring(start);
        while (i < str.length && byteCount < endBIndex) {
            byteCount += utf8Len(str.charCodeAt(i));
            i++;
        }
        return str.substring(start, i);
    }

    function getChunks(input: string | Array<string> | undefined, ranges: Array<Range> | undefined, query: Array<string>): Array<Chunk> {
        if (!input) return [];

        if (Array.isArray(input)) {
            if (input.length === 0) {
                return [];
            }
            for (let i in input) {
                let output = getChunks(input[i], ranges, query);
                if (output.length > 0) {
                    return output;
                }
            }
            return [{content: input[0], highlighted: false}];
        }

        let actual = input;
        if (!ranges || ranges.length === 0) {
            return [{content: actual, highlighted: false}];
        }

        let chunks = [];
        let start = 0;
        for (let i in ranges) {
            let r = ranges[i];
            if (r.start != start) {
                chunks.push({
                    content: substr(actual, start, r.start),
                    highlighted: false
                });
                start = r.start;
            }
            let content = substr(actual, r.start, r.start + r.length);
            let formatted = content.normalize().toLowerCase();
            if (!query.includes(formatted)) {
                return [];
            }
            chunks.push({ content, highlighted: true });
            start += r.length;
        }
        if (start < actual.length) {
            let content = substr(actual, start);
            if (content.length > 0) {
                chunks.push({ content, highlighted: false });
            }
        }
        return chunks;
    }
</script>

{#each getChunks(content, matches, q_parts) as chunk}
    <slot name="chunk" {chunk}>
        <!-- Default behaviour -->
        {#if chunk.highlighted}
            <slot name="highlighted" {chunk}>
                <em>{chunk.content}</em>
            </slot>
        {:else}
            <slot name="base" {chunk}>
                {chunk.content}
            </slot>
        {/if}
    </slot>
{/each}

<style>
em {
    background-color: #F18FF3;
    color: black;
    padding: 0 2px;
    margin: 0;
}
</style>
