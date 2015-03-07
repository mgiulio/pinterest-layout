module.exports = function (grunt) {
    grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/style.css': 'sass/style.scss'
				}
			}
		},
        autoprefixer: {
            dist: {
                files: {
                    'css/style.css': 'css/style.css'
                }
            }
        }
    });
	
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
	
	grunt.registerTask('default', ['sass'/* , 'autoprefixer' */]);
};