FROM ubuntu:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh


RUN apt-get update && apt-get install -y -q --no-install-recommends \
        curl \
        git \
        libgtk2.0-0 \
        libgtk-3-0  \
        libgbm-dev  \
        libnotify-dev  \
        libgconf-2-4 \
        libnss3  \
        libxss1  \
        libasound2  \
        libxtst6 xauth  \
        xvfb \
        ca-certificates



RUN mkdir /usr/local/nvm
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.18.1
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh  | bash \
    && . ~/.bashrc \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN ["git", "clone", "https://github.com/uatemycookie22/portfolio-next.git"]

WORKDIR /portfolio-next
RUN ["git", "pull", "origin", "cypress/setup"]
RUN ["npm", "i"]
RUN ["npm", "run", "build"]
RUN ["npm", "run", "test"]

EXPOSE 3000
