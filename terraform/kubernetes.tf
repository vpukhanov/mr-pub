resource "google_container_cluster" "default" {
  provider = google

  name     = "default-cluster"
  location = "europe-north1-a"

  remove_default_node_pool = true
  initial_node_count       = 1
}

resource "google_container_node_pool" "default_preemptible_nodes" {
  provider = google

  name       = "default-cluster-preemptible-pool"
  location   = google_container_cluster.default.location
  cluster    = google_container_cluster.default.name
  node_count = 1

  node_config {
    preemptible  = true
    machine_type = "e2-medium"
  }
}
