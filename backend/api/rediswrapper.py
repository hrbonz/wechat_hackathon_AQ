# -*- coding: utf-8 -*-
import redis as _redis


class RedisWrapper(object):
    def __init__(self, *args, **kwargs):
        self._redis = None
        if "app" in kwargs:
            self.init_app(*args, **kwargs)

    def init_app(self, app=None):
        if app.config["REDIS"]:
            self._redis = _redis.StrictRedis(host=app.config['REDIS']['host'],
                                             port=app.config['REDIS']['port'],
                                             db=app.config['REDIS']['db'])

    def set(self, key, value):
        return self._redis.set(key, value)

    def hget(self, key, field):
        return self._redis.hget(key, field)

    def zrange(self, key, start, stop):
        return self._redis.zrange(key, start, stop)

    def geohash(self, key, member):
        return self._redis.geohash(key, member)

    def lrange(self, key, start, stop):
        return self._redis.lrange(key, start, stop)

    def lindex(self, key, value):
        return self._redis.lindex(key, value)


redis = RedisWrapper()
