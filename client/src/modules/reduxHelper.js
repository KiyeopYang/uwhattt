import update from 'react-addons-update';
import apiFetch from './apiFetch';

const WAITING = 'WAITING';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const INIT = 'INIT';
function makeActionLabels(base, arr = [WAITING, SUCCESS, FAILURE, INIT]) {
  return arr.reduce((acc, type) => {
    acc[type] = `${base}/${type}`;
    return acc
  }, {});
}

function makeFetchActions(actions, fetchOptions = {}, { onSuccess, onFailure } = {}) {
  const waiting = () => ({
    type: actions.WAITING,
  });
  const success = (data) => ({
    type: actions.SUCCESS,
    data,
  });
  const failure = (error) => ({
    type: actions.FAILURE,
    error,
  });
  const request = ({ params, body } = {}) => {
    return async (dispatch) => {
      dispatch(waiting());
      try {
        const { options } = fetchOptions;
        let newOptions;
        if (body) {
          let stringified;
          if (options && options.headers) {
            const { headers } = options;
            if (headers['Content-Type'] && headers['Content-Type'] === 'application/json') {
              stringified = JSON.stringify(body);
            }
          }
          newOptions = update(
            options || {},
            { body: { $set: stringified } },
          );
        }
        const { path, host, autoAuth } = fetchOptions;
        const data = await apiFetch({
          path: params ? `${path}/${params}` : path,
          host,
          options: newOptions || options,
          autoAuth,
        });
        dispatch(success(data));
        if (onSuccess) { onSuccess(data); }
      } catch (error) {
        dispatch(failure(error));
        if (onFailure) { onFailure(error); }
      }
    }
  };
  const init = () => ({
    type: actions.INIT,
  });
  return {
    waiting,
    success,
    failure,
    request,
    init,
  }
}

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};
function makeFetchReducers(ACTIONS) {
  return (state = initialState, action) => {
    switch (action.type) {
      case ACTIONS.WAITING:
        return update(state, {
          isFetching: { $set: true },
          error: { $set: null },
        });
      case ACTIONS.SUCCESS:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: null },
          data: { $set: action.data },
        });
      case ACTIONS.FAILURE:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: action.error },
          data: { $set: null },
        });
      case ACTIONS.INIT:
        return update(state, {
          isFetching: { $set: false },
          error: { $set: null },
          data: { $set: null },
        });
      default:
        return state;
    }
  }
}

export {
  makeActionLabels,
  makeFetchActions,
  makeFetchReducers,
}
