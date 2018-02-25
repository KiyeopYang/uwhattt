import { combineReducers } from 'redux';
import data from './data/reducer';
import addApp from './scenes/AddApp/reducer';
import appList from './scenes/AppList/reducer';
import appView from './scenes/AppView/reducer';
import myApp from './scenes/MyApp/reducer';

export default combineReducers({
  data,
  addApp,
  appList,
  appView,
  myApp,
});
