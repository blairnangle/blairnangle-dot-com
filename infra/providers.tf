terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.16.0"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}
