<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionVisible = false;
  let programsSection: HTMLElement;
  let matrixContainer: HTMLElement;
  let selectedProgram: number | null = null;
  let glitchText = '';
  let glitchInterval: any;
  let showGrid = false;
  
  const programs = [
    {
      icon: '⚡',
      code: 'LAUNCH_001',
      name: 'NEURAL LAUNCH PROTOCOL',
      tagline: 'initialize.startup.exe',
      duration: '6-week mind hack',
      description: 'turn that crazy idea rattling in your head into something real',
      glitchDescription: 'ṫṳŕṅ ṫḧäṫ ċŕäżẏ ïḋëä ŕäṫṫḷïṅġ ïṅ ẏöṳŕ ḧëäḋ ïṅṫö ṡöṁëṫḧïṅġ ŕëäḷ',
      details: [
        'learn from founders who started before they could vote',
        'with the theory, build the thing',
        'validation frameworks that actually work'
      ],
      matrix: 'ACCESSING_NEURAL_PATHWAYS...',
      color: '#00FF88'
    },
    {
      icon: '🔥',
      code: 'FORGE_002',
      name: 'THE DIGITAL FORGE',
      tagline: 'compile.dreams.run()',
      duration: '3-month acceleration',
      description: '$5k grants + industry connections that matter',
      glitchDescription: '$5ḳ ġŕäṅṫṡ + ïṅḋṳṡṫŕẏ ċöṅṅëċṫïöṅṡ ṫḧäṫ ṁäṫṫëŕ',
      details: [
        'weekly calls with legends who built empires',
        'the y combinator energy, zero corporate bullshit',
        'fast-track to real funding conversations'
      ],
      matrix: 'COMPILING_SUCCESS_PROTOCOLS...',
      color: '#FF6B35'
    },
    {
      icon: '⚡',
      code: 'BUILD_003',
      name: 'BUILDWEEK MATRIX',
      tagline: 'while(ideas) { build(); }',
      duration: '48-hour reality shifts',
      description: 'from concept to clickable prototype in one weekend',
      glitchDescription: 'ḟŕöṁ ċöṅċëṗṫ ṫö ċḷïċḳäḅḷë ṗŕöṫöṫẏṗë ïṅ öṅë ẅëëḳëṅḋ',
      details: [
        'solo builders and dream team formations',
        'corporate challenges with prize pools that matter',
        'where overnight success actually happens overnight'
      ],
      matrix: 'INITIALIZING_RAPID_DEPLOYMENT...',
      color: '#9D4EDD'
    },
    {
      icon: '🤝',
      code: 'CONNECT_004',
      name: 'CO-FOUNDER ALGORITHM',
      tagline: 'match.compatibility.execute',
      duration: 'continuous matching',
      description: 'find your startup soulmate through advanced compatibility algorithms',
      glitchDescription: 'ḟïṅḋ ẏöṳŕ ṡṫäŕṫṳṗ ṡöṳḷṁäṫë ṫḧŕöṳġḧ äḋṿäṅċëḋ ċöṁṗäṫïḅïḷïṫẏ äḷġöŕïṫḧṁṡ',
      details: [
        'personality + skill matrix matching',
        'virtual collaboration spaces built for gen z',
        'because solo founders statistically fail more'
      ],
      matrix: 'SCANNING_COMPATIBLE_MINDS...',
      color: '#06FFA5'
    },
    {
      icon: '💰',
      code: 'FUND_005',
      name: 'TEEN VENTURES PROTOCOL',
      tagline: 'if(potential) invest();',
      duration: 'funding cycles',
      description: 'micro-investments in macro potential - we bet on teenagers',
      glitchDescription: 'ṁïċŕö-ïṅṿëṡṫṁëṅṫṡ ïṅ ṁäċŕö ṗöṫëṅṫïäḷ - ẅë ḅëṫ öṅ ṫëëṅäġëŕṡ',
      details: [
        '$1K to $25K seed rounds',
        'equity partnerships with promising startups',
        'funding when traditional VCs say "come back when you graduate"'
      ],
      matrix: 'EVALUATING_INVESTMENT_POTENTIAL...',
      color: '#FFD60A'
    },
    {
      icon: '👑',
      code: 'ELITE_006',
      name: 'HUSTLE FELLOWSHIP',
      tagline: 'access.granted.elite_mode',
      duration: 'invite-only residencies',
      description: 'domain-specific mastery tracks for the chosen few',
      glitchDescription: 'ḋöṁäïṅ-ṡṗëċïḟïċ ṁäṡṫëŕẏ ṫŕäċḳṡ ḟöŕ ṫḧë ċḧöṡëṅ ḟëẅ',
      details: [
        'real-world industry partnerships that open doors',
        'harvard business school energy, zero ivy league gatekeeping',
        'become the expert while your peers study theory'
      ],
      matrix: 'GRANTING_ELITE_ACCESS...',
      color: '#E63946'
    }
  ];

  const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
            showGrid = true;
            startMatrixRain();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (programsSection) {
      observer.observe(programsSection);
    }
    
    return () => {
      observer.disconnect();
      if (glitchInterval) clearInterval(glitchInterval);
    };
  });

  function startMatrixRain() {
    if (!matrixContainer) return;
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        createMatrixDrop();
      }, i * 100);
    }
  }

  function createMatrixDrop() {
    if (!matrixContainer) return;
    
    const drop = document.createElement('div');
    drop.className = 'matrix-drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    let chars = '';
    for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) {
      chars += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
    }
    drop.innerHTML = chars;
    
    matrixContainer.appendChild(drop);
    
    setTimeout(() => {
      if (drop.parentNode) {
        drop.parentNode.removeChild(drop);
      }
    }, 5000);
  }

  function handleProgramHover(index: number) {
    selectedProgram = index;
    startGlitch(programs[index].glitchDescription);
  }

  function handleProgramLeave() {
    selectedProgram = null;
    stopGlitch();
  }

  function startGlitch(text: string) {
    let iteration = 0;
    const originalText = text;
    
    if (glitchInterval) clearInterval(glitchInterval);
    
    glitchInterval = setInterval(() => {
      glitchText = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return matrixChars[Math.floor(Math.random() * matrixChars.length)];
        })
        .join('');
      
      if (iteration >= originalText.length) {
        clearInterval(glitchInterval);
        glitchText = originalText;
      }
      
      iteration += 1 / 3;
    }, 50);
  }

  function stopGlitch() {
    if (glitchInterval) {
      clearInterval(glitchInterval);
      glitchText = '';
    }
  }
