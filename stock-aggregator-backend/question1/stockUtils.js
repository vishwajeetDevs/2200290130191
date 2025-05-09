const axios = require("axios");
const { getToken } = require("./tokenManager");

async function fetchStockData(ticker, minutes) {
  const token = await getToken();
  const response = await axios.get(`http://20.244.56.144/evaluation-service/stocks/${ticker}/price?minutes=${minutes}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.prices;
}

function calculateAverage(prices) {
  const total = prices.reduce((sum, p) => sum + p, 0);
  return total / prices.length;
}

function calculateCorrelation(arr1, arr2) {
  const n = arr1.length;
  const avg1 = calculateAverage(arr1);
  const avg2 = calculateAverage(arr2);
  let numerator = 0;
  let denom1 = 0;
  let denom2 = 0;
  for (let i = 0; i < n; i++) {
    const x = arr1[i] - avg1;
    const y = arr2[i] - avg2;
    numerator += x * y;
    denom1 += x * x;
    denom2 += y * y;
  }
  return numerator / Math.sqrt(denom1 * denom2);
}

async function getAverage(ticker, minutes, aggregation) {
  const prices = await fetchStockData(ticker, minutes);
  if (aggregation === "average") {
    return { ticker, average: calculateAverage(prices) };
  }
  return { prices };
}

async function getCorrelation(ticker1, ticker2, minutes) {
  const [data1, data2] = await Promise.all([
    fetchStockData(ticker1, minutes),
    fetchStockData(ticker2, minutes),
  ]);
  const correlation = calculateCorrelation(data1, data2);
  return {
    correlation,
    stock1: { ticker: ticker1, average: calculateAverage(data1) },
    stock2: { ticker: ticker2, average: calculateAverage(data2) },
  };
}

module.exports = { getAverage, getCorrelation };
