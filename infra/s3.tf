resource "aws_s3_bucket" "static_hosting" {
  bucket = var.domain
}

resource "aws_s3_bucket_website_configuration" "static_hosting" {
  bucket = aws_s3_bucket.static_hosting.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.static_hosting.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "static_hosting_policy" {
  bucket = aws_s3_bucket.static_hosting.id

  policy = templatefile("${path.module}/templates/s3-policy.json", {
    awsAccountNumber = var.aws_account_number,
    bucket           = var.domain
    }
  )
}

resource "aws_s3_bucket_cors_configuration" "static_hosting_cors" {
  bucket = aws_s3_bucket.static_hosting.id

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
}

resource "aws_s3_bucket_acl" "static_hosting" {
  bucket = aws_s3_bucket.static_hosting.id

  acl = "private"
}
