// ── Language switch ──────────────────────────────
let currentLang = 'en';

function toggleLang() {
  currentLang = currentLang === 'en' ? 'fr' : 'en';
  document.documentElement.lang = currentLang;
  document.getElementById('langBtn').textContent = currentLang === 'en' ? 'FR' : 'EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.getAttribute('data-' + currentLang);
    if (val) el.innerHTML = val;
  });
}

// ── Nav scroll ───────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 20
    ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
});

// ── Mobile menu ──────────────────────────────────
function toggleMenu() {
  document.getElementById('nav-mobile').classList.toggle('open');
}

// ── Active nav link ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));

// ── Fade-in on scroll ────────────────────────────
const cards = document.querySelectorAll(
  '.project-card, .timeline-item, .pub-item, .skill-group, .cert-card'
);
const fadeIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      fadeIO.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
cards.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeIO.observe(el);
});
