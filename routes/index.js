var express = require('express');
var router = express.Router();
var fs = require('fs')
var config = JSON.parse(fs.readFileSync('/var/www/http/config.js'));
var responder = require('/var/www/http/classes/responder.js');
var twilio = require('twilio');
var client = require('twilio')(config.twilio.sid, config.twilio.auth);
var wolfram = require('wolfram-alpha').createClient(config.wolfram.key, 'plaintext, Result');
var Wunderground = require('wundergroundnode');
var wunderground = new Wunderground(config.weather.key);

/* GET home page. */
router.get('/', function(req, res, next) {
	
});

router.post('/inbound', function(req, res, next) {
	response = new responder(req.body.From, req.body.Body, client, wunderground, wolfram, config);
	

});

module.exports = router;