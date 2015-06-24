var express =require('express'),
    genPass = require('password-generator');



var app = express();

app.get('/custom/:len', function(req, res) {
	if(isNaN(req.params.len)){
		res.status(400).send('must be a number\n').end();
	}
	else{
		res.status(200).send(genPass(req.params.len, false) + '\n');
	}
});
app.get('/custom/:len/:mem', function(req, res) {
	if(req.params.mem != 'true' && req.params.mem != 'false'){
		res.status(400).send('must be true / false\n').end();
	}
	else{
		res.status(200).send(genPass(req.params.len, req.params.mem) + '\n');
	}
});

app.get('/prefix/:pre', function(req, res) {
	var length = req.params.pre.length + 12;
	res.status(200).send(genPass(length, false,'',req.params.pre) + '\n');
});

app.get('/prefix/:pre/:len', function(req, res) {
        if(isNaN(req.params.len)){
		res.status(400).send('must be a number\n').end();
	}
        else{
		res.status(200).send(genPass(req.params.len, false,'',preq.params.pre) + '\n');
	}
});

app.get('/help', function(req, res) {
  res.status(200).send('canihaz.pw is a simple password generator\n\n Options\n----------\n/custom/$length\n/custom/$length/$memorable\n/prefix/$prefix\n/prefix/$prefix/$length\n');
});

app.get('/about', function(req, res) {
  res.status(200).send('canihaz.pw is provided by Michael Leer (Trozz) and is hosted on the Rackspace Public Cloud\n');
});

app.use(function(req, res) {
  res.status(200).send(genPass(12, false) + '\n');
});

app.listen(5432);
