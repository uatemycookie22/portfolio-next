This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build locally and push to lysanderh.com
Run `bash bin/build-with-push.sh`

This will build the docker image locally, scp it to lysanderh.com:root/portfolio-next, and load the image on the remote

Use this if the local computer is powerful. On the remote it takes roughly 3 minutes.

## Start container
`docker run -d --restart unless-stopped -p 3000:3000 uatemycookie/lhportfolionextbuild:dev`

## Nginx
### Configuration
`cd etc/nginx/sites-available`

### Encryption
`sudo certbot --nginx -d *.lysanderh.com -d *.www.lysanderh.com`

### Enabling
After doing configuration and encryption
`sudo systemctl reload nginx`

Confirming renew works
`sudo certbot renew --dry-run`