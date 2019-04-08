import Vue from 'vue'
const uuidv4 = require('uuid/v4')

export const state = () => ({
  entities: {
    polls: {
      ids: []
    }
  }
})

export const mutations = {
  setState(state, newState) {
    // eslint-disable-next-line
    console.log('NewState:', JSON.stringify(newState, null, 2))
    state.entities.polls = Object.assign({}, state.entities.polls, newState.entities.polls)
  },
  createPoll(state, payload) {
    const newPoll = {
      id: uuidv4(),
      question: payload.question
    }
    Vue.set(state.entities.polls, newPoll.id, newPoll)
    state.entities.polls.ids.push(newPoll.id)
  }
}

export const getters = {}

export default {
  state,
  mutations,
  getters
}
