import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { verify } from './verify'

interface Env {
  CACHE_PURGE_TOKEN: string
  CMS_WEBHOOK_SECRET: string
}

const app = new Hono<{ Bindings: Env }>()
app.use('*', logger())

app.post('/webhooks/purge', async (c) => {
  const sig = c.req.header('x-microcms-signature')
  const payload = await c.req.json<{ id: string }>()
  const res = await verify({ sig, secret: c.env.CMS_WEBHOOK_SECRET, payload: JSON.stringify(payload) })
  
  if (!res) {
    throw new Error('Invalid signature.')
  }

  const resp = await fetch('https://api.cloudflare.com/client/v4/zones/b3777550a260912b4fe163cb0dd3b7e2/purge_cache', {
    method: 'post',
    headers: new Headers({
      'Authorization': `Bearer ${c.env.CACHE_PURGE_TOKEN}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      files: [`https://blog.kanicrub.net/posts/${payload.id}`]
    })
  })

  if (!resp.ok) {
    console.log('Cache purge failed')
  }

  return c.text('Done')
})

export default app
