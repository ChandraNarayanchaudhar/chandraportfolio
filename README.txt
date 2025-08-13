Chandra — Animated Portfolio (Static Site)
================================================

How to use
----------
1) Open `index.html` in your browser to preview.
2) Edit text, skills, projects, images inside the files.
3) Deploy free on Netlify, Vercel (static), or GitHub Pages by uploading this folder.

Good animations & design
------------------------
- Smooth reveal-on-scroll using IntersectionObserver (no heavy library).
- Floating hero image, blur gradient orbs, soft shadows, rounded cards.
- Sticky, glassy header with mobile menu.

Contact form (EmailJS)
----------------------
- This project ships with a demo form that "succeeds" locally.
- To send real emails:
  a) Create a free account at https://www.emailjs.com/
  b) Create `service` and `template` (fields: from_name, reply_to, message).
  c) In `script.js`, set EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID and uncomment the EmailJS lines.
  d) Add the CDN script tag in index.html as noted in script.js.

Google Analytics
----------------
- Replace `GA_MEASUREMENT_ID` in `index.html` with your own if you want analytics.

Customize quickly
-----------------
- Replace images in /assets (project1.png, project2.png, project3.png, profile.svg, favicon.png, cover.png).
- Update phone, email, and links.
- Add more cards by duplicating the <article class="card"> block.

Credits
-------
- Fonts: Google Fonts (Inter).
- Icons/graphics: simple shapes created in this project.
