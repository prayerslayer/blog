#!/bin/bash

set -euox pipefail

function join_by { local IFS="$1"; shift; echo "$*"; }

synced_files=($(aws s3 sync public s3://npiccolotto.com --dryrun | awk '{ print $5; }' | cut -c21-))
paths=$(join_by ' ' "${synced_files[@]}")
aws cloudfront create-invalidation --distribution-id EQPFQ10D8RUNK --paths $paths
