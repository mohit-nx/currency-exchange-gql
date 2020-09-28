import config from './config/configurations';
import { typeDefs, resolvers } from './graphql';
import Server from './server';

const server = new Server(config);

const initServer = async () => {
  server.bootstrap()
    .setupApollo({ typeDefs, resolvers });
};

initServer();


export default server;
