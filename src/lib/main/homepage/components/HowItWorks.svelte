<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  let sectionVisible = false;
  let timelineSection: HTMLElement;
  let currentStep = 0;
  let isAutoPlaying = true;
  let matrixCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  
  // Enhanced steps with more rebellious, direct messaging
  const steps = [
    {
      number: '01',
      title: 'LAUNCH SCHOOL',
      subtitle: 'no more excuses. start now.',
      description: 'forget everything you know about "business education"\nwe teach you to build, not bullshit\nvalidate your idea with real customers\nlaunch your mvp in weeks, not years',
      outcome: 'graduate with revenue, not just a plan',
      icon: '🚀',
      color: '#00FF88',
      hackEffect: 'INITIATING_BUILDER_MODE...',
      glitchText: 'STUDENT > FOUNDER'
    },
    {
      number: '02', 
      title: 'THE FORGE',
      subtitle: 'where legends are made',
      description: 'intense 12-week accelerator for the fearless\n1:1 mentorship with unicorn founders\nweekly investor pitches\nbuild your team, raise your first round',
      outcome: 'emerge as a funded founder',
      icon: '⚡',
      color: '#FF0080',
      hackEffect: 'ACCELERATING_GROWTH...',
      glitchText: 'IDEA > STARTUP'
    },
    {
      number: '03',
      title: 'BUILDWEEKS',
      subtitle: 'rapid fire execution',
      description: 'ship products at lightspeed\n48-hour build challenges\ncompete with the best teenage builders\nwin funding, mentorship, and clout',
      outcome: 'master the art of shipping fast',
      icon: '⚡',
      color: '#00CCFF',
      hackEffect: 'COMPILING_DREAMS...',
      glitchText: 'BUILDER > LEGEND'
    },
    {
      number: '04',
      title: 'DEMO NIGHT',
      subtitle: 'pitch or die',
      description: 'monthly showcases to real vcs\nno participation trophies here\nget roasted, get better, get funded\nlive-streamed to 10k+ entrepreneurs',
      outcome: 'earn respect from the ecosystem',
      icon: '🎯',
      color: '#FFD700',
      hackEffect: 'BROADCASTING_GENIUS...',
      glitchText: 'PITCH > LEGEND'
    }
  ];

  // Matrix rain effect
  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
  let drops: number[] = [];

  onMount(() => {
    if (!browser) return;
    
    // Matrix effect setup
    if (matrixCanvas) {
      ctx = matrixCanvas.getContext('2d')!;
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      
      const columns = Math.floor(matrixCanvas.width / 20);
      drops = Array(columns).fill(0);
      
      setInterval(drawMatrix, 50);
    }

    // Intersection observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
            startAutoPlay();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (timelineSection) {
      observer.observe(timelineSection);
    }
    
    return () => observer.disconnect();
  });

  function drawMatrix() {
    if (!ctx) return;
    
    ctx.fillStyle = 'rgba(10, 11, 20, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = '#00FF88';
    ctx.font = '15px monospace';
    
    drops.forEach((y, x) => {
      const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      ctx.fillText(text, x * 20, y * 20);
      
      if (y * 20 > matrixCanvas.height && Math.random() > 0.975) {
        drops[x] = 0;
      }
      drops[x]++;
    });
  }

  function startAutoPlay() {
    const interval = setInterval(() => {
      if (!isAutoPlaying) {
        clearInterval(interval);
        return;
      }
      currentStep = (currentStep + 1) % steps.length;
    }, 3000);
  }

  function selectStep(index: number) {
    currentStep = index;
    isAutoPlaying = false;
  }
</script>

