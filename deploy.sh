#!/bin/bash

LOCAL_ARTIFACTS_DIR="$1"
S3_BUCKET="$2"
CLOUDFRONT_DISTRIBUTION_ID="$3"

aws s3 sync "${LOCAL_ARTIFACTS_DIR}" "s3://${S3_BUCKET}"

aws cloudfront create-invalidation --distribution-id "${CLOUDFRONT_DISTRIBUTION_ID}" --paths /\*
