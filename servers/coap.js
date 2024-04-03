const coap = require('coap'),
  		utils = require('./../utils/utils'),
			resources = require('./../resources/model')
			port = 5683


const model = resources.things.coapDevice.sensors


coap
	.createServer(function(req, res) {
		console.log('CoAP device got a request for %s', req.url)

		// We only serve JSON, so you reply with a 4.06 (= HTTP 406: Not acceptable)
		if (req.headers['Accept'] != 'application/json') {
			res.code = '4.06'
			return res.end()
		}

		// Handle the different resources requested
		switch (req.url) {
			case "/temperature":
				respond(res, { 'temperature': model.temperature.value })
				break

			case "pressure":
				respond(res, { 'pressure': model.pressure.value })
				break

			case "/humidity":
				respond(res, { 'humidity': model.humidity.value })
				break

			default:
				respond(res)
		}
	})
	// Start the CoAP server on port 5683 (CoAP’s default port)
	.listen(port, function () {
		console.log("CoAP server started on port %s", port)
	})


// Send the JSON content back or reply with a 4.04 (= HTTP 404: Not found)
function respond(res, content) {
  if (content) {
    res.setOption('Content-Format', 'application/json')
    res.code = '2.05'
    res.end(JSON.stringify(content))
  } else {
    res.code = '4.04'
    res.end()
  }
}
