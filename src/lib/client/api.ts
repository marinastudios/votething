import type { api } from "$lib/api"
import { hc } from "hono/client"

export default hc<api>('/api')