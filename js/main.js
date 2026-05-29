/* ---------- Typed text ---------- */
const roles = ['Software Engineer', 'Web Developer', 'Product Manager', 'AI Enthusiast', 'Problem Solver'];
let ri = 0, ci = 0, deleting = false, el = document.getElementById('typed-text');
function type() {
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

/* ---------- Navbar ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 500);
  // active link
  document.querySelectorAll('.nav-link[href^="#"]').forEach(a => {
    const s = document.querySelector(a.getAttribute('href'));
    if (s) {
      const r = s.getBoundingClientRect();
      a.classList.toggle('active', r.top <= 100 && r.bottom >= 100);
    }
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
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revObs.observe(el));

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
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

/* ---------- Contact form ---------- */
const form   = document.getElementById('contactForm');
const fstatus = document.getElementById('form-status');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled = true;
  fstatus.className = ''; fstatus.style.display = 'none';
  try {
    const res = await fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} });
    if (res.ok) {
      fstatus.textContent = '✅ Message sent! Arjuna will reply soon.';
      fstatus.className = 'ok'; form.reset();
    } else {
      const j = await res.json().catch(()=>({}));
      fstatus.textContent = '❌ ' + (j.errors?.map(x=>x.message).join(', ') || 'Something went wrong.');
      fstatus.className = 'err';
    }
  } catch { fstatus.textContent = '❌ Network error. Please try again.'; fstatus.className = 'err'; }
  btn.innerHTML = orig; btn.disabled = false;
  fstatus.scrollIntoView({ behavior:'smooth', block:'nearest' });
});