module.exports= function(grunt) {
	// Proyect configuration, task and proyect config.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// uglify
		uglify: {
			option: {
				mangle: false,
				compress: {
					drop_console: true
				}
			},
			js:{
				files:[{
					cwd:'js/src', //
					expand:true, //
					src:'*.js', //
					dest:'js/min' //
				}]
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'scss',
					cssDir: 'css'
				}
			}
		},
		express: {
			all: {
				options: {
					port: 9000,
					hostname: 'localhost',
					bases: ['.'],
					livereload: true
				}
			}
		},
		watch: {
			options: {
				livereload: true,
				//spawn: false
			},
			styles: {
				options: {
					event:['added', 'deleted', 'changed']
				},
				files: ['scss/*.scss'],
				tasks: ['compass:dev']
			}
		}
	});
	// loadNpmTasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-express');
	// Run default task(s).
	grunt.registerTask('default', ['compass:dev']);
	grunt.registerTask('server', ['express', 'watch']);

	grunt.event.on('watch', function(action, filepath) {
		if(grunt.file.isMatch(grunt.config('watch.styles.files'), filepath)) {
			grunt.config('compass.dev.options.specify', [filepath]);
		}
	});
};