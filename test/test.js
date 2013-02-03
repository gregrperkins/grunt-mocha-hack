'use strict';

var grunt = require('grunt');

var path = require('path');
var gruntfileFixture = path.join('test', 'fixtures', 'Gruntfile.js');

exports['grunt'] = {
  // Just testing that subprocessing grunt works
  'can spawn properly': function(test) {
    test.expect(1);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', gruntfileFixture, 'okay'],
    }, function(err, result, code) {
      test.equal(code, 0, 'should have no error code');
      test.done();
    });
  },
  // Show that we get errors when we throw stuff
  'returns errors to calling process': function(test) {
    test.expect(2);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', gruntfileFixture, 'fail'],
    }, function(err, result, code) {
      test.notEqual(code, 0, 'should return error code on assertion failure');
      var outHasFail = /Fatal error: broken/.test(result.stdout);
      test.ok(outHasFail, 'stdout should contain output indicating failure.');
      test.done();
    });
  }
};

exports['grunt-mocha-hack'] = {
  // Show that we can spawn the grunt-mocha-hack and get success
  'can spawn properly': function(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', gruntfileFixture, 'mocha-hack:one'],
    }, function(err, result, code) {
      console.log(result.stdout);
      test.ok(/# tests 3/.test(result.stdout), 'should have run 3 tests');
      test.ok(/# fail 0/.test(result.stdout), 'should have failed 0 tests');
      test.equal(code, 0, 'should have no error code');
      test.done();
    });
  },
  // Show that our errors do not cause mocha/grunt to quit abruptly.
  // Instead, we should get a complete and meaningful printout.
  'gets errors properly': function(test) {
    test.expect(3);
    grunt.util.spawn({
      grunt: true,
      args: ['--gruntfile', gruntfileFixture, 'mocha-hack:two'],
    }, function(err, result, code) {
      console.log(result.stdout);
      test.ok(/# tests 3/.test(result.stdout), 'should have run 3 tests');
      test.ok(/# fail 3/.test(result.stdout), 'should have failed 3 tests');
      test.equal(code, 3, 'should have error code - task failure');
      test.done();
    });
  }
  // TODO(gregp): test useColor flag?
};
