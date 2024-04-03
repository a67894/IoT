const express = require('express'),
			router = express.Router(),
			resources = require('./../resources/model')


router
	.route('/')
	.get(function (req, res, next) {
		// Assign the results to a new property of
		// the req object that you pass along from middleware to middleware
		req.result = resources.pi.sensors

		// Call the next middleware;
		// The framework will ensure the next middleware
		// gets access to req (including the req.result) and res
		next()
	})


router
	.route('/temperature')
	.get(function (req, res, next) {
		req.result = resources.pi.sensors.temperature

		next()
	})


router
	.route('/pressure')
	.get(function (req, res, next) {
		req.result = resources.pi.sensors.pressure

		next()
	})


router
	.route('/humidity')
	.get(function (req, res, next) {
		req.result = resources.pi.sensors.humidity

		next()
	})


module.exports = router
