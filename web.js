var express =  require('express');
var datetime =  require('datetime');
var redis =  require('redis');

var client = redis.createClient();
var app = express.createServer(express.logger());

//form values
app.use(express.bodyParser());

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
