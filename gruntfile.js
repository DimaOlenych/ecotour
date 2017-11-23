module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        eslint: {
            target: ['file.js']
        },
        exec: {
            linkchecker: {
                cmd: '"C:\\Program Files (x86)\\LinkChecker\\linkchecker" http://localhost:3000'
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'exec']);
}