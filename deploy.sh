#!/bin/bash

S3_BUCKET="$1"
CLOUDFRONT_DISTRIBUTION_ID="$2"

aws s3 sync public/ "s3://${S3_BUCKET}"

aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths /\*
