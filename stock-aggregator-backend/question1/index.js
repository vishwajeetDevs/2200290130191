const express = require("express");
const cors = require("cors");
const { getAverage, getCorrelation } = require("./stockUtils");

const app = express();
app.use(cors());

app.get("/stocks/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const { minutes, aggregation } = req.query;
  try {
    const data = await getAverage(ticker, minutes, aggregation);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/stockcorrelation", async (req, res) => {
  const { minutes, ticker } = req.query;
  try {
    const result = await getCorrelation(ticker[0], ticker[1], minutes);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
