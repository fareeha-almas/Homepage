
# PhD Portfolio (GitHub Pages)

This is a minimal, fast portfolio site tailored for PhD applications. It supports linking **PDFs**, **PPTX slides**, and **Jupyter notebooks** (via nbviewer).

## Quick start

1. Create a new GitHub repo (any name).
2. Upload everything in this folder to the repo root.
3. In the repo settings → **Pages**, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (or `master`) and **Folder**: `/docs`
4. Your site will publish at `https://<username>.github.io/<reponame>/`.

> Alternatively, rename the repo to `<username>.github.io` and move the contents of `docs/` to the repo root for a root-domain site.

## Customize content

Edit `profile.json` (at the repo root). Fields include:
- `name`, `tagline`, `email`, `location`, `links`
- `about`, `education`, `experience`, `skills`
- `publications` (with `links: [PDF, Code, arXiv, etc.]`)
- `projects` with `links` to PDFs, PPTX, nbviewer notebooks, GitHub, demos, etc.

Place your artifacts under:
- `docs/projects/` for PDFs, PPTX, notebooks, images.
- `docs/assets/` for site images (e.g., `headshot.jpg`).

Then update URLs inside `profile.json` accordingly (e.g., `projects/my_talk.pdf`).

## Add a CV
Put your CV as `docs/CV.pdf` and set the `links` item in `profile.json` to `"url": "CV.pdf"`.

## Notebooks via nbviewer
Upload `.ipynb` files to your repo and use a URL like:
`https://nbviewer.org/github/<username>/<repo>/blob/main/docs/projects/your_notebook.ipynb`

## Local preview
You can preview by opening `docs/index.html` directly, or serve with any static server.

---

### Structure
```
/docs
  /assets
    style.css
    script.js
    headshot.jpg (optional)
  /projects
    example.pdf
    example.pptx
  index.html
/profile.json
```

Good luck with your applications!
