var express =  require('express');
var redis =  require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
}

var app = express.createServer(express.logger());

app.configure(function(){
  //form values
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
});



app.get('/',function(req,resp){
  resp.sendfile(__dirname + '/index.html');
});

app.post('/get-hoed',function(req,resp){
  client.lpush('johns',req.body.email);
  resp.send({status:"we got you"});
});

var port = process.env.PORT || 3000;
app.listen(port,function(){
  console.log("listening on "+port);
});
