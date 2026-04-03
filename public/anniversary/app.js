/* ══════════════════════════════════════════
   ANNIVERSARY — APP.JS
   All interactivity: particles, counter, gallery,
   lightbox, scroll reveals, surprise overlay
   ══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─────────────────────────────────────────
  // 1. SURPRISE OVERLAY
  // ─────────────────────────────────────────
  const overlay = document.getElementById('surprise-overlay');
  const mainEl = document.getElementById('main-content');
  const envelope = document.getElementById('envelope');
  const envLid = document.getElementById('env-lid');

  const EMOJIS = ['💖', '💗', '💕', '🌸', '✨', '💝', '🌹', '💓', '🌺', '💞', '🎊', '🎉'];

  function burstParticles(cx, cy) {
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('span');
      el.classList.add('burst');
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 160;
      el.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
      el.style.setProperty('--by', `${Math.sin(angle) * dist}px`);
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.animationDuration = `${0.6 + Math.random() * 0.5}s`;
      document.body.appendChild(el);
      el.addEventListener('animationend', () => el.remove());
    }
  }

  function openSurprise(e) {
    const cx = e?.clientX ?? window.innerWidth / 2;
    const cy = e?.clientY ?? window.innerHeight / 2;

    // open envelope lid
    envelope.classList.add('open');
    burstParticles(cx, cy);

    setTimeout(() => {
      overlay.classList.add('gone');
      mainEl.classList.remove('hidden');
      // trigger a second burst after reveal
      setTimeout(() => burstParticles(cx, cy), 300);
    }, 600);
  }

  overlay.addEventListener('click', openSurprise);
  overlay.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openSurprise(e); });

  // ─────────────────────────────────────────
  // 2. FLOATING PARTICLES
  // ─────────────────────────────────────────
  const particleSymbols = ['💖', '💕', '✨', '🌸', '💗', '🌹', '⭐', '💞', '🌺', '💝', '🦋', '🌟'];
  const container = document.getElementById('particles-container');

  function spawnParticle() {
    const el = document.createElement('span');
    el.classList.add('particle');
    el.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    const dur = 12 + Math.random() * 20;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${Math.random() * dur}s`;
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + Math.random() * dur) * 1000);
  }

  // spawn initial batch
  for (let i = 0; i < 18; i++) spawnParticle();
  // keep replenishing
  setInterval(() => {
    if (container.children.length < 22) spawnParticle();
  }, 2000);

  // ─────────────────────────────────────────
  // 3. ANNIVERSARY COUNTER (since ~1 year ago)
  // ─────────────────────────────────────────
  // Set your anniversary start date here ↓
  const START_DATE = new Date('2025-04-03T00:00:00');

  function updateCounter() {
    const now = Date.now();
    const diff = now - START_DATE.getTime();

    const totalSec = Math.floor(diff / 1000);
    const days = Math.floor(totalSec / 86400);
    const hrs = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cnt-days').textContent = days;
    document.getElementById('cnt-hrs').textContent = pad(hrs);
    document.getElementById('cnt-min').textContent = pad(mins);
    document.getElementById('cnt-sec').textContent = pad(secs);
  }

  updateCounter();
  setInterval(updateCounter, 1000);

  // ─────────────────────────────────────────
  // 4. PHOTO GALLERY
  // ─────────────────────────────────────────
  const photos = [
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21.jpeg', cap: 'Momen Indah 💖' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (1).jpeg', cap: 'Bersama Kamu 🌸' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (2).jpeg', cap: 'Kenangan Pertama ✨' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (3).jpeg', cap: 'Senyummu 😊' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (4).jpeg', cap: 'Dunia kita 💕' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (5).jpeg', cap: 'Cerita Kita 💝' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (6).jpeg', cap: 'Petualangan 🌹' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (7).jpeg', cap: 'Tawa Kita 😂' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (8).jpeg', cap: 'Favoritku 💗' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (9).jpeg', cap: 'Momen Spesial 🌺' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (10).jpeg', cap: 'Selalu Bersama 🌟' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (11).jpeg', cap: 'Di Sisimu 💞' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (12).jpeg', cap: 'Cahayaku ⭐' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (13).jpeg', cap: 'Satu Tahun 🎊' },
    { src: 'anniversary/photos/WhatsApp Image 2026-04-03 at 16.38.21 (14).jpeg', cap: 'Happy Anniversary 🎉' },
  ];

  const grid = document.getElementById('gallery-grid');

  photos.forEach((ph, i) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item', 'reveal');
    item.style.setProperty('--i', i);
    item.dataset.index = i;
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Open photo: ${ph.cap}`);
    item.innerHTML = `
      <img src="${ph.src}" alt="${ph.cap}" loading="lazy" />
      <div class="gallery-overlay"><span>${ph.cap}</span></div>
    `;
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i); });
    grid.appendChild(item);
  });

  // ─────────────────────────────────────────
  // 5. LIGHTBOX
  // ─────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    showPhoto();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPhoto() {
    const ph = photos[currentIdx];
    lbImg.style.animation = 'none';
    lbImg.offsetHeight;
    lbImg.style.animation = '';
    lbImg.src = ph.src;
    lbImg.alt = ph.cap;
    lbCaption.textContent = ph.cap;
  }

  function prevPhoto() { currentIdx = (currentIdx - 1 + photos.length) % photos.length; showPhoto(); }
  function nextPhoto() { currentIdx = (currentIdx + 1) % photos.length; showPhoto(); }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevPhoto);
  lbNext.addEventListener('click', nextPhoto);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? nextPhoto() : prevPhoto(); }
  });

  // ─────────────────────────────────────────
  // 6. SCROLL REVEAL
  // ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  // Observe elements set immediately on load (non-gallery)
  document.querySelectorAll('.reveal:not(.gallery-item)').forEach(el => revealObserver.observe(el));

  // Observe gallery items once main is visible
  function observeGallery() {
    document.querySelectorAll('.gallery-item.reveal').forEach(el => revealObserver.observe(el));
  }


  // ─────────────────────────────────────────
  // 7. ROMANTIC MUSIC PLAYER
  // ─────────────────────────────────────────
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const musicPlayer = document.getElementById('music-player');
  let musicPlaying = false;
  let musicUnlocked = false;

  // Smooth volume fade-in to avoid abrupt start
  function fadeInAudio(targetVol = 0.28, duration = 2500) {
    audio.volume = 0;
    const steps = 40;
    const stepTime = duration / steps;
    const stepVol = targetVol / steps;
    let step = 0;
    const fade = setInterval(() => {
      step++;
      audio.volume = Math.min(targetVol, audio.volume + stepVol);
      if (step >= steps) clearInterval(fade);
    }, stepTime);
  }

  function playMusic() {
    audio.play()
      .then(() => {
        musicPlaying = true;
        musicPlayer.classList.add('playing');
        musicPlayer.classList.remove('paused-state');
        fadeInAudio();
      })
      .catch(() => {
        // Autoplay blocked — user must click
        musicPlayer.classList.remove('playing');
      });
  }

  function pauseMusic() {
    audio.pause();
    musicPlaying = false;
    musicPlayer.classList.remove('playing');
    musicPlayer.classList.add('paused-state');
  }

  musicBtn.addEventListener('click', () => {
    if (!musicPlaying) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  // Auto-start music right after the surprise overlay is dismissed
  // (requires user gesture, which the tap on overlay provides)
  const _origOpen = openSurprise ? null : null; // keep ref
  overlay.addEventListener('click', () => {
    if (!musicUnlocked) {
      musicUnlocked = true;
      // small delay so overlay animation runs first
      setTimeout(() => playMusic(), 900);
    }
  }, { once: true });

  // ─────────────────────────────────────────
  // 8. BALLOONS (wish section)
  // ─────────────────────────────────────────
  const balloonSymbols = ['🎈', '🎊', '🎉', '💖', '🌸', '💝', '🎀', '✨'];
  const balloonsWrap = document.getElementById('balloons');

  function spawnBalloon() {
    const el = document.createElement('span');
    el.classList.add('balloon');
    el.textContent = balloonSymbols[Math.floor(Math.random() * balloonSymbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    const dur = 8 + Math.random() * 14;
    el.style.animationDuration = `${dur}s`;
    el.style.animationDelay = `${Math.random() * 4}s`;
    balloonsWrap.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }

  // Observe wish section to start balloons
  const wishSection = document.getElementById('wish');
  let balloonsStarted = false;

  const wishObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !balloonsStarted) {
      balloonsStarted = true;
      for (let i = 0; i < 8; i++) spawnBalloon();
      setInterval(() => {
        if (balloonsWrap.children.length < 12) spawnBalloon();
      }, 1500);
    }
  }, { threshold: 0.2 });

  // ─────────────────────────────────────────
  // 9. INIT after overlay dismissed
  // ─────────────────────────────────────────
  function init() {
    updateCounter();
    observeGallery();
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    wishObserver.observe(wishSection);
  }

  // Poll for main becoming visible
  const initObserver = new MutationObserver(() => {
    if (!mainEl.classList.contains('hidden')) {
      init();
      initObserver.disconnect();
    }
  });
  initObserver.observe(mainEl, { attributes: true, attributeFilter: ['class'] });

  // Keyboard accessibility on overlay
  overlay.setAttribute('tabindex', '0');
  overlay.focus();

})();
