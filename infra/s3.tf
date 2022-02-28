resource "aws_s3_bucket" "static_hosting" {
  bucket = var.domain
  acl    = "public-read"
  policy = templatefile("templates/s3-policy.json", {
    bucket = var.domain
    }
  )

  cors_rule {
    allowed_headers = [
      "Authorization",
      "Content-Length"
    ]
    allowed_methods = [
      "GET"
    ]
    allowed_origins = [
      "https://${var.domain}"
    ]
    max_age_seconds = 3000
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}
