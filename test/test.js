'use strict';

var spawn = require('child_process').spawn;
var path = require('path');

var grunt = require('grunt');
var gruntfileFixture = path.join('test', 'fixtures', 'Gruntfile.js');
var gruntBin = path.resolve('node_modules', '.bin', 'grunt');

// Descent with modification from grunt.util.spawn
var gruntSpawn = function(task, cb) {
  var args = ['--gruntfile', gruntfileFixture].concat([task]);
  var child = spawn(gruntBin, args);
  var stdout = '';
  var stderr = '';
  if (child.stdout) {
    child.stdout.on('data', function(buf) { stdout += buf; });
  }
  if (child.stderr) {
    child.stderr.on('data', function(buf) { stderr += buf; });
  }
  child.on('close', function(code) {
    cb(stdout, code, stderr);
  });
};


exports['grunt'] = {
  // Just testing that subprocessing grunt works
  'can spawn properly': function(test) {
    test.expect(1);
    gruntSpawn('okay', function(stdout, code) {
      test.equal(code, 0, 'should have no error code');
      test.done();
    });
  },
  // Show that we get errors when we throw stuff
  'returns errors to calling process': function(test) {
    test.expect(2);
    gruntSpawn('fail', function(stdout, code) {
      test.notEqual(code, 0, 'should return error code on assertion failure');
      var outHasFail = /Fatal error: broken/.test(stdout);
      test.ok(outHasFail, 'stdout should contain output indicating failure.');
      test.done();
    });
  }
};

exports['grunt-mocha-hack'] = {
  // Show that we can spawn the grunt-mocha-hack and get success
  'can spawn properly': function(test) {
    test.expect(3);
    gruntSpawn('mocha-hack:one', function(stdout, code) {
      // console.log(stdout);
      test.ok(/# tests 3/.test(stdout), 'should have run 3 tests');
      test.ok(/# fail 0/.test(stdout), 'should have failed 0 tests');
      test.equal(code, 0, 'should have no error code');
      test.done();
    });
  },
  // Show that our errors do not cause mocha/grunt to quit abruptly.
  // Instead, we should get a complete and meaningful printout.
  'gets errors properly': function(test) {
    test.expect(3);
    gruntSpawn('mocha-hack:two', function(stdout, code) {
      // console.log(stdout);
      test.ok(/# tests 3/.test(stdout), 'should have run 3 tests');
      test.ok(/# fail 3/.test(stdout), 'should have failed 3 tests');
      test.equal(code, 3, 'should have error code - task failure');
      test.done();
    });
  }
  // TODO(gregp): test useColor flag?
};
