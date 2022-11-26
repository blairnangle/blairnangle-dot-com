resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.static_hosting.bucket_regional_domain_name
    origin_id   = "S3-${var.domain}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    var.domain
  ]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD"
    ]
    cached_methods = [
      "GET",
      "HEAD"
    ]
    target_origin_id = "S3-${var.domain}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy     = "redirect-to-https"
    min_ttl                    = 31536000
    default_ttl                = 31536000
    max_ttl                    = 31536000
    compress                   = true
    response_headers_policy_id = aws_cloudfront_response_headers_policy.headers.id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  depends_on = [
    aws_cloudfront_origin_access_identity.origin_access_identity,
    aws_route53_record.validation,
    aws_s3_bucket.static_hosting
  ]

  logging_config {
    bucket          = aws_s3_bucket.static_hosting.bucket_domain_name
    prefix          = "access-logs/"
    include_cookies = true
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {}
