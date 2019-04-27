const uuidv4 = require('uuid/v4');
const Vue = require('vue');

// can i even do this lol
const AdminVue = require('vue')
const AdminVuex = require('vuex')
const AdminStoreConfig = require('./admin-store')
AdminVue.use(AdminVuex)
export const adminStore = new AdminVuex.Store(AdminStoreConfig)
// dont do this at home kidz

export const state = () => ({
    entities: {
      polls: {
        ids: [],
      },
    }
})

export const mutations = {
  createPoll(state, payload) {
    const newPoll = {
      id: payload.id,
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

    const id = uuidv4()

    // commit state mutations
    commit('createPoll', { question: payload.question, id: id});
    adminStore.dispatch('createPoll', { id: id })

    const callbackData = {
      id: id,
      mutations: mutations,
      adminId: adminStore.state.entities.polls[id].adminId
    }

    // send committed mutations back to action dispatcher
    mutationsCallback(callbackData);
  },
};

export default {
  state,
  mutations,
  actions,
};
