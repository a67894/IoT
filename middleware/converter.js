const msgpack = require('msgpack5')(),
  		encode = msgpack.encode,
  		json2html = require('node-json2html')


// This middleware is responsible for converting the JSON representation
module.exports = function () {
  return function (req, res, next) {
    console.info('Representation converter middleware called!')

		// Check if the previous middleware left a result for you in req.result
    if (req.result) {
			// Get the best representation to serve from the Accept header
      switch (req.accepts(['json', 'html', 'application/x-msgpack'])) {
        case 'html':
          console.info('HTML representation selected!')

          const transform = {
						'tag': 'div',
						'html': '${name} : ${value}'
					}

          res.send(
						// Encode the JSON result into MessagePack using the encoder
						// and return the result to the client
						json2html.transform(req.result, transform)
					)
          return

        case 'application/x-msgpack':
          console.info('MessagePack representation selected!')

					// Encode the JSON result into MessagePack
					// using the encoder and return the result to the client
          res.type('application/x-msgpack')
          res.send(encode(req.result))
          return

				// For all other formats, default to JSON
        default:
          console.info('Defaulting to JSON representation!')

          res.send(req.result)
          return
      }
    } else {
			// If no result was present in req.result,
			// there’s not much you can do, so call the next middleware
      next()
    }
  }
}
