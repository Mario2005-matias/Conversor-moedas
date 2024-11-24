import { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(0); //Valor a ser convertido
  const [result, setResult] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const API_KEY = "9fb885dcb0f3423465950c55"; // Substitua pela sua chave
  const API_URL = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  console.log();

  useEffect(() => {
    // Busca as taxas de câmbio ao carregar o componente
    axios
      .get(API_URL)
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
      })
      .catch((error) => {
        console.error("Erro ao buscar taxas de câmbio:", error);
      });
  }, [fromCurrency]);

  const handleConvert = () => {
    axios
      .get(API_URL)
      .then((response) => {
        const rate = response.data.rates[toCurrency];
        setResult(rate * amount);
      })
      .catch((error) => {
        console.error("Erro ao converter moeda:", error);
      });
  };

  return (
    <div className="ContainerConverter">
      <div>
        <div>
          <label>
            Valor
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <p>Moeda</p>
        <div className="conteinerInputs">
          <label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button onClick={handleConvert}>Converter</button>
      <div className="containerResult">
        {result && (
          <h2 >
            {result.toFixed(2)} {toCurrency}
          </h2>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
