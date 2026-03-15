/**
 * API Client for XayKenhTikTok static pages
 * Fetches dynamic content from backend API
 * Progressive enhancement: falls back to hardcoded HTML if API unavailable
 */
(function () {
  const API_BASE = 'http://localhost:4000/api';

  async function fetchJSON(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch {
      return null;
    }
  }

  // Load contact info into footer (all pages)
  async function loadContact() {
    const data = await fetchJSON(`${API_BASE}/settings/contact`);
    if (!data) return;

    // Update phone numbers in footer
    const footerPhones = document.querySelectorAll('.footer-contact a[href^="tel:"]');
    if (footerPhones.length > 0 && data.phones) {
      data.phones.forEach((phone, i) => {
        if (footerPhones[i]) {
          footerPhones[i].textContent = phone;
          footerPhones[i].href = 'tel:' + phone.replace(/\s/g, '');
        }
      });
    }

    // Update social links
    if (data.socialLinks) {
      const socialMap = {
        tiktok: data.socialLinks.tiktok,
        facebook: data.socialLinks.facebook,
        youtube: data.socialLinks.youtube,
      };
      document.querySelectorAll('.footer-social a').forEach((link) => {
        const text = link.textContent.toLowerCase();
        for (const [key, url] of Object.entries(socialMap)) {
          if (text.includes(key) && url) {
            link.href = url;
          }
        }
      });
    }
  }

  // Load featured projects on homepage
  async function loadFeaturedProjects() {
    if (!document.querySelector('.case-grid')) return;
    const data = await fetchJSON(`${API_BASE}/projects?featured=true`);
    if (!data || !data.items) return;

    // Update case study cards with API data
    const cards = document.querySelectorAll('.case-card');
    data.items.forEach((project, i) => {
      if (cards[i]) {
        const nameEl = cards[i].querySelector('.case-name');
        if (nameEl) nameEl.textContent = project.title;
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    loadContact();
    loadFeaturedProjects();
  }
})();
