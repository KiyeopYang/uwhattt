import * as cookie from './cookie';

function getMyApp() {
  const myApp = cookie.get('myApp');
  if (!myApp) {
    return [];
  }
  return JSON.parse(myApp);
}
function setMyApp(myApp) {
  cookie.set('myApp', JSON.stringify(myApp));
}
export {
  getMyApp,
  setMyApp,
}
