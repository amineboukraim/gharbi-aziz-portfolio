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
  initPosterEffects();
  initVoicePlayer();
  initImageLightbox();
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
  if (!filterBtns.length) return;
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
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
      `Bonjour Gharbi Aziz 👋\n\nJe suis ${name}, intéressé par GHARBI AGENCY.\nMon WhatsApp: ${wa}\nPack souhaité: ${pack}\n\nMerci de me contacter.`
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
  const indicator = document.getElementById('video-play-indicator');

  if (!modal || !player) return;

  let indicatorTimeout;
  function showIndicator(isPaused) {
    if (!indicator) return;
    const playIcon = indicator.querySelector('.indicator-play');
    const pauseIcon = indicator.querySelector('.indicator-pause');
    if (playIcon && pauseIcon) {
      if (isPaused) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    }
    indicator.classList.add('show');
    clearTimeout(indicatorTimeout);
    indicatorTimeout = setTimeout(() => {
      indicator.classList.remove('show');
    }, 450);
  }

  function togglePlayPause() {
    if (player.paused) {
      player.play().catch(() => {});
      showIndicator(false);
    } else {
      player.pause();
      showIndicator(true);
    }
  }

  function openModal(videoSrc, title, tag) {
    player.src = videoSrc;
    player.load();
    if (titleEl) titleEl.textContent = title || 'Gharbi Agency — Creative Video';
    if (tagEl) tagEl.textContent = tag || 'Portfolio Video';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Playback waiting user gesture or muted:', err);
      });
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    player.pause();
    player.currentTime = 0;
    player.src = '';
  }

  // Click on the video to toggle Play / Pause directly with the mouse cursor
  player.addEventListener('click', (e) => {
    // If click is in the bottom control bar (~48px), let native controls handle scrub/volume
    const rect = player.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    if (clickY < rect.height - 48) {
      e.preventDefault();
      togglePlayPause();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard controls: Escape to close, Space to Play/Pause
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.code === 'Space') {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          togglePlayPause();
        }
      }
    }
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


/* ============================================================
   FULLSCREEN POSTER — Parallax + Particles + Brightness
   ============================================================ */
function initPosterEffects() {
  const bg = document.getElementById('poster-fullbg');
  const particlesContainer = document.getElementById('poster-particles');
  const section = document.getElementById('cover');
  if (!section) return;

  /* --- Parallax on scroll --- */
  if (bg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const sectionH = section.offsetHeight;
          if (scrollY <= sectionH) {
            const offset = scrollY * 0.3;
            bg.style.transform = `scale(1.01) translateY(${offset}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* --- Floating gold particles --- */
  if (particlesContainer) {
    const count = 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'poster-particle';
      const size = Math.random() * 4 + 2;
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        --dur: ${Math.random() * 5 + 5}s;
        --delay: ${Math.random() * 6}s;
        --dx: ${(Math.random() - 0.5) * 120}px;
        opacity: 0;
      `;
      particlesContainer.appendChild(p);
    }
  }
}


/* ============================================================
   AUTHENTIC VOICE REVIEW PLAYER (AVIS VOCAL CLIENT)
   ============================================================ */
function initVoicePlayer() {
  const audio = document.getElementById('client-voice-audio');
  const widget = document.getElementById('voice-player-widget');
  const playBtn = document.getElementById('voice-play-btn');
  const playIcon = document.getElementById('voice-play-icon');
  const pauseIcon = document.getElementById('voice-pause-icon');
  const curTimeEl = document.getElementById('voice-current-time');
  const durTimeEl = document.getElementById('voice-duration');
  const seekBar = document.getElementById('voice-seek-bar');

  if (!audio || !playBtn) return;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function setPlayingState(isPlaying) {
    if (isPlaying) {
      widget.classList.add('playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    } else {
      widget.classList.remove('playing');
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    }
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        setPlayingState(true);
      }).catch(err => {
        console.log('Audio playback gesture required:', err);
      });
    } else {
      audio.pause();
      setPlayingState(false);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (curTimeEl) curTimeEl.textContent = formatTime(audio.currentTime);
    if (seekBar && audio.duration) {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (durTimeEl) durTimeEl.textContent = formatTime(audio.duration);
  });

  if (audio.readyState >= 1) {
    if (durTimeEl) durTimeEl.textContent = formatTime(audio.duration);
  }

  if (seekBar) {
    seekBar.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (seekBar.value / 100) * audio.duration;
      }
    });
  }

  audio.addEventListener('ended', () => {
    setPlayingState(false);
    audio.currentTime = 0;
    if (seekBar) seekBar.value = 0;
    if (curTimeEl) curTimeEl.textContent = '0:00';
  });
}

/* ============================================================
   LIGHTBOX IMAGE MODAL (AVIS & CAPTURES METRICS)
   ============================================================ */
function initImageLightbox() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('image-modal-img');
  const captionEl = document.getElementById('image-modal-caption');
  const closeBtn = document.getElementById('image-modal-close');
  const backdrop = modal ? modal.querySelector('.image-modal-backdrop') : null;

  if (!modal || !modalImg) return;

  function openImageModal(src, caption) {
    modalImg.src = src;
    if (captionEl) captionEl.textContent = caption || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeImageModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeImageModal);
  if (backdrop) backdrop.addEventListener('click', closeImageModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeImageModal();
    }
  });

  document.querySelectorAll('[data-lightbox-img]').forEach(trigger => {
    trigger.style.cursor = 'zoom-in';
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-img');
      const caption = trigger.getAttribute('data-lightbox-caption') || '';
      if (src) openImageModal(src, caption);
    });
  });
}
