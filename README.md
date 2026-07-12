# Computer Camp Website

A fast, dependency-free static website for a computer camp. Built with plain
HTML, CSS, and JavaScript — no build step, no frameworks — so it deploys to
GitHub Pages instantly and is easy to edit.

## Pages

| File           | Page          | What's on it                                   |
| -------------- | ------------- | ---------------------------------------------- |
| `index.html`   | Home          | Hero, features, about, stats, call-to-action   |
| `team.html`    | Meet the Team | Leadership + instructor/counselor cards        |
| `info.html`    | More Info     | Dates, schedule, pricing, FAQ, register section |

All content is intentionally **blank placeholder text wrapped in `[ ]`** so you
can find and replace it with your own.

## Features

- **Smooth scroll-reveal animations** — elements fade/slide in as you scroll
  (add `data-reveal` to any element, or `data-reveal-group` to stagger children).
- **Smooth fade transitions between pages.**
- **Sticky navigation** that changes on scroll, with a mobile hamburger menu.
- **Responsive** down to phones.
- **Respects `prefers-reduced-motion`** for accessibility.
- **SEO basics** included: per-page titles/descriptions, `sitemap.xml`,
  `robots.txt`.

## How to edit

1. **Text:** open any `.html` file and replace the `[bracketed placeholders]`.
2. **Colors / branding:** edit the CSS variables at the top of `css/style.css`
   (the `:root { ... }` block).
3. **Images:** create an `images/` folder, add your files, and swap the
   `.media-placeholder` / `.team-card__photo` divs for
   `<img src="images/your-file.jpg" alt="Describe the image" />`.
4. **Animations:** add `data-reveal` to any element you want to animate in on
   scroll.

## Preview locally

Just open `index.html` in your browser. Or run a tiny local server:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy free on GitHub Pages

1. Create a new repository on GitHub (e.g. `ComputerCampWebsite`).
2. Push this folder to it:

```bash
git init
git add .
git commit -m "Initial computer camp website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ComputerCampWebsite.git
git push -u origin main
```

3. On GitHub: **Settings → Pages → Build and deployment**, set **Source** to
   `Deploy from a branch`, pick the **`main`** branch and **`/ (root)`** folder,
   then **Save**.
4. Wait ~1 minute. Your site will be live at
   `https://YOUR-USERNAME.github.io/ComputerCampWebsite/`.

> The included `.nojekyll` file tells GitHub Pages to serve the files as-is.

## Help Google find you (SEO)

- Fill in the `<title>` and `<meta name="description">` on each page.
- Update `robots.txt` and `sitemap.xml` with your real URL.
- Submit your site to [Google Search Console](https://search.google.com/search-console).
- For a local camp, create a free **Google Business Profile** — it's the biggest
  lever for showing up at the top of local searches.
