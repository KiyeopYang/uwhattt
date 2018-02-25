/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('Main/AddApp/data/add');

const {
  waiting,
  success,
  failure,
  init,
} = makeFetchActions(
  ACTIONS,
);
const request = (body) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app',
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        },
      });
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  }
};
const requestWithCustomImg = (body) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: '/app/withCustomImg',
        options: {
          method: 'POST',
          body,
        },
      });
      dispatch(success(data));
    } catch (error) {
      dispatch(failure(error));
    }
  }
};
export {
  ACTIONS,
  request,
  requestWithCustomImg,
  init,
};
