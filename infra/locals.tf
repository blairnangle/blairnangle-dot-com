locals {
  cert_subject_alternative_names = [
    "*.${var.domain}"
  ]
}
