import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { state } from './classes/entity-store';

describe('AppService', () => {
  let appService: AppService;
  let defaultState;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);

    defaultState = state();
  });

  it('should return current application state', () => {
    expect(appService.getState()).toEqual(defaultState);
  });

  it('should return three specific mutations after dispatching loadInitialState action', async () => {
      const mutations = await appService.dispatchAction('loadInitialState')
      expect(mutations.length).toBe(3)
      expect(mutations[0].name).toEqual('setEntityStatuses')
      expect(mutations[1].name).toEqual('setEntity')
      expect(mutations[2].name).toEqual('setEntityStatuses')
  })
});