</script>

<section class="programs-matrix" bind:this={programsSection}>
  <!-- Animated Grid Background -->
  <div class="grid-container">
    <div class="grid-background" class:show-grid={showGrid}>
      {#each Array(20) as _, i}
        <div class="grid-line horizontal" style="top: {i * 5}%; animation-delay: {i * 0.1}s;"></div>
      {/each}
      {#each Array(20) as _, i}
        <div class="grid-line vertical" style="left: {i * 5}%; animation-delay: {i * 0.1}s;"></div>
      {/each}
    </div>
    
    <!-- Floating Digital Elements -->
    <div class="digital-elements">
      <div class="floating-cube cube-1"></div>
      <div class="floating-cube cube-2"></div>
      <div class="floating-cube cube-3"></div>
      
      <!-- Holographic Rings -->
      <div class="holo-ring ring-1"></div>
      <div class="holo-ring ring-2"></div>
    </div>
  </div>
  
  <div class="matrix-bg" bind:this={matrixContainer}></div>
  
  <div class="scan-lines"></div>
  
  <div class="container">
    <div class="programs-content" class:visible={sectionVisible}>
      
      <!-- Terminal Header -->
      <div class="terminal-header">
        <div class="terminal-controls">
          <span class="control red"></span>
          <span class="control yellow"></span>
          <span class="control green"></span>
        </div>
        <div class="terminal-title">TEENSPRENEUR_SYSTEM_v2.1.0</div>
      </div>

      <!-- Glitch Title -->
      <div class="glitch-container">
        <h2 class="glitch-title" data-text="THE COMPLETE NEURAL ECOSYSTEM">
          THE COMPLETE NEURAL ECOSYSTEM
        </h2>
        <p class="system-status">
          > STATUS: ONLINE | USERS: 2,847 ACTIVE BUILDERS | UPTIME: 99.9%
        </p>
      </div>

      <!-- Programs Grid -->
      <div class="programs-grid">
        {#each programs as program, index}
          <div 
            class="program-card" 
            style="animation-delay: {index * 0.15}s"
            class:visible={sectionVisible}
            class:selected={selectedProgram === index}
            on:mouseenter={() => handleProgramHover(index)}
            on:mouseleave={handleProgramLeave}
            role="button"
            tabindex="0"
            on:keydown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProgramHover(index);
              }
            }}
            on:blur={handleProgramLeave}
          >
            <div class="card-header">
              <span class="program-code">{program.code}</span>
              <span class="program-icon">{program.icon}</span>
            </div>
            
            <div class="program-title">
              <h3 class="program-name">{program.name}</h3>
              <code class="program-tagline">{program.tagline}</code>
            </div>
            
            <div class="program-duration">[{program.duration}]</div>
            
            <div class="program-description">
              {#if selectedProgram === index && glitchText}
                <p class="glitch-text">{@html glitchText}</p>
              {:else}
                <p>{program.description}</p>
              {/if}
            </div>
            
            <div class="program-matrix-status">
              <span class="status-text">{program.matrix}</span>
              <div class="loading-bar">
                <div class="loading-progress" style="background-color: {program.color}"></div>
              </div>
            </div>
            
            <ul class="program-details">
              {#each program.details as detail, i}
                <li style="animation-delay: {(index * 0.1) + (i * 0.05)}s">
                  <span class="detail-prefix">></span> {detail}
                </li>
              {/each}
            </ul>
            
            <div class="card-overlay" style="background: linear-gradient(135deg, {program.color}20, transparent)"></div>
            <div class="wireframe-overlay"></div>
          </div>
        {/each}
      </div>
      
      <!-- CTA Terminal -->
      <div class="cta-terminal">
        <div class="terminal-window">
          <div class="terminal-header">
            <span>neural_interface.exe</span>
          </div>
          <div class="terminal-body">
            <p class="terminal-prompt">
              <span class="prompt-symbol">teenspreneur@matrix:~$</span> 
              <span class="typing-text">ready to jack into the ecosystem?</span>
            </p>
            <p class="terminal-response">
              > INITIALIZING CONNECTION...
              <br>> SCANNING FOR TEENAGE ENTREPRENEURS...
              <br>> MATCH FOUND: YOU
            </p>
            <button class="matrix-cta">
              <span class="cta-text">REQUEST ACCESS_TOKEN</span>
              <div class="cta-glitch"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .programs-matrix {
    min-height: 100vh;
    background: #0A0B14;
    position: relative;
    overflow: hidden;
    padding: 4rem 0;
  }

  .grid-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .grid-background {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease;
  }
  
  .grid-background.show-grid {
    opacity: 0.2;
  }
  
  .grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, #00FF88, transparent);
    opacity: 0;
    animation: gridPulse 4s ease-in-out infinite;
  }
  
  .grid-line:nth-child(3n) {
    background: linear-gradient(90deg, transparent, #FF6B35, transparent);
  }
  
  .grid-line:nth-child(5n) {
    background: linear-gradient(90deg, transparent, #9D4EDD, transparent);
  }
  
  .grid-line:nth-child(7n) {
    background: linear-gradient(90deg, transparent, #06FFA5, transparent);
  }
  
  .grid-line.horizontal {
    width: 100%;
    height: 1px;
  }
  
  .grid-line.vertical {
    height: 100%;
    width: 1px;
    background: linear-gradient(180deg, transparent, #00FF88, transparent);
  }
  
  .grid-line.vertical:nth-child(3n) {
    background: linear-gradient(180deg, transparent, #FF6B35, transparent);
  }
  
  .grid-line.vertical:nth-child(5n) {
    background: linear-gradient(180deg, transparent, #9D4EDD, transparent);
  }
  
  .grid-line.vertical:nth-child(7n) {
    background: linear-gradient(180deg, transparent, #06FFA5, transparent);
  }
  
  @keyframes gridPulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.4; }
  }
  
  .digital-elements {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .floating-cube {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 1px solid #00FF88;
    background: rgba(0, 255, 136, 0.05);
    transform-style: preserve-3d;
    animation: floatRotate 12s ease-in-out infinite;
  }
  
  .cube-1 {
    top: 15%;
    right: 20%;
    animation-delay: 0s;
  }
  
  .cube-2 {
    bottom: 25%;
    left: 15%;
    animation-delay: 4s;
  }
  
  .cube-3 {
    top: 70%;
    right: 35%;
    animation-delay: 8s;
  }
  
  .holo-ring {
    position: absolute;
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.05), transparent);
    animation: ringPulse 8s ease-in-out infinite;
  }
  
  .ring-1 {
    width: 150px;
    height: 150px;
    top: 20%;
    left: 25%;
    animation-delay: 0s;
  }
  
  .ring-2 {
    width: 100px;
    height: 100px;
    bottom: 30%;
    right: 25%;
    animation-delay: 4s;
  }
  
  @keyframes floatRotate {
    0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
    33% { transform: translateY(-15px) rotateX(45deg) rotateY(120deg); }
    66% { transform: translateY(-8px) rotateX(90deg) rotateY(240deg); }
  }
  
  @keyframes ringPulse {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
    50% { transform: scale(1.1) rotate(180deg); opacity: 0.4; }
  }

  .matrix-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  }

  :global(.matrix-drop) {
    position: absolute;
    color: #00FF88;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.2;
    animation: matrix-fall linear infinite;
    opacity: 0.6;
    text-shadow: 0 0 5px #00FF88;
  }

  @keyframes matrix-fall {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }

  .scan-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(0, 255, 136, 0.03) 2%,
      rgba(0, 255, 136, 0.03) 3%,
      transparent 3%,
      transparent 36%,
      rgba(0, 255, 136, 0.03) 40%,
      rgba(0, 255, 136, 0.03) 41%,
      transparent 43%,
      transparent 76%,
      rgba(0, 255, 136, 0.03) 77%,
      rgba(0, 255, 136, 0.03) 78%,
      transparent 80%
    );
    background-size: 100% 5px;
    animation: scan-lines 0.1s linear infinite;
    pointer-events: none;
  }

  @keyframes scan-lines {
    0% { transform: translateY(0); }
    100% { transform: translateY(5px); }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
  }

  .programs-content {
    opacity: 0;
    transform: translateY(50px);
    transition: all 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .programs-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .terminal-header {
    display: flex;
    align-items: center;
    background: #1A1B2E;
    padding: 1rem;
    border-radius: 8px 8px 0 0;
    border: 1px solid #00FF88;
    margin-bottom: 2rem;
  }

  .terminal-controls {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .control.red { background: #FF5F56; }
  .control.yellow { background: #FFBD2E; }
  .control.green { background: #27CA3F; }

  .terminal-title {
    color: #00FF88;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .glitch-container {
    text-align: center;
    margin-bottom: 4rem;
  }

  .glitch-title {
    font-size: clamp(2rem, 4vw, 4rem);
    font-weight: 900;
    color: #FFFFFF;
    position: relative;
    display: inline-block;
    animation: glitch 2s infinite;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .glitch-title::before,
  .glitch-title::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-title::before {
    animation: glitch-1 0.5s infinite;
    color: #00FF88;
    z-index: -1;
  }

  .glitch-title::after {
    animation: glitch-2 0.5s infinite;
    color: #FF6B35;
    z-index: -2;
  }

  @keyframes glitch {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(-2px, -1px); }
    20% { transform: translate(2px, 1px); }
    30% { transform: translate(-2px, 1px); }
    40% { transform: translate(2px, -1px); }
    50% { transform: translate(-2px, -1px); }
    60% { transform: translate(2px, 1px); }
    70% { transform: translate(-2px, 1px); }
    80% { transform: translate(2px, -1px); }
  }

  @keyframes glitch-1 {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(2px, 1px); }
    20% { transform: translate(-2px, -1px); }
    30% { transform: translate(2px, 1px); }
    40% { transform: translate(-2px, -1px); }
    50% { transform: translate(2px, 1px); }
    60% { transform: translate(-2px, -1px); }
    70% { transform: translate(2px, 1px); }
    80% { transform: translate(-2px, -1px); }
  }

  @keyframes glitch-2 {
    0%, 90%, 100% { transform: translate(0); }
    10% { transform: translate(-1px, 2px); }
    20% { transform: translate(1px, -2px); }
    30% { transform: translate(-1px, 2px); }
    40% { transform: translate(1px, -2px); }
    50% { transform: translate(-1px, 2px); }
    60% { transform: translate(1px, -2px); }
    70% { transform: translate(-1px, 2px); }
    80% { transform: translate(1px, -2px); }
  }

  .system-status {
    color: #8892B0;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    margin-top: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .programs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .program-card {
    background: #1A1B2E;
    border: 1px solid #2D2E3F;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0;
    transform: translateY(30px) rotateX(10deg);
    overflow: hidden;
    cursor: pointer;
  }

  .program-card.visible {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }

  .program-card:hover,
  .program-card:focus {
    transform: translateY(-10px) rotateX(-2deg);
    border-color: #00FF88;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(0, 255, 136, 0.2);
    outline: none;
  }
  
  .program-card:focus-visible {
    outline: 2px solid #00FF88;
    outline-offset: 2px;
  }

  .program-card.selected {
    border-color: #00FF88;
    background: #1F2037;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .program-code {
    color: #00FF88;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    background: rgba(0, 255, 136, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #00FF88;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .program-icon {
    font-size: 2rem;
    filter: drop-shadow(0 0 10px currentColor);
  }

  .program-title {
    margin-bottom: 1rem;
  }

  .program-name {
    color: #FFFFFF;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .program-tagline {
    color: #8892B0;
    font-family: 'Courier New', monospace;
    font-size: 0.875rem;
    background: rgba(136, 146, 176, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    display: inline-block;
  }

  .program-duration {
    color: #00FF88;
    font-family: 'Courier New', monospace;
    font-weight: 600;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
  }

  .program-description {
    margin-bottom: 1.5rem;
    min-height: 50px;
  }

  .program-description p {
    color: #FFFFFF;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }

  .glitch-text {
    color: #00FF88 !important;
    font-family: 'Courier New', monospace !important;
    text-shadow: 0 0 5px #00FF88;
  }

  .program-matrix-status {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    border: 1px solid #2D2E3F;
  }

  .status-text {
    color: #8892B0;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  .loading-bar {
    width: 100%;
    height: 4px;
    background: #2D2E3F;
    border-radius: 2px;
    overflow: hidden;
  }

  .loading-progress {
    width: 100%;
    height: 100%;
    background: #00FF88;
    animation: loading 2s ease-in-out infinite;
  }

  @keyframes loading {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }

  .program-details {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .program-details li {
    color: #8892B0;
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.5;
    opacity: 0;
    animation: slide-in 0.6s ease-out forwards;
  }

  .program-details li .detail-prefix {
    position: absolute;
    left: 0;
    color: #00FF88;
    font-weight: bold;
    font-family: 'Courier New', monospace;
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .program-card:hover .card-overlay {
    opacity: 1;
  }

  .wireframe-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, transparent 49%, #00FF88 50%, transparent 51%),
      linear-gradient(0deg, transparent 49%, #00FF88 50%, transparent 51%);
    background-size: 20px 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .program-card:hover .wireframe-overlay {
    opacity: 0.1;
  }

  .cta-terminal {
    margin-top: 6rem;
  }

  .terminal-window {
    background: #0A0B14;
    border: 1px solid #00FF88;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
  }

  .terminal-window .terminal-header {
    background: #1A1B2E;
    padding: 1rem;
    border-bottom: 1px solid #00FF88;
    margin-bottom: 0;
  }

  .terminal-body {
    padding: 2rem;
  }

  .terminal-prompt {
    color: #00FF88;
    font-family: 'Courier New', monospace;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .prompt-symbol {
    color: #8892B0;
  }

  .typing-text {
    animation: typing 2s steps(30) infinite;
  }

  @keyframes typing {
    0%, 50% { border-right: 2px solid #00FF88; }
    51%, 100% { border-right: 2px solid transparent; }
  }

  .terminal-response {
    color: #8892B0;
    font-family: 'Courier New', monospace;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .matrix-cta {
    background: linear-gradient(135deg, #00FF88, #00CC6A);
    color: #0A0B14;
    border: none;
    padding: 1.25rem 3rem;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    display: block;
    margin: 0 auto;
  }

  .matrix-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
  }

  .cta-glitch {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  .matrix-cta:hover .cta-glitch {
    left: 100%;
  }

  .cta-text {
    position: relative;
    z-index: 1;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .programs-matrix {
      padding: 3rem 0;
    }
    
    .floating-cube {
      width: 30px;
      height: 30px;
    }
    
    .holo-ring {
      opacity: 0.5;
    }
    
    .ring-1 {
      width: 100px;
      height: 100px;
    }
    
    .ring-2 {
      width: 80px;
      height: 80px;
    }
    
    .grid-background.show-grid {
      opacity: 0.1;
    }
    
    .programs-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .program-card {
      padding: 1.5rem;
    }
    
    .glitch-title {
      font-size: 2.5rem;
      letter-spacing: 2px;
    }
    
    .system-status {
      font-size: 0.75rem;
    }
    
    .terminal-body {
      padding: 1.5rem;
    }
    
    .terminal-prompt {
      font-size: 1rem;
    }
    
    .matrix-cta {
      padding: 1rem 2rem;
      font-size: 1rem;
    }
    
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .program-code {
      align-self: flex-end;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
    }
    
    .program-card {
      padding: 1rem;
    }
    
    .program-name {
      font-size: 1.25rem;
    }
    
    .program-tagline {
      font-size: 0.75rem;
    }
    
    .glitch-title {
      font-size: 2rem;
      letter-spacing: 1px;
    }
    
    .terminal-window .terminal-header {
      padding: 0.75rem;
    }
    
    .terminal-body {
      padding: 1rem;
    }
    
    .matrix-cta {
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
    }
    
    .program-matrix-status {
      padding: 0.75rem;
    }
    
    .card-header {
      gap: 0.75rem;
    }
    
    .program-icon {
      font-size: 1.5rem;
    }
  }
  
  /* Enhanced animations for better performance */
  @media (prefers-reduced-motion: reduce) {
    .program-card,
    .glitch-title,
    .loading-progress,
    .typing-text,
    .cta-glitch,
    .grid-line,
    .floating-cube,
    .holo-ring {
      animation: none;
    }
    
    .program-card {
      transition: none;
    }
    
    .program-card:hover {
      transform: none;
    }
    
    .grid-background.show-grid {
      opacity: 0.1;
    }
    
    .floating-cube,
    .holo-ring {
      display: none;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .program-card {
      border-color: #FFFFFF;
    }
    
    .program-code {
      background: #000000;
      color: #FFFFFF;
      border-color: #FFFFFF;
    }
    
    .glitch-title {
      color: #FFFFFF;
    }
    
    .matrix-cta {
      background: #FFFFFF;
      color: #000000;
    }
  }
  
  /* Dark mode enhancements */
  @media (prefers-color-scheme: dark) {
    .programs-matrix {
      background: #000000;
    }
    
    .program-card {
      background: #111111;
      border-color: #333333;
    }
    
    .terminal-window {
      background: #000000;
      border-color: #00FF88;
    }
  }
</style>