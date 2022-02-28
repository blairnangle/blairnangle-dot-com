resource "aws_acm_certificate" "cert" {
  provider          = aws.acm_provider
  domain_name       = var.domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert_validation" {
  depends_on = [
    aws_acm_certificate.cert
  ]
  provider        = aws.acm_provider
  certificate_arn = aws_acm_certificate.cert.arn
  validation_record_fqdns = [
    for record in aws_route53_record.validation : record.fqdn
  ]
}
