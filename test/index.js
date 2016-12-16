var test = require('tape');
var frinkiac = require('../');
var nock = require('nock');

test('search URL', function (t) {
    t.plan(2);
    t.equal(frinkiac.searchURL(), 'https://frinkiac.com/api/search?q=');
    t.equal(frinkiac.searchURL('blurst of times'), 'https://frinkiac.com/api/search?q=blurst%20of%20times');
});

test('meme URL', function (t) {
    t.plan(3);
    t.equal(frinkiac.memeURL(), 'https://frinkiac.com/meme/S04E17/797262?b64lines=');
    t.equal(frinkiac.memeURL('S04E17', '797262'), 'https://frinkiac.com/meme/S04E17/797262?b64lines=');
    t.equal(frinkiac.memeURL('S04E17', '798296', 'Blurst of times?!'), 'https://frinkiac.com/meme/S04E17/798296?b64lines=Qmx1cnN0IG9mIHRpbWVzPyE%3D');
});

test('caption URL', function(t) {
    t.plan(2);
    t.equal(frinkiac.captionURL(), 'https://frinkiac.com/api/caption?e=S04E17&t=797262');
    t.equal(frinkiac.captionURL('S04E17', '798296'), 'https://frinkiac.com/api/caption?e=S04E17&t=798296');
});

test('search', function(t) {
    t.plan(3);

    var scope = nock('https://frinkiac.com')
                .get('/api/search?q=smrt')
                .reply(200, [ { Id: 541909, Episode: 'S05E03', Timestamp: 512110 } ]);

    frinkiac.search('smrt')
        .then(function(res){
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
            //test the response, memeURL and memeMap
            nock.restore();
            t.deepEqual(data, [{ Id: 541909, Episode: 'S05E03', Timestamp: 512110 }], 'should be equal');
            t.equal(frinkiac.memeURL(data[0].Episode, data[0].Timestamp, 'S.M.R.T'), 'https://frinkiac.com/meme/S05E03/512110?b64lines=Uy5NLlIuVA%3D%3D');
            t.deepEqual(data.map(frinkiac.memeMap, frinkiac), ['https://frinkiac.com/meme/S05E03/512110?b64lines='], 'should be equal');
        });

});
