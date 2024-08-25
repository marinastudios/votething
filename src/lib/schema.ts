import { z } from "zod";

const session = z.object({
    user_id: z.string()
});
const user = z.object({
    login: z.string(),
    passwordHashed: z.string()
});

const anon_session = z.object({
    poll_id: z.string(),
    answer: z.string()
})

const option = z.object({
    id: z.string(),
    name: z.string()
})

const poll = z.object({
    title: z.string(),
    description: z.string(),
    options: option.array(),

    settings: z.object({
        do_writeins: z.boolean()
    })
})

export default {
    auth: {
        session,
        user,
        anon_session
    },
    poll,
    option,
}