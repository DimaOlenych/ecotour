module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        htmllint: {
            all: ['views/layouts/layout.hbs']
        },
        eslint: {
            target: ['app.js', 'routes/*.js']
        },
        exec: {
            linkchecker: {
                cmd: '"C:\\Program Files (x86)\\LinkChecker\\linkchecker" http://localhost:3000'
            }
        }
    });

    grunt.registerTask('default', ['htmllint', 'eslint', 'exec']);
}