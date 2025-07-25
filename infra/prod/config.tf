terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.5.0"
    }
  }

  backend "s3" {
    bucket = "head-of-tp-frontend-prd-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }
}
