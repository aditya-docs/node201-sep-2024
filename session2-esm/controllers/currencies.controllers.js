import currenciesJSON from "../currencies.json" assert { type: "json" };

const getCurrencies = (req, res) => {
  const { min_value } = req.query;
  if (min_value)
    return res.send(
      currenciesJSON.data.filter((curr) => curr.min_size === min_value)
    );
  res.send(currenciesJSON.data);
};

const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const reqCurrency = currenciesJSON.data.find(
    (curr) => curr.id === symbol.toUpperCase()
  );
  if (reqCurrency) return res.send(reqCurrency);
  res
    .status(404)
    .send({ message: `Currency with symbol: ${symbol} could not be found` });
  //res.sendStatus(404);
};

export { getCurrencies, getCurrencyBySymbol };
