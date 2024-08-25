import { collection, kvdex, model } from "@olli/kvdex";
import { openKv } from "@deno/kv";

import schema from "$lib/schema";

export const kv = await openKv();
export const db = kvdex(kv, {
    auth: {
        session: collection(schema.auth.session, {
            indices: {
                user_id: 'secondary'
            }
        }),
        user: collection(schema.auth.user, {
            indices: {
                login: 'primary'
            }
        }),
        anon_session: collection(schema.auth.anon_session, {
            indices: {
                poll_id: 'secondary',
                visitor_id: 'secondary',
            }
        })
    },
    poll: collection(schema.poll),
    pollKey: collection(model<string>())
});