/*
 구글 클라우드 스토리지를 관리하는 모듈
 */
import Storage from '@google-cloud/storage';
import config from '../../config';
import logging from '../logging';

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

const storage = Storage({
  projectId: config.get('GCLOUD_PROJECT'),
});
const bucket = storage.bucket(CLOUD_BUCKET);

// 구글 GCS 내의 주소 계산
function getUrl(file) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${file}`;
}
function upload(input, option) {
  return new Promise((resolve, reject) => {
    const {
      filename,
      dir,
      content,
    } = input;
    const filepath = `${dir}/${filename}`;
    const file = bucket.file(filepath);
    const stream = file.createWriteStream(option);
    stream.on('error', (error) => {
      logging.error();
      reject(error);
    });
    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(getUrl(filepath));
      })
        .catch(reject);
    });
    stream.write(content);
    stream.end();
  });
}
function remove(input) {
  return new Promise((resolve, reject) => {
    const {
      filename,
      dir,
    } = input;
    const filepath = `${dir}/${filename}`;
    const file = bucket.file(filepath);
    if (!file) {
      reject();
    } else {
      file.delete()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          logging.error(error);
          reject();
        });
    }
  });
}
export {
  getUrl,
  upload,
  remove,
};
