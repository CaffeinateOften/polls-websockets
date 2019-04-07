import Vue from 'vue'
const uuidv4 = require('uuid/v4')

export const getDefaultState = () => {
  return {
    entities: {
      polls: {
        0: {
          id: 0,
          question: 'What is a question?'
        },
        1: {
          id: 1,
          question: 'What is a poll?'
        },
        2: {
          id: 2,
          question: 'What is?'
        },
        ids: [0, 1, 2]
      },
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
  createPoll(state, payload) {
    const newPoll = {
      id: uuidv4(),
      question: payload.question
    }
    Vue.set(state.entities.polls, newPoll.id, newPoll)
    state.entities.polls.ids.push(newPoll.id)
  }
}

export default {
  state,
  mutations
}
