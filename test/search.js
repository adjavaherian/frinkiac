var test = require('tape');
var frinkiac = require('../');

test('search url', function (t) {
    t.plan(2);
    t.equal(frinkiac.searchUrl(), 'https://frinkiac.com/api/search?q=');
    t.equal(frinkiac.searchUrl('blurst of times'), 'https://frinkiac.com/api/search?q=blurst%20of%20times');
});
