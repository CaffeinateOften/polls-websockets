import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import * as moment from 'moment';
import { AppService } from './app.service';

// eslint-disable-next-line
console.log(' actions.gateway.ts was required... ')

import storeConfig from './classes/entity-store';
import { Server } from 'tls';
const Vue = require('vue');
const Vuex = require('vuex');
Vue.use(Vuex);

function log(title, obj) {
  console.log(
    `[SERVER] [${moment().format(
      'HH:MM:SS YYYY-MM-DD',
    )}] - ${title} - ${JSON.stringify(obj,null,2)}`,
  );
}
@WebSocketGateway(4001)
export class ActionsGateway implements OnGatewayConnection {
  constructor(private readonly appService: AppService) {}

  @WebSocketServer() server;

  handleConnection(client: any, ...args: any[]) {
    console.log('client connected!')
    client.emit('state', this.appService.getState())
  }

  @SubscribeMessage('action')
  async handleAction(client: any, actionData: any): Promise<void> {
    log('ACTION', actionData)
    const mutations = await this.appService.dispatchAction(actionData.name, actionData.payload)
    this.server.emit('mutations', mutations)
  }

  @SubscribeMessage('echo')
  async handleEcho(client: any, data: any): Promise<Object> {
    log('ECHO', data)
    return {
      event: 'echo',
      data: data
    };
  }
}
