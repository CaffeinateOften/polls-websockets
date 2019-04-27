const uuidv4 = require('uuid/v4');
const Vue = require('vue');

// im lazy af so this gon be where i keep my admin strings, just wont pass back actual strings to client
// the entity store can just read this state for the id if it needs and do its thing

export const state = () => ({
    entities: {
      polls: {
        ids: [],
      },
    }
})

export const mutations = {
  createPoll(state, payload) {

    console.log(payload.adminId)
    
    const newPoll = {
      id: payload.id,
      adminId: payload.adminId
    };
    Vue.set(state.entities.polls, newPoll.id, newPoll);
    state.entities.polls.ids.push(newPoll.id);
  },
};

export const actions = {
  async createPoll({ state, getters, commit, dispatch }, payload) {
    const adminId = uuidv4()
    const id = payload.id
    commit('createPoll', { id: id, adminId: adminId});
  },
};

export default {
  state,
  mutations,
  actions
};
