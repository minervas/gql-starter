
const itemSetSubscribe = (parent, args, context, info) => context.pubsub.asyncIterator('ITEM_SET');

const itemSet = {
  subscribe: itemSetSubscribe,
  resolve: payload => payload,
};

const itemDeletedSubscribe = (parent, args, context, info) => context.pubsub.asyncIterator('ITEM_DELETED');

const itemDeleted = {
  subscribe: itemDeletedSubscribe,
  resolve: payload => payload,
};

module.exports = {
  itemSet,
  itemDeleted,
};
