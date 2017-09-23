# -*- coding: utf-8 -*-
from flask import Flask

__author__ = 'Stefan Berder <stefan@measureofquality.com>'
__contact__ = 'code+mask@measureofquality.com'
__version__ = "0.0.1"


app = Flask(__name__)
app.config.from_object('config')

# ERROR HANDLING
#app.config['TRAP_HTTP_EXCEPTIONS'] = True

redis.init_app(app)

# import views
from api.geo import geo_bp
from api.outdoor import outdoor_bp

# API geo
app.register_blueprint(geo_bp, url_prefix="/geo")
app.register_blueprint(outdoor_bp, url_prefix="/outdoor")

=======
>>>>>>> bakend: base flask app

if __name__ == "__main__":
    app.run('0.0.0.0', port=app.config['DEBUG_PORT'])
