import { db } from "$lib/server/db"
import { error } from "@sveltejs/kit";

export async function load({ params: { poll: pollId }, locals }) {
    const id = pollId.slice(1)
    const poll = (await db.poll.find(id))?.flat();
    if(poll) {
        locals.poll = poll
        return { id }
    } else {
        error(404)
    }
}