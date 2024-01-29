import { app } from './app'
import { logger } from './logger'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', (reason) => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(process.env.VITE_BACKEND_PORT)
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
