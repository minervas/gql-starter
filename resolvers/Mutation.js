const { hsetAsync, hdelAsync } = require('../redis');

const setItem = async (parent, args, context) => {
  const { item: { id } } = args;

  await hsetAsync('items', id, JSON.stringify(args.item));
  context.pubsub.publish('ITEM_SET', args.item);
  return args.item;
};

const deleteItem = async (parent, args, context) => {
  const { id } = args;

  await hdelAsync('items', id);
  context.pubsub.publish('ITEM_DELETED', args.id);
  return id;
};


module.exports = {
  setItem,
  deleteItem,
};
