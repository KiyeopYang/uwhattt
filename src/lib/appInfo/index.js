import faviconCb from 'favicon';
import getTitleCb from 'get-title-at-url';
import urlExistsCb from 'url-exists';
import Promise from 'bluebird';
import URL from 'url-parse';

function getFavicon(url) {
  return new Promise((resolve, reject) => {
    faviconCb(url, (error, favicon) => {
      if (error) { reject(error); }
      else { resolve(favicon); }
    });
  });
}
function getTitle(url) {
  return new Promise((resolve, reject) => {
    getTitleCb(url, (title, error) => {
      if (!title || title === '') {
        reject(error);
      } else {
        resolve(title);
      }
    });
  });
}
function urlExists(url) {
  return new Promise((resolve, reject) => {
    urlExistsCb(url, (error, exists) => {
      if (error) { reject(error); }
      else {
        resolve(exists);
      }
    });
  });
}
async function getInfo(url) {
  try {
    await urlExists(url);
    return {
      favicon: await getFavicon(url),
      title: await getTitle(url),
    };
  } catch (error) {
    throw error;
  }
}

export {
  getFavicon,
  getTitle,
  urlExists,
  getInfo,
}
