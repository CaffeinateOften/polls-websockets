import { stat } from "fs";
import { isDate } from "util";

// import * as moment from 'moment'
const uuidv4 = require('uuid/v4');
const Vue = require('vue');

// Notes:
// -- Vuex follows Vue's reactivity rules
// -- To add dynamic property, use Vue.set
// -- To delete a property, use Vue.delete
export const getDefaultState = () => {
  return {
    entities: {
      polls: {
        ids: [],
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
    },
  };
};

export const state = getDefaultState();

export const mutations = {
  setState(state, payload){
    Vue.set(state, 'entities', payload.entities)
  },
  add(state, payload) {
    const { entity } = payload;
    const { data } = payload;

    validateEntity(state, entity);

    const id = uuidv4();
    data.id = id; // Overriding what user set as id
    Vue.set(state.entities[entity], id, data);
    state.entities[entity].ids.push(id);

    // state.entities.polls[poll.id].createdAt = moment()
  },
  update(state, payload) {
    // Replace everything
    const { entity } = payload;
    const { data } = payload;

    validateEntity(state, entity);

    state.entities[entity][data.id] = data;
  },
  remove(state, payload) {
    const { entity } = payload;
    const { id } = payload.data;

    validateEntity(state, entity);

    const collection = state.entities[entity];
    const ids = collection.ids;
    Vue.delete(collection, id);
    Vue.delete(ids, collection.ids.indexOf(id));
  },
  setEntity(state, payload) {
    const { entity } = payload
    const { data } = payload
    // ToDo: enforce schema of entity structure
    state.entities[entity] = data
  },
  setEntityStatuses(state, payload) {
    const { entity } = payload
    const { statuses } = payload

    Object.keys(statuses).map(statusKey => {
      state.entities[statusKey][entity] = statuses[statusKey]
    })
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export const actions = {
  async loadInitialState({ state, getters, commit, dispatch }, payload) {
    const mutationsCallback = payload ? payload.mutationsCallback : null
    let mutations = []
    const originalCommit = commit;
    commit = function(){
      mutations.push({
        name: arguments[0],
        payload: arguments[1]
      })
      originalCommit.apply(null, arguments)
    }
   try{
      commit('setEntityStatuses', { entity: 'polls', statuses: { loading: true }})
      const pollEntityState = await fetchInitialState()
      commit('setEntity', { entity: 'polls', data: pollEntityState })
      commit('setEntityStatuses', { entity: 'polls', statuses: { loading: false, loaded: true }})
    }
    catch(err){
      console.error(err.message)
      commit('setEntityStatuses', { entity: 'polls', statuses: { loading: false }})
    }
    if(mutationsCallback !== null){
      mutationsCallback(mutations)
    }
  }
};

export const getters = {
  getCollection: state => payload => {
    const { entity } = payload;
    return state.entities[entity].ids.map(id => {
      return state.entities[entity][id];
    });
  },
};

export const fetchInitialState = async function(){
  const pollData = [
    {
      id: 333,
      question: 'Do I know that I know nothing?',
      votes: 0,
      adminUrl: 'https://this-is-a-made-up-url.com',
      url: 'https://this-also-made-up.com',
      comments: [
        {
          id: 0,
          author: 'Thucydides',
          text:
            'The secret to happiness is freedom... And the secret to freedom is courage.',
        },
        {
          id: 1,
          author: 'Socrates',
          text:
            'No, the secret to happiness is intelligence, and the secret to intelligence is to know that you know nothing',
        },
        {
          id: 2,
          author: 'Thucydides',
          text: 'lol k',
        },
      ],
    },
    {
      id: 444,
      question: 'Does it sometimes be like it do?',
      votes: 3,
      adminUrl: 'https://this-is-a-made-up-url.com',
      url: 'https://this-also-made-up.com',
      comments: [
        {
          id: 0,
          author: 'Elon Musk',
          text:
            'Let us send mice to the moon',
        },
        {
          id: 1,
          author: 'Jeff Bezos',
          text:
            'Currently working on Blue Origin as-a-service, brb',
        },
        {
          id: 2,
          author: 'Potato',
          text: 'I am potato',
        },
      ],
    },
  ]

  let pollEntities = { ids: [] }

  pollData.map(poll => {
    pollEntities[poll.id] = {
      id: poll.id,
      question: poll.question,
      votes: poll.votes,
      adminUrl: poll.adminUrl,
      url: poll.url,
      comments: poll.comments
    }
    pollEntities['ids'].push(poll.id)
  })

  return pollEntities
}

// Validation and logging, the lazy javascript programmer ways
let LOGGER = ''

Object.keys(actions).map(action => {
  const originalAction = actions[action];
  actions[action] = function() {
    if(LOGGER === 'basic'){
      console.info(`[ACTION] ${action}`)
    }
    else if(LOGGER === 'verbose'){
      console.info(`[ACTION] ${action} ${JSON.stringify(arguments[1],null,2)}`)
    }
    originalAction.apply(null, arguments)
  }
})

Object.keys(mutations).map(mutation => {
  const originalMutation = mutations[mutation];
  mutations[mutation] = function() {
    if(LOGGER === 'basic'){
      console.info(`[MUTATION] ${mutation}`)
    }
    else if(LOGGER === 'verbose'){
      console.info(`[MUTATION] ${mutation} ${JSON.stringify(arguments[1],null,2)}`)
    }
    if (mutation !== 'resetState' && mutation !== 'setState') {
      const state = arguments[0]
      const payload = arguments[1]
      validateEntity(state, payload.entity);
    }
    originalMutation.apply(null, arguments);
  };
});

function validateEntity(state, entity) {
  const defaultState = getDefaultState()
  if (!defaultState.entities[entity]) {
    throw `${entity} does not exist in default store state`;
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
};