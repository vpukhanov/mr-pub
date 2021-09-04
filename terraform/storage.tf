resource "google_storage_bucket" "diff-storage" {
  provider = google

  name     = "ether.mister.pub"
  location = "EU"

  uniform_bucket_level_access = true
}
