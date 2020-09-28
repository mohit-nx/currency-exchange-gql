/**
 * Currency Resolvers
 */

export default {
  query: {
    exchangeRate: async (parent, { base }, { dataSources: { ExchangeAPI } }) => {
      const exchangeRate = await ExchangeAPI.getExchangePrice(base);
      console.log(":::", exchangeRate);
      if (exchangeRate) {
        delete exchangeRate.rates[base];
      }
      return exchangeRate;
    }
  },
  mutation: {
    
  },
}