group "default" {
  targets = ["client"]
}

target "client" {
  dockerfile = "./apps/client/Dockerfile"
  contexts = {
      app = "./apps/client/"
      base = "."
      shared = ""
  }
  tags = ["client:latest"]
}
