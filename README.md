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
- **Performance** — the Three.js bundle is code-split and loaded on `requestIdleCallback`, so it never blocks first paint. Animations respect `prefers-reduced-motion`.
- **Accessibility** — semantic landmarks, skip link, keyboard-friendly disclosure widgets, WCAG AA contrast in both themes.
- **Theming** — semantic CSS variables mapped into Tailwind via `@theme inline`; dark mode is a `.dark` class set before first paint.

## Customizing

- Add your portrait at `src/assets/portrait.jpg` and wire it into `Hero.jsx`.
- Replace placeholder links (`href: "#"`) in `src/data/portfolio.js` with real article/repo URLs.
- Replace testimonial placeholders with real quotes when available.
