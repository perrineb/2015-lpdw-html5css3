
module.exports = function(grunt) {
  
  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // grunt-contrib-sass
    sass: { 
      server: {
        options: {                       // Target options 
          style: 'expanded',
          // sourcemap: 'auto',          // default
        },
        files: {                         // Dictionary of files 
          'assets/css/main.css': 'src/sass/main.sass',       // 'destination': 'source' 
        } 
      },
      build: {
        options: {                       // Target options 
          style: 'compressed',
        },
        files: {                         // Dictionary of files 
          'assets/css/main.css': 'src/sass/main.sass',       // 'destination': 'source' 
        } 
      },
    },


    // grunt-contrib-watch
    watch: {
        files: ['src/**/*.js', 'src/**/*.sass', 'src/img/*', 'src/fonts/*'],
        tasks: ['concat:vendors', 'concat:app', 'sass:server', 'copy:jsVendors', 'copy:images', 'copy:fonts'],
    },


    // grunt-browser-sync
    browserSync: {
      bsFiles: {
        src : [
          'assets/css/*.css', 
          '*.html'
        ]
      },
      options: {
        server: {
          watchTask: true,
          baseDir: "./"
        }
      }
    },


    // grunt-postcss
    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units 
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes 
          require('cssnano')() // minify the result 
        ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },


    //grunt-contrib-copy
    copy: {
      images: {
        files: [
          {expand: true, cwd: 'src/img/', src: ['**'], dest: 'assets/img'},
        ],
      },
      jsVendors: {
        files: [
          // IE
          {expand: true, cwd: 'src/js/ie/placeholders/', src: ['placeholders.min.js'], dest: 'assets/js/ie/'},
          {expand: true, cwd: 'src/js/ie/', src: ['html5.js'], dest: 'assets/js/ie/'},
          {expand: true, cwd: 'src/js/ie/respond/', src: ['respond.min.js'], dest: 'assets/js/ie/'},
          {expand: true, cwd: 'src/js/modernizr', src: ['modernizr-3.1.0.min.js'], dest: 'assets/js/'},
        ],
      },
      fonts: {
        files: [
          {expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'assets/fonts'},
        ],
      }
    },


    // grunt-contrib-imagemin
    imagemin: {
      build: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/img/'
        }]
      }
    },


    // grunt-contrib-concat
    concat: {
      vendors: {
        src: [
          'src/js/jquery/core/1.11.3/jquery-1.11.3.min.js', 
          ],
        dest: 'assets/js/vendors/vendors.js'
      },
      app: {
        src: [
          'src/js/application/app.js', 
          ],
        dest: 'assets/js/app.js'
      },
    },


    // grunt-contrib-uglify
    uglify: {
      build: {
        files: [{
          expand: true,
          src: '**/*.js',
          cwd: 'assets/js',
          dest: 'assets/js'
        }]
      },
    },

  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // taches de dev
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      // 'nom-dependance:nom-de-la-tache'
      'sass:server',
      'copy:images',
      'copy:jsVendors',
      'copy:fonts',
      'concat:vendors',
      'concat:app',
      // 'browserSync', 
      'watch'
    ]);
  });

  // taches de livraison
  grunt.registerTask('build', function (target) {
    grunt.task.run([
      // 'nom-dependance:nom-de-la-tache'
      'sass:build',
      'postcss',
      'copy:jsVendors',
      'copy:fonts',
      'imagemin',
      'concat:vendors',
      'uglify:build'
    ]);
  });

};