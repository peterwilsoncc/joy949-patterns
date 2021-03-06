module.exports = function(grunt) {

	// Configuration
	grunt.initConfig({
		// pkg must come first
		// remaining config in alphabetical order
		pkg: grunt.file.readJSON('package.json'),


		// grunt copy config
		copy: {
			assets : {
				files : [
					{
					expand: true,
					cwd: 'node_modules/fontfaceobserver',
					src : [
						'fontfaceobserver.js'
					],
					dest : 'source/assets/js'
					}
				]
			}
		},


		// css comb
		csscomb : {
			options: {
				config: 'csscomb.json'
			},
			dynamic_mappings: {
				expand: true,
				cwd: 'source/assets/css',
				src: ['*.min.css'],
				dest: 'source/assets/css',
				ext: '.min.css'
			}
		},


		// grunt cssmin config
		cssmin: {
			styles : {
				options : {
					advanced : true,
					aggressiveMerging : true,
					compatibility : '*',
					debug : false,
					keepBreaks : true,
					keepSpecialComments : 0,
					mediaMerging : true,
					processImport : true,
					processImportFrom : ['all'],
					roundingPrecision : -1
				},
				files: [{
					expand: true,
					cwd: 'source/assets/css',
					src: ['style.css'],
					dest: 'source/assets/css',
					ext: '.min.css'
				}]
			},
			lte8styles : {
				options : {
					advanced : true,
					aggressiveMerging : true,
					compatibility : 'ie7',
					debug : false,
					keepBreaks : true,
					keepSpecialComments : 0,
					mediaMerging : true,
					processImport : true,
					processImportFrom : ['all'],
					roundingPrecision : -1
				},
				files: [{
					expand: true,
					cwd: 'source/assets/css',
					src: ['style-lte8.css'],
					dest: 'source/assets/css',
					ext: '.min.css'
				}]
			}
		},


		// jshint config
		jshint : {
			options: grunt.file.readJSON('.jshintrc'),
			files: [
				'source/assets/js/*.js',
				'!source/assets/js/fontfaceobserver.js',
				'!source/assets/js/svgxuse.min.js'
			]
		},


		// grunt sass config
		sass: {
			options : {
				indentType : 'tab',
				indentWidth : 1,
				outputStyle : 'expanded',
				sourceMap   : true
			},
			dist: {
				files: {
					'source/assets/css/style.css' : 'source/assets/css/style.scss',
					'source/assets/css/style-lte8.css' : 'source/assets/css/style-lte8.scss',
					'source/assets/css/patternlab.css' : 'source/assets/css/patternlab.scss'
				}
			}
		},


		// grunt shell config
		shell: {
			patternlabPatternsOnly: {
				command: "php core/builder.php -gp"
			},
			patternlab: {
				command: "php core/builder.php -g"
			},
		},


		// grunt watch config
		watch: {
			html: {
				files: ['source/_patterns/**/*.mustache', 'source/**/*.json'],
				tasks: ['shell:patternlabPatternsOnly'],
				options: {
					spawn: false
				}
			},
			assets : {
				files: ['source/**/*'],
				tasks: ['copy', 'css', 'shell:patternlab'],
				options: {
					spawn: false
				}
			}
		}
	});

	// Plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-csscomb');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sass');

	// Tasks
	grunt.registerTask( 'css', [
		'sass',
		'cssmin',
		'csscomb'
	] );


	grunt.registerTask('build', ['copy', 'css', 'shell:patternlab']);
	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('precommit', ['jshint', 'build']);
};
