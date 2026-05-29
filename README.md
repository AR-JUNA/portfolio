# Arjuna Caleb Gyan — Personal Portfolio

A clean, responsive personal portfolio website built with **pure HTML, CSS, and JavaScript** — no frameworks, no build tools, no Node.js required.

## 🗂️ File Structure

```
portfolio/
├── index.html          ← The entire website (open this in a browser)
├── css/
│   └── style.css       ← All styles (edit colours, fonts, layout here)
├── js/
│   └── main.js         ← Animations, navbar, contact form, project filter
└── images/
    ├── profile.jpg         ← YOUR photo (About section)
    ├── hero-bg.jpg         ← YOUR hero background photo (optional)
    ├── resume.pdf          ← YOUR CV
    ├── support-letter.pdf  ← YOUR support letter
    ├── proj-momo.jpg       ← Project screenshots
    ├── proj-techpath.jpg
    ├── proj-eduaccess.jpg
    ├── proj-npcc.jpg
    ├── proj-cwas.jpg
    └── proj-parkly.jpg
```

## 🚀 How to Use

1. **Open locally** — just double-click `index.html` in your file manager (or open with VS Code Live Server)
2. **Edit content** — open `index.html` in VS Code and change any text directly
3. **Add your photo** — drop `profile.jpg` into the `images/` folder
4. **Add your CV** — replace `images/resume.pdf` with your real PDF

## 🖼️ Adding Your Hero Background Photo

1. Drop `hero-bg.jpg` into the `images/` folder
2. Open `css/style.css` and find the `#hero` section
3. Uncomment these two lines:
   ```css
   /* background-image: url('../images/hero-bg.jpg'); */
   /* background-size: cover; background-position: center top; */
   ```

## 📬 Fixing the Contact Form (receive emails)

1. Go to [formspree.io](https://formspree.io) → sign up with `a.gyan@alustudent.com`
2. Create a new form → copy the form ID (e.g. `xabcdefg`)
3. Open `index.html` and find `YOUR_FORM_ID`
4. Replace it: `action="https://formspree.io/f/xabcdefg"`

## 🌐 Hosting (Free Options)

| Platform | How |
|---|---|
| **GitHub Pages** | Push to GitHub → Settings → Pages → Deploy from `main` branch |
| **Netlify** | Drag & drop the whole folder at [netlify.com/drop](https://netlify.com/drop) |
| **Vercel** | Connect GitHub repo at [vercel.com](https://vercel.com) |

## 🎨 Customisation

- **Accent colour** — search `#27C96E` in `css/style.css` and replace with your preferred colour
- **Update GitHub links** — search `arjunagyan` in `index.html` and replace with your real GitHub username
- **Update LinkedIn** — search `linkedin.com/in/arjunagyan` and update

## 📋 Sections

- Hero (with typing animation)
- About (with profile photo)
- Skills (animated progress bars)
- Services
- Stats counter
- Projects (with filter tabs + GitHub buttons)
- Resume / Timeline
- Certifications
- Downloads (View + Download buttons)
- Testimonials (auto-scroll carousel)
- Contact form (Formspree)
- Footer (4-column professional layout)
