import express from 'express';
import fetch  from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
dotenv.config();


const app = express();
const apiKey = process.env.KEY;// varible for the api key





app.get('/', async (req, res) => {
  try {

    const newYorkDate = moment().tz("America/New_York").format('YYYY-MM-DD');
  

    // Make API call using node-fetch
    const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${newYorkDate}?adjusted=true&include_otc=false&apiKey=${apiKey}`);
    const data = await response.json();
    console.log(apiKey)
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