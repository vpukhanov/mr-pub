resource "google_service_account" "service-worker" {
  provider = google

  account_id   = "service-worker"
  display_name = "Service Worker"
}

resource "google_project_iam_binding" "service-worker-storage-object-admin" {
  provider = google

  role = "roles/storage.objectAdmin"
  members = [
    "serviceAccount:${google_service_account.service-worker.email}"
  ]
}

resource "google_service_account_key" "service-worker-key" {
  provider = google

  service_account_id = google_service_account.service-worker.name
}

resource "google_service_account" "build-worker" {
  provider = google

  account_id   = "build-worker"
  display_name = "Build Worker"
}

resource "google_project_iam_binding" "artifact-registry-repo-admin" {
  provider = google

  role = "roles/artifactregistry.repoAdmin"
  members = [
    "serviceAccount:${google_service_account.build-worker.email}"
  ]
}

resource "google_project_iam_binding" "cloud-build-builds-editor" {
  provider = google

  role = "roles/cloudbuild.builds.editor"
  members = [
    "serviceAccount:${google_service_account.build-worker.email}"
  ]
}

resource "google_service_account_key" "build-worker-key" {
  provider = google

  service_account_id = google_service_account.build-worker.name
}
