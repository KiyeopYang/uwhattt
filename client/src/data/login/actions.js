/* global fetch */
import { setAuth } from '../../modules/auth';
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from '../../modules/apiFetch';

const ACTIONS = makeActionLabels('data/login');
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
        path: '/account/login',
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      });
      setAuth(data.id);
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
