const exec = require('child_process').exec


const resources = require('../../resources/model.js'),
  		utils = require('../../utils/utils.js')


var interval,
		sensor,
		localParams = {
			'simulate': false,
			'frequency': 5000
		}

const model = resources.pi.sensors,
			pluginName = 'BME280'


exports.start = function (params) {
  localParams = params

  if (params.simulate)
    simulate()
  else
    readValuesFromEnviro()
}


// The datatype can be: "Temperature" | "Pressure" | "Relative humidity"
// The callback function waits for the command to be executed & returns it as a string
function readFromHardware(callback) {
	exec("python3 plugins/internal/weather.py", (error, data) => {
		if (error)
			return console.error('Could not read sensor data:', error.message)

		callback(JSON.parse(data))
	})
}


function readValuesFromEnviro() {
	interval = setInterval(function() {
    readFromHardware((data) => {
			const temperature = data.temperature
			console.info('Temperature:', temperature)
			model.temperature.value = temperature

			const pressure = data.pressure
			console.info('Pressure:', pressure)
			model.pressure.value = pressure

			const humidity = data.relativeHumidity
			console.info('Relative humidity:', humidity)
			model.humidity.value = humidity
		})
  }, localParams.frequency)

	console.info('%s sensor started!', pluginName)
}


function simulate() {
  interval = setInterval(function() {
    model.temperature.value = utils.randomInt(0, 40)
		model.pressure.value = utils.randomInt(0, 2000)
    model.humidity.value = utils.randomInt(0, 100)

    console.info(`Temperature: ${model.temperature.value} ºC`)
		console.info(`Pressure: ${model.pressure.value} hPa`)
		console.info(`Relative humidity: ${model.humidity.value} %`)
  }, localParams.frequency)

  console.info('Simulated %s sensor started!', pluginName)
}
