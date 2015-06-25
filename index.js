var express = require('express'),
    genPass = require('password-generator');

var app = express();

app.locals.title = 'canihaz.pw';
app.locals.email = 'me@trozzy.net';
app.disable('etag');
app.disable('x-powered-by');

app.get('/custom/:len', function (req, res) {
    "use strict";
    if (isNaN(req.params.len)) {
        res.status(400).send('must be a number\r\n').end();
    } else {
        res.status(200).send(genPass(req.params.len, false) + '\r\n');
    }
});
app.get('/custom/:len/:mem', function (req, res) {
    "use strict";
    if (req.params.mem !== 'true' && req.params.mem !== 'false') {
        res.status(400).send('must be true / false\r\n').end();
    } else {
        res.status(200).send(genPass(req.params.len, req.params.mem) + '\r\n');
    }
});

app.get('/prefix/:pre', function (req, res) {
    "use strict";
    var length = req.params.pre.length + 12;
    res.status(200).send(genPass(length, false, '', req.params.pre) + '\r\n');
});

app.get('/prefix/:pre/:len', function (req, res) {
    "use strict";
    if (isNaN(req.params.len)) {
        res.status(400).send('must be a number\r\n').end();
    } else {
        var length =  parseInt(req.params.len) + parseInt(req.params.pre.length);
        res.status(200).send(genPass(length, false, '', req.params.pre) + '\r\n');
    }
});

// Present a help page for usage in command line or browser
app.get('/help', function (req, res) {
    "use strict";
    var newline;
    if (req.headers['user-agent'].indexOf("Mozilla") > -1 || req.headers['user-agent'].indexOf("Chrome") > -1 || req.headers['user-agent'].indexOf("MSIE") > -1 || req.headers['user-agent'].indexOf("Opera") > -1) {
        newline = "<br/>";
    } else {
        newline = "\r\n";
    }
    res.status(200).send('canihaz.pw is a simple password generator' + newline + newline + 'Options' + newline + '----------' + newline + '/custom/$length' + newline + '/custom/$length/$memorable' + newline + '/prefix/$prefix' + newline + '/prefix/$prefix/$length' + newline);
});

// Present a simple about page
app.get('/about', function (req, res) {
    "use strict";
    res.status(200).send('canihaz.pw is provided by Michael Leer (Trozz) and is hosted on the Rackspace Public Cloud\r\n');
});

// Github Link
app.get('/git', function (req, res) {
    "use strict";
    res.status(200).send('canihaz.pw source is available on Github @ https://github.com/Trozz/canihaz.pw\r\n');
});

//app.use(device.capture());
app.use(function (req, res) {
    "use strict";
    res.status(200).send(genPass(12, false) + '\r\n');
});


// Pass port as arguement
app.listen(process.argv[2]);
