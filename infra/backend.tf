terraform {
  backend "s3" {
    bucket         = "terraform-state-blair-nangle"
    key            = "blairnangle-dot-com/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
