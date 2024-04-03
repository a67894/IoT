## Credits
The code for this lab was taken from https://github.com/webofthings/wot-book/tree/master/chapter7-implementation and adapted by us to match our requirements, corresponding to receiving temperature, pressure and humidity values from our Enviro+.

## Requirements
The Node.js version **MUST** be **v4.0.0**.

The Node.js dependencies’ versions (present in the package.json file) **MUST** match the following ones:
- **bl:** ^1.0.0
- **body-parser:** ^1.13.1
- **coap:** ^0.20.0
- **cors:** ^2.7.1
- **express:** ^4.12.4
- **mqtt:** ^1.5.0
- **msgpack5:** ^3.3.0
- **node-json2html:** ^1.0.0
- **ws:** 0.7.2 *

\* This dependency comes in an incorrect version from the repository mentioned above, so make sure you fix it by changing the version to 0.7.2 in the package.json file before running `npm install`.
