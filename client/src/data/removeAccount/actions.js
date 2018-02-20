/* global fetch */
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('data/removeAccount');
const {
  request,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/account',
    options: {
      method: 'DELETE',
    },
    autoAuth: true,
  },
);

export {
  ACTIONS,
  request,
};
