resource "aws_cloudfront_response_headers_policy" "headers" {
  name = "blairnangle-dot-com-security-headers-policy"

  security_headers_config {
    frame_options {
      frame_option = "DENY"
      override     = true
    }
    xss_protection {
      mode_block = true
      protection = true
      override   = true
    }
    strict_transport_security {
      access_control_max_age_sec = "31536000"
      include_subdomains         = true
      preload                    = true
      override                   = true
    }
    content_security_policy {
      content_security_policy = "script-src 'self' 'unsafe-inline' 'unsafe-eval' cloudfront.net s3.amazonaws.com auth0.com"
      override                = false
    }
    content_type_options {
      override = false
    }
  }
}
