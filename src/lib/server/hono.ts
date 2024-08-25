import api from '$lib/api'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

export interface Bindings { Bindings: App.Locals }
export default new Hono<Bindings>().use(logger()).route('/api', api)