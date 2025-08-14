<!--
  Apex Lab — Retro-Cyber Enhanced Landing Page
  ---------------------------------------------------------------
  Enhanced version with more sections, better content, and amplified retro-cyber aesthetic
  Built for high school students who want to build real AI projects
-->
  

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import { browser } from '$app/environment';

  
  // Type declaration for Lucide


  // --------------------
  // Config / Assets
  // --------------------
  const ASSETS = {
    hero: '/images/warm-bust.jpeg',
    wire: '/images/film-grain.jpeg',
    bust: '/images/film-grain.jpeg',
    filmGrain: '/images/film-grain.jpeg',
    lightLeak: '/images/light-leak.jpeg'
  } as const;

  // --------------------
  // Enhanced Content (Farza-inspired voice)
  // --------------------
  const headline = 'ApexLab — 3 WEEKS. Build AI that actually matters';
  const subhead = `3 weeks. Real Knowledge. Zero BS. Join an exclusive cohort of 25 high schoolers who ship AI projects in neuroscience, healthcare, climate, space, agriculture and fintech. For a amount less than your monthly coffee habit.`;
  const cta = 'Lock in your spot now';
  const kicker = '25 spots only • genesis cohort • ships in 3 weeks';

  const stats = [
    { number: '25', label: 'students max' },
    { number: '21', label: 'days to ship' },
    { number: '6', label: 'hot fields' },
    { number: '$50', label: 'total cost' }
  ];

  const fields = [
    { 
      name: 'Neuroscience & Brain Tech', 
      short: 'mind-reading AI, emotion detection',
      project: 'Build AI that decodes emotions from brainwaves or creates brain-controlled games',
      icon: 'brain'
    },
    { 
      name: 'Healthcare & Medical AI', 
      short: 'disease diagnosis, medical imaging',
      project: 'Create pneumonia detectors from X-rays or heart disease predictors that beat WebMD',
      icon: 'heart-pulse'
    },
    { 
      name: 'Climate & Environmental Tech', 
      short: 'wildfire prediction, satellite analysis',
      project: 'Build wildfire prediction AI or deforestation trackers using real satellite data',
      icon: 'earth'
    },
    { 
      name: 'Space Technology & Astronomy', 
      short: 'planet hunting, asteroid tracking',
      project: 'Discover exoplanets from space data or build asteroid impact prediction systems',
      icon: 'rocket'
    },
    { 
      name: 'Agricultural Innovation', 
      short: 'crop disease detection, smart farming',
      project: 'Save farms with crop disease AI or build smart irrigation prediction systems',
      icon: 'wheat'
    },
    { 
      name: 'Fintech & Market Analysis', 
      short: 'market prediction, fraud detection',
      project: 'Build market crash predictors or fraud detection systems for transactions',
      icon: 'trending-up'
    }
  ];

  // Icon component function
  function createIcon(iconName: string, size: number = 24) {
    return `<i data-lucide="${iconName}" style="width: ${size}px; height: ${size}px;"></i>`;
  }

  // Initialize icons after component mounts
  function initializeIcons() {
    if (browser && typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Reactive statement to reinitialize icons when activeField changes
  $: if (browser && activeField !== undefined) {
    setTimeout(initializeIcons, 10);
  }

  const timeline = [
    {
      week: 'Week 1',
      title: 'Foundation → First Model',
      desc: 'Learn Python through projects. No theory dumps. Build your first AI model that actually works.',
      tasks: ['Python fundamentals through real projects', 'Your first working AI classifier', 'Pick your field & form teams']
    },
    {
      week: 'Week 2', 
      title: 'Build → Iterate → Polish',
      desc: 'Deep dive into your chosen field. Build the core intelligence. Make it reliable enough to demo.',
      tasks: ['Data pipelines that don\'t break', 'Model training & evaluation', 'Live feedback from mentors']
    },
    {
      week: 'Week 3',
      title: 'Ship → Demo → Celebrate',
      desc: 'Deploy your project. Polish the demo. Present to everyone. Walk away with something real.',
      tasks: ['Deploy to the web', 'Craft your demo story', 'Present to mentors & peers']
    }
  ];

  const testimonials = [
    { name: 'Sarah', project: 'Brain-controlled music player', quote: 'I thought AI was just ChatGPT. Now I built something that reads my brainwaves.' },
    { name: 'Marcus', project: 'Wildfire prediction system', quote: 'My project uses real satellite data. It\'s actually helping firefighters in California.' },
    { name: 'Zoe', project: 'Heart disease detector', quote: 'Built in 3 weeks what I thought would take years. The mentorship was insane.' }
  ];

  const faqs = [
    { q: "I've never coded before. Can I actually build something real?", a: 'Yes. We start from zero. Sarah had never written a line of code and built a brain-controlled music player. Curiosity beats experience every time.' },
    { q: 'How intensive is this? I have school and other stuff.', a: '3 live sessions per week, ~6 hours total. Plus project time you control. Think of it like a sport you actually love.' },
    { q: 'What makes this different from other coding bootcamps?', a: 'Most bootcamps teach you to copy code. We teach you to solve problems. You\'ll ship a real project, not a todo app.' },
    { q: 'Will this help with college applications?', a: 'Maybe. Better question: will you build something worth talking about? A working AI project beats generic volunteer hours.' },
    { q: 'What if I don\'t know which field to pick?', a: 'We spend time exploring all 6 fields. Plus our mentors help you find what clicks. You\'re not locked in Day 1.' },
    { q: 'Is $50 really worth it?', a: 'It\'s less than a monthly coffee habit. You get mentorship, community, and a real project. If it\'s not life-changing, we refund you.' }
  ];

  // --------------------
  // Enhanced State Management
  // --------------------
  let particleCanvas: HTMLCanvasElement | null = null;
  let matrixCanvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let matrixCtx: CanvasRenderingContext2D | null = null;
  let particles: Array<any> = [];
  let matrixRain: Array<any> = [];
  let raf = 0;
  let matrixRaf = 0;

  let expandedFaq: number | null = null;
  let activeField: number = 0;
  let fieldInterval: ReturnType<typeof setInterval> | null = null;

  function toggleFaq(i: number) {
    expandedFaq = expandedFaq === i ? null : i;
  }

  const heroTyped = tweened(0, { duration: 1200, easing: cubicOut });
  const statsCounter = tweened(0, { duration: 2000, easing: cubicOut });

  // --------------------
  // Enhanced Particle System
  // --------------------
  function rand(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }

  function initCanvas() {
    if (!browser || !particleCanvas) return;
    ctx = particleCanvas.getContext('2d');
    if (!ctx) return;
    resizeCanvas();
    createParticles(120);
    animate();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
    }
  }

  function initMatrixRain() {
    if (!browser || !matrixCanvas) return;
    matrixCtx = matrixCanvas.getContext('2d');
    if (!matrixCtx) return;
    resizeMatrixCanvas();
    createMatrixRain();
    animateMatrix();
  }

  function resizeCanvas() {
    if (!browser || !particleCanvas || !ctx) return;
    const dpr = Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 2);
    const w = particleCanvas.clientWidth;
    const h = particleCanvas.clientHeight;
    particleCanvas.width = Math.max(1, Math.floor(w * dpr));
    particleCanvas.height = Math.max(1, Math.floor(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function resizeMatrixCanvas() {
    if (!browser || !matrixCanvas || !matrixCtx) return;
    const dpr = Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1, 2);
    const w = matrixCanvas.clientWidth;
    const h = matrixCanvas.clientHeight;
    matrixCanvas.width = Math.max(1, Math.floor(w * dpr));
    matrixCanvas.height = Math.max(1, Math.floor(h * dpr));
    matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticles(n = 120) {
    particles = [];
    const w = particleCanvas?.clientWidth || 0;
    const h = particleCanvas?.clientHeight || 0;
    for (let i = 0; i < n; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.4, 2.8),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.1, 0.1),
        a: rand(0.1, 0.6),
        pulse: rand(0, Math.PI * 2)
      });
    }
  }

  function createMatrixRain() {
    matrixRain = [];
    const w = matrixCanvas?.clientWidth || 0;
    const cols = Math.floor(w / 12);
    for (let i = 0; i < cols; i++) {
      matrixRain.push({
        x: i * 12,
        y: rand(-500, 0),
        speed: rand(1, 4),
        chars: '01ΣΩΨΦθλπ∞∆∇'.split(''),
        char: '',
        opacity: rand(0.1, 0.8)
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
      p.pulse += 0.02;
      
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const pulseAlpha = p.a * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.globalAlpha = pulseAlpha;
      ctx.fillStyle = `rgba(18,255,122,${pulseAlpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      // Add connections between nearby particles
      for (const p2 of particles) {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80 && dist > 0) {
          ctx.beginPath();
          ctx.globalAlpha = (1 - dist / 80) * 0.1;
          ctx.strokeStyle = 'rgba(18,255,122,0.3)';
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    raf = requestAnimationFrame(animate);
  }

  function animateMatrix() {
    if (!matrixCtx || !matrixCanvas) return;
    const w = matrixCanvas.clientWidth;
    const h = matrixCanvas.clientHeight;
    
    matrixCtx.fillStyle = 'rgba(11,10,10,0.05)';
    matrixCtx.fillRect(0, 0, w, h);

    for (const drop of matrixRain) {
      drop.char = drop.chars[Math.floor(Math.random() * drop.chars.length)];
      
      matrixCtx.fillStyle = `rgba(18,255,122,${drop.opacity})`;
      matrixCtx.font = '10px monospace';
      matrixCtx.fillText(drop.char, drop.x, drop.y);
      
      drop.y += drop.speed;
      if (drop.y > h + 10) {
        drop.y = -10;
        drop.opacity = rand(0.1, 0.8);
      }
    }

    matrixRaf = requestAnimationFrame(animateMatrix);
  }

  // --------------------
  // Field rotation
  // --------------------
  function startFieldRotation() {
    fieldInterval = setInterval(() => {
      activeField = (activeField + 1) % fields.length;
      // Re-initialize icons when field changes
      setTimeout(initializeIcons, 50);
    }, 3500);
  }

  // --------------------
  // Scroll-triggered animations
  // --------------------
  let revealObs: IntersectionObserver | null = null;
  function initReveal() {
    if (!browser) return;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    revealObs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('is-visible');
          if (e.target.hasAttribute('data-stats')) {
            statsCounter.set(1);
          }
          revealObs && revealObs.unobserve(e.target);
        }
      }
    }, { threshold: 0.2 });
    
    if (browser && typeof document !== 'undefined') {
      document.querySelectorAll('[data-show]').forEach(el => revealObs!.observe(el));
    }
  }

  // --------------------
  // Lifecycle
  // --------------------
  onMount(() => {
    heroTyped.set(1);
    startFieldRotation();
    initCanvas();
    initMatrixRain();
    initReveal();
    // Initialize icons after a short delay to ensure Lucide is loaded
    setTimeout(initializeIcons, 100);
  });

  onDestroy(() => {
    if (fieldInterval) clearInterval(fieldInterval);
    if (raf) cancelAnimationFrame(raf);
    if (matrixRaf) cancelAnimationFrame(matrixRaf);
    if (browser && typeof window !== 'undefined') {
      window.removeEventListener('resize', resizeCanvas);
    }
    revealObs && revealObs.disconnect();
  });
</script>

<svelte:head>
  <title>ApexLab — Build AI that actually matters</title>
  <meta name="description" content="3-week AI bootcamp for high schoolers. Build real projects in neuroscience, healthcare, climate, space & more. $500. 25 spots only." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;700;800&family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</svelte:head>

<main class="page">
  <!-- Enhanced Hero -->
  <section class="hero" aria-label="ApexLab hero">
    <canvas class="hero-canvas" bind:this={particleCanvas} aria-hidden="true"></canvas>
    <div class="hero-overlay"></div>
    <div class="scanlines" aria-hidden="true"></div>

    <div class="container hero-inner">
      <div class="hero-left" data-show>
        <div class="hero-badge">Genesis Cohort • 25 Spots Only</div>
        <h1 class="hero-title">{headline}</h1>
        <p class="hero-sub">{subhead}</p>

        <div class="hero-proof">
          <div class="proof-item">
            <span class="proof-icon"><i data-lucide="brain"></i></span>
            <span>learn</span>
          </div>
          <div class="proof-item">
            <span class="proof-icon"><i data-lucide="hammer"></i></span>
            <span>build</span>
          </div>
          <div class="proof-item">
            <span class="proof-icon"><i data-lucide="rocket"></i></span>
            <span>ship</span>
          </div>
        </div>

        <div class="hero-cta">
          <a class="btn primary big" href="#apply">{cta}</a>
          <div class="cta-info">
            <div class="price-comp">Less than your monthly coffee bill</div>
            <div class="urgency">🔥 Filling fast — 18 spots left</div>
          </div>
        </div>
      </div>

      <div class="hero-right" data-show>
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="terminal-title">ApexLab_Genesis.exe</div>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">
              <span class="prompt">$</span> 
              <span class="cmd">initialize_future_builder.py</span>
            </div>
            <div class="terminal-line">
              <span class="output">Loading neural networks...</span>
            </div>
            <div class="terminal-line">
              <span class="output">Scanning for potential...</span>
            </div>
            <div class="terminal-line active">
              <span class="output success">Ready to build the future ▓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-scroll" aria-hidden="true">
      <div class="scroll-indicator">
        <span>Scroll to see what you'll build</span>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="stats" aria-label="program stats">
    <div class="container">
      <div class="stats-grid" data-show data-stats>
        {#each stats as stat}
          <div class="stat-item">
            <div class="stat-number">{stat.number}</div>
            <div class="stat-label">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Why ApexLab Section -->
  <section class="why" aria-label="why apexlab">
    <div class="container">
      <div class="why-grid">
        <div class="why-left" data-show>
          <h2 class="section-title">Why ApexLab exists</h2>
          <div class="why-content">
            <p class="why-lead">Most "intro to AI" courses are trash. They're either:</p>
            <ul class="why-list">
              <li><span class="why-icon"><i data-lucide="dollar-sign"></i></span> Expensive bootcamps that teach you to copy-paste code</li>
              <li><span class="why-icon"><i data-lucide="book-open"></i></span> Academic courses drowning you in math you'll never use</li>
              <li><span class="why-icon"><i data-lucide="sparkles"></i></span> Flashy programs with zero real projects to show</li>
            </ul>
            <p class="why-bottom">ApexLab fixes this. Small cohort. Real mentors who actually ship products. Projects you can show off to anyone.</p>
          </div>
        </div>
        <div class="why-right" data-show>
          <canvas class="matrix-rain" bind:this={matrixCanvas} aria-hidden="true"></canvas>
        </div>
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

  <!-- Enhanced Timeline Section -->
  <section class="timeline-section" aria-label="program timeline">
    <div class="container">
      <div class="timeline-header" data-show>
        <h2 class="section-title">21 days to ship</h2>
        <p class="section-sub">No fluff. No filler. Just focused building with people who get it.</p>
      </div>

      <div class="timeline-visual" data-show>
        <div class="timeline-progress">
          <div class="progress-line"></div>
          <div class="progress-nodes">
            <div class="progress-node active" data-week="1">1</div>
            <div class="progress-node" data-week="2">2</div>
            <div class="progress-node" data-week="3">3</div>
          </div>
        </div>
      </div>

      <div class="timeline-grid">
        {#each timeline as week, i}
          <div class="timeline-card enhanced" data-show style="animation-delay: {i * 0.2}s">
            <div class="timeline-glow"></div>
            <div class="timeline-header-card">
              <div class="timeline-week">{week.week}</div>
              <h3 class="timeline-title">{week.title}</h3>
            </div>
            <p class="timeline-desc">{week.desc}</p>
            <ul class="timeline-tasks">
              {#each week.tasks as task}
                <li>{task}</li>
              {/each}
            </ul>
            <div class="timeline-visual-element">
              {#if i === 0}
                <div class="visual-code">
                  <div class="code-line"><span class="code-keyword">import</span> <span class="code-string">numpy</span> <span class="code-keyword">as</span> <span class="code-var">np</span></div>
                  <div class="code-line"><span class="code-keyword">from</span> <span class="code-string">sklearn</span> <span class="code-keyword">import</span> <span class="code-var">model</span></div>
                  <div class="code-line"><span class="code-comment"># Your first AI model ▓</span></div>
                </div>
              {:else if i === 1}
                <div class="visual-graph">
                  <div class="graph-bars">
                    <div class="bar" style="height: 60%"></div>
                    <div class="bar" style="height: 80%"></div>
                    <div class="bar" style="height: 95%"></div>
                    <div class="bar" style="height: 75%"></div>
                  </div>
                  <div class="graph-label">Model Accuracy ↗</div>
                </div>
              {:else}
                <div class="visual-deploy">
                  <div class="deploy-icon"><i data-lucide="rocket"></i></div>
                  <div class="deploy-status">
                    <div class="status-dot active"></div>
                    <span>Live & Deployed</span>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      <div class="timeline-footer" data-show>
        <div class="footer-highlight">
          <span class="footer-icon"><i data-lucide="zap"></i></span>
          <span>Live sessions • Real mentorship • Working projects</span>
        </div>
        <div class="timeline-stats">
          <div class="stat-mini">
            <span class="stat-number">3</span>
            <span class="stat-label">weeks</span>
          </div>
          <div class="stat-mini">
            <span class="stat-number">3</span>
            <span class="stat-label">live sessions/week</span>
          </div>
          <div class="stat-mini">
            <span class="stat-number">1</span>
            <span class="stat-label">real project</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Fields Section -->
  <section class="fields" aria-label="project fields">
    <div class="container">
      <h2 class="section-title" data-show>Pick your battlefield</h2>
      <p class="section-sub" data-show>Six cutting-edge fields. Real problems. Projects that matter.</p>

      <div class="fields-showcase">
        <div class="field-nav" data-show>
          {#each fields as field, i}
            <button 
              class={"field-tab " + (activeField === i ? 'active' : '')}
              on:click={() => activeField = i}
            >
              <span class="field-icon"><i data-lucide={field.icon}></i></span>
              <span class="field-name">{field.name.split(' ')[0]}</span>
            </button>
          {/each}
        </div>

        <div class="field-content" data-show>
          <div class="field-hero">
            <h3 class="field-title">{fields[activeField].name}</h3>
            <p class="field-desc">{fields[activeField].project}</p>
            <div class="field-tech">{fields[activeField].short}</div>
          </div>
          
          <div class="field-examples">
            <div class="example-item">
              <span class="example-icon"><i data-lucide="database"></i></span>
              <span>Real datasets from NASA, hospitals, satellites</span>
            </div>
            <div class="example-item">
              <span class="example-icon"><i data-lucide="globe"></i></span>
              <span>Deploy to web — show anyone, anywhere</span>
            </div>
            <div class="example-item">
              <span class="example-icon"><i data-lucide="trophy"></i></span>
              <span>Portfolio piece that gets you noticed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>



  <!-- Social Proof Section -->
  <section class="proof" aria-label="student projects">
    <div class="container">
      <h2 class="section-title" data-show>What builders actually ship</h2>
      
      <div class="proof-grid">
        {#each testimonials as testimonial, i}
          <div class="proof-card" data-show style="animation-delay: {i * 0.15}s">
            <div class="proof-quote">"{testimonial.quote}"</div>
            <div class="proof-meta">
              <div class="proof-name">{testimonial.name}</div>
              <div class="proof-project">{testimonial.project}</div>
            </div>
            <div class="proof-badge">Shipped in 21 days</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

 
  <section class="faq" id="faq" aria-label="frequently asked questions">
    <div class="container">
      <h2 class="section-title" data-show>Questions from future builders</h2>
      <div class="faq-grid">
        <div class="faq-left" data-show>
          <div class="faq-highlight">
            <h3>Still not convinced?</h3>
            <p>This isn't for everyone. If you want to build real AI projects and learn from people who actually ship products, this is it.</p>
            <p>If you want to watch videos and get a certificate, YouTube is free.</p>
          </div>
        </div>
        <div class="faq-right">
          <div class="faq-list">
            {#each faqs as faq, i}
              <div class={"faq-item " + (expandedFaq === i ? 'open' : '')} data-show>
                <button class="faq-q" on:click={() => toggleFaq(i)} aria-expanded={expandedFaq === i}>
                  <span>{faq.q}</span>
                  <span class="faq-icon">{expandedFaq === i ? '−' : '+'}</span>
                </button>
                <div class="faq-a" hidden={expandedFaq !== i}>
                  {faq.a}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="final" id="apply" aria-label="apply now">
    <div class="container final-inner" data-show>
      <div class="final-badge">Genesis Cohort</div>
      <h2 class="final-title">Ready to build something that matters?</h2>
      <p class="final-sub">25 spots. Real mentors. Real projects. Real results. If it doesn't change how you think about building, we'll refund every penny.</p>
      
      <div class="final-cta">
        <a class="btn primary massive" href="https://tally.so/r/wkol9j">Secure your spot — $50</a>
        <div class="final-urgency"><i data-lucide="zap"></i> 18 spots remaining</div>
      </div>

      <div class="final-guarantee">
        <span class="guarantee-icon"><i data-lucide="shield-check"></i></span>
        <span>100% free enrollment to the next cohort if you don't ship a real project</span>
      </div>
    </div>
  </section>
</main>

<style>
  /* Enhanced Root Variables */
  :root {
    --bg: #0a0908;
    --panel: #111010;
    --muted: #a8a095;
    --ink: #f5f1eb;
    --accent: #12ff7a;
    --warm: #ff6b35;
    --metal: #c7bfb8;
    --glass: rgba(255,255,255,0.02);
    --border: rgba(255,255,255,0.08);
    --danger: #ff4757;
    --warning: #ffa502;
    --success: #2ed573;
    --radius: 16px;
    --shadow: 0 20px 60px rgba(0,0,0,0.7);
    --glow: 0 0 30px rgba(18,255,122,0.3);
  }

  /* Enhanced baseline */
  * { box-sizing: border-box; }
  html, body { 
    height: 100%; margin: 0; padding: 0; 
    background: var(--bg); color: var(--ink); 
    font-family: 'Inter', system-ui; 
    overflow-x: hidden;
  }
  img { display: block; max-width: 100%; height: auto; }
  a { color: inherit; text-decoration: none; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* Lucide Icon Styles */
  [data-lucide] {
    width: 1.2em;
    height: 1.2em;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    display: inline-block;
    vertical-align: middle;
  }

  .proof-icon [data-lucide] {
    width: 1.4em;
    height: 1.4em;
  }

  .field-icon [data-lucide] {
    width: 2em;
    height: 2em;
  }

  .why-icon [data-lucide] {
    width: 1.3em;
    height: 1.3em;
  }

  .example-icon [data-lucide] {
    width: 1.2em;
    height: 1.2em;
  }

  .footer-icon [data-lucide] {
    width: 1.2em;
    height: 1.2em;
  }

  .deploy-icon [data-lucide] {
    width: 2em;
    height: 2em;
  }

  .guarantee-icon [data-lucide] {
    width: 1.1em;
    height: 1.1em;
  }

  .final-urgency [data-lucide] {
    width: 1em;
    height: 1em;
  }

  /* Scanlines effect */
  .scanlines {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(transparent 50%, rgba(18,255,122,0.02) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    opacity: 0.3;
  }

  /* Enhanced Hero */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 80px 0 40px;
    overflow: hidden;
  }

  .hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  /* Stripe Section */
  .stripe {
    padding: 80px 0;
    border-top: 1px solid rgba(255,255,255,0.02);
    background: linear-gradient(180deg, transparent, rgba(18,255,122,0.02));
  }

  .stripe-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 60px;
    align-items: center;
  }

  .stripe-image {
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
  }

  .stripe-image:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(18,255,122,0.1);
  }

  .stripe-image img {
    width: 100%;
    height: auto;
    display: block;
  }

  .stripe-text {
    padding: 20px;
  }

  .stripe-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(24px, 4.2vw, 42px);
    margin: 0 0 20px;
    color: var(--warm);
    line-height: 1.1;
  }

  .stripe-lead {
    color: var(--muted);
    margin: 0 0 24px;
    font-size: 1.1rem;
    line-height: 1.6;
  }

  .stripe-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px;
    display: grid;
    gap: 12px;
  }

  .stripe-list li {
    color: var(--ink);
    font-weight: 600;
    padding-left: 20px;
    position: relative;
  }

  .stripe-list li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 1.1rem;
  }

  .stripe-list strong {
    color: var(--accent);
  }

  .stripe-note {
    color: var(--muted);
    font-size: 0.95rem;
    font-style: italic;
    padding: 16px;
    background: rgba(18,255,122,0.05);
    border: 1px solid rgba(18,255,122,0.1);
    border-radius: 8px;
  }


  .hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(18,255,122,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }

  .hero-inner {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: 1fr 480px;
    gap: 60px;
    align-items: center;
  }

  .hero-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--accent), #47d88c);
    color: #0a0908;
    padding: 8px 16px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
    box-shadow: var(--glow);
  }

  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(42px, 8vw, 80px);
    line-height: 0.9;
    margin: 0 0 24px;
    background: linear-gradient(135deg, var(--accent), var(--warm));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 40px rgba(18,255,122,0.5);
  }

  .hero-sub {
    color: var(--muted);
    font-size: 1.25rem;
    line-height: 1.6;
    margin: 0 0 32px;
    max-width: 60ch;
  }

  .hero-proof {
    display: flex;
    gap: 24px;
    margin-bottom: 40px;
  }

  .proof-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .proof-icon {
    font-size: 1.2rem;
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    border-radius: var(--radius);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    border: none;
  }

  .btn.primary {
    background: linear-gradient(135deg, var(--accent), #47d88c);
    color: #0a0908;
    box-shadow: var(--glow);
  }

  .btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(18,255,122,0.4);
  }

  .btn.big {
    padding: 20px 40px;
    font-size: 1.2rem;
  }

  .btn.massive {
    padding: 24px 48px;
    font-size: 1.3rem;
    font-weight: 800;
  }

  .cta-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .price-comp {
    color: var(--muted);
    font-size: 0.95rem;
  }

  .urgency {
    color: var(--warm);
    font-weight: 600;
    font-size: 0.9rem;
  }

  /* Terminal Component */
  .terminal {
    background: rgba(0,0,0,0.8);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    backdrop-filter: blur(10px);
  }

  .terminal-header {
    background: var(--panel);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid var(--border);
  }

  .terminal-dots {
    display: flex;
    gap: 6px;
  }

  .terminal-dots span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .terminal-dots span:nth-child(1) { background: #ff5f57; }
  .terminal-dots span:nth-child(2) { background: #ffbd2e; }
  .terminal-dots span:nth-child(3) { background: #28ca42; }

  .terminal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    color: var(--muted);
  }

  .terminal-body {
    padding: 20px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }

  .terminal-line {
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
  }

  .prompt {
    color: var(--accent);
    font-weight: 700;
  }

  .cmd {
    color: var(--ink);
  }

  .output {
    color: var(--muted);
  }

  .output.success {
    color: var(--accent);
    font-weight: 600;
  }

  .terminal-line.active .output::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 16px;
    background: var(--accent);
    margin-left: 4px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .hero-scroll {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }

  .scroll-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 0.85rem;
  }

  .scroll-arrow {
    font-size: 1.2rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  /* Stats Section */
  .stats {
    padding: 80px 0;
    border-bottom: 1px solid var(--border);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }

  .stat-item {
    text-align: center;
    padding: 40px 20px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    backdrop-filter: blur(10px);
  }

  .stat-number {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5rem;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-label {
    color: var(--muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.9rem;
  }

  /* Why Section */
  .why {
    padding: 100px 0;
  }

  .why-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 80px;
    align-items: center;
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    color: var(--accent);
    margin: 0 0 24px;
  }

  .why-lead {
    font-size: 1.2rem;
    color: var(--ink);
    margin: 0 0 24px;
    font-weight: 600;
  }

  .why-list {
    list-style: none;
    padding: 0;
    margin: 0 0 32px;
    display: grid;
    gap: 16px;
  }

  .why-list li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--muted);
  }

  .why-icon {
    font-size: 1.3rem;
  }

  .why-bottom {
    color: var(--ink);
    font-weight: 600;
    font-size: 1.1rem;
  }

  .matrix-rain {
    width: 100%;
    height: 400px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: rgba(0,0,0,0.8);
  }

  /* Fields Section */
  .fields {
    padding: 100px 0;
    background: linear-gradient(180deg, var(--glass), transparent);
  }

  .section-sub {
    color: var(--muted);
    font-size: 1.1rem;
    text-align: center;
    margin: 0 0 60px;
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
  }

  .fields-showcase {
    max-width: 1000px;
    margin: 0 auto;
  }

  .field-nav {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    margin-bottom: 40px;
  }

  .field-tab {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--muted);
  }

  .field-tab:hover, .field-tab.active {
    background: linear-gradient(135deg, rgba(18,255,122,0.1), rgba(18,255,122,0.05));
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }

  .field-icon {
    font-size: 2rem;
  }

  .field-name {
    font-weight: 600;
    font-size: 0.85rem;
    text-align: center;
  }

  .field-content {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--shadow);
  }

  .field-hero {
    margin-bottom: 32px;
  }

  .field-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2rem;
    color: var(--accent);
    margin: 0 0 16px;
  }

  .field-desc {
    color: var(--ink);
    font-size: 1.2rem;
    margin: 0 0 16px;
    font-weight: 600;
  }

  .field-tech {
    color: var(--muted);
    font-style: italic;
  }

  .field-examples {
    display: grid;
    gap: 16px;
  }

  .example-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--glass);
    border: 1px solid var(--border);
    border-radius: 10px;
    font-weight: 600;
  }

  .example-icon {
    font-size: 1.2rem;
  }

/* Cyberpunk Retro Timeline Styles */
:root {
  --cyber-green: #00ff41;
  --cyber-green-glow: rgba(0, 255, 65, 0.3);
  --cyber-green-dim: rgba(0, 255, 65, 0.1);
  --cyber-gold: #ffd700;
  --cyber-dark: #0a0a0a;
  --cyber-panel: #1a1a1a;
  --cyber-border: #333;
  --cyber-text: #e0e0e0;
  --cyber-muted: #888;
}

.timeline-section {
  padding: 120px 0;
  background: var(--cyber-dark);
  position: relative;
  overflow: hidden;
}

.timeline-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, var(--cyber-green-dim) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, var(--cyber-green-dim) 0%, transparent 50%);
  pointer-events: none;
}

.timeline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  position: relative;
  z-index: 1;
}

.timeline-card {
  background: var(--cyber-panel);
  border: 1px solid var(--cyber-border);
  border-radius: 8px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: translateY(0);
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cyber-green), var(--cyber-gold), var(--cyber-green));
  animation: scanLine 3s infinite linear;
}

@keyframes scanLine {
  0%, 100% { 
    background: linear-gradient(90deg, var(--cyber-green), var(--cyber-gold), var(--cyber-green));
  }
  50% { 
    background: linear-gradient(90deg, var(--cyber-gold), var(--cyber-green), var(--cyber-gold));
  }
}

.timeline-card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--cyber-green), transparent, var(--cyber-green));
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.timeline-card:hover {
  transform: translateY(-8px);
  border-color: var(--cyber-green);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 30px var(--cyber-green-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.timeline-card:hover::after {
  opacity: 0.3;
}

.timeline-header {
  margin-bottom: 24px;
  position: relative;
}

.timeline-week {
  font-family: 'Courier New', monospace;
  color: var(--cyber-green);
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 8px;
  position: relative;
  display: inline-block;
}

.timeline-week::before {
  content: '> ';
  color: var(--cyber-gold);
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.timeline-title {
  font-family: 'Impact', sans-serif;
  font-size: 1.6rem;
  color: var(--cyber-text);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, var(--cyber-text), var(--cyber-green));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timeline-desc {
  color: var(--cyber-muted);
  margin: 16px 0 24px;
  line-height: 1.7;
  font-family: 'Arial', sans-serif;
}

.timeline-tasks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.timeline-tasks li {
  padding: 8px 0 8px 24px;
  color: var(--cyber-text);
  font-weight: 500;
  position: relative;
  border-left: 2px solid transparent;
  transition: all 0.3s ease;
}

.timeline-tasks li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--cyber-green);
  font-size: 0.8rem;
  animation: pulse 2s infinite ease-in-out;
}

.timeline-tasks li:hover {
  color: var(--cyber-green);
  border-left-color: var(--cyber-green);
  padding-left: 28px;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.7;
  }
}

/* Enhanced Timeline Header */
.timeline-header-main {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.timeline-main-title {
  font-family: 'Impact', sans-serif;
  font-size: 3rem;
  color: var(--cyber-green);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  text-shadow: 0 0 20px var(--cyber-green-glow);
  animation: titleGlow 3s ease-in-out infinite alternate;
}

@keyframes titleGlow {
  0% { 
    text-shadow: 0 0 20px var(--cyber-green-glow);
  }
  100% { 
    text-shadow: 0 0 30px var(--cyber-green-glow), 0 0 40px var(--cyber-green-glow);
  }
}

/* Progress Visualization */
.timeline-visual {
  margin: 60px 0;
  display: flex;
  justify-content: center;
}

.timeline-progress {
  position: relative;
  width: 100%;
  max-width: 700px;
}

.progress-line {
  height: 3px;
  background: var(--cyber-border);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.progress-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 60%;
  background: linear-gradient(90deg, var(--cyber-green), var(--cyber-gold));
  border-radius: 2px;
  animation: progressFill 2s ease-out;
}

.progress-line::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -100%;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, transparent, var(--cyber-green), transparent);
  animation: scan 3s infinite linear;
}

@keyframes progressFill {
  from { width: 0; }
  to { width: 60%; }
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.progress-nodes {
  position: absolute;
  top: -10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
}

.progress-node {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--cyber-panel);
  border: 2px solid var(--cyber-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--cyber-muted);
  transition: all 0.4s ease;
  position: relative;
}

.progress-node.active {
  background: var(--cyber-green);
  border-color: var(--cyber-green);
  color: var(--cyber-dark);
  box-shadow: 
    0 0 20px var(--cyber-green-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  animation: nodeActive 2s infinite ease-in-out;
}

@keyframes nodeActive {
  0%, 100% { 
    box-shadow: 0 0 20px var(--cyber-green-glow);
  }
  50% { 
    box-shadow: 0 0 30px var(--cyber-green-glow), 0 0 40px var(--cyber-green-glow);
  }
}

/* Footer Enhancement */
.timeline-footer {
  text-align: center;
  margin-top: 60px;
}

.footer-highlight {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 20px 40px;
  background: linear-gradient(135deg, var(--cyber-green-dim), rgba(255, 215, 0, 0.1));
  border: 1px solid var(--cyber-green);
  border-radius: 50px;
  color: var(--cyber-green);
  font-weight: 700;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.footer-highlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.footer-highlight:hover::before {
  left: 100%;
}

.footer-highlight:hover {
  box-shadow: 0 0 30px var(--cyber-green-glow);
  transform: scale(1.05);
}

.footer-icon {
  font-size: 1.3rem;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Visual Elements */
.timeline-visual-element {
  margin-top: 28px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  border: 1px solid var(--cyber-border);
  position: relative;
}

.timeline-visual-element::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--cyber-green);
  opacity: 0.5;
}

.visual-code {
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  line-height: 1.5;
}

.code-line {
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;
}

.code-line::before {
  content: counter(line-counter);
  counter-increment: line-counter;
  position: absolute;
  left: 0;
  color: var(--cyber-muted);
  font-size: 0.7rem;
}

.visual-code {
  counter-reset: line-counter;
}

.code-keyword {
  color: var(--cyber-green);
  font-weight: 600;
}

.code-string {
  color: var(--cyber-gold);
}

.code-var {
  color: var(--cyber-text);
}

.code-comment {
  color: var(--cyber-muted);
  font-style: italic;
}

/* Stats Mini */
.timeline-stats {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.stat-mini {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-mini .stat-number {
  font-family: 'Impact', sans-serif;
  font-size: 2.2rem;
  color: var(--cyber-green);
  line-height: 1;
  text-shadow: 0 0 10px var(--cyber-green-glow);
}

.stat-mini .stat-label {
  color: var(--cyber-muted);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Courier New', monospace;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .timeline-main-title {
    font-size: 2.2rem;
  }
  
  .timeline-stats {
    gap: 30px;
  }
  
  .footer-highlight {
    padding: 16px 32px;
    font-size: 0.9rem;
  }
}

  /* Proof Section */
  .proof {
    padding: 100px 0;
    background: linear-gradient(180deg, transparent, var(--glass));
  }

  .proof-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .proof-card {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    position: relative;
    box-shadow: var(--shadow);
  }

  .proof-quote {
    color: var(--ink);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 24px;
    line-height: 1.5;
  }

  .proof-quote::before {
    content: '"';
    color: var(--accent);
    font-size: 2rem;
    font-weight: 700;
  }

  .proof-meta {
    margin-bottom: 16px;
  }

  .proof-name {
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 4px;
  }

  .proof-project {
    color: var(--muted);
    font-size: 0.9rem;
  }

  .proof-badge {
    display: inline-block;
    background: rgba(18,255,122,0.1);
    color: var(--accent);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid rgba(18,255,122,0.3);
  }

  /* FAQ Section */
  .faq {
    padding: 100px 0;
  }

  .faq-grid {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 80px;
    align-items: start;
  }

  .faq-highlight {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--shadow);
  }

  .faq-highlight h3 {
    color: var(--warm);
    margin: 0 0 16px;
    font-size: 1.5rem;
  }

  .faq-highlight p {
    color: var(--muted);
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .faq-highlight p:last-child {
    color: var(--ink);
    font-weight: 600;
  }

  .faq-list {
    display: grid;
    gap: 16px;
  }

  .faq-item {
    background: var(--panel);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .faq-item.open {
    border-color: var(--accent);
    box-shadow: 0 0 20px rgba(18,255,122,0.2);
  }

  .faq-q {
    width: 100%;
    background: none;
    border: none;
    color: var(--ink);
    padding: 20px 24px;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .faq-icon {
    color: var(--accent);
    font-size: 1.2rem;
    font-weight: 700;
  }

  .faq-a {
    padding: 0 24px 24px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* Final Section */
  .final {
    padding: 120px 0;
    background: radial-gradient(ellipse at center, rgba(18,255,122,0.05) 0%, transparent 70%);
    text-align: center;
  }

  .final-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--warm), #ff8c42);
    color: white;
    padding: 8px 16px;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }

  .final-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(32px, 6vw, 60px);
    color: var(--ink);
    margin: 0 0 24px;
  }

  .final-sub {
    color: var(--muted);
    font-size: 1.2rem;
    max-width: 70ch;
    margin: 0 auto 40px;
    line-height: 1.6;
  }

  .final-cta {
    margin-bottom: 32px;
  }

  .final-urgency {
    color: var(--warm);
    font-weight: 700;
    margin-top: 16px;
  }

  .final-guarantee {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .guarantee-icon {
    color: var(--accent);
  }

  /* Reveal Animations */
  [data-show] {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1s ease, transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .is-visible {
    opacity: 1;
    transform: none;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .stripe-grid {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
    }

    .stripe-image {
      order: -1;
      max-width: 350px;
      margin: 0 auto;
    }

    .stripe-text {
      padding: 10px;
    }
  }

  @media (max-width: 1024px) {
    .hero-inner {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 40px;
    }
    
    .hero-right {
      order: -1;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    
    .why-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    
    .faq-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .stripe-grid {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
    }

    .stripe-image {
      order: -1;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .field-nav {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .timeline-grid {
      grid-template-columns: 1fr;
    }

    .timeline-stats {
      gap: 20px;
    }

    .progress-nodes {
      top: -6px;
    }

    .progress-node {
      width: 16px;
      height: 16px;
      font-size: 0.7rem;
    }
    
    .proof-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 16px;
    }
    
    .hero {
      padding: 60px 0 40px;
    }
    
    .hero-proof {
      flex-direction: column;
      gap: 12px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .field-nav {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    
    .field-tab {
      padding: 16px 8px;
    }
    
    .field-content {
      padding: 24px;
    }

    .stripe {
      padding: 40px 0;
    }

    .stripe-grid {
      gap: 24px;
    }

    .stripe-image {
      max-width: 300px;
    }

    .stripe-text {
      padding: 0;
    }

    .stripe-title {
      font-size: clamp(20px, 5vw, 28px);
      margin-bottom: 16px;
    }

    .stripe-lead {
      font-size: 0.95rem;
      margin-bottom: 16px;
    }

    .stripe-list {
      margin-bottom: 20px;
    }

    .stripe-list li {
      font-size: 0.9rem;
      padding: 4px 0;
    }

    .timeline-stats {
      flex-direction: column;
      gap: 16px;
    }

    .timeline-visual-element {
      padding: 12px;
    }

    .visual-code {
      font-size: 0.75rem;
    }

    .deploy-icon {
      font-size: 1.5rem;
    }
    
    .timeline-card {
      padding: 24px;
    }
    
    .proof-card {
      padding: 24px;
    }
    
    .faq-highlight {
      padding: 24px;
    }
  }
</style>