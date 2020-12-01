const { hgetAsync } = require('../redis');

const item = async (parent, args, context) => {
  const { id } = args;

  const foundItem = await hgetAsync('items', id);
  if (!foundItem) return null;
  return JSON.parse(foundItem);
};

module.exports = { item };
