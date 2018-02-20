/* global fetch */
import update from 'react-addons-update';
import config from '../config';
import * as cookie from './cookie';

function auth(headers) {
  const id = cookie.get('id');
  if (!id) { throw new Error('ID NOT FOUND'); }
  const Authorization = `Bearer ${id}`;
  return update(headers || {}, { Authorization: { $set: Authorization }});
}

export default async function ({ host, path, options = {}, autoAuth = false }) {
  let headers = options.headers;
  if (autoAuth) {
    headers = auth(headers);
  }

  const url = `${host || config.HOST}/api${path}`;
  return fetch(
    url,
    headers ? update(options, { headers: { $set: headers }}) : options,
  )
    .then(response =>
      response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        throw json;
      }
      return json;
    });
}