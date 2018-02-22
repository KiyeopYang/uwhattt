/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('Main/AddApp/data/urlInfo');

const {
  request,
  init,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/app/info',
  },
);

export {
  ACTIONS,
  request,
  init,
};
