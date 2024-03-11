FROM debian:bookworm

# Install necessary dependencies
RUN apt-get update && apt-get install -y -q --no-install-recommends \
    curl git libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 \
    libxss1 libasound2 libxtst6 xauth xvfb ca-certificates

# Create NVM directory
RUN mkdir -p /usr/local/nvm

# Install Node.js using NVM (Node Version Manager)
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 19.7.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Clone and build your website repository
WORKDIR /portfolio-next

COPY package.json .
RUN npm install

COPY env/.env ./.env
COPY . .
RUN npm run build

EXPOSE 443
EXPOSE 80

CMD ["npm", "start"]
