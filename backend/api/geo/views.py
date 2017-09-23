# -*- coding: utf-8 -*-
from flask import Blueprint, jsonify, request


geo_bp = Blueprint("geo", __name__)


@geo_bp.route("/reverse/<geotag>", methods=["GET"])
def geo_reverse(geotag):
    # XXX
    print(geotag)
    payload = {
        "city": "Shanghai",
        "country": "China",
        "state": "Shanghai",
    }
    return jsonify(payload), 200
