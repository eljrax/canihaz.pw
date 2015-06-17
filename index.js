var express =require('express'),
  genPass = require('password-generator');



var app = express();

app.get('/custom/:len', function(req, res) {
	if(isNaN(req.params.len)){res.status(400).send('must be a number').end();}
	else{res.status(200).send(genPass(req.params.len, false));}
});
app.get('/custom/:len/:mem', function(req, res) {
	if(req.params.mem != 'true' && req.params.mem != 'false'){
		res.status(400).send('must be true / false').end();
	}
	else{res.status(200).send(genPass(req.params.len, req.params.mem));}
});

app.get('/prefix/:pre', function(req, res) {
	res.status(200).send(genPass(req.params.len, false,req.params.pre));
});

app.use(function(req, res) {
  res.status(200).send(genPass(12, false));
});


app.listen(5432);
