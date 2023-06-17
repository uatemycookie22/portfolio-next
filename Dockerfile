FROM node:19.7.0

WORKDIR /src

EXPOSE 443
EXPOSE 80

CMD ["npm", "start"]

# env
COPY package.json /src
COPY .env /src/.env

RUN npm install

# Copy code
COPY . /src
RUN npm run build
