
module.exports = function(grunt) {
  
  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: { 
      all: { 
        options: { 
          style: 'expanded',
          sourcemap: 'auto',
        },
        files: { 
          'assets/css/main.css': 'src/sass/main.sass',  
        }
      },
      build: { 
        options: { 
          sourcemap: 'none',
        },
        files: { 
          'assets/css/main.css': 'src/sass/main.sass',  
        }
      }
    },


    watch: {
      all: {
        files: ['src/**/*.js', 'src/**/*.sass', 'src/img/*', 'src/fonts/*'],
        tasks: ['concat:vendors', 'concat:app', 'sass:all', 'copy:jsVendors', 'copy:images', 'copy:fonts'],
      }
    },


    concat: {
      vendors: {
        src: [
          'src/js/jquery/core/1.11.3/jquery-1.11.3.min.js', 
          'src/js/jquery/plugins/woothemes-flexslider/jquery.flexslider-min.js', 
          ],
        dest: 'assets/js/vendors/vendors.js'
      },
    },


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
        ],
      },
      fonts: {
        files: [
          {expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'assets/fonts'},
        ],
      }
    },


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


    postcss: {
      options: {
        processors: [
          require('pixrem')(), // add fallbacks for rem units 
          require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes 
          require('cssnano')() // minify the result 
        ]
      },
      dist: {
        src: [
          'assets/css/*.css',
        ]
      }
    },


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


    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'assets/css/*.css',
            '*.html'
          ]
        },
        options: {
          watchTask: true,
          proxy: "localhost:8888/strategique-sante/"
        }
      }
    },


  });


  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');


  // générer les assets du site Praticien + watch
  grunt.registerTask('server', function (target) {
    grunt.task.run([
      'sass:all',
      'concat:vendors',
      'concat:vendorsHeader',
      'concat:app',
      'copy:jsVendors',
      'copy:images',
      'copy:fonts',
      'browserSync',
      'watch:all',
    ]);
  });


  // crée un dossier build avec
  // tous les assets préfixés, minifiés, etc
  grunt.registerTask('build', function (target) {
    grunt.task.run([

      // contenu de la task 'all', pour pouvoir lance le build sans passer par une autre task
      'sass:build',
      'concat:vendors',
      'concat:vendorsHeader',
      'concat:app',
      'copy:jsVendors',
      'copy:images',
      'copy:fonts',
      
      // minification des css, autoprefixer, fallback rem
      'postcss',

      // minification des JS
      'uglify:build',

      //enfin,  minification des images
      'imagemin:build',
    ]);
  });



};