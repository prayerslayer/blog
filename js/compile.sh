#!/bin/sh
cat jquery.min.js bootstrap.min.js bootstrap-tooltip.js code.js | uglifyjs -o javascripts.min.js