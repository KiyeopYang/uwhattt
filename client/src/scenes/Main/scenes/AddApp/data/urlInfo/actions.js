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
const request = (url) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      console.log(`/app/info/${encodeURIComponent(url)}`);
      console.log(`/app/info/${url}`);
      const data = await apiFetch({
        path: `/app/info/${url}`,
      });
      dispatch(success(data));
      return data;
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  }
};

export {
  ACTIONS,
  request,
  init,
};
