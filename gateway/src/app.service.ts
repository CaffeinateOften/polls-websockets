import { Injectable } from '@nestjs/common';
import storeConfig from './classes/entity-store';

// dnt do dis
import { adminStore } from './classes/entity-store'

const Vue = require('vue');
const Vuex = require('vuex');
Vue.use(Vuex);

@Injectable()
export class AppService {
  private store: any
  constructor() {
    this.store = new Vuex.Store(storeConfig);
  }
  getState(): Object {
    return this.store.state
  }
  async dispatchAction(action: string, payload?: any ): Promise<any> {
    const modifiedPayload = payload || {}
    let committedMutations = []
    let id
    let adminId
    const mutationsCallback = (callbackData) => {
      // Can i use vuex.subscribe instead of doing this hack?
      committedMutations = callbackData.mutations
      id = callbackData.id,
      adminId = callbackData.adminId
    }
    modifiedPayload.mutationsCallback = mutationsCallback
    await this.store.dispatch(action, modifiedPayload)

    const events: any = {
      mutations: committedMutations // will emit to all connected clients
    }

    if(action === 'createPoll'){
      events.clientOnly = [         // will only emit to the client that dispatched the action we just completed
        {
          name: 'redirect',
          payload: { path: `/polls/${id}/admin/${adminId}`}
        }
      ]
    }

    return events
  }
  
  isValidAdminId(id: string, adminId: string): boolean {
    let isValid = false
    const poll = adminStore.state.entities.polls[id]
    if(poll){
      if(poll.adminId === adminId){
        isValid = true
      }
    }
    return isValid
  }
}
