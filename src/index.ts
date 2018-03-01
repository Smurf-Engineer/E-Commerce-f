import * as http from 'http'
import app from './server'

const server = http.createServer(app)
let currentApp = app

server.listen(process.env.PORT || 3000, (err: any) => {
  if (err) {
    console.error(err)
  }
  console.error('🚀 started')
})

if (module.hot) {
  console.error('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.error('🔁  HMR Reloading `./server`...')
    server.removeListener('request', currentApp)
    const newApp = require('./server').default
    server.on('request', newApp)
    currentApp = newApp
  })
}
