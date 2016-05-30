"use strict";

function Responder(num, message, client, weather, wolfram, config) {
	
	if (message.substring(0,7).toLowerCase() === 'weather') {
		weatheru(client, weather, num, message, config)
	}else if (message.substring(0,8).toLowerCase() === 'forecast') {
		forecast(client, weather, num, message, config)
	} else	if (message[0].toLowerCase() === 'm') {
		wolframa(client, wolfram, num, message, config)
	} else {
		send(client, num, "Sorry I did not understand your question", config);
	}


}

var method = Responder.prototype;

function wolframa(client, wolfram, num, message, config){
	wolfram.query(message.substring(2), function (err, result) {
		console.log(result)
	  if (err){
	  	console.log(err)
	  }else{
	  	var text = "Answer: " + result[1].subpods[0].text
	  	send(client, num, text, config);
	  }
	});
}


function weatheru(client, weather, num, message, config) {
	
	weather.conditions().request(message.substring(message.length - 5), function(err, response) {
		if (err) {
			console.log("Error1")
			console.log(err)
		} else {
			var text = "The Temp is: " + response.current_observation.temperature_string + ". It feels like " + response.current_observation.feelslike_string + ". It is " + response.current_observation.weather + " out, with wind " + response.current_observation.wind_string + " the UV index is " + response.current_observation.UV;

			send(client, num, text, config);


		}



	});

}

function forecast(client, weather, num, message, config) {
	var days = 0;
	console.log(message.substring(9, 13));
	if(message.substring(10, 13).toLowerCase() == 'day'){
		days = message[9];
	}else{
		days = 1
	}
	days *= 2;
	if(days < 0 ){
		days = 2;
	}
	if(days > 8){
		days = 8;
	}
	//console.log(days);
	weather.forecast().request(message.substring(message.length - 5), function(err, response) {
		if (err) {
			console.log(err)
		} else {
			console.log(response.forecast.txt_forecast.forecastday.length)
			// var text = "The Temp is: " + response.current_observation.temperature_string + ". It feels like " + response.current_observation.feelslike_string + ". It is " + response.current_observation.weather + " out, with wind " + response.current_observation.wind_string + " the UV index is " + response.current_observation.UV;
			for(var i = 0; i < days; i++){
				var text = response.forecast.txt_forecast.forecastday[i].title + ": " + response.forecast.txt_forecast.forecastday[i].fcttext;
				send(client, num, text, config);
			}
			


		}



	});

}


function send(client, num, text, config) {
	client.messages.create({
		body: text,
		to: num,
		from: config.twilio.number
	}, function(err, message) {
		if (err) {
			console.log("Error2")
			console.log(err);
		}
	});
}
module.exports = Responder;