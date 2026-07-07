# yash.dev — Portfolio

Personal portfolio of **Yash Bharadwaj**, Senior Frontend Engineer & Tech Lead.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Three.js.

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run deploy   # publish dist/ to GitHub Pages
```

## Architecture

```
src/
├── data/portfolio.js      # All content lives here — edit this to update the site
├── hooks/                 # useTheme (dark/light), useActiveSection (nav highlight)
├── lib/utils.js           # cn() class-merging helper
└── components/
    ├── ui/                # Reusable primitives (Button, Badge, Reveal, ...)
    ├── layout/            # Navbar (scroll progress, active section), Footer
    ├── three/             # Lazy-loaded Three.js particle background
    └── sections/          # One component per homepage section
```

### Design decisions

- **Content as data** — every section renders from `src/data/portfolio.js`, so updating copy never touches components.
- **Progressive loading** — only the hero, metrics, and page chrome ship in the initial bundle. Every other section is a separate chunk mounted via IntersectionObserver as it approaches the viewport (`DeferredSection`), and all chunks are prefetched in order during browser idle time.
- **Device-aware fidelity** — `useDeviceProfile` assigns a tier (`high` / `balanced` / `lite`): desktop gets the full cinematic experience, mobile gets lighter storytelling, and low-powered devices drop blur, shadows, particles, and 3D extras via the `perf-lite` root class.
- **Performance** — the Three.js bundle is code-split, loaded on `requestIdleCallback`, skipped on low-power devices, and paused when off-screen. Fonts load non-blocking. Animations respect `prefers-reduced-motion`.
- **Accessibility** — semantic landmarks, skip link, keyboard-friendly disclosure widgets, WCAG AA contrast in both themes.
- **Theming** — semantic CSS variables mapped into Tailwind via `@theme inline`; dark mode is a `.dark` class set before first paint.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com). To activate it:

1. Enter your email at web3forms.com — it sends you a free access key (no account needed).
2. Copy `.env.example` to `.env` and paste the key into `VITE_WEB3FORMS_KEY`.
3. Rebuild. Without a key, the form falls back to composing a `mailto:` draft.

Submissions arrive in your inbox; a honeypot field filters basic spam bots.

## Customizing

- Add your portrait at `src/assets/portrait.jpg` and wire it into `Hero.jsx`.
- Replace placeholder links (`href: "#"`) in `src/data/portfolio.js` with real article/repo URLs.
