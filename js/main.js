/**
 * Main JavaScript - Tab navigation & Apple-style scroll animations
 * Structure: Easy to expand - add new sections in HTML and nav items
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicContent();
  initTabNavigation();
  initScrollAnimations();
  initHashRouting();
});

/**
 * Dynamic Content - Fetches bio and text from content.json
 */
async function initDynamicContent() {
  try {
    const response = await fetch('docs/content.json');
    const data = await response.json();

    // 1. Fill in the Bio
    document.getElementById('bio-intro').innerText = data.about.intro;
    document.getElementById('bio-story').innerText = data.about.story;

    // 2. Fill in the Education List
    const educationContainer = document.querySelector('.course-list');
    if (educationContainer) {
      educationContainer.innerHTML = ''; // Clear the placeholders
      data.education.forEach(item => {
        const li = document.createElement('li');
        li.className = 'course-item';
        li.innerHTML = `
          <span class="course-name">${item.name}</span>
          <span class="course-meta">${item.meta}</span>
        `;
        educationContainer.appendChild(li);
      });
    }

    // 3. Update Social Links (optional but handy)
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => link.href = data.socials.github);

    // Refresh animations so the new items fade in correctly
    if (window.triggerScrollAnimations) {
      window.triggerScrollAnimations();
    }
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

/**
 * Tab navigation - switches between page sections
 */
function initTabNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.page-section');

  navTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = tab.dataset.tab;

      // Update active nav tab
      navTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding section (with transition)
      sections.forEach((section) => {
        if (section.dataset.section === targetSection) {
          section.classList.add('active');
          // Re-trigger scroll animations for newly visible content
          requestAnimationFrame(() => triggerScrollAnimations());
        } else {
          section.classList.remove('active');
        }
      });

      // Update URL hash without scrolling
      history.replaceState(null, '', `#${targetSection}`);
    });
  });
}

/**
 * Hash routing - handle direct links (e.g. site.com/#education)
 */
function initHashRouting() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const targetTab = document.querySelector(`.nav-tab[data-tab="${hash}"]`);
    if (targetTab) {
      targetTab.click();
    }
  }
}

/**
 * Scroll-driven animations - Apple-style reveal on scroll
 * Uses Intersection Observer for performant scroll detection
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Optional: observe children with stagger
          const children = entry.target.querySelectorAll(
            '.course-item, .gallery-item'
          );
          if (children.length) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('is-visible');
              }, index * 80);
            });
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Expose for re-use when switching tabs
  window.triggerScrollAnimations = () => {
    animatedElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isInView =
        rect.top < window.innerHeight && rect.bottom > 0;
      if (isInView) {
        el.classList.add('is-visible');
      }
    });
  };
}
