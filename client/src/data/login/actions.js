/* global fetch */
import * as cookie from 'modules/cookie';
import {
  makeActionLabels,
  makeFetchActions,
} from 'modules/reduxHelper';

const ACTIONS = makeActionLabels('data/login');
const {
  request,
} = makeFetchActions(
  ACTIONS,
  {
    path: '/account/login',
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
  },
  {
    onSuccess: function(data) {
      cookie.set('id', data.id);
    },
  },
);

export {
  ACTIONS,
  request,
};
