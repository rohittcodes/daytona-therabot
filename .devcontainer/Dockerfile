FROM oven/bun:1

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"
ENV NODE_ENV=development

# Update packages and install essential utilities
RUN apt-get update && \
    apt-get install -y \
    curl \
    sudo \
    git \
    unzip \
    build-essential \
    python3 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install latest bun version
RUN curl -fsSL https://bun.sh/install | bash

# Create and set working directory
WORKDIR /workspaces/daytona-therabot

# Install global packages
RUN bun install -g next