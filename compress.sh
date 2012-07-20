#!/bin/sh
stylus < css/style.sty > css/style.css
cat css/bootstrap.css css/style.css css/bootstrap-responsive.min.css | cleancss -o css/stylesheet.min.css