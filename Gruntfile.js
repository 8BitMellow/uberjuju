module.exports = function(grunt) {
	
	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		
		
		// CONFIGURE TASKS
		concat: {
			appjs: {
				src: ['vendor/js/jquery.min.js', 'vendor/js/underscore.min.js', 'vendor/js/bootstrap.min.js', 'vendor/js/angular.min.js', 'vendor/js/modernizr.custom.js',/*'vendor/js/angular-fire.min.js',*/ 'src/js/**/*.js'],
				dest: 'dist/js/app.js'
			},
			themejs: {
				src: ['theme/js/**/*.js'],
				dest: 'dist/js/theme.js'
			},
			appcss: {
				src: ['vendor/css/bootstrap.min.css', 'vendor/css/bootstrap-responsive.min.css', 'src/css/**/*.css'],
				dest: 'dist/css/app.css'				
			},
			themecss: {
				src: ['theme/css/**/*.css'],
				dest: 'dist/css/theme.css'
			}
		},

		indexpage: {
			template: 'src/index.html',
			dist: {
				dest: 'dist/index.html',
				context: {
					appjs: 'js/app.min.js',
					appcss: 'css/app.css',
					themejs: 'js/theme.js',
					themecss: 'css/theme.css'
				}
			}
		},

		copy: {
			main: {
				files: [{expand: true, src: ['theme/images/**'], dest: 'dist/images/'}]
			}
		},

		watch: {
			js: {
				files: ['<%= concat.appjs.src %>'],
				tasks: ['concat:js']
			},
			css: {
				files: ['<%= concat.appcss.src %>'],
				tasks: ['concat:css']				
			},
			indexpage: {
				files: ['<%= indexpage.template %>'],
				tasks: ['indexpage:dist']
			},
			dist: {
				files: ['dist/css/app.css', 'dist/js/app.min.js', 'dist/css/theme.css', 'dist/js/theme.min.js', 'dist/index.html']
			},
			options: {
					livereload: true,
			}
		}

		


	});

	// LOADED CORE GRUNT-CONTRIB TASKS FROM NPM MODULE
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

	// LOAD A CUSTOM TASK
	grunt.loadTasks("tasks");


	// SETUP THE WORKFLOW
	grunt.registerTask("default", ["concat", "indexpage", "watch"]);

};