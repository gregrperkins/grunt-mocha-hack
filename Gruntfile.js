module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {all: ['test/*.js']},
  });
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', 'nodeunit');
  grunt.registerTask('default', 'test');
};
