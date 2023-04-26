var express = require('express'); // Express web server framework
const bodyParser = require('body-parser')
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '71de91b096024f09a01f64c25cf6ee44'; // Your client id
var client_secret = '4a9fdb72ee7a4cb9a36898ae2df83fae'; // Your secret
var redirect_uri = 'http://localhost:8000/callback'; // Your redirect uri
var type = "medium";

const port = 8000


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors({
    origin: '*', // Set the allowed origin (or use '*' to allow all)
    methods: 'GET, POST, PUT, DELETE', // Set the allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Set the allowed headers
  }))
   .use(cookieParser());

   
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/data', (req, res) => {
  console.log('Client Connected')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalId = setInterval(() => {
    const random = Math.random();
    const date = ''

    if (type == "low") {
      // 30% chance of low heart rate (40-60 bpm)
      heartRate = Math.floor(Math.random() * 21) + 40;
    } else if (type == "medium") {
      // 40% chance of normal heart rate (60-100 bpm)
      heartRate = Math.floor(Math.random() * 41) + 60;
    } else {
      // 30% chance of high heart rate (100-120 bpm)
      heartRate = Math.floor(Math.random() * 21) + 100;
    }

    res.write(`data: ${date},,,${heartRate}\n\n`)
  }, 500)

  res.on('close', () => {
    console.log('Client closed connection')
    clearInterval(intervalId)
    res.end()
  })
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


app.post('/heartbeat', (req, res) => {
  console.log("hello")
  console.log(req.body)
  res.send("We got it!")
  type = req.body.heartbeat;


})



app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})