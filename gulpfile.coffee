#########################################################
# Share.js
# Author: matt@wintr.us
#########################################################

#--------------------------------------------------------
# Requirements
#--------------------------------------------------------

gulp    = require 'gulp'
plugins = require('gulp-load-plugins')()
    
#--------------------------------------------------------
# Main Tasks
#--------------------------------------------------------

gulp.task "default", ["dev"]
gulp.task "dev", ["compile", "server", "watch"]
gulp.task "build", ["compile"]

#--------------------------------------------------------
# Compile
#--------------------------------------------------------

gulp.task "compile", ->
  gulp.src("./src/share.coffee")
    .pipe(plugins.coffee(bare: false).on("error", plugins.util.log))
    .pipe gulp.dest("./dist/")

#--------------------------------------------------------
# Server
#--------------------------------------------------------

gulp.task "server", ->
   gulp.src "./"
    .pipe plugins.webserver
      port: 3000
      livereload: true 

#--------------------------------------------------------
# Watch
#--------------------------------------------------------

gulp.task "watch", ->
  gulp.watch "./src/share.coffee", ["compile"]
