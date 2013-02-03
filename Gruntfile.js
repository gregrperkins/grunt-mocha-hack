module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      tests: ['test/test.js']
    },
    'mocha-hack': {
      options: {
        useColors: true,
        timeout: 1000,
        reporter: 'spec'
      },
      all: ['test/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadTasks('tasks');
  grunt.registerTask('test', 'mocha-hack:all');
  grunt.registerTask('default', 'test');
};
