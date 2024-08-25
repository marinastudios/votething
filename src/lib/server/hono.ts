import api from "$lib/api";
import { Hono } from "hono";

export default new Hono().route('/api', api)