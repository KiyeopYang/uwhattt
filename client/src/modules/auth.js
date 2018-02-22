import * as cookie from './cookie';

function getAuth() {
  return cookie.get('id');
}
function setAuth(key) {
  cookie.set('id', key);
}
export {
  getAuth,
  setAuth,
}
