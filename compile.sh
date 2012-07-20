#!/bin/sh
cat js/jquery.min.js js/bootstrap.min.js js/bootstrap-tooltip.js js/code.js | uglifyjs -o js/javascripts.min.js