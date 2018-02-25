/* global fetch */
import { setAuth } from '../../modules/auth';
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from '../../modules/apiFetch';

const ACTIONS = makeActionLabels('data/auth');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);

const request = () => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app',
        autoAuth: true,
      });
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  }
};
const logout = () => {
  return (dispatch) => {
    setAuth(null);
    return dispatch(failure({ message: '로그아웃' }));
  };
};

export {
  ACTIONS,
  request,
  logout,
};
