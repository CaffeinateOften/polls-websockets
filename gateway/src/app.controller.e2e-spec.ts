
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { INestApplication } from '@nestjs/common';

describe('State', () => {
  let app: INestApplication;
  let appService = { getState: () => 'i am mocked app state' };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    })
      .overrideProvider(AppService)
      .useValue(appService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET state`, () => {
    return request(app.getHttpServer())
      .get('/state')
      .expect(200)
      .expect(appService.getState());
  });

  afterAll(async () => {
    await app.close();
  });
});