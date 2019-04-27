import Vue from 'vue'

export const state = () => {
  return { entities: { polls: { ids: [] } } }
}

export const mutations = {
  setState(state, newState) {
    // eslint-disable-next-line
    console.log('NewState:', JSON.stringify(newState, null, 2))
    state.entities.polls = Object.assign(
      {},
      state.entities.polls,
      newState.entities.polls
    )
  },
  createPoll(state, payload) {
    const newPoll = {
      id: payload.id,
      question: payload.question
    }
    Vue.set(state.entities.polls, newPoll.id, newPoll)
    state.entities.polls.ids.push(newPoll.id)
  },
  updatePoll(state, payload) {
    const id = payload.id
    Object.keys(payload).map((key) => {
      if (key !== 'id') {
        state.entities.polls[id][key] = payload[key]
      }
    })
  }
}

export const getters = {}

export default {
  state,
  mutations,
  getters
}
