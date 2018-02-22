import faviconCb from 'favicon';
import getTitleCb from 'get-title-at-url';
import urlExistsCb from 'url-exists';
import Promise from 'bluebird';
import URL from 'url-parse';

function getFavicon(url) {
  return new Promise((resolve) => {
    faviconCb(url, (error, favicon) => {
      if (error) { resolve(); }
      else { resolve(favicon); }
    });
  });
}
function getTitle(url) {
  return new Promise((resolve) => {
    getTitleCb(url, (title) => {
      if (!title || title === '') {
        resolve();
      } else {
        resolve(title);
      }
    });
  });
}
function urlExists(url) {
  return new Promise((resolve, reject) => {
    urlExistsCb(url, (error, exists) => {
      if (error || !exists) { reject(error); }
      else {
        resolve(exists);
      }
    });
  });
}
async function getInfo(url) {
  await urlExists(url);
  const [
    favicon,
    title,
  ] = await Promise.all([
    getFavicon(url),
    getTitle(url),
  ]);
  return {
    favicon,
    title,
  };
}

export {
  getFavicon,
  getTitle,
  urlExists,
  getInfo,
}
