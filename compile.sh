#!/bin/sh
cat js/jquery.min.js js/code.js | uglifyjs -o js/javascripts.min.js