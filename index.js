// index.js ho hoi!
'use strict';

const axios = require('axios');
const queryString = require('query-string');
const util = require('util');

const SEARCH_URL = 'https://frinkiac.com/api/search?%s';
const MEME_URL = 'https://frinkiac.com/meme/%s/%s?%s';
const CAPTION_URL = 'https://frinkiac.com/api/caption?%s';

exports.memeMap = (item, key) => {
    return this.memeURL(item.Episode, item.Timestamp);
};

exports.searchURL = q => {
    q = queryString.stringify({ q: q || '' });
    return util.format(SEARCH_URL, q);
};

exports.memeURL = (episode, timestamp, caption) => {
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

    const query = queryString.stringify({
        b64lines: caption
    });

    return util.format(MEME_URL, episode, timestamp, query);
};

exports.captionURL = (episode, timestamp) => {
    //e=%s&t=%s
    episode = episode || 'S04E17';
    timestamp = timestamp || '797262';

    const query = queryString.stringify({
        e: episode,
        t: timestamp
    });

    return util.format(CAPTION_URL, query);
};

exports.search = q => {
    q = q || '';
    const query = queryString.stringify({ q: q });

    return axios(this.searchURL(q))
        .catch(err => {
            return err;
        })
        .then(res => {
            return res;
        });
};
