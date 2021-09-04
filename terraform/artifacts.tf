resource "google_artifact_registry_repository" "default-docker-repository" {
  provider = google-beta

  location      = "europe-north1"
  repository_id = "default-docker"
  format        = "DOCKER"
}
