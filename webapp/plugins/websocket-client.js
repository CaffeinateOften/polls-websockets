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
    // eslint-disable-next-line
    console.log(typeof mutations, JSON.stringify(mutations, null, 2))
    mutations.map((mutation) => {
      log('MUTATION', mutation)
      context.store.commit(mutation.name, mutation.payload)
    })
  })
}

Vue.prototype.$ws = ws
