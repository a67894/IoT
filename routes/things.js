const express = require('express'),
			router = express.Router(),
			resources = require('./../resources/model')


router
	.route('/coapDevice/sensors/:id')
	.get(function (req, res, next) {
		const id = req.params.id

		req.result = resources.coapDevice.sensors[id]

		next()
	})


module.exports = router
