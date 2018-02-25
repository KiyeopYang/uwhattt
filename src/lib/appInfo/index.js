import faviconCb from 'favicon';
import getTitleCb from 'get-title-at-url';
import Promise from 'bluebird';
import http from 'http';
import URL from 'url';
import request from 'request';

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
    request(url, (e, r) => {
      if (e) reject(e);
      else resolve(r.statusCode !== 404);
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
