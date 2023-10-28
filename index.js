// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// my logger midware function
const logger = (req, res, next) => {
  let request = `${req.method} - ${req.path}`
  console.log(request);
  next();
};
app.use(logger);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api", (req, res) => {
  let d = new Date();
  let unix = d.getTime();
  console.log(d);
  res.json({ unix, utc: d.toUTCString() })
});


app.get('/api/:date?', (req, res) => {
  // Store our date response. This will default to the current datetime
  let date = new Date();

  // Check if the optional date parameter was provided
  if (req.params.date) {
    // Convert the date parameter to a string
    let unixDate = +req.params.date;

    // Check if the date passed is unix time. If it's not, use the date string provided
    date = isNaN(unixDate) ? new Date(req.params.date) : new Date(unixDate);

    // Check if the date created is valid. Throw an error if it's an invalid date
    if (!(date instanceof Date) || isNaN(date.getTime())) return res.json({ error: "Invalid Date" });
  }

  // Return the unix and UTC time
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
