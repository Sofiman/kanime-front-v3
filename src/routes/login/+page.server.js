import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
    const session = cookies.get('sessionId');

    if (session){
        let target = "/";
        let follow = url.searchParams.get('to');
        if (typeof follow === "string" && follow.startsWith("/")) {
            target = follow;
        }
        throw redirect(307, target);
    }

    return { session };
}
