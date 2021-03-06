// Generated on 2016-01-12 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        cdnify: 'grunt-google-cdn',
        ngtemplates: 'grunt-angular-templates'
    });

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'dist',
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/{,**/}*.js'],
                tasks: ['ngtemplates', 'newer:jshint:all', 'newer:jscs:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            html: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['{,**/}*.html']
            },
            jsTest: {
                files: ['test/spec/{,**/}*.js'],
                tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.css'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9100,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '127.0.0.1',
                livereload: 1336
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static('./')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/{,**/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,**/}*.js']
            }
        },

        // Make sure code styles are up to par
        jscs: {
            options: {
                config: '.jscsrc',
                verbose: true
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/{,**/}*.js'
                ]
            },
            test: {
                src: ['test/spec/{,**/}*.js']
            }
        },


        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.app %>/index.html']
            }
        },

        ngtemplates: {
            dist: {
                options: {
                    module: 'kaxHoursSelect'
                },
                cwd: '<%= yeoman.app %>',
                src: '{,**/}*.html',
                dest: '<%= yeoman.app %>/kax_template_cache.js'
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                src: ['<%= yeoman.app %>/kax_template_cache.js',
                '<%= yeoman.app %>/kax_hours_select_tpls.js']
            }
        },

        //concat
        concat: {
            dist:{
                src:['<%= yeoman.app %>/kax_hours_select.js','<%= yeoman.app %>/kax_template_cache.js'],
                dest:'<%= yeoman.app %>/kax_hours_select_tpls.js'
            }
        },

        // Test settings
        karma: {
            dist: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('test', [
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('default', [
        'clean',
        'ngtemplates',
        'concat',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'ngtemplates',
        'concat'
    ]);
};
