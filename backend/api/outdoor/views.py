# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request, abort

from api.geoutils import get_city, get_closest
from api.rediswrapper import redis


outdoor_bp = Blueprint("outdoor", __name__)

OUTDOOR_GEO_KEY = "outdoor:{city}:geo"
OUTDOOR_META_KEY = "outdoor:{city}:meta"


def get_closest_outdoor(city, geotag):
    key = OUTDOOR_GEO_KEY.format(city=city)
    locnames = redis.zrange(key, 0, -1)
    stations = {}
    for locname in locnames:
        stations[locname] = redis.geohash(key, locname)[0]

    return get_closest(geotag, stations)

@outdoor_bp.route("/closest", methods=["GET"])
def outdoor_closest():
    lat = request.args.get('lat', default=None)
    long = request.args.get('long', default=None)
    if long is None or lat is None:
        abort(400)

    geotag = (lat, long)
    city = get_city(geotag)
    (station_name, distance) = get_closest_outdoor(city, geotag)

    payload = {}

    return jsonify(payload), 200
