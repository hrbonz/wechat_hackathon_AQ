# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request, abort


geo_bp = Blueprint("geo", __name__)


@geo_bp.route("/reverse/", methods=["GET"])
def geo_reverse():
    lat = request.args.get('lat', default=None)
    long = request.args.get('long', default=None)
    if long is None or lat is None:
        abort(400)

    payload = {
        "city": "Shanghai",
        "country": "China",
        "state": "Shanghai",
    }

    return jsonify(payload), 200
