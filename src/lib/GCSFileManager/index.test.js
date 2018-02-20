import test from 'ava';
import request from 'request';
import config from '../../config';
import {
  getUrl,
  upload,
  remove,
} from './';

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

test('getPublicUrl', (t) => {
  const filename = 'filename.file';
  t.is(
    `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`,
    getUrl(filename),
  );
});

const INPUT = {
  filename: 'filename',
  dir: 'dir/dir',
  content: 'content',
};
test.serial.cb('upload', (t) => {
  upload(INPUT)
    .then((url) => {
      request({
        url,
        headers: {
          pragma: 'no-cache',
          'cache-control': 'no-cache',
        },
      }, (error, response, body) => {
        if (error && response.statusCode !== 200) {
          console.error(error);
          t.fail();
        } else if (body !== INPUT.content) {
          t.fail();
        } else {
          t.pass();
        }
        t.end();
      });
    })
    .catch((error) => {
      console.error(error);
      t.fail();
      t.end();
    });
});
test.serial.cb('remove', (t) => {
  const { filename, dir } = INPUT;
  remove({ filename, dir })
    .then(() => {
      t.pass();
      t.end();
    })
    .catch((error) => {
      console.error(error);
      t.fail();
      t.end();
    });
});
