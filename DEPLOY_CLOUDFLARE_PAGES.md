# Cloudflare Pages migration

The frontend uses React 18, TypeScript, Vite 5 and vite-react-ssg.
The build prerenders the home page, blog index and MDX articles. It also
generates sitemap.xml and robots.txt. Existing canonical URLs are preserved.

## Build settings

- Existing repository: https://github.com/msassas/nutritivo-glow-site
- Production branch: main
- Root directory: repository root
- Build command: npm run build
- Output directory: dist
- Local validation runtime: Node.js 22.16.0 and npm 10.9.2
- Configure NODE_VERSION to use the validated Node version.

package-lock.json is the npm dependency lock. A legacy bun.lockb is retained.
To explicitly use npm regardless of automatic package-manager detection, set
SKIP_DEPENDENCY_INSTALL=1 and use npm ci && npm run build as the Pages build
command. The local build was validated with existing installed dependencies;
a fresh cloud install still needs validation during the later deployment.

## Routes, headers and Apache configuration

Cloudflare Pages serves matching prerendered HTML and static assets directly.
Without a top-level 404.html, it falls back to index.html for client-side routes.
public/_redirects documents why the Apache catch-all rewrite is unnecessary:
an unconditional /* /index.html 200 rule would override prerendered blog pages.

public/_headers contains Pages-compatible path patterns and security/cache
headers. Content-Encoding is deliberately absent: Pages negotiates compression.
public/.htaccess is retained for the existing Apache hosting but is not a
Cloudflare configuration file. MIME types, compression and ETags are managed
by Pages. HTTPS/domain configuration must be reviewed separately when the
migration is authorized; this preparation does not change hosting or DNS.

References:
- https://developers.cloudflare.com/pages/configuration/serving-pages/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/build-configuration/

## Backend and environment

The Express backend in server/ is preserved. Uploading dist does not run it.
Keep it on a separate Node.js host; adapting it to Workers/Pages Functions is
outside this preparation. No database dependency was identified.

Frontend build variable: VITE_API_URL. Point it to the hosted backend's events
API to preserve Meta conversion tracking; otherwise the code uses localhost.
Variables prefixed VITE_ are public in the frontend: never put secrets there.

Backend variables: META_ACCESS_TOKEN, FRONTEND_URL, NODE_ENV, PORT.
META_TEST_EVENT_CODE is used for backend testing in development.
Configure FRONTEND_URL for the frontend origin when hosting changes are approved.
Keep backend credentials exclusively in its environment.

## Security and remaining steps

Exposed credentials were replaced in the current documentation and the fixed
administrative password was removed from the unused LeadMagnet component.
Its frontend administrative access/UI is disabled pending real server-side
authentication. The visitor form and local email storage are retained.
LeadMagnet remains unused; its former ebook-cover asset was already absent
locally, so review that asset before reintroducing the component.

Local .env files and Claude configuration must remain untracked.
The exposed token still exists in older commits: this change does not rewrite
history. The owner must revoke/rotate it in Meta. Historical cleanup requires
separate explicit authorization. Any reused administrative password should also
be changed in the services where it was reused.

No Cloudflare project, Git integration, deployment, DNS or domain changes are
performed by this preparation. When authorized later, connect the existing
GitHub repository to Pages, configure build/environment settings, and validate
preview routes, assets and backend CORS before changing the production domain.
