module.exports = function(grunt) {
    // Do grunt-related things in here

    grunt.initConfig({
        //Config
        run: {
            options: {
              // Task-specific options go here.
            },
            startapi: {
              //starts the api service
              cmd: 'node',
              args: [
                'apiFront.js'
              ]
            },
            tariningdata3:{
              //trains and generates .nlp file using TrainingData3
                cmd:'node',
                args:[
                    './tests/TrainingData3.js'
                ]
            }
          }
    })
    grunt.loadNpmTasks('grunt-run');
    //trains with training data 3 and starts api front run "grunt" in cmd
    grunt.registerTask('default', ['run:tariningdata3','run:startapi']);
    //trains wit training data3 run "grunt train3" in cmd
    grunt.registerTask('train3', ['run:tariningdata3']);
    //starts api front run "grunt startapi" in cmd
    grunt.registerTask('startapi',['run:startapi'])
    
  };