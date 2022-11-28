resource "aws_route53_zone" "blairnangle_dot_com" {
  name = var.domain
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

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.blairnangle_dot_com.id
  name    = "www.${var.domain}"
  type    = "A"

  alias {
    name                   = var.domain
    zone_id                = aws_route53_zone.blairnangle_dot_com.id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "validation" {
  count = length(local.cert_subject_alternative_names) + 1

  zone_id = aws_route53_zone.blairnangle_dot_com.id
  name    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_name, count.index)
  type    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_type, count.index)
  records = [
    element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_value, count.index)
  ]
  ttl             = 60
  allow_overwrite = true
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
    var.zoho_spf_txt_verification_record_value,
    var.keybase_txt_verification_record_value
  ]
}

resource "aws_route53_record" "domain_keys_identified_mail" {
  name    = "zoho._domainkey"
  type    = "TXT"
  zone_id = aws_route53_zone.blairnangle_dot_com.id
  ttl     = 300
  records = [
    var.zoho_dkim_txt_verification_record_value
  ]
}
