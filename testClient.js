/* eslint import/no-extraneous-dependencies: off */

const {
  ApolloClient, InMemoryCache, gql,
} = require('apollo-boost');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('cross-fetch');


const cache = new InMemoryCache();
const link = createHttpLink({
  uri: 'http://localhost:4000',
  fetch,
  headers: {},
});
const client = new ApolloClient({
  link,
  cache,
});

const queryGql = query => client.query({
  query: gql`
      ${query}
    `,
});

const mutateGql = mutattion => client.mutate({
  mutation: gql`
      ${mutattion}
    `,
});

module.exports = { queryGql, mutateGql };
