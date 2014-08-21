module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    projectPaths: {
      dist: 'client/build/production',
      dev: 'client/build/development',
      sass: 'client/app/css',
      partials: 'client/app/partials',
      js: 'client/app/js',
      assets: 'client/app/assets',
      tmp: 'client/app/.tmp',
      serverTemplates: 'server/app/views',
      serverProductionTemplates: 'server/build/production/views'
    },
    clean: {
      dev:  ['<%= projectPaths.dev %>/**/*'],
      dist: ['<%= projectPaths.dist %>/**/*']
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= projectPaths.assets %>',
            dest: '<%= projectPaths.dev %>/assets',
            src: [
              '**/*'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= projectPaths.assets %>',
            dest: '<%= projectPaths.dist %>/assets',
            src: [
              'fonts/**/*',
              'other/**/*'
            ]
          },
          {
            expand: true,
            cwd: '<%= projectPaths.serverTemplates %>',
            dest: '<%= projectPaths.serverProductionTemplates %>',
            src: [
              '**/*'
            ]
          }
        ]
      }
    },
    sass: {
      dev: {
        files: {
          '<%= projectPaths.tmp %>/css/main.css': '<%= projectPaths.sass %>/main.scss'
        },
        options: {
          sourceMap: true
        },
      },
      dist: {
        files: {
          '<%= projectPaths.tmp %>/css/main.css': '<%= projectPaths.sass %>/main.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    },
    autoprefixer: {
      dev: {
        expand: true,
        flatten: true,
        src: '<%= projectPaths.tmp %>/css/*.css',
        dest: '<%= projectPaths.dev %>/css/'
      },
      prod: {
        expand: true,
        flatten: true,
        src: '<%= projectPaths.tmp %>/css/*.css',
        dest: '<%= projectPaths.dist %>/css/'
      }
    },
    browserify: {
      devlib: {
        src: '<%= projectPaths.js %>/lib.js',
        dest: '<%= projectPaths.dev %>/js/lib.js',
        options: {
          transform: ['browserify-ngannotate'],
          watch: true,
          bundleOptions: {
            debug: true
          }
        }
      },
      devapp: {
        src: '<%= projectPaths.js %>/app.js',
        dest: '<%= projectPaths.dev %>/js/app.js',
        options: {
          transform: ['browserify-ngannotate'],
          watch: true,
          external: ['angular'],
          bundleOptions: {
            debug: true,
          }
        }
      },
      distlib: {
        src: '<%= projectPaths.js %>/lib.js',
        dest: '<%= projectPaths.dist %>/js/lib.js',
        options: {
          transform: ['browserify-ngannotate']
        }
      },
      distapp: {
        src: '<%= projectPaths.js %>/app.js',
        dest: '<%= projectPaths.dist %>/js/app.js',
        options: {
          transform: ['browserify-ngannotate'],
          external: ['angular'],
          bundleOptions: {
            debug: true,
          }
        }
      },
    },
    html2js: {
      options: {
        base: '<%= projectPaths.partials %>'
      },
      main: {
        src: ['<%= projectPaths.partials %>/**/*.html'],
        dest: '<%= projectPaths.tmp %>/templates.js'
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= projectPaths.assets %>/',
          src: '**/*.{png,jpg,jpeg,gif,svg,webp}',
          dest: '<%= projectPaths.dist %>/assets'
        }]
      }
    },
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      app: {
        options: {
          spawn: false,
          livereload: true
        },
        files: [
          '<%= projectPaths.dev %>/js/app.js',
          '<%= projectPaths.serverTemplates %>/**/*.html',
          '<%= projectPaths.dev %>/css/main.css',
        ]
      },
      html2js: {
        files: [
          '<%= projectPaths.partials %>/**/*.html'
        ],
        tasks: [
          'html2js'
        ]
      },
      sass: {
        files: [
          '<%= projectPaths.sass %>/main.scss'
        ],
        tasks: [
          'sass','autoprefixer:dev'
        ]
      },
      copy: {
        files: [
          '<%= projectPaths.assets %>/**/*'
        ],
        tasks: [
          'newer:copy:dev'
        ]
      }
    },
    useminPrepare: {
      html: '<%= projectPaths.serverTemplates %>/layout.html',
      options: {
        root: '<%= projectPaths.dist %>',
        dest: '<%= projectPaths.dist %>'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= projectPaths.dist %>/js/**/*',
            '<%= projectPaths.dist %>/css/**/*',
            '<%= projectPaths.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },
    // the js task uses a custom pattern in the options block to replace images in our
    // browserfied/minified templates https://github.com/yeoman/grunt-usemin/issues/235
    usemin: {
      html: [
        '<%= projectPaths.serverProductionTemplates %>/**/*.html',
      ],
      css: ['client/build/production/css/**/*.css'],
      js: ['client/build/production/js/**/*.js'],
      options: {
        assetsDirs: ['<%= projectPaths.dist %>'],
        patterns: {
          js: [
            [
              /(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm,
              'Update the JS to reference our revved images'
            ]
          ]
        }
      }
    }
  });

  // grunt.loadNpmTasks('grunt-concurrent');
  // grunt.loadNpm Tasks('grunt-cdnify');

  grunt.registerTask('dev-build', [
    'clean:dev',
    'html2js',
    'browserify:devlib',
    'browserify:devapp',
    'sass:dev',
    'autoprefixer:dev',
    'copy:dev',
  ]);

  grunt.registerTask('dev', [
    'dev-build',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'useminPrepare',
    'html2js',
    'browserify:distlib',
    'browserify:distapp',
    'sass:dist',
    'autoprefixer:prod',
    'concat',
    'uglify',
    'copy:dist',
    'imagemin',
    'rev',
    'usemin'
  ]);
};
