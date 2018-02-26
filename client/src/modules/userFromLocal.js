/*
appList: [{
  id,
  isHttps,
  domain,
  path,
  favicon,
  title,
}]
 */
function getAppList() {
  const appList = localStorage.getItem('appList');
  return appList ? JSON.parse(appList) : appList;
}
function setAppList(appList) {
  localStorage.setItem('appList', JSON.stringify(appList));
}
function addApp(app) {
  const appList = getAppList() || [];
  const newAppList = appList.concat(app);
  setAppList(newAppList);
  return newAppList;
}
function removeApp(app) {
  const appList = getAppList();
  appList.splice(appList.findIndex(o => o.id === app.id), 1);
  setAppList(appList);
  return appList;
}
function getId() {
  return localStorage.getItem('id');
}
function setId(key) {
  localStorage.setItem('id', key);
}
function init() {
  if (!getId()) {
    setId('nonmember');
  }
  if (!getAppList()) {
    setAppList([]);
  }
}
function isLoggedIn() {
  const id = getId();
  return id && id !== 'nonmember';
}
function getUserInfo() {
  return {
    isLoggedIn: isLoggedIn(),
    id: getId(),
    appList: getAppList(),
  }
}
function setUserInfo({ id, appList }) {
  setAppList(appList);
  setId(id);
}
function removeUserInfo() {
  setId('nonmember');
  setAppList([]);
}
export {
  getId,
  setId,
  addApp,
  removeApp,
  getAppList,
  setAppList,
  isLoggedIn,
  init,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
}
