#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y curl ca-certificates tar

arch="$(uname -m)"
case "$arch" in
  x86_64) pkg_arch="x86_64" ;;
  aarch64|arm64) pkg_arch="arm64" ;;
  *) echo "Unsupported arch: $arch"; exit 1 ;;
esac

cd /tmp
curl -fL -o nvim.tar.gz "https://github.com/neovim/neovim/releases/latest/download/nvim-linux-${pkg_arch}.tar.gz"
curl -fL -o nvim.sha256sum "https://github.com/neovim/neovim/releases/latest/download/nvim-linux-${pkg_arch}.tar.gz.sha256sum" || true
if [ -s nvim.sha256sum ]; then sha256sum -c nvim.sha256sum; fi

sudo mkdir -p /opt
sudo tar -xzf nvim.tar.gz -C /opt
[ -d "/opt/nvim-linux-${pkg_arch}" ] && sudo mv "/opt/nvim-linux-${pkg_arch}" /opt/nvim
sudo ln -sf /opt/nvim/bin/nvim /usr/local/bin/nvim

rm -f nvim.tar.gz nvim.sha256sum
nvim --version | head -n1
