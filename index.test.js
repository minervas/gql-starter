
const axios = require('axios');

const { server } = require('./index');
const { client } = require('./redis');

let httpServer;

beforeAll(async () => {
  httpServer = await server.start();
});

afterAll(async () => {
  httpServer.close();
  client.quit();
});

describe('Mutation', () => {
  describe('setItem', () => {
    it('should create an item', async () => {
      const { data: { data: { setItem } } } = await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
            mutation {
              setItem(item: { id: "1", values: ["a", "b"] }) {
                id,
                values
              }
            }`,
        },
      });
      expect(setItem).toMatchObject({
        id: '1',
        values: ['a', 'b'],
      });
    });
  });
  describe('deleteItem', () => {
    it('should delete an item', async () => {
      // make sure there is an item to delete
      await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
            mutation {
              setItem(item: { id: "2", values: ["a", "b"] }) {
                id,
                values
              }
            }`,
        },
      });
      const { data: { data: { deleteItem } } } = await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
          mutation DeleteItemTest {
            deleteItem(id: "2")
          }`,
        },
      });
      expect(deleteItem).toBe('2');
      const { data: { data: { item } } } = await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
          query Item {
            item(id: "2") {
              id
            }
          }`,
        },
      });

      expect(item).toBe(null);
    });
  });
});
describe('Query', () => {
  describe('item', () => {
    it('should look up an item', async () => {
      await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
          mutation SetItemTest {
            setItem(item:{ id: "3", values:["a", "b"]}) {
              id,
              values
            }
          }`,
        },
      });

      const { data: { data: { item } } } = await axios({
        method: 'post',
        url: 'http://localhost:4000',
        data: {
          query: `
          query Item {
            item(id: "3") {
              id,
              values
            }
          }`,
        },
      });

      expect(item).toMatchObject({
        id: '3',
        values: ['a', 'b'],
      });
    });
  });
});
