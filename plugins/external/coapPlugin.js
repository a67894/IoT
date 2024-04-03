// Require the CoAP
// and BL library, a Buffer helper
const coap = require('coap'),
			bl = require('bl')

const	utils = require('./../../utils/utils.js'),
  		resources = require('./../../resources/model'),
			port = 5683


var interval,
		me = resources.things.coapDevice.sensors,
 		pluginName = resources.things.coapDevice.name,
		localParams = {
			'simulate': false,
			'frequency': 5000
		}


exports.start = function (params) {
  localParams = params

  if (params.simulate)
    simulate()
  else
    connectHardware()
}


function connectHardware() {
	// Poll the CoAP device for new metric readings on a regular basis
  interval = setInterval(function() {
    readValueFromCoAP('temperature')
			.then(function(data) {
				me.temperature.value = data
				console.info('Temperature:', me.temperature.value)
			})
			.catch(console.error)

		readValueFromCoAP('pressure')
			.then(function(data) {
				me.pressure.value = data
				console.info('Pressure:', me.pressure.value)
			})
			.catch(console.error)

		readValueFromCoAP('humidity')
			.then(function(data) {
				me.humidity.value = data
				console.info('Relative humidity:', me.humidity.value)
			})
			.catch(console.error)
  }, localParams.frequency)
}


function readValueFromCoAP(metric) {
	return new Promise((resolve, reject) => {
		// This function wraps a coap over UDP request with the enclosed parameters;
		// Replace localhost with the IP of the machine you’re simulating the CoAP device from (e.g., your laptop)
		coap
			.request({
				host: 'localhost',
				port: port,
				pathname: '/'+metric,
				options: { 'Accept': 'application/json' }
			})
			.on('response', function(res) {
				console.info('CoAP response code', res.code)

				if (res.code !== '2.05')
					reject(`Error while reading ${metric} from CoAP, CODE ${res.code}`)

				res.pipe(
					bl(function(err, data) {
						if (err)
							reject(`Error while reading ${metric} from CoAP: ${err}`)

						resolve(JSON.parse(data)[metric])
					})
				)
			})
			.on('error', (err) => {
				reject(`Error while reading ${metric} from CoAP: ${err}`)
			})
			.end()
	})
}


function simulate() {
  interval = setInterval(function() {
    me.temperature.value = utils.randomInt(20, 30)
		me.pressure.value = utils.randomInt(0, 2000)
    me.humidity.value = utils.randomInt(0, 100)

    console.info(`Temperature: ${me.temperature.value} ºC`)
		console.info(`Pressure: ${me.pressure.value} hPa`)
		console.info(`Relative humidity: ${me.humidity.value} %`)
  }, localParams.frequency)

  console.info('Simulated %s sensor started!', pluginName)
}
