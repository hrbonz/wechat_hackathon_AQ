# -*- coding: utf-8 -*-
import json

from flask import Blueprint, jsonify, request
from random import randint

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

@tidbits_bp.route("/<id>", methods=["GET"])
def tidbits_id(id):
    t = redis.lindex("tidbits", id)
    return jsonify(json.loads(t)), 200

@tidbits_bp.route("/random", methods=["GET"])
def tidbits_random():
	payload = []
	index = randint(0, redis.llen("tidbits") - 1)
	t = json.loads(redis.lindex("tidbits", index))
	payload.append(t)
	return jsonify(payload), 200