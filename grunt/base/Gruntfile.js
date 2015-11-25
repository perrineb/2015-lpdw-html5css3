
module.exports = function(grunt) {
  
  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

  });


  // grunt.loadNpmTasks('');


  // tache courrante en dev
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      // 'nom-dependance:nom-de-la-tache'
    ]);
  });

  // tpache de livraison
  grunt.registerTask('build', function (target) {
    grunt.task.run([
      // 'nom-dependance:nom-de-la-tache'
    ]);
  });

};