const currencyList = [
  {
    name: "Indian Rupee",
    code: "INR"
  },
  {
    name: "Australian Dollar",
    code: "AUD"
  },
  {
    name: "Canadian Dollar",
    code: "CAD"
  },
  {
    name: "Japanese Yen",
    code: "JPY"
  },
]

let currencyModel;

const injectCurrency = async (db) => {
  if (currencyModel) {
    return;
  }
  try {
    currencyModel = db.collection('currency');
    const currencyListCount = await currencyModel.countDocuments();
    if (currencyListCount === 0) {
      currencyModel.insertMany(currencyList);
    }
  } catch (e) {
    console.error(`Unable to establish collection handles in currency data repository: ${e}`);
  }
};

const getCurrencyList = async () => {
  try {
    const data = await currencyModel.find({}).toArray();
    return data;
  } catch (err) {
    console.log('Error in getCurrencyList....', err.message);
    return err;
  }
};

export {
  injectCurrency,
  getCurrencyList,
}