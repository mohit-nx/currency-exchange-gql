import { getCurrencyList } from '../../repository';
/**
 * Currency Resolvers
 */

export default {
  query: {
    currencyList: async (parent, args, { dataSources: { CurrencyAPI }}) => {
      try {
        return await CurrencyAPI.list();
      } catch (err) {
        throw new Error('Internal Server Error');
      }
    }
  }
}