import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, url }) {
    const session = cookies.get('sessionId');

    if (!session){
        throw redirect(307, `/login?to=${encodeURIComponent(url.pathname)}`);
    }

    return {
        user: session
    };
}
