module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      tests: ['test/test.js']
    },
  });
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', 'nodeunit');
  grunt.registerTask('default', 'test');
};
