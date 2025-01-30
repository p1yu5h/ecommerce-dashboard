
# Ecommerce Dashboard

A responsive Ecommerce dashboard built with React, TypeScript, Vite, TailwindCSS, and Axios. 

## Key Features

- **Singleton Axios Instance**: Efficient API request management.
- **Observer Pattern**: For smooth Infinite Scroll for loading more products.
- **Lazy Loading**: `ProductDetailsModal` is lazily loaded for faster initial page load.
- **In-memory Cache**: Caches product details to prevent unnecessary network calls.

## Technologies Used
- React
- TypeScript
- Vite
- TailwindCSS
- Axios

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Git

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/p1yu5h/ecommerce-dashboard.git
   cd ecommerce-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local development server:
```bash
npm run dev
```

### Build and Deploy

To build the app:
```bash
npm run build
```

To deploy to GitHub Pages:
```bash
npm run deploy
```

### Linting

Run the linter:
```bash
npm run lint
```
