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
  async dispatchAction(action: string, payload?: any ): Promise<Array<any>> {
    const modifiedPayload = payload || {}
    let committedMutations = []
    const mutationsCallback = (mutations) => {
      committedMutations = mutations
    }
    modifiedPayload.mutationsCallback = mutationsCallback
    await this.store.dispatch(action, modifiedPayload)
    return committedMutations
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
