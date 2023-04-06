import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import request from 'supertest';

// import { TodoController } from '../todo.controller';
import { userRequest } from '../../../lib/middlewares/user';
import { PersistentModule } from '../../../lib/persistent/persistent.module';
import { DBConfig, DbValidationSchema } from '../../../lib/persistent/db.config';
// import { todoStub } from './log.stub';
import { LogModule } from '../log.module';
import _ from 'lodash';
import { logStub } from './log.stub';
jest.setTimeout(10000)
require('dotenv').config();

describe('Log', () => {
  let app: INestApplication;
  
  // mock app co module can test
  beforeAll(async () => {

    // TODO: mock db de tranh truong hop database dang test bi sua doi
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [DBConfig],
          validationSchema: Joi.object({
            ...DbValidationSchema,
          }),
        }),
        PersistentModule,
        LogModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(userRequest)
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, forbidUnknownValues: true }),
    );
    await app.init();
  });

  // e2e
  // muc dich kiem tra tinh dung' sai toan bo luong xu ly tu a-z cua api muon test
  describe(`GET /get list`, () => {
    // get list phai tra ve array
    it("should return an array", async () => {
      let response = await request(app.getHttpServer())
        .get('/log/get-list?key_unit=todo')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
    })
  });

  // clear log
  describe(`POST /clear`, () => {
    // tra ve loi neu thieu tham so
    it("should return an error", async () => {
      let response = await request(app.getHttpServer())
        .post('/log/clear')
      expect(response.status).toEqual(400);
    })

    // tra ve 200 neu thanh cong
    it("should return 200", async () => {
      let response = await request(app.getHttpServer())
        .post('/log/clear')
        .send({
          key_unit: logStub.key_unit
        })
      expect(response.status).toEqual(200);
    })

    // clear xong api get list tra ve phai empty
    it("should return an empty array", async () => {
      let response = await request(app.getHttpServer())
        .get('/log/get-list?key_unit=todo')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(0)
    })
  });


  afterAll(async () => {
    await app.close();
  });
});
