build:
	hugo --theme nikolaus

deploy:
	aws s3 cp --recursive docs s3://npiccolotto.com
