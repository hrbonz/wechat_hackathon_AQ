# -*- coding: utf-8 -*-
import config_secret
# redis
REDIS = {
    "host": "localhost",
    "port": 6379,
    "db": 0,
}

# Flask
DEBUG = False
DEBUG_PORT = 8080
#SERVER_NAME = "mask.measureofquality.com"
#PREFERRED_URL_SCHEME = "https"

# app
GAMS_API_KEY = config_secret.GAMS_API_KEY
