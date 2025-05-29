variable "content_security_policy" {
  type        = string
  description = "Content Security Policy header"
  default     = "frame-ancestors 'none'; default-src 'none'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; script-src-elem 'self' www.googletagmanager.com; style-src 'self' 'unsafe-inline'; object-src 'none'; font-src 'self'; connect-src 'self' api.autoscalenow.com cognito-idp.eu-west-1.amazonaws.com autoscalenow.auth.eu-west-1.amazoncognito.com *.google-analytics.com; base-uri 'self'; manifest-src 'self'; form-action 'self'; frame-src 'self'; worker-src 'self'"
}

variable "permission_policy" {
  type        = string
  description = "Permission Policy header"
  default     = "accelerometer=(),autoplay=(),camera=(),encrypted-media=(),fullscreen=*,geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),sync-xhr=(),usb=(),xr-spatial-tracking=()"
}
