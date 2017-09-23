# -*- coding: utf-8 -*-
from flask import Flask

__author__ = 'Stefan Berder <stefan@measureofquality.com>'
__contact__ = 'code+mask@measureofquality.com'
__version__ = "0.0.2"


app = Flask(__name__)
app.config.from_object('config')

# ERROR HANDLING
#app.config['TRAP_HTTP_EXCEPTIONS'] = True

redis.init_app(app)

# import views
from api.geo import geo_bp
from api.outdoor import outdoor_bp
from api.tidbits import tidbits_bp

# API endpoints
app.register_blueprint(geo_bp, url_prefix="/geo")
app.register_blueprint(outdoor_bp, url_prefix="/outdoor")
app.register_blueprint(tidbits_bp, url_prefix="/tidbits")


if __name__ == "__main__":
    app.run('0.0.0.0', port=app.config['DEBUG_PORT'])
