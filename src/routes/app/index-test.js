import test from 'ava';
import supertest from 'supertest';
import mongoose from 'mongoose';
import {
  App
} from '../../models';
import {
  hasProperty,
  isSameId,
} from '../../lib/somethings';

/*
정보 획득
생성
삭제
 */

export default function (app, url) {
  const NAME = 'App';
  const APP = {
    domain: 'https://mamre.kr',
  };
  test.serial(`get info ${NAME}`, async (t) => {
    const res = await supertest(app)
      .get(`${url}/${encodeURIComponent(APP.domain)}`);
    t.is(res.status, 200);
    const { body } = res;
    const { favicon, title } = body;
    t.truthy(favicon);
    t.truthy(title);
    APP.favicon = favicon;
    APP.title = title;
  });
  test.serial(`create ${NAME}`, async (t) => {
    const res = await supertest(app)
      .post(url)
      .send(APP);
    t.is(res.status, 200);
    const { body } = res;
    APP.id = body.id;
  });
  test.serial(`remove ${NAME}`, async (t) => {
    const res = await supertest(app)
      .del(`${url}/${APP.id}`);
    t.is(res.status, 200);
  });
  test.after.always.cb('delete all test data', (t) => {
    App.deleteMany({
      domain: {
        $in: [
          APP.domain,
        ],
      },
    }, (error) => {
      if (error) {
        console.error(error);
        t.fail();
      } else {
        t.pass();
      }
      t.end();
    });
  });
}
