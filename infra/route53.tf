resource "aws_route53_zone" "blairnangle_dot_com" {
  name = "blairnangle.com"
}

resource "aws_route53_record" "alias" {
  zone_id = aws_route53_zone.blairnangle_dot_com.id
  name    = var.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  type            = each.value.type
  zone_id         = aws_route53_zone.blairnangle_dot_com.id
  records = [
    each.value.record
  ]
  ttl = 60
}

resource "aws_route53_record" "email" {
  name    = "blairnangle.com."
  type    = "MX"
  zone_id = aws_route53_zone.blairnangle_dot_com.id
  ttl     = 300
  records = [
    "10 mx.zoho.eu",
    "20 mx2.zoho.eu",
    "50 mx3.zoho.eu"
  ]
}

resource "aws_route53_record" "txt_verification" {
  name    = "blairnangle.com."
  type    = "TXT"
  zone_id = aws_route53_zone.blairnangle_dot_com.id
  ttl     = 300
  records = [
    var.zoho_email_txt_verification_record_value,
    var.keybase_txt_verification_record_value
  ]
}
