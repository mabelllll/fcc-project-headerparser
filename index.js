// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { json } = require('express');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', (req,res) => {
  let jsonObject = {}
  let ipAdd = req.header("x-forwarded-for")
  if (ipAdd) {
    jsonObject.ipaddress = (ipAdd.split(","))[0]
    jsonObject.language = "English"
    jsonObject.software = req.header('user-agent')
  } else {
    jsonObject.ipaddress = req.connection.remoteAddress
    jsonObject.language = req.header('accept-language')
    jsonObject.software = req.header('user-agent')
  }
  // console.log(req.header)
  res.json(jsonObject)
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
