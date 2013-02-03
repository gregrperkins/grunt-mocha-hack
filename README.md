[![build status](https://secure.travis-ci.org/gregrperkins/grunt-mocha-hack.png)](http://travis-ci.org/gregrperkins/grunt-mocha-hack)

# grunt-mocha-hack

Forked version of
[grunt-simple-mocha](http://github.com/yaymukund/grunt-simple-mocha).

Grunt really doesn't like running after ``uncaughtException``s.

But Mocha really likes letting ``uncaughtException``s run free.

[What to do?](https://github.com/yaymukund/grunt-simple-mocha/issues/16)

![Imgur](http://i.imgur.com/1Q09mCj.png)

If you're running tests that should actually be in a browser engine, try:
[grunt-mocha](https://github.com/kmiyashiro/grunt-mocha).

Seriously, though, this project should be dissolved once
[this shit](https://github.com/joyent/node/issues/4375) lands in earnest.
(node v0.9.5 looks like the first version with that commit.)
