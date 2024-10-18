import express from 'express';
import fetch  from 'node-fetch';

const app = express();
const apiKey = process.env.API_KEY;

app.get('/api-call', async (req, res) => {
  try {
    // Make API call using node-fetch
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=${apiKey}`);
    const data = await response.json();
    console.log(data)
    // Send the data back to the client
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while making the API call');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});