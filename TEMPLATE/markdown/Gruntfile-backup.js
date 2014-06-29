'use strict';

module.exports = function(grunt) {
	grunt.initConfig({

		// Project settings
		config: {
			// Configurable paths
			app: '__docs__',
			dist: 'dist'
		},

		pkg: grunt.file.readJSON('package.json'),
		markdown: {
			all: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= config.app %>/markdown/**/*.markdown',
						dest: '<%= config.app %>/html',
						ext: '.html'
					}
				],
				options: {
					template: 'template.html'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			markdown: {
				files: '<%= config.app %>/markdown/**/*.markdown',
				tasks: 'markdown',
				options: {
					livereload: true
				}
			}
		}

	});

	// loads all dependencies for you
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default',['watch']);
}