/* global fetch */
import * as cookie from 'modules/cookie';
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('data/auth');
const {
  request,
  failure,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/account',
    autoAuth: true,
  },
);

const logout = () => {
  return (dispatch) => {
    cookie.remove('apiKey');
    return dispatch(failure({ message: '로그아웃' }));
  };
};

export {
  ACTIONS,
  request,
  logout,
};
