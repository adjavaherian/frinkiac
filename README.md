# Frinkiac
Universal JavaScript library for Frinkiac. (un-official)

![Professor Frink](http://i.imgur.com/rtFyPUo.gif)

## Installation
`npm install --save frinkiac`

## Usage
This is a Node.js search wrapper for the Amazing Frinkiac Search Engine.
https://frinkiac.com

Here's a simple example of using Frinkiac's (public?) search API to get a list of episode and timestamp results for a Simpsons related quote.

```javascript
// basic search usage
var frinkiac = require('frinkiac');

frinkiac.search('smrt')
    .then(function(res) {
        if (res.status !== 200) {
            throw res;
        } else {
            return res.data;
        }
    })
    .catch(function(err) {
        throw err;
    })
    .then(function(data) {
        var memeURLs = data.map(frinkiac.memeMap, frinkiac); // ['https://frinkiac.com/meme/S05E03/512110?b64lines=']
        //note: memeMap doesn't do bas64 encoding for the caption lines
    });

```
This module's search API eg. `frinkiac.search('stupid flanders')` returns a promise with the original response object,
So you need to check the response object status before moving on.

As a helper function, you can use `frinkiac.memeMap(val, idx)` to turn all the search responses into proper meme url's,
but make sure to bind the frinkiac object to the map eg. `data.map(frinkiac.memeMap, frinkiac)`

This module also provides URL utilities that you can use to form your own requests
These are unbound URL utils, and might be all you need to design your own req, res workflow.

```javascript
var mySearchURL = frinkiac.searchURL('blurst of times'); // 'https://frinkiac.com/api/search?q=blurst%20of%20times'
var myMemeURL = frinkiac.memeURL('S04E17', '798296', 'Blurst of times?!') // 'https://frinkiac.com/meme/S04E17/798296?b64lines=Qmx1cnN0IG9mIHRpbWVzPyE%3D'
var myCaptionURL = frinkiac.captionURL('S04E17', '798296') // 'https://frinkiac.com/api/caption?e=S04E17&t=798296'
```

## API

### .memeMap(*Array*) => function(item, idx) => Array
Util to quickly map over search results and return proper image URLs.

### .captionURL(*episode*, *timestamp*) => String
Util to generate a URL for the Frinkiac Caption API.  Episode and timestamp are strings you get from the search url.

### .memeURL(*episode*, *timestamp*, *caption*) => String
Util to generate a URL for the Frinkiac Meme API which returns an image with a caption.  Args can all be Strings.

### .searchURL(*quotation*) => String
Util to generate a URL that can be used to get Search results from Frinkiac.  Input whatever quote, name, etc. to get results.

### .search(*quotation*) => Promise
API helper to get you a direct interface with Frinkiac API.  No setup or teardown needed as long as you have a network connection and Ajax stack in either Node, Chrome, etc.  Will return an [Axios](https://github.com/mzabriskie/axios) promise that should be checked for status codes before returning the next thenable.  Also note, Axios' response object uses `response.data` to reference the actual data from response.

## Etc.
`npm test` to run tests and 
`node examples/example.js` to see a set of results returned in the console.

## License
MIT © [Amir Djavaherian](http://adjavaherian.com)
