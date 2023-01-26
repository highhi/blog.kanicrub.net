import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { verify } from './verify'

interface Env {
  CACHE_PURGE_TOKEN: string
  CMS_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Env }>()
app.use('*', logger())

app.post('/purge', async (c) => {
  const sig = c.req.header('x-microcms-signature')
  const payload = await c.req.text()
  const res = await verify({ sig, secret: c.env.CMS_WEBHOOK_SECRET, payload })
  
  if (!res) {
    throw new Error('Invalid signature.')
  }
  return c.text('Done')
})

export default app
