module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "./src/img",
                    src: ["**/*.{png,jpg}"],
                    dest: "./dev/img/",
                }]
            }
        },
        less: {
            development: {
                files: {
                    "dev/styles/main.css": "src/styles/less/main.less",
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    "dist/styles/main.min.css": "src/styles/less/main.less",
                }
            }
        },
        watch: {
            less: {
                files: ["src/styles/less/**/*.less"],
                tasks: ["less:development"],
            },
            html: {
                files: ["src/index.html"],
                tasks: ["replace:dev"],
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [{
                        match: "ENDERECO_DO_CSS",
                        replacement: "./styles/main.css",
                    },
                    {
                        match: "ENDERECO_DO_JS",
                        replacement: "../src/scripts/scripts.js",
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["src/index.html"],
                    dest: "dev/",
                }]
            },
            dist: {
                options: {
                    patterns: [{
                        match: "ENDERECO_DO_CSS",
                        replacement: "./styles/main.min.css",
                    },
                    {
                        match: "ENDERECO_DO_JS",
                        replacement: "./scripts/scripts.min.js",
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ["prebuild/index.html"],
                    dest: "dist/",
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    "prebuild/index.html": "src/index.html",
                }
            }
        },
        clean: ["prebuild"],
        uglify: {
            target: {
                files: {
                    "dist/scripts/scripts.min.js": "src/scripts/scripts.js",
                }
            }
        },
    });

    grunt.loadNpmTasks("grunt-contrib-imagemin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("default", ["imagemin", "watch"]);
    grunt.registerTask("build", [
        "less:production",
        "htmlmin:dist",
        "replace:dist",
        "clean",
        "uglify",
    ]);
};
