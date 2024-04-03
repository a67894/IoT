const express = require('express'),
  		sensorRoutes = require('./../routes/sensors'),
  		thingsRoutes = require('./../routes/things'),
  		resources = require('./../resources/model'),
  		converter = require('./../middleware/converter'),
  		cors = require('cors'),
  		bodyParser = require('body-parser')


const app = express()


// Define the middlewares and routes
app
	.use(bodyParser.json())
	.use(cors())
	.use('/pi/sensors', sensorRoutes)
	.use('/things', thingsRoutes)
	.get('/pi', function (req, res) {
		res.send('This is the WoT-Pi!')
	})
	// For representation design
	.use(converter())


module.exports = app
