// index.js ho hoi!
'use strict';

var axios = require('axios');
var queryString = require('query-string');
var util = require('util');

var SEARCH_URL = 'https://frinkiac.com/api/search?%s';
var MEME_URL = 'https://frinkiac.com/meme/%s/%s?%s';
var CAPTION_URL = 'https://frinkiac.com/api/caption?%s';

exports.memeMap = function(item, key) {
    return this.memeURL(item.Episode, item.Timestamp);
}

exports.searchURL = function(q) {
    q = queryString.stringify({ q: q || '' });
    return util.format(SEARCH_URL, q);
}

exports.memeURL = function(episode, timestamp, caption) {

    episode = episode || 'S04E17';
    timestamp = timestamp || '797262';
    caption = caption || '';

    // b64lines=Ymx1cnN0IG9mIHRpbWVzIQ==
    // eventually clean emojis
    if (typeof Buffer === 'function') {
        caption = new Buffer(caption).toString('base64');
    } else if (window && typeof window.btoa === 'function') {
        caption = window.btoa(caption);
    }

    var query = queryString.stringify({
        b64lines: caption
    });

    return util.format(MEME_URL, episode, timestamp, query);
}

exports.captionURL = function(episode, timestamp) {
    //e=%s&t=%s
    episode = episode || 'S04E17';
    timestamp = timestamp || '797262';

    var query = queryString.stringify({
        e: episode,
        t: timestamp
    });

    return util.format(CAPTION_URL, query);
}

exports.search = function(q) {

    q = q || '';
    var query = queryString.stringify({ q: q });

    return axios(this.searchURL(q))
        .catch(function(err) {
            return err;
        })
        .then(function(res) {
            return res;
        });

}
