<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let impactRef: HTMLElement;
  
  // Pre-launch impact metrics (building anticipation)
  const impactStats = [
    { value: "500+", label: "builders on waitlist", description: "ready to change the world" },
    { value: "50+", label: "mentors lined up", description: "industry legends waiting to guide" },
    { value: "12", label: "cities ready to launch", description: "global movement starting" },
    { value: "$2M+", label: "funding secured", description: "to build the impossible" }
  ];
  
  const visionPoints = [
    "where 16-year-olds build billion-dollar companies",
    "where age becomes irrelevant, execution becomes everything",
    "where teenage dreams meet real-world execution",
    "where the next generation doesn't wait for permission"
  ];
  
  onMount(() => {
    mounted = true;
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (impactRef) {
      const elements = impactRef.querySelectorAll('.observe');
      elements.forEach((el) => observer.observe(el));
    }
    
    return () => observer.disconnect();
  });
</script>

<section class="impact-section" bind:this={impactRef}>
  <!-- Matrix-style background grid -->
  <div class="matrix-bg">
    <div class="grid-overlay"></div>
    <div class="digital-particles"></div>
  </div>
  
  <div class="container">
    <!-- Hero Hook - Rewritten with more edge -->
    <div class="impact-hero observe">
      <div class="glitch-wrapper">
        <h1 class="main-title">
          <span class="glitch" data-text="the revolution">the revolution</span>
          <span class="subtitle">is loading...</span>
        </h1>
      </div>
      
      <div class="hook-text">
        <p class="primary-hook">
          we're not live yet. but the <span class="highlight">energy is insane.</span>
        </p>
        <p class="secondary-hook">
          500+ teenagers refuse to wait. mentors are fighting to join. 
          investors are throwing money at us. <span class="emphasis">this is what momentum looks like.</span>
        </p>
      </div>
    </div>

    <!-- Pre-Launch Stats Grid -->
    <div class="stats-container observe">
      <div class="section-label">
        <span class="cyber-bracket">[</span>
        pre-launch metrics
        <span class="cyber-bracket">]</span>
      </div>
      
      <div class="stats-grid">
        {#each impactStats as stat, i}
          <div class="stat-card observe" style="--delay: {i * 0.1}s">
            <div class="stat-inner">
              <div class="stat-value">
                <span class="number">{stat.value}</span>
                <div class="cyber-line"></div>
              </div>
              <div class="stat-label">{stat.label}</div>
              <div class="stat-description">{stat.description}</div>
            </div>
            <div class="card-glow"></div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Vision Grid -->
    <div class="vision-section observe">
      <div class="vision-header">
        <h2 class="vision-title">we're building a world</h2>
      </div>
      
      <div class="vision-grid">
        {#each visionPoints as point, i}
          <div class="vision-card observe" style="--delay: {i * 0.15}s">
            <div class="vision-number">0{i + 1}</div>
            <div class="vision-text">{point}</div>
            <div class="vision-line"></div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section observe">
      <div class="cta-content">
        <p class="cta-text">
          this isn't a program. it's a <span class="highlight">movement.</span><br>
          and it's starting with or without you.
        </p>
        <button class="cyber-button">
          <span class="button-text">join the revolution</span>
          <div class="button-glow"></div>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .impact-section {
    position: relative;
    min-height: 100vh;
    background: #0A0B14;
    color: #FFFFFF;
    overflow: hidden;
    padding: 4rem 0;
  }
  
  .matrix-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-move 20s linear infinite;
  }
  
  .digital-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(0, 255, 136, 0.05) 0%, transparent 50%);
    animation: particles-float 15s ease-in-out infinite;
  }
  
  .container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    z-index: 2;
  }
  
  /* Impact Hero */
  .impact-hero {
    text-align: center;
    margin-bottom: 6rem;
  }
  
  .glitch-wrapper {
    margin-bottom: 2rem;
  }
  
  .main-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    line-height: 0.9;
    margin: 0;
  }
  
  .glitch {
    position: relative;
    display: inline-block;
    color: #00FF88;
    animation: glitch 2s infinite;
  }
  
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch::before {
    animation: glitch-1 0.5s infinite;
    color: #ff0040;
    z-index: -1;
  }
  
  .glitch::after {
    animation: glitch-2 0.5s infinite;
    color: #0080ff;
    z-index: -2;
  }
  
  .subtitle {
    display: block;
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 400;
    color: #8892B0;
    margin-top: 0.5rem;
    animation: typing 3s steps(14) infinite;
  }
  
  .hook-text {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .primary-hook {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  .secondary-hook {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    color: #8892B0;
    line-height: 1.4;
    font-weight: 400;
  }
  
  .highlight {
    color: #00FF88;
    font-weight: 800;
  }
  
  .emphasis {
    color: #FFFFFF;
    font-weight: 600;
  }
  
  /* Stats Container */
  .stats-container {
    margin-bottom: 6rem;
  }
  
  .section-label {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 600;
    color: #8892B0;
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .cyber-bracket {
    color: #00FF88;
    font-weight: 900;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .stat-card {
    position: relative;
    background: rgba(26, 27, 46, 0.5);
    border: 1px solid rgba(136, 146, 176, 0.2);
    border-radius: 8px;
    padding: 2rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .stat-card:hover {
    transform: translateY(-10px);
    border-color: #00FF88;
  }
  
  .stat-card:hover .card-glow {
    opacity: 1;
  }
  
  .card-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #00FF88, transparent, #00FF88);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .stat-inner {
    position: relative;
    z-index: 2;
  }
  
  .stat-value {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .number {
    font-size: 3rem;
    font-weight: 900;
    color: #00FF88;
    margin-right: 1rem;
  }
  
  .cyber-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #00FF88, transparent);
  }
  
  .stat-label {
    font-size: 1.2rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 0.5rem;
  }
  
  .stat-description {
    font-size: 0.9rem;
    color: #8892B0;
    font-style: italic;
  }
  
  /* Vision Section */
  .vision-section {
    margin-bottom: 6rem;
  }
  
  .vision-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .vision-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    color: #FFFFFF;
    margin: 0;
  }
  
  .vision-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .vision-card {
    position: relative;
    padding: 2rem;
    border-left: 3px solid #00FF88;
    background: rgba(45, 46, 63, 0.3);
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
  }
  
  .vision-card:hover {
    background: rgba(45, 46, 63, 0.5);
    transform: translateX(10px);
  }
  
  .vision-number {
    font-size: 1rem;
    font-weight: 900;
    color: #00FF88;
    margin-bottom: 1rem;
    opacity: 0.7;
  }
  
  .vision-text {
    font-size: 1.3rem;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 1.3;
  }
  
  .vision-line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #00FF88;
    transition: width 0.5s ease;
  }
  
  .vision-card:hover .vision-line {
    width: 100%;
  }
  
  /* CTA Section */
  .cta-section {
    text-align: center;
  }
  
  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-text {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 3rem;
  }
  
  .cyber-button {
    position: relative;
    background: transparent;
    border: 2px solid #00FF88;
    color: #00FF88;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
  }
  
  .cyber-button:hover {
    background: #00FF88;
    color: #0A0B14;
    transform: translateY(-3px);
  }
  
  .cyber-button:hover .button-glow {
    opacity: 1;
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
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
    opacity: 0;
  }
  
  /* Animations */
  @keyframes grid-move {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, 50px); }
  }
  
  @keyframes particles-float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
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
    10% { transform: translate(-2px, -1px); }
    20% { transform: translate(2px, 1px); }
  }
  
  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    10% { transform: translate(1px, 2px); }
    20% { transform: translate(-1px, -2px); }
  }
  
  @keyframes typing {
    0%, 90%, 100% { width: 100%; }
    50% { width: 0; }
  }
  
  /* Scroll Animations */
  .observe {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition-delay: var(--delay, 0s);
  }
  
  .observe.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .impact-section {
      padding: 2rem 0;
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .vision-grid {
      grid-template-columns: 1fr;
    }
    
    .stat-card {
      padding: 1.5rem;
    }
    
    .cyber-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
    }
  }
</style>