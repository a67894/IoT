const exec = require('child_process').exec,
			mqtt = require('mqtt'),
			resources = require('../../resources/model')


const model = resources.pi.sensors


// Load configuration from file (Thng ID and Thng API key)
const config = require('../../evrythng.config.json')

const thngId = config.thngId
const thngApiKey = config.thngApiKey
const thngUrl = '/thngs/'+thngId

var interval,
		localParams = {
			'frequency': 5000
		}


// Connect to the secure MQTT server on EVRYTHNG
const client = mqtt.connect("mqtts://mqtt.evrythng.com:8883", {
	username: 'authorization',
	password: thngApiKey 
})

console.info('Using Thng #'+thngId+' with API Key: '+ thngApiKey)


exports.start = function (params, app) {
  localParams = params

	client
		// Callback called once when the MQTT connection suceeds
		.on('connect', function () {
			console.info('Connected to EVRYTHNG MQTT broker')

			// Subscribe to all properties
			client.subscribe(thngUrl+'/properties/')

			if (!interval)
				// Call the function updateProperties() every 5 seconds
				interval = setInterval(updateProperties, 5000)
		})
		// Called every time an MQTT message is received from the broker
		.on('message', function (topic, message) {
			console.log(message.toString())
		})
}


function updateProperties() {
	// Get the data previosly captured by the BME280 sensor
	updateProperty('temperature', model.temperature.value)
	updateProperty('pressure', model.pressure.value)
	updateProperty('humidity', model.humidity.value)
}


function updateProperty(property,value) {
  client.publish(thngUrl+'/properties/'+property, '[{"value": '+value+'}]')
}


// Let's close this connection cleanly
process.on('SIGINT', function() {
  clearInterval(interval)

  client.end()
  process.exit()
})
