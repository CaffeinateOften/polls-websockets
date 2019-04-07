import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDefaultState } from './classes/entity-store';

describe('AppController', () => {
  let appController: AppController;
  let defaultState = getDefaultState()

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/state', () => {
    it('should return current application state', () => {
        expect(appController.getState()).toEqual(defaultState)
    })
  });
});