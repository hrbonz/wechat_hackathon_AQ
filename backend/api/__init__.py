# -*- coding: utf-8 -*-
from flask import Flask

__author__ = 'Stefan Berder <stefan@measureofquality.com>'
__contact__ = 'code+mask@measureofquality.com'
__version__ = "0.0.1"


app = Flask(__name__)

if __name__ == "__main__":
    app.run('0.0.0.0', port=app.config['DEBUG_PORT'])