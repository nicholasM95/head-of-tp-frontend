terraform {
  required_providers {

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "5.6.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "6.2.0"
    }
  }

  backend "s3" {
    bucket = "head-of-tp-frontend-prd-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}
