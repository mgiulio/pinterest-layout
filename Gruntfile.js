module.exports = function (grunt) {
    grunt.initConfig({
		sass: {
			main: {
				options: {
					style: 'expanded',
					sourcemap: 'none'
				},
				files: {
					'tmp/style.css': 'src/style.scss'
				}
			}
		},
		uglify: {
			main: {
				files: {
					'tmp/script.min.js': 'src/script.js'
				}
			}
		},
		copy: {
			dev: {
				files: {
					'dest/index.html': 'src/index.html',
					'dest/style.css': 'tmp/style.css',
					'dest/script.js': 'src/script.js',
					'dest/sprite.svg': 'src/sprite.svg',
				}
			},
			rel: {
				files: {
					'dest/index.html': 'src/index.html',
					'dest/style.css': 'tmp/style.css',
					'dest/script.js': 'tmp/script.min.js',
					'dest/sprite.svg': 'src/sprite.svg'
				}
			}
		}
    });
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('cleandest', 'Cleanup dest directory', function() {
		grunt.file.delete('dest/');
	});
	grunt.registerTask('default', ['sass', 'cleandest', 'copy:dev']);
	grunt.registerTask('rel', ['sass', 'uglify', 'cleandest', 'copy:rel']);
};