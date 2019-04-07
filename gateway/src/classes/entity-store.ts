const uuidv4 = require('uuid/v4');
const Vue = require('vue');

export const getDefaultState = () => {
  return {
    entities: {
      polls: {
        ids: [],
      },
    },
  };
};

export const state = getDefaultState();

export const mutations = {
  createPoll(state, payload) {
    const newPoll = {
      id: uuidv4(),
      question: payload.question,
    };
    Vue.set(state.entities.polls, newPoll.id, newPoll);
    state.entities.polls.ids.push(newPoll.id);
  },
};

export const actions = {
  async createPoll({ state, getters, commit, dispatch }, payload) {

    // track mutations that are committed during this dispatched action
    const mutationsCallback = payload.mutationsCallback;
    let mutations = [];
    const originalCommit = commit;
    commit = function() {
      mutations.push({
        name: arguments[0],
        payload: arguments[1],
      });
      originalCommit.apply(null, arguments);
    };
    
    // commit state mutations
    commit('createPoll', { question: payload.question });

    // send committed mutations back to action dispatcher
    mutationsCallback(mutations);
  },
};

export default {
  state,
  mutations,
  actions,
};
