copy /b bootstrap.css+style.css+bootstrap-responsive.min.css stylesheet.css
java -jar yuicompressor.jar --type css --charset UTF-8 stylesheet.css -o stylesheet.min.css