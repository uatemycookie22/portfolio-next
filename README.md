# Lysander H - Portfolio Website

A modern, high-performance portfolio website built with Next.js 16, React 19, and TypeScript 5.

## Getting Started

### Development

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Create a production build:

```bash
npm run build
npm start
```

## Docker Deployment

### Build the Docker Image

```bash
docker build -t portfolio-next .
```

### Run Locally

```bash
docker run -d -p 3000:3000 --name my-portfolio portfolio-next
```

### View Logs

```bash
docker logs -f my-portfolio
```

### Stop Container

```bash
docker stop my-portfolio
```

## Project Structure

```
├── src/
│   ├── app/           # Next.js 16 App Router
│   ├── components/    # React components
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Utility functions
├── public/            # Static assets
├── styles/            # Global styles (SCSS)
└── Dockerfile         # Docker configuration
```
