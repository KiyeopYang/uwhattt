/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('Main/AddApp/data/urlInfo');
const {
  request,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/app',
  },
);

export {
  ACTIONS,
  request,
};
