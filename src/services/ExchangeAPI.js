import { RESTDataSource } from 'apollo-datasource-rest';

import config from '../config/configurations';

class ExchangeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.exchangeUri;
  }

  async getExchangePrice(base) {
    return this.get(`latest/?base=${base}&symbols=AUD,CAD,JPY,INR`);
  }
  
}

export default ExchangeAPI;