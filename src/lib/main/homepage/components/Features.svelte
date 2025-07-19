<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let sectionElement: HTMLElement;
  let isVisible = writable(false);
  let mouseX = 0;
  let mouseY = 0;

  const features = [
    {
      id: 'launch-school',
      emoji: '🚀',
      title: 'Launch School',
      description: 'stop waiting for permission. learn the fundamentals that actually matter.',
      highlight: 'zero to founder in 8 weeks',
      stats: '500+ launched'
    },
    {
      id: 'the-forge',
      emoji: '⚡',
      title: 'The Forge',
      description: 'we turn your crazy ideas into companies that make money.',
      highlight: '$2M+ raised by our teens',
      stats: '50+ funded'
    },
    {
      id: 'build-weeks',
      emoji: '🔥',
      title: 'BuildWeeks',
      description: 'build something insane in 48 hours. make friends. change your life.',
      highlight: 'next one starts monday',
      stats: '1000+ builders'
    },
    {
      id: 'cofounder-connect',
      emoji: '🤝',
      title: 'Co-Founder Connect',
      description: 'find your ride-or-die business partner. entrepreneurship is a team sport.',
      highlight: '90% match success rate',
      stats: '200+ matches'
    },
    {
      id: 'demo-night',
      emoji: '🎯',
      title: 'Demo Night',
      description: 'pitch your startup to real investors. not your parents. actual VCs.',
      highlight: 'next demo: feb 15th',
      stats: '$500K committed'
    },
    {
      id: 'teen-fund',
      emoji: '💰',
      title: 'Teen Ventures Fund',
      description: 'we invest in the crazy ones. $10K-$50K checks for teenage founders.',
      highlight: 'applications open now',
      stats: '25 investments'
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.set(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionElement?.getBoundingClientRect();
      if (rect) {
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
</script>

<section 
  bind:this={sectionElement}
  class="features-section"
  style="--mouse-x: {mouseX}; --mouse-y: {mouseY}"
>
  <!-- Matrix Grid Background -->
  <div class="matrix-grid">
    {#each Array(20) as _, i}
      <div 
        class="grid-line vertical" 
        style="left: {i * 5}%; animation-delay: {i * 0.1}s"
      ></div>
    {/each}
    {#each Array(15) as _, i}
      <div 
        class="grid-line horizontal" 
        style="top: {i * 6.67}%; animation-delay: {i * 0.15}s"
      ></div>
    {/each}
  </div>

  <!-- Floating Geometric Shapes -->
  <div class="floating-shapes">
    {#each Array(8) as _, i}
      <div 
        class="shape shape-{i % 3}" 
        style="
          left: {Math.random() * 100}%; 
          top: {Math.random() * 100}%; 
          animation-delay: {i * 0.5}s;
          animation-duration: {4 + Math.random() * 3}s
        "
      ></div>
    {/each}
  </div>

  <div class="container">
    <!-- Section Header -->
    <div class="section-header" class:visible={$isVisible}>
      <h2 class="glitch-text" data-text="the ecosystem">
        the ecosystem
      </h2>
      <p class="subtitle">
        we're not building a program. we're building a movement.<br/>
        <span class="highlight">here's how we turn teenage dreams into billion-dollar realities</span>
      </p>
    </div>

    <!-- Features Grid -->
    <div class="features-grid">
      {#each features as feature, index}
        <div 
          class="feature-card" 
          class:visible={$isVisible}
          style="animation-delay: {index * 0.1}s"
          on:mouseenter={() => {}}
        >
          <div class="card-background"></div>
          <div class="card-border"></div>
          
          <div class="card-header">
            <div class="emoji-container">
              <span class="emoji">{feature.emoji}</span>
              <div class="emoji-glow"></div>
            </div>
            <div class="stats-badge">{feature.stats}</div>
          </div>

          <div class="card-content">
            <h3 class="feature-title">{feature.title}</h3>
            <p class="feature-description">{feature.description}</p>
            <div class="feature-highlight">
              <span class="highlight-dot"></span>
              {feature.highlight}
            </div>
          </div>

          <div class="card-overlay"></div>
          <div class="scan-line"></div>
        </div>
      {/each}
    </div>

    <!-- Call to Action -->
    <div class="cta-section" class:visible={$isVisible}>
      <div class="cta-content">
        <h3 class="cta-title">ready to stop dreaming and start building?</h3>
        <p class="cta-description">join the founders' circle. get early access to everything.</p>
        <button class="cta-button">
          <span class="button-text">claim your spot</span>
          <div class="button-glow"></div>
          <div class="button-particles">
            {#each Array(6) as _, i}
              <div class="particle" style="animation-delay: {i * 0.1}s"></div>
            {/each}
          </div>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .features-section {
    position: relative;
    padding: 8rem 0 10rem;
    background: #0A0B14;
    overflow: hidden;
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
  }

  /* Matrix Grid Background */
  .matrix-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    pointer-events: none;
  }

  .grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, #00FF88, transparent);
    animation: grid-pulse 3s ease-in-out infinite;
  }

  .grid-line.vertical {
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #00FF88, transparent);
  }

  .grid-line.horizontal {
    width: 100%;
    height: 1px;
  }

  @keyframes grid-pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.6; }
  }

  /* Floating Shapes */
  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .shape {
    position: absolute;
    border: 1px solid #00FF88;
    animation: float infinite ease-in-out;
    opacity: 0.3;
  }

  .shape-0 {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .shape-1 {
    width: 40px;
    height: 40px;
    transform: rotate(45deg);
  }

  .shape-2 {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 35px solid #00FF88;
    border-radius: 0;
    background: none;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-30px) rotate(180deg);
      opacity: 0.6;
    }
  }

  /* Section Header */
  .section-header {
    text-align: center;
    margin-bottom: 5rem;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out;
  }

  .section-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .glitch-text {
    font-family: 'Inter', sans-serif;
    font-size: 4rem;
    font-weight: 900;
    color: #FFFFFF;
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    animation: glitch 2s infinite;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-text::before {
    animation: glitch-1 0.5s infinite;
    color: #00FF88;
    z-index: -1;
  }

  .glitch-text::after {
    animation: glitch-2 0.5s infinite;
    color: #FF0088;
    z-index: -2;
  }

  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }

  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    10% { transform: translate(-2px, -2px); }
    20% { transform: translate(2px, 2px); }
  }

  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    30% { transform: translate(2px, -2px); }
    40% { transform: translate(-2px, 2px); }
  }

  .subtitle {
    font-size: 1.25rem;
    color: #8892B0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .highlight {
    color: #00FF88;
    font-weight: 600;
  }

  /* Features Grid */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 6rem;
  }

  .feature-card {
    position: relative;
    background: rgba(26, 27, 46, 0.5);
    border-radius: 12px;
    padding: 2rem;
    opacity: 0;
    transform: translateY(100px) rotateX(45deg);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
    cursor: pointer;
    overflow: hidden;
  }

  .feature-card.visible {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }

  .feature-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 255, 136, 0.2);
  }

  .card-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .feature-card:hover .card-background {
    opacity: 1;
  }

  .card-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #8892B0;
    border-radius: 12px;
    opacity: 0.3;
    transition: all 0.3s ease;
  }

  .feature-card:hover .card-border {
    border-color: #00FF88;
    opacity: 1;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .emoji-container {
    position: relative;
  }

  .emoji {
    font-size: 2.5rem;
    display: block;
    filter: drop-shadow(0 0 10px #00FF88);
    animation: emoji-float 3s ease-in-out infinite;
  }

  @keyframes emoji-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(5deg); }
  }

  .emoji-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.3), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: glow-pulse 2s ease-in-out infinite;
  }

  @keyframes glow-pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
  }

  .stats-badge {
    background: rgba(0, 255, 136, 0.1);
    color: #00FF88;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .card-content {
    position: relative;
    z-index: 2;
  }

  .feature-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: #FFFFFF;
    margin-bottom: 1rem;
    text-transform: lowercase;
  }

  .feature-description {
    font-size: 1rem;
    color: #8892B0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .feature-highlight {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #00FF88;
    font-weight: 600;
    gap: 0.5rem;
  }

  .highlight-dot {
    width: 8px;
    height: 8px;
    background: #00FF88;
    border-radius: 50%;
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00FF88, transparent);
    transition: left 0.8s ease;
  }

  .feature-card:hover .scan-line {
    left: 100%;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease-out 0.5s;
  }

  .cta-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: #FFFFFF;
    margin-bottom: 1rem;
    text-transform: lowercase;
  }

  .cta-description {
    font-size: 1.125rem;
    color: #8892B0;
    margin-bottom: 2rem;
  }

  .cta-button {
    position: relative;
    background: #00FF88;
    color: #0A0B14;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: lowercase;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .cta-button:hover {
    background: #00CC6A;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 255, 136, 0.3);
  }

  .button-text {
    position: relative;
    z-index: 2;
  }

  .button-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  .cta-button:hover .button-glow {
    left: 100%;
  }

  .button-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #FFFFFF;
    border-radius: 50%;
    opacity: 0;
    animation: particle-burst 0.8s ease-out infinite;
  }

  .particle:nth-child(1) { top: -10px; left: 10%; }
  .particle:nth-child(2) { top: -10px; right: 10%; }
  .particle:nth-child(3) { bottom: -10px; left: 20%; }
  .particle:nth-child(4) { bottom: -10px; right: 20%; }
  .particle:nth-child(5) { top: 20%; left: -10px; }
  .particle:nth-child(6) { top: 20%; right: -10px; }

  @keyframes particle-burst {
    0% { opacity: 0; transform: scale(0) translate(0, 0); }
    50% { opacity: 1; transform: scale(1) translate(0, 0); }
    100% { opacity: 0; transform: scale(0) translate(20px, -20px); }
  }

  .cta-button:hover .particle {
    animation-play-state: running;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .features-section {
      padding: 4rem 0 6rem;
    }

    .glitch-text {
      font-size: 2.5rem;
    }

    .features-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .feature-card {
      padding: 1.5rem;
    }

    .cta-title {
      font-size: 2rem;
    }

    .container {
      padding: 0 1rem;
    }
  }
</style>