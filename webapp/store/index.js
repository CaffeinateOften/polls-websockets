// import * as moment from 'moment'
const uuidv4 = require('uuid/v4')
const Vue = require('vue')

export const getDefaultState = () => {
  return {
    entities: {
      polls: {
        ids: []
        // commentIds: []
      },
      // comments: { ids: [] }
      loaded: {
        polls: false
      },
      loading: {
        polls: false
      },
      error: {
        polls: false
      }
    }
  }
}

export const state = getDefaultState

export const mutations = {
  setState(state, payload) {
    Vue.set(state, 'entities', payload.entities)
  },
  add(state, payload) {
    const { entity } = payload
    const { data } = payload

    const id = uuidv4()
    data.id = id // Overriding what user set as id
    Vue.set(state.entities[entity], id, data)
    state.entities[entity].ids.push(id)

    // state.entities.polls[poll.id].createdAt = moment()
  },
  update(state, payload) {
    // Replace everything
    const { entity } = payload
    const { data } = payload

    state.entities[entity][data.id] = data
  },
  remove(state, payload) {
    const { entity } = payload
    const { id } = payload.data

    const collection = state.entities[entity]
    const ids = collection.ids
    Vue.delete(collection, id)
    Vue.delete(ids, collection.ids.indexOf(id))
  },
  setEntity(state, payload) {
    const { entity } = payload
    const { data } = payload

    state.entities[entity] = data
  },
  setEntityStatuses(state, payload) {
    const { entity } = payload
    const { statuses } = payload

    Object.keys(statuses).map((statusKey) => {
      state.entities[statusKey][entity] = statuses[statusKey]
    })
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
}

export default {
  state,
  mutations
}
