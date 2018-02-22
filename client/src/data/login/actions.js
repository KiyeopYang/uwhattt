/* global fetch */
import { setAuth } from '../../modules/auth';
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
      setAuth(data.id);
    },
  },
);

export {
  ACTIONS,
  request,
};
