import { injectCurrency } from './currency';

const injectDB = async (client, dbName) => {
  const db = await client.db(dbName);
  injectCurrency(db);
};

export default injectDB;
