import {Environment, Network, RecordSource, Store} from 'relay-runtime';

import {graphqlURL} from './env';

const source = new RecordSource();
const store = new Store(source);

function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch(graphqlURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

const network = Network.create(fetchQuery);

module.exports = new Environment({
  network,
  store,
});
