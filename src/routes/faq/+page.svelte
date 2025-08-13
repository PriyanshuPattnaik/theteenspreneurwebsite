<!--
  Apex Lab — Retro-Cyber (Warm) Svelte Page
  ---------------------------------------------------------------
  Single-file Svelte component. Drop into SvelteKit as +page.svelte or use as a component.

  Visual brief:
  - Warm retro-cyber palette inspired by user images: muted reds, burnt orange, warm greys, neon green accent.
  - Subtle film grain, light leaks, and analog textures; minimal purple; neon-green highlights.
  - Cinematic typography, invitation-style copy (exclusive but educational).
  - Responsive, accessible, and SSR-aware (onMount guards).

  Notes for assets:
  - Replace image paths with your project's static/public paths if needed.
  - Example asset names used here: /images/warm-bust.jpg, /images/film-grain.png, /images/light-leak.png
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  // --------------------
  // Config / Assets
  // --------------------
  const ASSETS = {
    hero: '/images/warm-bust.jpeg',        // user provided references (adjust if needed)
    wire: '/images/film-grain.jpeg',
    bust: '/images/film-grain.jpeg',
    filmGrain: '/images/film-grain.jpeg',      // optional overlay
    lightLeak: '/images/warm-bust.png'
  } as const;

  // --------------------
  // Content (voice: exclusive, warm, honest)
  // --------------------
  const headline = 'Apex Lab — 3 weeks. Ship what matters.';
  const subhead = `A small, focused builder sprint for high-schoolers. Build AI for whatever you’re obsessed with — music, climate, healthcare, sports, or something completely yours. We guide; you create.`;
  const cta = 'Secure your spot — $50';
  const kicker = 'Limited seats • hands-on mentorship • real projects';

  const fields = [
    { name: 'Healthcare & Medical AI', short: 'diagnostics, patient-first prototypes' },
    { name: 'Climate & Environment', short: 'satellite, prediction, local impact' },
    { name: 'Music & Sound', short: 'audio modelling, tools for artists' },
    { name: 'Robotics & Controls', short: 'embedded ML, sensors' },
    { name: 'Sports & Biomechanics', short: 'motion analysis, coaching feedback' },
    { name: 'Art & Vision', short: 'creative tools & visual search' }
  ];

  const faqs = [
    { q: "I’m new to coding. Is this for me?", a: 'Yes. We start with fundamentals through projects. Curiosity matters more than experience.' },
    { q: 'How intensive is it?', a: 'Two to three focused live sessions a week. Expect a mix of demo, workshop, and pair-programming.' },
    { q: 'What does $50 cover?', a: 'Mentorship, recorded lessons, community access, and live feedback. If it’s not useful, we refund.' },
    { q: 'Will it help college apps?', a: 'Maybe. Better question: will you build something real worth talking about? That’s what counts.' }
  ];

  // --------------------
  // Local state
  // --------------------
  let particleCanvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Array<any> = [];
  let raf = 0;

  let expandedFaq: number | null = null;
  function toggleFaq(i: number) {
    expandedFaq = expandedFaq === i ? null : i;
  }

  // small headline ticker rotation
  let tickIndex = 0;
  let tickerInterval: ReturnType<typeof setInterval> | null = null;

  // subtle typewriter for the hero (progressive reveal)
  const heroTyped = tweened(0, { duration: 700, easing: cubicOut });

  // --------------------
  // Particles (warm glass specks)
  // --------------------
  function rand(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }

  function initCanvas() {
    if (!particleCanvas) return;
    ctx = particleCanvas.getContext('2d');
    if (!ctx) return;
    resizeCanvas();
    createParticles(80);
    animate();
    window.addEventListener('resize', resizeCanvas);
  }

  function resizeCanvas() {
    if (!particleCanvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = particleCanvas.clientWidth;
    const h = particleCanvas.clientHeight;
    particleCanvas.width = Math.max(1, Math.floor(w * dpr));
    particleCanvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles(n = 80) {
    particles = [];
    const w = particleCanvas?.clientWidth || 0;
    const h = particleCanvas?.clientHeight || 0;
    for (let i = 0; i < n; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 2.6),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.08, 0.08),
        a: rand(0.15, 0.55)
      });
    }
  }

  function animate() {
    if (!ctx || !particleCanvas) return;
    const w = particleCanvas.clientWidth;
    const h = particleCanvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.globalAlpha = p.a;
      ctx.fillStyle = 'rgba(200,230,200,0.9)'; // soft warm speck (subtle greenish)
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(animate);
  }

  // --------------------
  // Ticker rotation
  // --------------------
  function startTicker() {
    tickerInterval = setInterval(() => {
      tickIndex = (tickIndex + 1) % fields.length;
    }, 2800);
  }

  // --------------------
  // Intersection reveal (simple)
  // --------------------
  let revealObs: IntersectionObserver | null = null;
  function initReveal() {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    revealObs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('is-visible');
          revealObs && revealObs.unobserve(e.target);
        }
      }
    }, { threshold: 0.18 });
    document.querySelectorAll('[data-show]').forEach(el => revealObs!.observe(el));
  }

  // --------------------
  // Lifecycle
  // --------------------
  onMount(() => {
    // small delay for typed reveal
    heroTyped.set(1);
    startTicker();
    initCanvas();
    initReveal();
  });

  onDestroy(() => {
    if (tickerInterval) clearInterval(tickerInterval);
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('resize', resizeCanvas);
    revealObs && revealObs.disconnect();
  });
