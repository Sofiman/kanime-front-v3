import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`http://127.0.0.1:8080/anime/${params.id}`);
    if (res.status !== 200) {
        let msg = 'Unknown error';
        try {
            msg = await res.json();
            msg = msg.errorDescription;
        } catch(ignored) {}
        throw error(res.status, msg);
    }
    const anime = await res.json();

    return { anime };
}
