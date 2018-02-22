import { combineReducers } from 'redux';
import loader from './loader/reducer';
import noticeDialog from './noticeDialog/reducer';
import auth from './auth/reducer';
import removeAccount from './removeAccount/reducer';
import login from './login/reducer';
import signUp from './signUp/reducer';
import messageBar from './messageBar/reducer';

export default combineReducers({
  loader,
  noticeDialog,
  auth,
  removeAccount,
  login,
  signUp,
  messageBar,
});
