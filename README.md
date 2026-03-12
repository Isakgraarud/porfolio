# Isak Graarud | Online CV

A personal webpage / online CV with a GitHub-inspired dark theme and Apple-style animations.

## Structure

```
├── index.html          # Main HTML - add sections here
├── css/
│   ├── base.css        # Variables, reset, typography
│   ├── layout.css      # Header, nav, sections
│   ├── components.css  # Cards, buttons, gallery
│   └── animations.css  # Scroll reveals, transitions
├── js/
│   └── main.js         # Tab nav, scroll animations
└── assets/
    └── images/         # Add gallery images here
```

## Adding a New Tab

1. Add a nav item in `index.html`:
   ```html
   <li><a href="#mytab" class="nav-tab" data-tab="mytab">My Tab</a></li>
   ```

2. Add a section:
   ```html
   <section id="mytab" class="page-section" data-section="mytab">
     <div class="section-content animate-on-scroll">...</div>
   </section>
   ```

## Adding Gallery Images

Replace the placeholder divs with:
```html
<div class="gallery-item">
  <img src="assets/images/your-image.jpg" alt="Description">
</div>
```

## Running Locally

Open `index.html` in a browser, or use a simple server:
```bash
npx serve .
```
