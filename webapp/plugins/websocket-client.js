import Vue from 'vue'
import io from 'socket.io-client'

const ws = io('http://localhost:4001')

export default (context) => {
  ws.on('mutations', (mutations) => {
    mutations.map((mutation) => {
      context.store.commit(mutation.name, mutation.payload)
    })
  })
}

Vue.prototype.$ws = ws
