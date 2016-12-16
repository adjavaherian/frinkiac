// example.js

/*
    Here's a simple example of using Frinkiac's search api to get a list of results

    frinkiac module's search function returns a promise with the original response object.
    So you need to check the response object status before moving on.

    You can use frinkiac.memeMap to turn all the responses into proper meme url's,
    but make sure to bind the frinkiac object to the map eg. data.map(frinkiac.memeMap, frinkiac)

*/

var frinkiac = require('../');

frinkiac.search('smrt')
    .then(function(res) {
        if (res.status !== 200) {
            throw res;
        } else {
            return res.data;
        }
    })
    .catch(function(err) {
        t.error(err, err.message);
    })
    .then(function(data) {
        var memeURLs = data.map(frinkiac.memeMap, frinkiac); // ['https://frinkiac.com/meme/S05E03/512110?b64lines=']
        console.log(memeURLs);
        //note: memeMap doesn't do bas64 encoding for the caption lines
    });

/*
    This module also provides url utilities that you can use to form your own requests
    These are unbound URL utils, and might be all you need to design your own req, res workflow
*/

var mySearchURL = frinkiac.searchURL('blurst of times'); // 'https://frinkiac.com/api/search?q=blurst%20of%20times'
var myMemeURL = frinkiac.memeURL('S04E17', '798296', 'Blurst of times?!') // 'https://frinkiac.com/meme/S04E17/798296?b64lines=Qmx1cnN0IG9mIHRpbWVzPyE%3D'
var myCaptionURL = frinkiac.captionURL('S04E17', '798296') // 'https://frinkiac.com/api/caption?e=S04E17&t=798296'
