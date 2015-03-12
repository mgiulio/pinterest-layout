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
		concat: {
			main: {  
				src: ['src/lib/*.js', 'src/*.js'],
				dest: 'tmp/script.js'
			}
		},
		uglify: {
			options: {
				sourceMap: true
			},
			main: {
				files: {
					'tmp/script.js': 'tmp/script.js'
				}
			}
		},
		copy: {
			dest: {
				files: {
					'dest/index.html': 'src/index.html',
					'dest/style.css': 'tmp/style.css',
					'dest/script.js': 'tmp/script.js',
					'dest/sprite.svg': 'src/sprite.svg',
					'dest/script.js.map': 'tmp/script.js.map'
				}
			}
		}
    });
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask('clean', 'Cleanup tmp and dest directories', function() {
		grunt.file.delete('tmp/');
		grunt.file.delete('dest/');
	});
	
	grunt.registerTask('default', ['clean', 'sass', 'concat', 'copy']);
	grunt.registerTask('release', ['clean', 'sass', 'concat', 'uglify', 'copy']);
};
