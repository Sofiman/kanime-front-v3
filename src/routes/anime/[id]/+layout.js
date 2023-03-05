import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, params }) {
    const baseUrl = dev ? `http://127.0.0.1:8080` : `https://api.kanime.fr`;
    let res;
    try {
        res = await fetch(`${baseUrl}/anime/${params.id}`);
    } catch(e) {
        throw error(503, "The service couldn't be reached");
        return;
    }
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
