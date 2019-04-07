import { Test, TestingModule } from '@nestjs/testing';
import { ActionsGateway } from './actions.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { INestApplication } from '@nestjs/common';
import storeConfig from './classes/entity-store';
import * as request from 'request-promise-native';
const Vue = require('vue');
const Vuex = require('vuex');
Vue.use(Vuex);

function log(title, obj) {
  console.log(
    `[CLIENT] [${moment().format(
      'HH:MM:SS YYYY-MM-DD',
    )}] - ${title} - ${JSON.stringify(obj, null, 2)}`,
  );
}

describe('ActionsGateway', () => {
  let app: INestApplication;
  let store = new Vuex.Store(storeConfig);
  let testingModule: TestingModule;
  let ws;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ActionsGateway, AppService],
    }).compile();
    app = testingModule.createNestApplication();
    await app.init();
    await app.listenAsync(3000)
    ws = io.connect('ws://localhost:4001')
  });

  beforeEach(async () => {
    store.commit('resetState');
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(ws).toBeDefined();
  });

  it('should handle echo', async () => {
    expect.assertions(1);

    const input = {
      random: 'thing',
      other: 'things',
    };
    ws.emit('echo', input);

    await new Promise(resolve =>
      ws.on('echo', data => {
        log('ECHO', data);
        expect(data).toEqual(input);
        resolve();
      }),
    );
  });

  it('should return mutations that when applied to client state, will match mutated server state', async () => {
    expect.assertions(2);

    // Request current server state and set local state to match
    const initialServerStateResponse = await request('http://localhost:3000/state')
    const initialServerState = JSON.parse(initialServerStateResponse)

    await new Promise(resolve => {
      // emit an action which will definitely modify state with a few commits
      ws.emit('action', { name: 'loadInitialState' });
      ws.on('mutations', async (mutations) => {
        log('MUTATIONS', mutations);
        // commit the mutations that server emits back to client
        mutations.map(mutation => {
          store.commit(mutation.name, mutation.payload);
        });
        // Request current server state
        const mutatedServerStateResponse = await request('http://localhost:3000/state')
        const mutatedServerState = JSON.parse(mutatedServerStateResponse)
        expect(initialServerState).not.toEqual(mutatedServerState)
        expect(store.state).toEqual(mutatedServerState);
        resolve();
      });
    });
  });

  afterAll(() => {
    ws.disconnect(true);
    app.close();
  });
});
