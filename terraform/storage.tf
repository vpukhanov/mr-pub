resource "google_storage_bucket" "diff-storage" {
  name     = "ether.mister.pub"
  location = "EU"

  uniform_bucket_level_access = true

  lifecycle_rule {
    condition {
      age = 2
    }
    action {
      type = "Delete"
    }
  }
}