# -*- coding: utf-8 -*-
import json

from flask import Blueprint, jsonify, request

from api.rediswrapper import redis



tidbits_bp = Blueprint("tidbits", __name__)


@tidbits_bp.route("/", methods=["GET"])
def tidbits_all():
    fmt = request.args.get('fmt', default='all')
    payload = []
    index = 0
    for tidbit in redis.lrange("tidbits", 0, -1):
    	t = json.loads(tidbit)
    	t["id"] = index
    	index += 1
    	payload.append(t)
    return jsonify(payload), 200
