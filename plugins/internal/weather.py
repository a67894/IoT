#!/usr/bin/env python3
from bme280 import BME280

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

bus = SMBus(1)
bme280 = BME280(i2c_dev=bus)

temperature = bme280.get_temperature()
pressure = bme280.get_pressure()
humidity = bme280.get_humidity()

print(
    """{{\"temperature\": \"{:05.2f} ºC\",\"pressure\": \"{:05.2f} hPa\",\"relativeHumidity\": \"{:05.2f} %\"}}""".format(
        temperature, pressure, humidity
    )
)
