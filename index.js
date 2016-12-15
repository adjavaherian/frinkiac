// index.js ho hoi!
'use strict';

var axios = require('axios');
var queryString = require('query-string');
var util = require('util');

var SEARCH_URL = 'https://frinkiac.com/api/search?%s';
var MEME_URL = 'https://frinkiac.com/meme/%s/%d';
var CAPTION_URL = 'https://frinkiac.com/api/caption?e=%s&t=%d'

function urlMap(item, key) {
    return MEME_URL + path.join(item.Episode, item.Timestamp + '.jpg');
}

exports.searchUrl = function(q) {
    q = queryString.stringify({ q: q || '' });
    return util.format(SEARCH_URL, q);
}

// module.exports = {
//
//     search: function(str) {
//
//         var getStr = querystring.stringify({q: str || ''});
//         console.log('search str', getStr);
//         return axios(SEARCH_URL + '?' + getStr)
//             .catch(function(err){
//                 console.log("error: ", err);
//                 return undefined;
//             })
//             .then(function(res, req){
//                 if (res.status !== 200) {
//                     return undefined;
//                 } else {
//                     console.log(res);
//                     // console.log('result', util.inspect(res.data, depth=3, colorize=true));
//                     // console.log('res.statusCode', res.statusCode);
//                     return(res.data);
//                 }
//             })
//             .catch(function(err){
//                 console.log("error: ", err);
//             });
//
//     }
//
// };
