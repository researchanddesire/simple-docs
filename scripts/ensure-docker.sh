#!/usr/bin/env bash
set -euo pipefail

docker_is_ready() {
  docker info >/dev/null 2>&1
}

wait_for_docker() {
  local attempts="${1:-45}"
  local delay_seconds="${2:-2}"
  local attempt

  echo "Waiting for Docker to finish starting..."

  for ((attempt = 1; attempt <= attempts; attempt++)); do
    if docker_is_ready; then
      echo "Docker is ready."
      return 0
    fi

    sleep "$delay_seconds"
  done

  return 1
}

start_docker_on_macos() {
  if ! command -v open >/dev/null 2>&1; then
    return 1
  fi

  open -a Docker >/dev/null 2>&1 || open /Applications/Docker.app >/dev/null 2>&1
}

start_docker_on_linux() {
  local started=1

  if command -v docker-desktop >/dev/null 2>&1; then
    docker-desktop >/dev/null 2>&1 &
    started=0
  fi

  if [ "$started" -ne 0 ] && command -v systemctl >/dev/null 2>&1; then
    if systemctl --user start docker-desktop >/dev/null 2>&1; then
      started=0
    fi

    if [ "$started" -ne 0 ] && systemctl --user start docker >/dev/null 2>&1; then
      started=0
    fi

    if [ "$started" -ne 0 ] && systemctl start docker >/dev/null 2>&1; then
      started=0
    fi
  fi

  if [ "$started" -ne 0 ] && command -v service >/dev/null 2>&1; then
    if service docker start >/dev/null 2>&1; then
      started=0
    fi
  fi

  return "$started"
}

ensure_docker_running() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker was not found." >&2
    echo "Install Docker Desktop or Docker Engine, then try again." >&2
    return 1
  fi

  if ! docker compose version >/dev/null 2>&1; then
    echo "Docker Compose is not available." >&2
    echo "Make sure Docker is installed correctly, then try again." >&2
    return 1
  fi

  if docker_is_ready; then
    return 0
  fi

  echo "Docker is installed but not running. Trying to start it..."

  case "$(uname -s)" in
    Darwin)
      if ! start_docker_on_macos; then
        echo "Docker could not be started automatically." >&2
        echo "Open Docker Desktop, wait for it to finish starting, then try again." >&2
        return 1
      fi
      ;;
    Linux)
      if ! start_docker_on_linux; then
        echo "Docker could not be started automatically on this Linux setup." >&2
        echo "Start Docker Desktop or the Docker service, then try again." >&2
        return 1
      fi
      ;;
    *)
      echo "Automatic Docker startup is not supported on this operating system." >&2
      echo "Start Docker manually, then try again." >&2
      return 1
      ;;
  esac

  if wait_for_docker; then
    return 0
  fi

  echo "Docker did not finish starting automatically." >&2
  echo "Open Docker Desktop or start the Docker service, wait for it to be ready, then try again." >&2
  return 1
}
