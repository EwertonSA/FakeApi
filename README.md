# FakeApi

A lightweight mock e-commerce frontend and JSON API for frontend development and API integration experiments.

This project combines:

- a fake REST API powered by `json-server` and `db.json`
- static HTML/CSS/JavaScript pages that simulate an online store
- a simple local development workflow for testing frontend interactions without a real backend

## Features

- Fake product catalog and shopping cart logic
- Payment flow UI
- Product listing and cart pages
- Local JSON API with realistic mock data
- Quick setup for frontend experiments and demos

## Project Structure

```text
.
├── cart.html
├── cart.js
├── db.json
├── index.html
├── package.json
├── package-lock.json
├── payment.js
├── paymentContainers/
├── script.js
├── style.css
├── .gitignore
└── README.md
```

## Tech Stack

- HTML
- CSS
- JavaScript
- JSON Server
- http-server

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the mock API:

```bash
npm run json-server
```

This serves the data from `db.json` at a local JSON endpoint (typically via `json-server`).

3. Start the frontend server:

```bash
npm run dev
```

This serves the static files from the project root, so you can open the app in your browser.

## Typical Usage

- Visit the app in the browser to view products and cart interactions.
- Use the mock API endpoints generated from `db.json` to experiment with data fetching and UI behavior.
- Extend or modify the mock data in `db.json` to simulate different products, carts, or payment states.

## Example Scripts

The project includes the following scripts in `package.json`:

```json
"scripts": {
  "json-server": "json-server --watch db.json",
  "dev": "http-server -c-1 ."
}
```

## Notes

- This is intended for local development and prototyping.
- The repository does not include a real backend or production-ready API.
- Data is stored in `db.json` and is meant to be easily edited for testing scenarios.

## License

This project is licensed under the ISC license.
