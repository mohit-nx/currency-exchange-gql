import config from '../config/configurations';
import { injectDB } from '../repository';

const { MongoClient } = require('mongodb');

let client;

const dbConnectionOpen = async () => {
  try {
    client = await MongoClient.connect(config.mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    if (client) {
      await injectDB(client, config.database);
    }
    return client;
  } catch (err) {
    console.log('DataBase Connection Error..', err);
    return client;
  }
};

const dbConnectionClose = async () => {
  await client.close();
  console.log('DataBase Connection Close Successfully');
};

export {
  dbConnectionOpen,
  dbConnectionClose,
};
