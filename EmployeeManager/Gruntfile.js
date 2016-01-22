module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                files: {
                    'build/js/app.min.js': ['app/employeesApp/*.js', 'app/employeesApp/**/*.js']
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'build/css/style.min.css': 'Content/style.css'
                }
            }
        },

        watch: {
            scripts: {
                files: ['app/employeesApp/*.js', 'app/employeesApp/**/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: 'Content/style.css',
                tasks: ['cssmin']    
            }  
        },

        


    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};