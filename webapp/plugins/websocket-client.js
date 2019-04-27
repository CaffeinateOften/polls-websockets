import Vue from 'vue'
import io from 'socket.io-client'
import * as moment from 'moment'

function log(title, obj) {
  // eslint-disable-next-line
  console.log(
    `[CLIENT] [${moment().format(
      'HH:MM:SS YYYY-MM-DD'
    )}] - ${title} - ${JSON.stringify(obj, null, 2)}`
  )
}

const ws = io('http://localhost:4001')

export default (context) => {
  ws.on('state', (state) => {
    context.store.commit('setState', state)
  })
  ws.on('mutations', (mutations) => {
    mutations.map((mutation) => {
      log('MUTATION', mutation)
      context.store.commit(mutation.name, mutation.payload)
    })
  })
  ws.on('redirect', (data) => {
    context.app.router.push({ path: data.path })
  })
}

Vue.prototype.$ws = ws
