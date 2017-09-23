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


redis = RedisWrapper()
