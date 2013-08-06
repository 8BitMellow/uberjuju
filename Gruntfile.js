module.exports = function(grunt) {
	
	grunt.initConfig({

		pkg: grunt.file.readJSON("package.json"),
		
		
		// CONFIGURE TASKS
		concat: {
			sourcejs: {
				src: ['dev/source/js/**/*.js'],
				dest: 'dist/js/app.js'
			},
			vendorjs: {
				src: ['dev/vendor/js/jquery.min.js', 'dev/vendor/js/underscore.min.js', 'dev/vendor/js/bootstrap.min.js', 'dev/vendor/js/angular.min.js'],
				dest: 'dist/js/vendor.min.js'
			},
			sourcecss: {
				src: ['dev/source/css/**/*.css'],
				dest: 'dist/css/app.css'
			},			
			vendorcss: {
				src: ['dev/vendor/css/bootstrap.min.css', 'dev/vendor/css/bootstrap-responsive.min.css'],
				dest: 'dist/css/vendor.min.css'				
			}
		},

		uglify: {
    		options: {
    			banner: '/* 8-Bit Mellow Uberjuju application min.js file | <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
    		sourcejs: {
      			files: {
        			'dist/js/app.min.js': ['dist/js/app.js']
      			}
    		}
  		},

  		cssmin: {
  			add_banner: {
    			options: {
      				banner: '/* 8-Bit Mellow Uberjuju application min.css file | <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    			},
    			files: {
      				'dist/css/app.css': ['dist/css/app.css']
    			}
  			}, 			
  			minify: {
    			expand: true,
    			src: ['dist/css/app.css'],
    			dest: 'dist/css/',
    			ext: '.min.css'
  			}
		},


		copy: {
			index: {
				files: [{expand: true, src: ['dev/index.html'], dest: 'dist/index.html'}]
			}.
			images: {
				files: [{expand: true, src: ['dev/source/img/**'], dest: 'dist/img/'}]
			},
			templates: {
				files: [{expand: true, src: ['dev/source/tmpl/**'], dest: 'dist/tmpl/'}]
			},

		},

		watch: {
			index: {
				files: ['<%= copy.index.src %>'],
				tasks: ['copy:index']
			},
			images: {
				files: ['<%= copy.images.src %>'],
				tasks: ['copy:images']
			},
			templates: {
				files: ['<%= copy.templates.src %>'],
				tasks: ['copy:templates']
			},			
			sourcejs: {
				files: ['<%= concat.sourcejs.src %>'],
				tasks: ['concat:sourcejs']
			},
			vendorjs: {
				files: ['<%= concat.vendorjs.src %>'],
				tasks: ['concat:vendorjs']
			},
			sourcecss: {
				files: ['<%= concat.sourcecss.src %>'],
				tasks: ['concat:sourcecss']
			},						
			vendorcss: {
				files: ['<%= concat.vendorcss.src %>'],
				tasks: ['concat:vendorcss']				
			},
			dist: {
				files: ['dist/index.html','dist/js/**','dist/css/**','dist/tmpl/**']
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
	//grunt.loadTasks("tasks");


	// SETUP THE WORKFLOW
	grunt.registerTask("default", ["concat", "uglify", "cssmin","copy", "watch"]);

};