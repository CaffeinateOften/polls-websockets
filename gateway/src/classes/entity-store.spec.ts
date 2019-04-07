import storeConfig from './entity-store';
const Vue = require('vue');
const Vuex = require('vuex');
Vue.use(Vuex);

describe('mutations', () => {
  let store = new Vuex.Store(storeConfig);
  let poll;
  beforeEach(() => {
    store.commit('resetState');
    poll = createPoll();
  });

  it('SET_STATE', () => {
    const newState = { entities: { example: 'myExample' } };
    store.commit('setState', newState)
    expect(store.state).toEqual(newState)
  });

  it('ADD', () => {
    store.commit('add', { entity: 'polls', data: poll });

    const retrievedPoll = store.getters.getCollection({ entity: 'polls' })[0];
    poll.id = retrievedPoll.id; // store handles id creation

    expect(retrievedPoll).toEqual(poll);
  });

  it('UPDATE', () => {
    store.commit('add', { entity: 'polls', data: poll });
    poll.votes++;
    store.commit('update', { entity: 'polls', data: poll });

    const retrievedPoll = store.getters.getCollection({ entity: 'polls' })[0];
    poll.id = retrievedPoll.id;

    expect(retrievedPoll).toEqual(poll);
  });

  it('REMOVE', () => {
    store.commit('add', { entity: 'polls', data: poll });
    const retrievedPoll = store.getters.getCollection({ entity: 'polls' })[0];
    store.commit('remove', { entity: 'polls', data: { id: retrievedPoll.id } });
    expect(store.getters.getCollection({ entity: 'polls' }).length).toBe(0);
  });

  it('SET_ENTITY', () => {
    let poll1 = createPoll()
    let poll2 = createPoll()
    poll2.question = 'poll 2'
    let poll3 = createPoll()
    poll3.question = 'poll 3'

    store.commit('add', { entity: 'polls', data: poll })
    store.commit('add', { entity: 'polls', data: poll1 })
    store.commit('add', { entity: 'polls', data: poll2 })

    store.state.entities.polls.ids;

    expect(store.state.entities.polls.ids.length).toBe(3)

    store.commit('setEntity', { entity: 'polls', data: { poll3, ids: [poll3.id] }})

    expect(store.state.entities.polls.ids.length).toBe(1)
  })

  it('SET_ENTITY_STATUSES', () => {
    store.commit('setEntityStatuses', { entity: 'polls', statuses: { loaded: true, loading: true }})
    let { loaded, loading } = store.state.entities
    expect(loaded).toHaveProperty('polls', true)
    expect(loading).toHaveProperty('polls', true)
    
    store.commit('setEntityStatuses', { entity: 'polls', statuses: { loaded: false }})
    // loaded = store.state.entities.loaded
    expect(loaded).toHaveProperty('polls', false)

  })

  it('should each throw error if entity in payload is not in default state', () => {
    expect(() => {
      store.commit('add', { entity: 'i_dont_exist_234', data: poll });
    }).toThrow();
    expect(() => {
      store.commit('update', { entity: 'i_dont_exist_111', data: poll });
    }).toThrow();
    expect(() => {
      store.commit('remove', { entity: 'i_dont_exist_333', data: poll });
    }).toThrow();
  });
});

describe('actions', () => {
  let store = new Vuex.Store(storeConfig);
  beforeEach(() => {
    store.commit('resetState');
  });
  it('LOAD_INITIAL_STATE', async () => {
    expect.assertions(1)
    const response = await store.dispatch('loadInitialState');
    expect(store.state.entities.loaded).toHaveProperty('polls', true)
  }); 
});

function createPoll() {
  return {
    id: 234,
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
  };
}
