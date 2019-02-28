module.exports = function(grunt) {
    // Do grunt-related things in here

    grunt.initConfig({
        //Config
        run: {
            options: {
              // Task-specific options go here.
            },
            startapi: {
              cmd: 'node',
              args: [
                'apiFront.js'
              ]
            },
            tariningdata3:{
                cmd:'node',
                args:[
                    './tests/TrainingData3.js'
                ]
            }
          }
    })
    grunt.loadNpmTasks('grunt-run');
    grunt.registerTask('default', ['run:tariningdata3','run:startapi']);
    grunt.registerTask('tarin', ['run:tariningdata3']);
    grunt.registerTask('startapi',['run:startapi'])
    
  };