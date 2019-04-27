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
  updatePoll(state, payload){
    const id = payload.id;
    Object.keys(payload).map(key => {
      if(key !== 'id'){
        state.entities.polls[id][key] = payload[key]
      }
    })
  }
};

export const actions = {
  async createPoll({ state, getters, commit, dispatch }, payload) {

    // Track mutations that are committed during this dispatched action
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

    // Commit state mutations
    commit('createPoll', { question: payload.question, id: id});
    adminStore.dispatch('createPoll', { id: id })

    const callbackData = {
      id: id,
      mutations: mutations,
      adminId: adminStore.state.entities.polls[id].adminId
    }

    // Send committed mutations back to action dispatcher
    mutationsCallback(callbackData);
  },
  async updatePoll({ state, getters, commit, dispatch }, payload) {

    // Can Vuex.subscribe replace this hack?
    const mutationsCallback = payload.mutationsCallback;
    let mutations = [];
    const originalCommit = commit;
    commit = function() {
      mutations.push({
        name: arguments[0],
        payload: arguments[1]
      });
      originalCommit.apply(null, arguments)
    };

    const { id, adminId, question } = payload
    if(adminStore.state.entities.polls[id].adminId === adminId){
      commit('updatePoll', { id: id, question: question })
    }

    mutationsCallback({ mutations: mutations })
  }
};

export default {
  state,
  mutations,
  actions,
};
