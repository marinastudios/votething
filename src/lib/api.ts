import { Hono } from 'hono'
import { zValidator } from "@hono/zod-validator"
import { z } from 'zod'
import type { Bindings } from './server/hono'
import { db } from './server/db'
import ids from './ids'

const api = new Hono<Bindings>()
    .post('/poll/create', zValidator('json', z.object({
        title: z.string(),
        description: z.string(),
        options: z.object({ id: z.string(), name: z.string() }).array(),
        doWriteIn: z.boolean(),
    })), c => {
        if (c.env.user) {
            const { description, doWriteIn, options, title } = c.req.valid('json')
            const id = ids.poll()
            db.poll.set(id, {
                description,
                options,
                title,
                settings: {
                    do_writeins: doWriteIn,
                    createdBy: c.env.user.id
                }
            })
            return c.json({ error: false, id } as const, 201)
        } else {
            return c.json({ error: true } as const, 403)
        }
    })
    .post('/poll/listen/:id', zValidator('json', z.object({
        visitor_id: z.string()
    })), c => {
        return c.json({ error: false } as const)
    })

export default api
export type api = typeof api
