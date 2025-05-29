variable "content_security_policy" {
  type        = string
  description = "Content Security Policy header"
  default     = "frame-ancestors 'none'; default-src 'none'; img-src 'self' a.basemaps.cartocdn.com b.basemaps.cartocdn.com c.basemaps.cartocdn.com data:; script-src 'self' 'unsafe-inline'; script-src-elem 'self'; style-src 'self' 'unsafe-inline'; object-src 'none'; font-src 'self'; connect-src 'self' api.headoftp.com; base-uri 'self'; manifest-src 'self'; form-action 'self'; frame-src 'self'; worker-src 'self'"
}

variable "permission_policy" {
  type        = string
  description = "Permission Policy header"
  default     = "accelerometer=(),autoplay=(),camera=(),encrypted-media=(),fullscreen=*,geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),sync-xhr=(),usb=(),xr-spatial-tracking=()"
}
