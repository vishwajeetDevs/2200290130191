// src/StockData.js
import React, { useState } from 'react';
import axios from 'axios';

const StockData = () => {
  const [ticker, setTicker] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [aggregation, setAggregation] = useState('average');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/get_stock_data', {
        ticker,
        minutes,
        aggregation
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter stock ticker"
      />
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Enter minutes"
      />
      <select
        value={aggregation}
        onChange={(e) => setAggregation(e.target.value)}
      >
        <option value="average">Average</option>
        <option value="max">Max</option>
        <option value="min">Min</option>
      </select>
      <button onClick={fetchData}>Fetch Data</button>

      {data && (
        <div>
          <h3>Stock Data</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockData;
