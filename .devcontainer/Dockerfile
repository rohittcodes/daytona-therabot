FROM oven/bun:1

# Config Bun
ENV PATH="~/.bun/bin:${PATH}"
RUN ln -s /usr/local/bin/bun /usr/local/bin/node

# Update packages and install essential utilities
RUN apt-get update && \
    apt-get install -y \
    curl \
    sudo \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*