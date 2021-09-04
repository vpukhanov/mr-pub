resource "google_service_account" "service-worker" {
  provider = google

  account_id   = "service-worker"
  display_name = "Service Worker"
}

resource "google_service_account" "build-worker" {
  provider = google

  account_id   = "build-worker"
  display_name = "Build Worker"
}
