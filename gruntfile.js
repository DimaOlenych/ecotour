module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

    grunt.initConfig({
        htmllint: {
            all: ['views//*/*.hbs']
        },
        cafemocha: {
            all: { src: 'test/tests-*.js', options: { ui: 'tdd' }, }
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
    grunt.registerTask('api', ['cafemocha']);
}