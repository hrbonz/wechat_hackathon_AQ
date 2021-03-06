# -*- coding: utf-8 -*-
from geopy.distance import vincenty
import Geohash


def hash2tag(geohash):
    return Geohash.decode(geohash.rstrip("0"))

def get_city(geotag):
    # FIXME(stefan.berder): get to use baidu backend to resolve city
    # g = geocoder.baidu()
    # return g.city
    return "shanghai"

def get_closest(geotag, neighbors):
    closest_locname = None
    mindist = None
    
    for (locname, geohash) in neighbors.items():
        loc_geotag = hash2tag(geohash)
        dist = vincenty(geotag, loc_geotag).km
        if mindist is None:
            mindist = dist
        if dist <= mindist:
            mindist = dist
            closest_locname = locname

    return (locname, mindist)
