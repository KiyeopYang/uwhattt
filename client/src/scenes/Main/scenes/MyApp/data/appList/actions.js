/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';
import apiFetch from 'modules/apiFetch';

const ACTIONS = makeActionLabels('Main/MyApp/data/appList');
const {
  waiting,
  success,
  failure,
} = makeFetchActions(
  ACTIONS,
);
const request = (ids) => {
  return async (dispatch) => {
    dispatch(waiting());
    try {
      const data = await apiFetch({
        path: `/app/getAppList`,
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ids),
        },
      });
      dispatch(success(data));
      return data;
    } catch (error) {
      dispatch(failure(error));
    }
  }
};

export {
  ACTIONS,
  request,
};
