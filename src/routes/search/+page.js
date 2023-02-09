import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load({ fetch, params, url }) {
    let query = url.searchParams.get('q');
    if (!query) {
        return { results: [] };
    }
    query = query.trim();
    if (query === "" || query.length < 2) {
        return { results: [] };
    }

    const baseUrl = dev ? `http://127.0.0.1:8080` : `https://api.kanime.fr`;
    const res = await fetch(`${baseUrl}/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    if (res.status !== 200) {
        let msg = 'Unknown error';
        try {
            msg = await res.json();
            msg = msg.errorDescription;
        } catch(ignored) {}
        throw error(res.status, msg);
    }
    const results = await res.json();
    return { results };
}
