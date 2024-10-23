import express from 'express';
import fetch  from 'node-fetch';
import dotenv from 'dotenv';
import moment from 'moment-timezone';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Get the current directory of the index.mjs file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the 'views' folder to the 'frontend/views' directory
app.set('views', path.join(__dirname, '../Frontend/views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (e.g., images, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));
dotenv.config();



const apiKey = process.env.KEY;// varible for the api key



app.get('/', async (req, res) => {
  try {

  //  const newYorkDate = moment().tz("America/New_York").format('YYYY-MM-DD');
  const newYorkDate='2024-10-16';

    // Make API call using node-fetch
    const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${newYorkDate}?adjusted=true&include_otc=false&apiKey=${apiKey}`);
    const data = await response.json();

    // Send the data back to the client
    res.status(200);//everything perfect
    res.render('home',{'data':data})

  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while making the API call');
  }}
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});