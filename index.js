const { GraphQLServer } = require('graphql-yoga');
const { PubSub } = require('graphql-yoga');
const { promisify } = require('util');

const pubsub = new PubSub();

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');


const resolvers = {
  Query,
  Mutation,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    pubsub,
  }),
});
// server.start(() => console.log('Server is running on http://localhost:4000'));

module.exports = { server };
