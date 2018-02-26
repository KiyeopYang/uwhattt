/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from '../../../../../../modules/apiFetch';

const ACTIONS = makeActionLabels('Main/AddApp/data/urlInfo');

const {
  waiting,
  success,
  failure,
  init,
} = makeFetchActions(
  ACTIONS,
);
const request = (id) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: `/app/info/${id}`,
      });
      return dispatch(success(data));
    } catch (error) {
      return dispatch(failure(error));
    }
  }
};

export {
  ACTIONS,
  request,
  init,
};
