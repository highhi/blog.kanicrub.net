import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.post('/purge/:post_id', (c) => {
  const id = c.req.param('post_id')
  return c.text(id)
})

export default app
