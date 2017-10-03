# -*- coding: utf-8 -*-
import functools

from flask import url_for as _url_for

url_for = _url_for

def url_for_init(app):
    global url_for
    if not app.config['DEBUG']:
        # url_for replacement forcing scheme to https
        url_for = functools.partial(_url_for, _external=True)

