module.exports = function(grunt) {
    "use strict";

    require("load-grunt-tasks"); // Loads all grunt tasks

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./views",
                        src: ["**"],
                        dest: "./dist/views"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: true
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"]
            }
        },
        /* Cleans out transpiled files */
        clean: {
            dist: {
                files: [{
                    src: [
                        "./coverage",
                        "./dist"
                    ]
                }]
            }
        },

        /* Generates the coverage JSON and HTML files */
        "mocha_istanbul": {
            generateReport: {
                options: {
                    mask: "*.spec.js"
                },
                src: "dist"
            }
        },

        /* Rewrites the JSON and HTML coverage files with your actual ES6/TS/CS files */
        remapIstanbul: {
            dist: {
                options: {
                    reports: {
                        "html": "./coverage/lcov-report",
                        "json": "./coverage/coverage.json"
                    }
                },
                src: "./coverage/coverage.json"
            }
        },

        /* Checks the coverage meets the threshold */
        coverage: {
            check: {
                options: {
                    thresholds: {
                        branches: 100,
                        functions: 100,
                        lines: 100,
                        statements: 100
                    },
                    dir: "./coverage"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-istanbul-coverage");
    grunt.loadNpmTasks("grunt-mocha-istanbul");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("remap-istanbul"); // Manually load remap-istanbul

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

    grunt.registerTask("codecoverage", "Runs the code coverage tests", [
        "clean",
        "copy",
        "ts",
        "mocha_istanbul:generateReport",
        "remapIstanbul:dist",
        "coverage:check"
    ]);
};