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

		replace: {
			process_tags: {
				src: ['<%= config.app %>/html/*.html'],
				overwrite: true,
				replacements: [
					{
						from: /\[center\]/g,
						to: '<span class="center">'
					},{
						from: /\[\/center\]/g,
						to: '</span>'
					},{
						from: /\[author\]/g,
						to: '<cite>'
					},{
						from: /\[\/author\]/g,
						to: '</cite>'
					},{
						from: /<p\>\[collection\]<\/p\>/g,
						to: '<div class="collection">'
					},{
						from: /<p\>\[\/collection\]<\/p\>/g,
						to: '</div>'
					},{
						from: / -- /g,
						to: ' &mdash; '
					},{
						from: / - /g,
						to: ' &ndash; '
					}

				]
			}
		},

		watch: {
			options: {
				livereload: true
			},
			files: {
				files: '<%= config.app %>/markdown/**/*.markdown',
				tasks: ['markdown','replace'],
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