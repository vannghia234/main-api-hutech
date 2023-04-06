import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import request from 'supertest';

// import { TodoController } from '../todo.controller';
import { userRequest } from '../../../lib/middlewares/user';
import { PersistentModule } from '../../../lib/persistent/persistent.module';
import { DBConfig, DbValidationSchema } from '../../../lib/persistent/db.config';
import { todoStub } from './todo.stub';
import { TodoModule } from '../todo.module';
import _ from 'lodash';
import { LogModule } from '../../log/log.module';
jest.setTimeout(10000)
require('dotenv').config();

let id;

describe('Todo', () => {
  let app: INestApplication;
  // let todoController: TodoController;

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
        TodoModule
      ],
    }).compile();

    // todoController = moduleRef.get<TodoController>(TodoController);
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
        .get('/todo/get-list')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
    })
  });

  // test api create va get list
  describe(`POST /create`, () => {

    // tra ve loi neu thieu tham so
    it("should return an error", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/create')
      expect(response.status).toEqual(400);
    })

    // tra ve id neu thanh cong
    it("should return an id", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/create')
        .send({
          content: todoStub.content
        })
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty("id")
      id = response.body.id;
    })

    // get list phai chua phan tu vua create
    it("should return an array contain the created id", async () => {
      let response = await request(app.getHttpServer())
        .get('/todo/get-list')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem => elem.id == id))).toBe(true)
    })

    // get log check dong vua tao.
    it("should have log", async () => {
      // cho du thoi gian de saga chay xong
      await new Promise((res, rej) => {
        setTimeout(() => {
          res({})
        }, +process.env.BUFFER_TIME);
      })

      let response = await request(app.getHttpServer())
        .get('/log/get-list?key_unit=todo')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem => elem.key_item == id && elem.log_content.message == "create"))).toBe(true)
    })
  });

  // test api update
  describe(`POST /update`, () => {
    // tra ve loi neu thieu tham so
    it("should return an error", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/update')
      expect(response.status).toEqual(400);
    })

    // tra ve loi neu thieu tham so
    it("should return an error", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/update')
        .send({
          content: todoStub.content + "_updated"
        })
      expect(response.status).toEqual(400);
    })

    // tra ve 200 neu thanh cong
    it("should return 200", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/update')
        .send({
          id: id,
          content: todoStub.content + "_updated",
          checked: todoStub.checked,
        })
      expect(response.status).toEqual(200);
    })

    // api get list phai chua data vua duoc update
    it("should return an array with the updated content", async () => {
      let response = await request(app.getHttpServer())
        .get('/todo/get-list')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem =>
        elem.id == id &&
        elem.content == todoStub.content + "_updated" &&
        elem.checked == todoStub.checked
      ))).toBe(true)
    })

    // get log check dong vua tao.
    it("should have log", async () => {
      // cho du thoi gian de saga chay xong
      await new Promise((res, rej) => {
        setTimeout(() => {
          res({})
        }, +process.env.BUFFER_TIME);
      })

      let response = await request(app.getHttpServer())
        .get('/log/get-list?key_unit=todo')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem => elem.key_item == id && elem.log_content.message == "update"))).toBe(true)
    })
  });

  // test api delete
  describe(`POST /delete`, () => {
    // tra ve loi neu thieu tham so
    it("should return an error", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/delete')
      expect(response.status).toEqual(400);
    })

    // tra ve 200 neu thanh cong
    it("should return 200", async () => {
      let response = await request(app.getHttpServer())
        .post('/todo/delete')
        .send({
          id: id
        })
      expect(response.status).toEqual(200);
    })

    // api get list tra ve phai 
    it("should return an array without the deleted id", async () => {
      let response = await request(app.getHttpServer())
        .get('/todo/get-list')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem => elem.id == id))).toBe(false)
    })

    // get log check dong vua tao.
    it("should have log", async () => {
      // cho du thoi gian de saga chay xong
      await new Promise((res, rej) => {
        setTimeout(() => {
          res({})
        }, +process.env.BUFFER_TIME);
      })

      let response = await request(app.getHttpServer())
        .get('/log/get-list?key_unit=todo')
      expect(response.status).toEqual(200);
      expect(Array.isArray(response.body)).toBe(true)
      expect(_.some(response.body, (elem => elem.key_item == id && elem.log_content.message == "delete"))).toBe(true)
    })
  });


  // unit test

  // describe('create', () => {
  //   it('should return an id', async () => {
  //     let result = await todoController.create({
  //       content: todoStub.content
  //     }, userStub)
  //     console.log(result)
  //     expect(result).toHaveProperty("id");
  //   });

  //   it('should be error', async () => {
  //     let result = await todoController.create({ content: "" }, userStub)
  //     console.log(result)
  //     expect(result).toThrowError();
  //   });
  // });

  // describe('getList', () => {
  //   it('should return an id', async () => {
  //     let result = await todoController.getList(userStub)
  //     // console.log(result)
  //   });
  // });

  // describe('update', () => {
  //   it('should return an id', async () => {
  //     let result = await todoController.update({
  //       content: "create_todo"
  //     }, userStub)
  //     // console.log(result)
  //     expect(result).toHaveProperty("id");
  //   });
  // });

  // describe('delete', () => {
  //   it('should return an id', async () => {
  //     let result = await todoController.delete({
  //       content: "create_todo"
  //     }, userStub)
  //     // console.log(result)
  //     expect(result).toHaveProperty("id");
  //   });
  // });

  afterAll(async () => {
    await app.close();
  });
});
