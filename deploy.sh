#!/bin/bash

CLOUDFRONT_DISTRIBUTION_ID="$1"

aws s3 sync public/ s3://blairnangle.com

aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths /\*
