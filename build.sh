#!/bin/bash

set -euo pipefail

export GATSBY_CPU_COUNT="${GATSBY_CPU_COUNT:-1}"

if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  # Local builds should use the same Node version as CI and .nvmrc.
  # shellcheck disable=SC1090
  . "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  nvm use --silent
fi

required_node_major="$(cut -d. -f1 < .nvmrc)"
actual_node_major="$(node --version | tr -d 'v' | cut -d. -f1)"
if [ "${actual_node_major}" != "${required_node_major}" ]; then
  printf 'Expected Node %s from .nvmrc, found Node %s.\n' "${required_node_major}" "${actual_node_major}" >&2
  exit 1
fi

npm exec gatsby build