</script>

<svelte:head>
  <title>Apex Lab — 3-week builder sprint</title>
  <meta name="description" content="Apex Lab — small cohort, handcrafted mentorship, build AI for the field you care about. $50." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <!-- Fonts chosen to fit warm-retro-cyber aesthetic -->
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@300;400;600;700&family=Bebas+Neue&display=swap" rel="stylesheet">
</svelte:head>

<main class="page">
  <!-- hero -->
  <section class="hero" aria-label="Apex Lab hero">
    <canvas class="hero-canvas" bind:this={particleCanvas} aria-hidden="true"></canvas>

    <div class="hero-overlay"></div>

    <div class="container hero-inner">
      <div class="hero-left" data-show>
        <h1 class="hero-title">{headline}</h1>
        <p class="hero-sub">{subhead}</p>

        <div class="hero-cta">
          <a class="btn main" href="#apply">{cta}</a>
          <div class="kicker">{kicker}</div>
        </div>

        <div class="hero-meta" aria-hidden="true">
          <div class="meta-pill">genesis cohort</div>
          <div class="meta-dot"></div>
          <div class="meta-pill">3 weeks</div>
          <div class="meta-dot"></div>
          <div class="meta-pill">limited to 25</div>
        </div>
      </div>

      <div class="hero-right" data-show>
        <figure class="hero-card">
          <img src={ASSETS.hero} alt="Apex mood" loading="eager" />
          <figcaption>an invitation to build with purpose</figcaption>
        </figure>
      </div>
    </div>

    <div class="hero-bottom" aria-hidden="true">
      <div class="ticker">
        <div class="tick-item">{fields[tickIndex].name} — {fields[tickIndex].short}</div>
      </div>
    </div>
  </section>

  <!-- stripe (image left / text right) -->
  <section class="stripe" aria-label="the vibe">
    <div class="container stripe-grid">
      <figure class="stripe-image" data-show>
        <img src={ASSETS.wire} alt="wireframe bust" loading="lazy" />
      </figure>

      <div class="stripe-text" data-show>
        <h2 class="stripe-title">This isn’t a club for everyone.</h2>
        <p class="stripe-lead">You don’t need permission to build. You need a place that pushes you, gives honest feedback and teams that will not accept anything half-done. Apex is that place.</p>

        <ul class="stripe-list">
          <li><strong>Zero-to-shipped</strong> project in 21 days</li>
          <li><strong>Small cohort</strong> — focused feedback and real accountability</li>
          <li><strong>Mentors</strong> who actually ship products, not slides</li>
        </ul>

        <p class="stripe-note">$50 — less than your monthly coffee habit. Real outcomes. Real telling stories.</p>
      </div>
    </div>
  </section>

  <!-- program timeline -->
  <section class="program" aria-label="program overview">
    <div class="container">
      <h2 class="section-title" data-show>the 3-week sprint</h2>

      <ol class="timeline">
        <li data-show>
          <div class="node">Week 1</div>
          <div class="stage">
            <h3>Foundations through projects</h3>
            <p>Hands-on Python, datasets, and small models. You’ll ship a working prototype in your domain.</p>
          </div>
        </li>
        <li data-show>
          <div class="node">Week 2</div>
          <div class="stage">
            <h3>Build the intelligence</h3>
            <p>Data pipelines, model choice, eval, and making your project reliable enough to demo.</p>
          </div>
        </li>
        <li data-show>
          <div class="node">Week 3</div>
          <div class="stage">
            <h3>Ship + story</h3>
            <p>Deploy a public demo, polish the readme, and prepare a crisp narrative for anyone who asks — mentors will help you tell it.</p>
          </div>
        </li>
      </ol>

      <div class="fields-grid" data-show>
        {#each fields as f, i}
          <div class={"field-card " + (i % 2 === 0 ? 'alt' : '')}>
            <div class="field-name">{f.name}</div>
            <div class="field-short">{f.short}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- gallery / vibes -->
  <section class="gallery" aria-label="visuals">
    <div class="container gallery-grid">
      <figure class="vframe" data-show>
        <img src={ASSETS.bust} alt="vibe bust" loading="lazy" />
        <figcaption>learn fast • ship clean • be remembered</figcaption>
      </figure>

      <figure class="vframe" data-show>
        <img src={ASSETS.hero} alt="studio" loading="lazy" />
        <figcaption>small cohort • serious energy • no fluff</figcaption>
      </figure>
    </div>
  </section>

  <!-- faq -->
  <section class="faq" id="faq" aria-label="frequently asked questions">
    <div class="container">
      <h2 class="section-title" data-show>questions from future builders</h2>
      <div class="faq-list">
        {#each faqs as f, i}
          <div class={"faq-item " + (expandedFaq === i ? 'open' : '')}>
            <button class="q" on:click={() => toggleFaq(i)} aria-expanded={expandedFaq === i} aria-controls={`a-${i}`}>
              <span>{f.q}</span>
              <span class="sym">{expandedFaq === i ? '\u2212' : '\u002b'}</span>
            </button>
            <div id={`a-${i}`} class="a" hidden={expandedFaq !== i} aria-hidden={expandedFaq !== i}>{f.a}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- final cta -->
  <section class="final" id="apply" aria-label="apply">
    <div class="container final-inner" data-show>
      <h2 class="final-title">Build something worth remembering</h2>
      <p class="final-sub">Three weeks. Small group. Real work. If it’s not useful, we’ll refund you. Simple.</p>
      <a class="btn primary big" href="https://unfounders.com/apply" role="button">{cta}</a>
      <p class="final-small">Limited to 25 spots — genesis cohort.</p>
    </div>
  </section>
</main>

<style>
  /* --------------------
     Root theme
  -------------------- */
  :root{
    --bg:#0b0a0a; /* warm dark */
    --panel:#111010;
    --muted:#b7b0a8;
    --ink:#f3efe9;
    --accent:#12ff7a; /* neon green accent */
    --warm:#d86b3a; /* burnt orange */
    --metal:#c5bdb6;
    --glass:rgba(255,255,255,0.03);
    --border:rgba(255,255,255,0.06);
    --radius:14px;
    --shadow:0 16px 40px rgba(2,2,2,0.6);
  }

  /* baseline */
  *{box-sizing:border-box}
  html,body{height:100%;margin:0;padding:0;background:var(--bg);color:var(--ink);font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
  img{display:block;max-width:100%;height:auto}
  a{color:inherit;text-decoration:none}
  .container{max-width:1180px;margin:0 auto;padding:0 20px}

  /* --------------------
     HERO
  -------------------- */
  .hero{position:relative;min-height:82vh;display:flex;align-items:center;padding:42px 0;overflow:hidden}
  .hero-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:0}
  .hero-overlay{position:absolute;inset:0;background-image:linear-gradient(180deg, rgba(8,6,6,0.46), rgba(6,5,5,0.6));mix-blend-mode:overlay;pointer-events:none;z-index:1}
  .hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr 420px;gap:36px;align-items:center}

  .hero-left{padding:28px 0}
  .hero-title{font-family:'Bebas Neue', 'Orbitron', sans-serif;font-size:clamp(34px,6.2vw,64px);line-height:0.98;margin:0 0 12px;color:var(--accent);letter-spacing:0.02em;text-transform:uppercase;text-shadow:0 6px 32px rgba(18,255,122,0.06)}
  .hero-sub{color:var(--muted);max-width:52ch;margin:12px 0 18px;font-size:1.02rem}

  .hero-cta{display:flex;align-items:center;gap:14px}
  .btn{display:inline-flex;align-items:center;justify-content:center;padding:12px 18px;border-radius:12px;background:var(--panel);border:1px solid var(--border);cursor:pointer;font-weight:700}
  .btn.main{background:linear-gradient(180deg, rgba(18,255,122,0.07), rgba(18,255,122,0.02));border:1px solid rgba(18,255,122,0.14);color:var(--accent);}
  .kicker{color:var(--muted);font-size:0.88rem}

  .hero-meta{display:flex;align-items:center;gap:10px;margin-top:18px}
  .meta-pill{background:var(--glass);padding:6px 10px;border-radius:999px;border:1px solid var(--border);font-size:0.78rem;color:var(--muted)}
  .meta-dot{width:6px;height:6px;border-radius:999px;background:var(--border)}

  .hero-right{display:flex;justify-content:center}
  .hero-card{width:100%;max-width:420px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);border:1px solid var(--border);background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12))}
  .hero-card img{display:block;width:100%;height:100%;object-fit:cover}
  .hero-card figcaption{padding:10px 12px;background:linear-gradient(180deg, rgba(0,0,0,0.14), rgba(0,0,0,0.08));font-size:0.86rem;color:var(--muted)}

  .hero-bottom{position:absolute;left:50%;transform:translateX(-50%);bottom:18px;z-index:3}
  .ticker{background:linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02));padding:8px 16px;border-radius:999px;border:1px solid var(--border)}
  .tick-item{font-weight:600;color:var(--metal);font-size:0.92rem}

  /* --------------------
     stripe
  -------------------- */
  .stripe{padding:64px 0;border-top:1px solid rgba(255,255,255,0.02)}
  .stripe-grid{display:grid;grid-template-columns:380px 1fr;gap:32px;align-items:center}
  .stripe-image{border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--shadow)}
  .stripe-text{padding:6px}
  .stripe-title{font-family:'Bebas Neue', 'Orbitron';font-size:clamp(22px,4.2vw,40px);margin:0 0 10px;color:var(--warm)}
  .stripe-lead{color:var(--muted);margin:0 0 12px}
  .stripe-list{list-style:none;padding:0;margin:0 0 14px;display:grid;gap:8px}
  .stripe-list li{color:var(--ink);font-weight:600}
  .stripe-note{color:var(--muted);font-size:0.9rem}

  /* --------------------
     timeline
  -------------------- */
  .program{padding:54px 0}
  .section-title{font-family:'Bebas Neue';font-size:20px;color:var(--metal);text-transform:uppercase;letter-spacing:0.12em;margin:0 0 20px}
  .timeline{list-style:none;padding:0;margin:0 0 28px;display:grid;gap:16px}
  .timeline li{display:grid;grid-template-columns:90px 1fr;gap:18px;align-items:start;padding:14px;border-radius:12px;background:var(--panel);border:1px solid var(--border)}
  .node{font-family:'Orbitron',sans-serif;background:linear-gradient(180deg,rgba(255,255,255,0.02),transparent);padding:12px;border-radius:8px;text-align:center;font-weight:700;color:var(--accent)}
  .stage h3{margin:0 0 8px;color:var(--metal)}
  .fields-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:18px}
  .field-card{padding:12px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);border:1px solid var(--border)}
  .field-card.alt{background:linear-gradient(180deg, rgba(18,255,122,0.03), transparent)}
  .field-name{font-weight:800;color:var(--accent)}
  .field-short{color:var(--muted);margin-top:6px}

  /* --------------------
     gallery
  -------------------- */
  .gallery{padding:40px 0}
  .gallery-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .vframe{border-radius:12px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--shadow)}
  .vframe figcaption{padding:8px;background:linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.06));color:var(--muted);font-weight:600}

  /* --------------------
     faq
  -------------------- */
  .faq{padding:46px 0;border-top:1px solid rgba(255,255,255,0.02)}
  .faq-list{display:grid;gap:10px}
  .faq-item{border-radius:10px;background:var(--panel);padding:8px;border:1px solid var(--border)}
  .faq-item.open{box-shadow:0 10px 26px rgba(0,0,0,0.6)}
  .faq-item .q{display:flex;justify-content:space-between;align-items:center;background:transparent;border:0;padding:12px;color:var(--ink);width:100%;font-weight:700;cursor:pointer}
  .faq-item .a{padding:10px 12px;color:var(--muted)}

  /* --------------------
     final
  -------------------- */
  .final{padding:70px 0;background:linear-gradient(180deg, rgba(18,255,122,0.02), transparent)}
  .final-inner{text-align:center}
  .final-title{font-family:'Bebas Neue';font-size:clamp(28px,5vw,44px);margin:0 0 12px;color:var(--warm)}
  .final-sub{color:var(--muted);max-width:60ch;margin:0 auto 18px}
  .btn.primary.big{padding:16px 22px;border-radius:14px;background:linear-gradient(180deg,var(--accent),#47d88c);color:#03120b;font-weight:900;border:1px solid rgba(255,255,255,0.06)}
  .final-small{color:var(--metal);margin-top:12px}

  /* --------------------
     reveal animations
  -------------------- */
  [data-show]{opacity:0;transform:translateY(18px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
  .is-visible{opacity:1;transform:none}

  /* --------------------
     responsive
  -------------------- */
  @media (max-width:1024px){
    .hero-inner{grid-template-columns:1fr 320px}
    .stripe-grid{grid-template-columns:1fr}
  }
  @media (max-width:720px){
    .hero-inner{grid-template-columns:1fr;gap:24px}
    .hero-right{order:2}
    .hero-left{order:1}
    .hero{min-height:auto;padding:32px 0}
    .container{padding:0 16px}
    .gallery-grid{grid-template-columns:1fr}
    .fields-grid{grid-template-columns:1fr}
  }

  /* --------------------
     small utilities
  -------------------- */
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
</style>
