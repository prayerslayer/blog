#!/bin/bash

set -euox pipefail

function join_by { local IFS="$1"; shift; echo "$*"; }

DISTRIBUTION="EQPFQ10D8RUNK"

synced_files=($(aws s3 sync public s3://npiccolotto.com | awk '{ print $1; }' | cut -c21-))
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths $(join_by ' ' "${synced_files[@]}")