<section class="cyberpunk-timeline" bind:this={timelineSection}>
  <!-- Matrix Background -->
  <canvas class="matrix-bg" bind:this={matrixCanvas}></canvas>
  
  <!-- Grid Overlay -->
  <div class="grid-overlay"></div>
  
  <div class="container">
    <div class="content" class:visible={sectionVisible}>
      <!-- Hero Hook -->
      <div class="hero-hook">
        <div class="glitch-container">
          <h2 class="section-title font-black glitch" data-text="THE SYSTEM IS BROKEN">
            THE SYSTEM IS BROKEN
          </h2>
        </div>
        <p class="hook-subtitle">
          schools teach you to follow rules.<br/>
          we teach you to <span class="highlight">break them.</span>
        </p>
        <div class="system-status">
          <div class="status-line">
            <span class="status-label">TRADITIONAL_EDUCATION:</span>
            <span class="status-error">FAILED</span>
          </div>
          <div class="status-line">
            <span class="status-label">THETEENSPRENEUR:</span>
            <span class="status-success">ONLINE</span>
          </div>
        </div>
      </div>

      <!-- Interactive Timeline -->
      <div class="cyber-timeline">
        <div class="timeline-nav">
          {#each steps as step, index}
            <button 
              class="nav-step"
              class:active={currentStep === index}
              on:click={() => selectStep(index)}
            >
              <div class="nav-number">{step.number}</div>
              <div class="nav-indicator"></div>
            </button>
          {/each}
        </div>

        <div class="timeline-content">
          {#each steps as step, index}
            <div 
              class="step-card"
              class:active={currentStep === index}
              style="--step-color: {step.color}"
            >
              <!-- Holographic Header -->
              <div class="holo-header">
                <div class="step-icon">{step.icon}</div>
                <div class="hack-effect">{step.hackEffect}</div>
              </div>

              <!-- Main Content -->
              <div class="step-main">
                <h3 class="step-title">
                  {step.title}
                  <span class="glitch-accent" data-text={step.glitchText}>
                    {step.glitchText}
                  </span>
                </h3>
                <p class="step-subtitle">{step.subtitle}</p>
                
                <div class="step-description">
                  {#each step.description.split('\n') as line}
                    <div class="description-line">
                      <span class="line-prefix">></span>
                      <span>{line}</span>
                    </div>
                  {/each}
                </div>

                <div class="outcome-box">
                  <div class="outcome-label">EXPECTED_OUTPUT:</div>
                  <div class="outcome-text">{step.outcome}</div>
                </div>
              </div>

              <!-- Cyber Elements -->
              <div class="cyber-decorations">
                <div class="scan-line"></div>
                <div class="corner-brackets"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-terminal">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span></span><span></span><span></span>
          </div>
          <div class="terminal-title">root@teenspreneur:~$</div>
        </div>
        <div class="terminal-content">
          <div class="terminal-line">
            <span class="prompt">user@reality:~$</span>
            <span class="command">join --exclusive --waitlist</span>
          </div>
          <div class="terminal-output">
            this isn't a program. it's a revolution.<br/>
            and we're recruiting the next generation of builders.
          </div>
          <div class="terminal-action">
            <button class="hack-button">
              <span class="button-text">INITIATE SEQUENCE</span>
              <span class="button-glitch">HACK THE SYSTEM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .cyberpunk-timeline {
    position: relative;
    background: #0A0B14;
    min-height: 100vh;
    padding: 6rem 0;
    overflow: hidden;
    color: #FFFFFF;
  }

  .matrix-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    z-index: 0;
  }

  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: 1;
    animation: gridPulse 4s ease-in-out infinite;
  }

  @keyframes gridPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.1; }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
  }

  .content {
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease-out;
  }

  .content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Hero Hook Styles */
  .hero-hook {
    text-align: center;
    margin-bottom: 6rem;
  }

  .glitch-container {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .glitch {
    position: relative;
    animation: glitch 2s infinite;
  }

  .glitch:before,
  .glitch:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch:before {
    animation: glitch-1 0.5s infinite;
    color: #00FF88;
    z-index: -1;
  }

  .glitch:after {
    animation: glitch-2 0.5s infinite;
    color: #FF0080;
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
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
  }

  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(2px, -2px); }
    40% { transform: translate(2px, 2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(-2px, 2px); }
  }

  .hook-subtitle {
    font-size: 1.5rem;
    color: #8892B0;
    margin-bottom: 2rem;
    line-height: 1.4;
  }

  .highlight {
    color: #00FF88;
    font-weight: 800;
  }

  .system-status {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.1rem;
    background: rgba(26, 27, 46, 0.8);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #00FF88;
    max-width: 400px;
    margin: 0 auto;
  }

  .status-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .status-line:last-child {
    margin-bottom: 0;
  }

  .status-error {
    color: #FF4757;
    font-weight: bold;
  }

  .status-success {
    color: #00FF88;
    font-weight: bold;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Timeline Styles */
  .cyber-timeline {
    margin-bottom: 6rem;
  }

  .timeline-nav {
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    gap: 2rem;
  }

  .nav-step {
    background: transparent;
    border: 2px solid #2D2E3F;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .nav-step.active {
    border-color: #00FF88;
    background: linear-gradient(135deg, #00FF88, #00CC6A);
    transform: scale(1.1);
  }

  .nav-step.active .nav-number {
    color: #0A0B14;
  }

  .nav-number {
    font-weight: 900;
    font-size: 1.2rem;
    color: #FFFFFF;
    z-index: 2;
  }

  .nav-indicator {
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #00FF88;
    transition: width 0.3s ease;
  }

  .nav-step.active .nav-indicator {
    width: 100%;
  }

  .timeline-content {
    position: relative;
    min-height: 600px;
  }

  .step-card {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(26, 27, 46, 0.9), rgba(45, 46, 63, 0.9));
    border-radius: 16px;
    border: 1px solid var(--step-color);
    padding: 3rem;
    opacity: 0;
    transform: translateX(100px) rotateY(15deg);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(10px);
  }

  .step-card.active {
    opacity: 1;
    transform: translateX(0) rotateY(0);
  }

  .holo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--step-color);
  }

  .step-icon {
    font-size: 3rem;
    filter: drop-shadow(0 0 20px var(--step-color));
  }

  .hack-effect {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    color: var(--step-color);
    animation: typing 2s steps(20) infinite;
    overflow: hidden;
    white-space: nowrap;
  }

  @keyframes typing {
    0%, 50% { width: 100%; }
    51%, 100% { width: 0; }
  }

  .step-main {
    position: relative;
  }

  .step-title {
    font-size: 2.2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
    color: var(--step-color);
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .glitch-accent {
    position: relative;
    font-size: 1rem;
    padding: 0.3rem 0.8rem;
    background: rgba(0, 255, 136, 0.1);
    border-radius: 4px;
    border: 1px solid var(--step-color);
    animation: glitchAccent 3s infinite;
  }

  @keyframes glitchAccent {
    0%, 95% { transform: translate(0); }
    96% { transform: translate(1px, -1px); }
    97% { transform: translate(-1px, 1px); }
    98% { transform: translate(1px, 1px); }
    99% { transform: translate(-1px, -1px); }
  }

  .step-subtitle {
    color: #8892B0;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    font-style: italic;
  }

  .step-description {
    margin-bottom: 2rem;
  }

  .description-line {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .line-prefix {
    color: var(--step-color);
    margin-right: 1rem;
    font-weight: bold;
    font-family: 'JetBrains Mono', monospace;
    flex-shrink: 0;
  }

  .outcome-box {
    background: rgba(0, 255, 136, 0.05);
    border: 1px solid var(--step-color);
    border-radius: 8px;
    padding: 1.5rem;
    font-family: 'JetBrains Mono', monospace;
  }

  .outcome-label {
    color: var(--step-color);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .outcome-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #FFFFFF;
  }

  /* Cyber Decorations */
  .cyber-decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--step-color), transparent);
    animation: scanLine 3s ease-in-out infinite;
  }

  @keyframes scanLine {
    0%, 100% { transform: translateY(0); opacity: 0; }
    50% { transform: translateY(400px); opacity: 1; }
  }

  .corner-brackets::before,
  .corner-brackets::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid var(--step-color);
  }

  .corner-brackets::before {
    top: 1rem;
    left: 1rem;
    border-right: none;
    border-bottom: none;
  }

  .corner-brackets::after {
    bottom: 1rem;
    right: 1rem;
    border-left: none;
    border-top: none;
  }

  /* Terminal CTA */
  .cta-terminal {
    background: #0A0B14;
    border: 1px solid #00FF88;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'JetBrains Mono', monospace;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
  }

  .terminal-header {
    background: linear-gradient(135deg, #1A1B2E, #2D2E3F);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .terminal-dots {
    display: flex;
    gap: 0.5rem;
  }

  .terminal-dots span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #FF4757;
  }

  .terminal-dots span:nth-child(2) {
    background: #FFD700;
  }

  .terminal-dots span:nth-child(3) {
    background: #00FF88;
  }

  .terminal-title {
    color: #00FF88;
    font-weight: 600;
  }

  .terminal-content {
    padding: 2rem;
  }

  .terminal-line {
    margin-bottom: 1rem;
  }

  .prompt {
    color: #00FF88;
    margin-right: 0.5rem;
  }

  .command {
    color: #FFFFFF;
    font-weight: 600;
  }

  .terminal-output {
    color: #8892B0;
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .terminal-action {
    text-align: center;
  }

  .hack-button {
    position: relative;
    background: linear-gradient(135deg, #00FF88, #00CC6A);
    color: #0A0B14;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .hack-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 255, 136, 0.4);
  }

  .button-text {
    position: relative;
    z-index: 2;
    transition: opacity 0.3s ease;
  }

  .button-glitch {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  .hack-button:hover .button-text {
    opacity: 0;
  }

  .hack-button:hover .button-glitch {
    opacity: 1;
    animation: buttonGlitch 0.5s ease-in-out;
  }

  @keyframes buttonGlitch {
    0%, 100% { transform: translate(-50%, -50%); }
    25% { transform: translate(-51%, -49%); }
    50% { transform: translate(-49%, -51%); }
    75% { transform: translate(-51%, -51%); }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .cyberpunk-timeline {
      padding: 4rem 0;
    }

    .container {
      padding: 0 1rem;
    }

    .section-title {
      font-size: 2rem;
    }

    .hook-subtitle {
      font-size: 1.2rem;
    }

    .timeline-nav {
      gap: 1rem;
    }

    .nav-step {
      width: 3rem;
      height: 3rem;
    }

    .step-card {
      padding: 2rem;
    }

    .step-title {
      font-size: 1.8rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .terminal-content {
      padding: 1.5rem;
    }

    .hack-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .hero-hook {
      margin-bottom: 4rem;
    }

    .system-status {
      font-size: 0.9rem;
      padding: 1rem;
    }

    .step-card {
      padding: 1.5rem;
    }

    .step-icon {
      font-size: 2rem;
    }

    .hack-effect {
      font-size: 0.8rem;
    }

    .description-line {
      font-size: 1rem;
    }
  }
</style>