/* ============================================================
   GHARBI AZIZ PORTFOLIO — JAVASCRIPT
   ============================================================ */

'use strict';

/* ---- INIT LUCIDE ICONS ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initLoader();
  initCursor();
  initNavbar();
  initMobileMenu();
  initReveal();
  initCounters();
  initPortfolioFilter();
  initContactForm();
  initSmoothScroll();
  initVideoModal();
  initVideoPreviews();
});

/* ============================================================
   LOADER
   ============================================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Simulate loading
  setTimeout(() => {
    loader.classList.add('loaded');
    document.body.style.overflow = 'visible';
  }, 2200);
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide on mouse leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '0.6';
  });
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.counter, .stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target || '0');
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    const current = Math.round(eased * target);

    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ============================================================
   PORTFOLIO FILTER
   ============================================================ */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add CSS for fadeIn
  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }`;
  document.head.appendChild(style);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<span style="animation:spin 1s linear infinite;display:inline-block">⟳</span> Envoi en cours...';
    btn.disabled = true;

    // Simulate send (replace with real backend later)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Success state
    btn.innerHTML = '✅ Demande envoyée ! Je vous contacte bientôt.';
    btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';

    // Redirect to WhatsApp as backup
    const name = form.querySelector('[name="name"]').value;
    const wa = form.querySelector('[name="whatsapp"]').value;
    const pack = form.querySelector('[name="pack"]').value;
    const msg = encodeURIComponent(
      `Bonjour Gharbi Aziz 👋\n\nJe suis ${name}, intéressé par SCALEORA.\nMon WhatsApp: ${wa}\nPack souhaité: ${pack}\n\nMerci de me contacter.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/21697427727?text=${msg}`, '_blank');

      // Reset
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 2000);
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   MISC ANIMATIONS
   ============================================================ */

// Parallax orbs on mouse move
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// Spin keyframe for loader
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`;
document.head.appendChild(spinStyle);

// Add active nav-link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav-link.active { color: var(--gold) !important; } .nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(activeStyle);


/* ============================================================
   VIDEO MODAL & PREVIEWS
   ============================================================ */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('video-modal-close');
  const backdrop = modal ? modal.querySelector('.video-modal-backdrop') : null;
  const player = document.getElementById('video-modal-player');
  const titleEl = document.getElementById('video-modal-title');
  const tagEl = document.getElementById('video-modal-tag');

  if (!modal || !player) return;

  function openModal(videoSrc, title, tag) {
    player.src = videoSrc;
    player.load();
    if (titleEl) titleEl.textContent = title || 'Gharbi Aziz — Creative Video';
    if (tagEl) tagEl.textContent = tag || 'Portfolio Video';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Playback started muted or waiting user gesture:', err);
      });
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    player.pause();
    player.currentTime = 0;
    player.src = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Attach to all cards and buttons with data-video
  document.querySelectorAll('[data-video]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      const videoSrc = card.getAttribute('data-video');
      const title = card.getAttribute('data-title') || card.querySelector('h4')?.textContent;
      const tag = card.getAttribute('data-tag') || card.querySelector('.overlay-tag')?.textContent;
      if (videoSrc) {
        e.preventDefault();
        openModal(videoSrc, title, tag);
      }
    });
  });

  // Play button click inside cards
  document.querySelectorAll('.portfolio-card .play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.portfolio-card');
      const videoSrc = card?.getAttribute('data-video');
      const title = card?.getAttribute('data-title') || card?.querySelector('h4')?.textContent;
      const tag = card?.getAttribute('data-tag') || card?.querySelector('.overlay-tag')?.textContent;
      if (videoSrc) {
        openModal(videoSrc, title, tag);
      }
    });
  });
}

function initVideoPreviews() {
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const preview = card.querySelector('.card-video-preview');
    if (!preview) return;

    card.addEventListener('mouseenter', () => {
      preview.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      preview.pause();
      preview.currentTime = 0;
    });
  });
}
