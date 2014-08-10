module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    default_banner:'/*! <%= pkg.name %> by <%= pkg.author.name %> */\n',
    
    dirs: {
      js:   'src',
      less: 'src',
      out:  'min'
    },
    
    jsFiles: [
      // core modules
      '<%= dirs.js %>/lib.js',
      '<%= dirs.js %>/config.js',
      '<%= dirs.js %>/settingsMenu.js',
      
      // optional modules
      '<%= dirs.js %>/search.js',
      '<%= dirs.js %>/menu.js',
      
      '<%= dirs.js %>/style.js',
      '<%= dirs.js %>/picture.js',
    ],
    
    uglify: {
      dist: {
        options: {
          banner: '<%= default_banner %>'
        },
        files: {
          '<%= dirs.out %>/<%= pkg.name %>.js': '<%= jsFiles %>'
        }
      }
    },
    
    concat: {
      dev: {
        src: '<%= jsFiles %>',
        dest: '<%= dirs.out %>/<%= pkg.name %>.js'
      }
    },
    
    less: {
      dist: {
        options: {
          compress: true,
          banner: '<%= default_banner %>'
        },
        files: {
          '<%= dirs.out %>/<%= pkg.name %>.css': '<%= dirs.less %>/global.less'
        }
      },
      dev: {
        files: {
          '<%= dirs.out %>/<%= pkg.name %>.css': '<%= dirs.less %>/global.less'
        }
      }
    },
    
    watch: {
      stylesheets: {
        files: '<%= dirs.less %>/**/*.less',
        tasks: ['less:dev']
      },
      scripts: {
        files: '<%= dirs.js %>/**/*.js',
        tasks: ['concat:dev']
      }
    }
    
  });
  
  grunt.registerTask('default', ['less:dev',  'concat:dev']);
  grunt.registerTask('dist',    ['less:dist', 'uglify:dist']);
};