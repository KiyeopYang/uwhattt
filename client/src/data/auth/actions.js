/* global fetch */
import { setAuth } from '../../modules/auth';
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
    setAuth(null);
    return dispatch(failure({ message: '로그아웃' }));
  };
};

export {
  ACTIONS,
  request,
  logout,
};
