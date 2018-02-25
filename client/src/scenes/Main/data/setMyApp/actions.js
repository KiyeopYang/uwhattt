/* global fetch */
import * as myApp from 'modules/myAppFromCookie';
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('Main/data/setMyApp');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = ({ account, app }) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      let data;
      if (!account) {
        data = myApp.getMyApp();
        if (!Array.isArray(data) || !data.includes(app)) {
          data.push(app);
          myApp.setMyApp(data);
        }
      } else {
        data = await apiFetch({
          path: `/account/${account}`,
          options: {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
          },
        });
      }
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  }
};
export {
  ACTIONS,
  request,
};
