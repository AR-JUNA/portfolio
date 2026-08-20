/* =====================================================================
   ARJUNA GYAN — DARK EDITORIAL PORTFOLIO
   Interaction layer: preloader, custom cursor, scroll progress,
   split-text reveal, magnetic buttons, timeline draw, filters, form.
   ===================================================================== */

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => {
    if (pre) pre.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    // kick off hero split-text reveal once preloader clears
    document.querySelectorAll('#hero .split-line').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 120 + i * 130);
    });
  }, 1200);
});
document.body.classList.add('no-scroll');

/* ---------- Custom cursor (fine pointer only) ---------- */
(function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.body.classList.add('has-cursor');
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = -100, my = -100, rx = -100, ry = -100;
  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  (function raf() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  })();
  const hoverables = 'a, button, .btn, .proj-card, .cert-card, .chip, .service-card, input, textarea, .rail-dot';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverables)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverables)) ring.classList.remove('hover');
  });
})();

/* ---------- Magnetic buttons ---------- */
(function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });
})();

/* ---------- Typed text ---------- */
const roles = ['Software Engineer', 'Web Developer', 'Product Manager', 'AI Enthusiast', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false, el = document.getElementById('typed-text');
function type() {
  if (!el) return;
  const word = roles[ri];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

/* ---------- Scroll progress bar + rail + navbar + back-top ---------- */
const navbar     = document.getElementById('navbar');
const scrollFill = document.getElementById('scrollFill');
const railDots   = document.querySelectorAll('.rail-dot');
const backTop    = document.getElementById('back-top');
const backRing   = document.getElementById('backTopRing');
const RAIL_CIRC  = 157; // 2*PI*25

function onScroll() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (scrollTop / max) : 0;

  if (scrollFill) scrollFill.style.width = (pct * 100) + '%';
  if (backRing) backRing.style.strokeDashoffset = String(RAIL_CIRC * (1 - pct));

  navbar.classList.toggle('scrolled', scrollTop > 50);
  backTop.classList.toggle('visible', scrollTop > 500);

  // active nav link
  document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
    const s = document.querySelector(a.getAttribute('href'));
    if (s) {
      const r = s.getBoundingClientRect();
      a.classList.toggle('active', r.top <= 120 && r.bottom >= 120);
    }
  });

  // active rail dot
  railDots.forEach(d => {
    const s = document.querySelector(d.dataset.target);
    if (s) {
      const r = s.getBoundingClientRect();
      d.classList.toggle('active', r.top <= window.innerHeight * 0.5 && r.bottom >= window.innerHeight * 0.5);
    }
  });
}
window.addEventListener('scroll', onScroll);
onScroll();

railDots.forEach(d => {
  d.addEventListener('click', () => {
    const s = document.querySelector(d.dataset.target);
    if (s) s.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- Mobile menu ---------- */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}

/* ---------- Reveal on scroll ---------- */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-scale, .wipe').forEach(el => revObs.observe(el));

/* ---------- Timeline draw-in ---------- */
const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });
document.querySelectorAll('.timeline').forEach(el => tlObs.observe(el));

/* ---------- Skill bars ---------- */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const sb = document.getElementById('skillBars');
if (sb) barObs.observe(sb);

/* ---------- Counter ---------- */
function animateCount(el, target, dur = 1800) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[id^="c"]').forEach(el => {
        if (el.dataset.target) animateCount(el, +el.dataset.target);
      });
      cntObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.getElementById('stats');
if (statsEl) cntObs.observe(statsEl);

/* ---------- Project filter ---------- */
document.querySelectorAll('.proj-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.proj-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.proj-card').forEach(c => {
      const show = (f === 'all' || c.dataset.cat === f);
      c.style.display = show ? '' : 'none';
    });
  });
});

/* ---------- Success Popup ---------- */
function showSuccessPopup(senderName) {
  const overlay = document.createElement('div');
  overlay.id = 'successOverlay';
  overlay.innerHTML = `
    <div class="popup-card">
      <div class="popup-icon-ring">
        <div class="popup-icon-circle">
          <i class="fas fa-check"></i>
        </div>
      </div>
      <h3 class="popup-title">Message Sent!</h3>
      <p class="popup-msg">
        Thank you <strong>${senderName || 'there'}</strong>,<br/>
        Arjuna will reach out to you soon. 🚀
      </p>
      <div class="popup-divider"></div>
      <p class="popup-sub">
        <i class="fas fa-envelope" style="color:var(--acid);margin-right:6px;"></i>
        Expect a reply at your email within 24 hours.
      </p>
      <button class="popup-close-btn" onclick="closePopup()">
        <i class="fas fa-times"></i> Close
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => { overlay.classList.add('popup-visible'); });
  setTimeout(() => closePopup(), 7000);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
}

function closePopup() {
  const overlay = document.getElementById('successOverlay');
  if (!overlay) return;
  overlay.classList.remove('popup-visible');
  overlay.classList.add('popup-hiding');
  setTimeout(() => overlay.remove(), 400);
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

/* ---------- Contact form ---------- */
const form    = document.getElementById('contactForm');
const fstatus = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn       = form.querySelector('button[type=submit]');
    const orig      = btn.innerHTML;
    const nameField = form.querySelector('input[name="name"]');
    const senderName = nameField ? nameField.value.trim().split(' ')[0] : '';

    btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending…</span>';
    btn.disabled  = true;
    fstatus.className = '';
    fstatus.style.display = 'none';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        showSuccessPopup(senderName);
      } else {
        const j = await res.json().catch(() => ({}));
        fstatus.textContent = '✕ ' + (j.errors?.map(x => x.message).join(', ') || 'Something went wrong. Please try again.');
        fstatus.className   = 'err';
        fstatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch {
      fstatus.textContent = '✕ Network error. Please check your connection and try again.';
      fstatus.className   = 'err';
      fstatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    btn.innerHTML = orig;
    btn.disabled  = false;
  });
}
