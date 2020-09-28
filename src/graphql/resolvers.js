/**
 * Exporting all resolvers
 */

import { currencyResolvers, exchangeResolvers } from './modules';

const rootResolver = {
  Query: {
    ...currencyResolvers.query,
    ...exchangeResolvers.query,
    // Add other queries here
  },
  // Mutation: {
  //   // Add other mutations here
  // },
  // Subscription: {
  //   // Add other subscriptions here
  // }
};


export default rootResolver;