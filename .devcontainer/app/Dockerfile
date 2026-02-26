# [Choice] Ubuntu version (use ubuntu-22.04 or ubuntu-18.04 on local arm64/Apple Silicon): ubuntu-22.04, ubuntu-20.04, ubuntu-18.04
# https://github.com/microsoft/vscode-dev-containers/blob/main/containers/ubuntu/.devcontainer/Dockerfile
ARG VARIANT=ubuntu-24.04
FROM mcr.microsoft.com/vscode/devcontainers/base:${VARIANT}
ARG DEBIAN_FRONTEND=noninteractive

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    curl

# Nodejs 24
# https://github.com/nodesource/distributions#installation-instructions
RUN curl -fsSL https://deb.nodesource.com/setup_24.x -o nodesource_setup.sh
RUN sudo -E bash nodesource_setup.sh
RUN sudo apt-get install -y nodejs
RUN rm nodesource_setup.sh

# Bun
# https://bun.sh/
RUN curl -fsSL https://bun.com/install | bash

# Gemini CLI
# https://github.com/google-gemini/gemini-cli
RUN npm install -g @google/gemini-cli

# Angular CLI
# https://github.com/angular/angular-cli
RUN npm install -g @angular/cli

# osv-scanner
# https://github.com/google/osv-scanner
RUN curl -L "https://github.com/google/osv-scanner/releases/latest/download/osv-scanner_linux_amd64" -o /usr/local/bin/osv-scanner \
    && chmod +x /usr/local/bin/osv-scanner
