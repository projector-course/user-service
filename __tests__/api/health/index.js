const supertest = require('supertest');
const { app } = require('../../../src/server');
const { PREFIX } = require('../../../src/services/configService');
const { TEST_DATA } = require('./data');

let server;
let request;

beforeAll(() => {
  server = app.listen();
  request = supertest(server);
});

afterAll(() => {
  server.close();
});

describe('Check /health route', () => {
  TEST_DATA.forEach((data) => {
    const { info, reqData, resData } = data;
    const { path, method } = reqData;
    const { statusCode, contentType, resBody } = resData;

    test(info, async () => {
      await request[method](`${PREFIX}${path}`)
        .expect(statusCode)
        .expect('Content-Type', contentType)
        .expect((res) => {
          if (!resBody) return;
          if (typeof resBody === 'string') {
            expect(res.text).toBe(resBody);
          } else {
            expect(res.body).toBe(resBody);
          }
        });
    });
  });
});
