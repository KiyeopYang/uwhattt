import { combineReducers } from 'redux';
import addApp from './scenes/AddApp/reducer';
import appList from './scenes/AppList/reducer';
import appView from './scenes/AppView/reducer';

export default combineReducers({
  addApp,
  appList,
  appView,
});
