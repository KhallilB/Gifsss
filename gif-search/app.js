var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  console.log(req.query.term)

  var queryString = req.query.term;
  var term = encodeURIComponent(queryString);
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      var parsed = JSON.parse(body);
      res.render('home', {gifs: parsed.data})
    });
  });
})

app.get('/', function (req, res) {
    console.log(req.query)
    res.render('home')
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
