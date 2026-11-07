# Fresh Wave Cleaning Co. — website

Static website for [freshwavecleaningco.com](https://freshwavecleaningco.com). Plain HTML, CSS and a small JS file. No build step, no framework.

## Structure

```
index.html            Home
services/index.html   Services
about/index.html      About
contact/index.html    Contact + quote form
assets/css/site.css   All styles
assets/js/site.js     Mobile menu + quote form
assets/img/           Logo and job photos (full size + -sm versions)
robots.txt, sitemap.xml
```

The page URLs (`/about/`, `/services/`, `/contact/`) match the old WordPress site, so existing links and search results keep working.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Upload the folder to any static host (Netlify, Cloudflare Pages, GitHub Pages, or regular web hosting) and point the domain at it.

## Notes

- The quote form opens the visitor's email app with the message filled in. To receive submissions without that step, connect the form to a form service (Formspree, Netlify Forms, etc.).
- To add a job photo, export it at 1080px and 540px wide (`name.jpg` and `name-sm.jpg`) into `assets/img/`.
