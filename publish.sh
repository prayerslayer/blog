#!/bin/bash

# get current date
date=$(date "+%d.%m.%Y %H:%M")

# go through arguments
if [[ "$0" == "all" ]]
then
	# do everything
	./compile.sh
	./compress.sh
else
	for arg in "$@"
	do
		if [[ arg == "css" ]]
		then 
			./compress.sh
		else 
			if [[ arg == "js" ]]
			then
				./compile.sh
			fi 
		fi
	done
fi

# add everything to git
git add .

# commit
git commit -m "auto-publish on $date"

# push
git push uber

ECHO "publish successful"