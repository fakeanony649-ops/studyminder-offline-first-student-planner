# StudyMinder

[cloudflarebutton]

StudyMinder is a modern full-stack web application built on Cloudflare Workers. It features a responsive React frontend with Tailwind CSS styling, shadcn/ui components, and a Hono-powered API backend. Designed for rapid development and deployment, it includes theme support, error reporting, and seamless SPA handling.

## Key Features

- **Full-Stack Architecture**: React frontend with Cloudflare Workers backend using Hono for API routes.
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark/light theme toggle, and responsive sidebar layout.
- **State Management**: TanStack Query for data fetching, React Router for navigation.
- **Developer Experience**: Hot reload with Vite, TypeScript throughout, ESLint integration.
- **Production Ready**: Automatic SPA routing, CORS handling, error boundaries, client error reporting to API.
- **Cloudflare Native**: Zero-config deployment to Workers, Pages integration for assets.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, React Router, TanStack Query, Framer Motion, Sonner
- **Backend**: Hono, Cloudflare Workers, Wrangler
- **UI/UX**: Lucide React icons, Radix UI primitives
- **Tools**: Bun (package manager), ESLint, Prettier

## Prerequisites

- [Bun](https://bun.sh/) installed (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for deployment
- Cloudflare account with Workers enabled

## Quick Start

1. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd studyminder-k9awzwpr7_vevsyltcmpx
   bun install
   ```

2. **Development Server**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Build for Production**:
   ```bash
   bun build
   ```

## Development

- **Type Generation**: `bun cf-typegen` (generates Worker bindings)
- **Linting**: `bun lint`
- **Preview Build**: `bun preview`
- **Add API Routes**: Edit `worker/userRoutes.ts` (core routing in `worker/index.ts` is protected)
- **Frontend Routing**: Update `src/main.tsx` router configuration
- **Custom Components**: Leverage shadcn/ui via `components.json` (aliases: `@/components/ui/*`)

Hot reload works for both frontend and Worker. API routes available at `/api/*`.

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun deploy
```

This builds the frontend assets and deploys the Worker. Configure your `wrangler.jsonc` for custom bindings (KV, D1, R2, DOs).

[cloudflarebutton]

For custom domains, run `wrangler deploy --name your-app` and bind via Cloudflare dashboard.

## Project Structure

```
├── src/              # React frontend
│   ├── components/   # UI components (shadcn/ui + custom)
│   ├── pages/        # Route pages
│   └── hooks/        # Custom React hooks
├── worker/           # Cloudflare Worker backend
│   ├── index.ts      # Core app (DO NOT MODIFY)
│   └── userRoutes.ts # Add your API routes here
├── package.json      # Dependencies & scripts
└── wrangler.jsonc    # Worker config
```

## Customization

- **Theme**: Edit `src/index.css` CSS variables or `tailwind.config.js`.
- **Sidebar**: Modify `src/components/app-sidebar.tsx` or remove `AppLayout`.
- **Home Page**: Replace `src/pages/HomePage.tsx`.
- **API**: Extend routes in `worker/userRoutes.ts` (e.g., `app.get('/api/data', ...)`).

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for details.