import { Injectable } from '@nestjs/common';
import storeConfig from './classes/entity-store';

// ToDo: Get better at TDD
// Also, determine if there is an opportunity here to use
//   dependency injection to make this service more testable?
//   Not positive I'm organizings things in great way..
//   Will just prototype something that works then reflect on architectural decisions
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
  async dispatchAction(action: String, payload?: any ): Promise<Array<any>> {
    const modifiedPayload = payload || {}
    let committedMutations = []
    const mutationsCallback = (mutations) => {
      committedMutations = mutations
    }
    modifiedPayload.mutationsCallback = mutationsCallback
    await this.store.dispatch(action, modifiedPayload)
    return committedMutations
  }
}
