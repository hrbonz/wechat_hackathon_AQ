# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request, abort, json,\
                  current_app
import requests

from api.geoutils import get_city, get_closest, hash2tag
from api.rediswrapper import redis
from api.utils import url_for


outdoor_bp = Blueprint("outdoor", __name__)

OUTDOOR_GEO_KEY = "outdoor:{city}:geo"
OUTDOOR_META_KEY = "outdoor:{city}:meta"

GAMS_API = "https://api.measureofquality.com/v2/okq"


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

    payload = {
        "closest": station_name,
        "distance": distance,
        "details_uri": url_for(".station_details", city=city, id=station_name),
        "pm25_uri": url_for(".station_pm25", city=city, id=station_name),
    }

    return jsonify(payload), 200


@outdoor_bp.route("/station/<city>/<id>", methods=["GET"])
def station_details(city, id):
    key = OUTDOOR_META_KEY.format(city=city)
    payload = json.loads(redis.hget(key, id))
    key = OUTDOOR_GEO_KEY.format(city=city)
    geohash = redis.geohash(key, id)[0]
    geotag = hash2tag(geohash)
    payload["lat"], payload["long"] = geotag

    return jsonify(payload), 200


@outdoor_bp.route("/station/<city>/<id>/pm25", methods=["GET"])
def station_pm25(city, id):
    uri = "/pm25in:cn:{city}:{id}/records/latest".format(city=city, id=id)
    res = requests.get(GAMS_API + uri)
    if res.status_code != 200:
        abort(500)
    payload = json.loads(res.text)

    return jsonify(payload), 200
