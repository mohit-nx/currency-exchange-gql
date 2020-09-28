import { getCurrencyList } from '../repository';

class CurrencyAPI {
  async list() {
    return getCurrencyList()
  }
}

export default CurrencyAPI;