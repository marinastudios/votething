import { Hono } from "hono"

const api = new Hono()

export default api;
export type api = typeof api;