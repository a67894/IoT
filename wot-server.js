const httpServer = require('./servers/http'),
  		resources = require('./resources/model')

// Internal Plugins
// (for sensors connected to the PI GPIOs)
const bmePlugin = require('./plugins/internal/BME280SensorPlugin')

// External Plugins
const coapPlugin = require('./plugins/external/coapPlugin'),
			mqttPlugin = require('./plugins/external/mqttPlugin')


// To work with real sensors, set simulate to: false
bmePlugin.start({ 'simulate': true, 'frequency': 5000 })
coapPlugin.start({ 'simulate': true, 'frequency': 5000 })

// Send data to EVRYTHNG via MQTT
mqttPlugin.start({ 'frequency': 5000 })



// Start HTTP Server
httpServer
	.listen(resources.pi.port, function () {
		console.log('HTTP server started...')

		console.info('Your WoT Pi is up and running on port %s', resources.pi.port)
	})
