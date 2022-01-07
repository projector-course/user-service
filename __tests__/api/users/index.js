const supertest = require('supertest');
const db = require('../../../src/db/models');
const { app } = require('../../../src/server');
const { PREFIX, SERVICE_KEY } = require('../../../src/services/configService');
const {
  TEST_CREATE_DATA, TEST_LOGIN_DATA, TEST_ME_DATA, TEST_GET_DATA,
} = require('./data');

let server;
let request;
let userId;
let token;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  await db.users.truncate();
  server = app.listen();
  request = supertest(server);
});

afterAll(() => {
  server.close();
  db.sequelize.close();
});

describe('Check / route', () => {
  TEST_CREATE_DATA.forEach((data) => {
    const { info, reqData, resData } = data;
    const { path, method, body } = reqData;
    const { statusCode, contentType, resBody } = resData;

    test(info, async () => {
      await request[method](`${PREFIX}${path}`)
        .send(body)
        .expect(statusCode)
        .expect('Content-Type', contentType)
        .expect((res) => {
          if (!resBody) return;
          if (typeof resBody === 'string') {
            expect(res.text).toBe(resBody);
          } else {
            expect(res.body).toMatchObject(resBody);
          }
        });
    });
  });
});

describe('Check /login route', () => {
  TEST_LOGIN_DATA.forEach((data) => {
    const { info, reqData, resData } = data;
    const { path, method, body } = reqData;
    const { statusCode, contentType, resBody } = resData;

    test(info, async () => {
      await request[method](`${PREFIX}${path}`)
        .send(body)
        .expect(statusCode)
        .expect('Content-Type', contentType)
        .expect((res) => {
          if (!resBody) return;
          if (typeof resBody === 'string') {
            expect(res.text).toBe(resBody);
          } else {
            expect(res.body).toHaveProperty('token');
            token = res.body.token;
          }
        });
    });
  });
});

describe('Check /me route', () => {
  TEST_ME_DATA.forEach((data) => {
    const { info, reqData, resData } = data;
    const { path, method } = reqData;
    const { statusCode, contentType, resBody } = resData;

    test(info, async () => {
      await request[method](`${PREFIX}${path}`)
        .set('x-token', token)
        .expect(statusCode)
        .expect('Content-Type', contentType)
        .expect((res) => {
          if (!resBody) return;
          if (typeof resBody === 'string') {
            expect(res.text).toBe(resBody);
          } else {
            expect(res.body).toMatchObject(resBody);
            userId = res.body.id;
          }
        });
    });
  });
});

describe('Check /:id route', () => {
  TEST_GET_DATA.forEach((data) => {
    const { info, reqData, resData } = data;
    const { path, method, param } = reqData;
    const { statusCode, contentType, resBody } = resData;

    test(info, async () => {
      await request[method](`${PREFIX}${path}${param || userId}`)
        .set('x-service-key', SERVICE_KEY)
        .expect(statusCode)
        .expect('Content-Type', contentType)
        .expect((res) => {
          if (!resBody) return;
          if (typeof resBody === 'string') {
            expect(res.text).toBe(resBody);
          } else {
            expect(res.body).toMatchObject(resBody);
          }
        });
    });
  });
});
