module "static_website" {
  source                  = "git::https://github.com/nicholasM95/terraform-modules.git//modules/static-website?ref=v1.9.1"
  domain_name             = "headoftp.com"
  sub_domain_name         = "@"
  project_name            = "headoftp-com"
  website_host            = "headoftp.com"
  website_path            = "../../dist"
  content_security_policy = var.content_security_policy
  permission_policy       = var.permission_policy
  web_acl_id              = "arn:aws:wafv2:us-east-1:896918338968:global/webacl/waf-cloudfront/6fea776f-ac4b-4be3-b959-df5acdfe8e35"
}
