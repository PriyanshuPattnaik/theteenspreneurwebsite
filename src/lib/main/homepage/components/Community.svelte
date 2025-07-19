<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionVisible = false;
  let communitySection: HTMLElement;
  let mouseX = 0;
  let mouseY = 0;
  let gridLines: HTMLElement[] = [];
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (communitySection) {
      observer.observe(communitySection);
    }
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 100;
      mouseY = (e.clientY / window.innerHeight) * 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  
  // Glitch text animation
  const glitchTexts = [
    "BUILDING THE MATRIX",
    "CODING REALITY", 
    "HACKING SUCCESS",
    "DISRUPTING EVERYTHING"
  ];
  
  let currentGlitch = 0;
  
  onMount(() => {
    const interval = setInterval(() => {
      currentGlitch = (currentGlitch + 1) % glitchTexts.length;
    }, 3000);
    
    return () => clearInterval(interval);
  });
</script>

<section class="cyber-community" bind:this={communitySection}>
  <!-- Animated Grid Background -->
  <div class="grid-container">
    <div class="grid-overlay"></div>
    <div class="grid-lines horizontal"></div>
    <div class="grid-lines vertical"></div>
  </div>
  
  <!-- Floating Particles -->
  <div class="particles">
    {#each Array(20) as _, i}
      <div class="particle" style="--delay: {i * 0.2}s; --x: {Math.random() * 100}%; --y: {Math.random() * 100}%"></div>
    {/each}
  </div>
  
  <div class="container">
    <div class="community-content" class:visible={sectionVisible}>
      
      <!-- Glitch Header -->
      <div class="glitch-header">
        <h2 class="main-title">
          <span class="glitch-text" data-text="ENTER THE NETWORK">ENTER THE NETWORK</span>
        </h2>
        <div class="subtitle-container">
          <span class="subtitle-static">where</span>
          <span class="subtitle-glitch">{glitchTexts[currentGlitch]}</span>
          <span class="subtitle-static">happens</span>
        </div>
      </div>
      
      <!-- Cyber Stats Display -->
      <div class="cyber-stats">
        <div class="stat-terminal">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-title">NETWORK_STATUS.exe</span>
          </div>
          <div class="terminal-content">
            <div class="stat-line">
              <span class="stat-label">ACTIVE_BUILDERS:</span>
              <span class="stat-value">∞</span>
            </div>
            <div class="stat-line">
              <span class="stat-label">UNICORNS_CREATED:</span>
              <span class="stat-value counting">47</span>
            </div>
            <div class="stat-line">
              <span class="stat-label">VENTURE_FUNDING:</span>
              <span class="stat-value">$420M</span>
            </div>
            <div class="stat-line">
              <span class="stat-label">SLEEP_HOURS:</span>
              <span class="stat-value">2.5/day</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 3D Cards Grid -->
      <div class="community-grid">
        <div class="community-card" data-tilt>
          <div class="card-glow"></div>
          <div class="card-header">
            <div class="card-icon">🔥</div>
            <h3 class="card-title">THE FORGE</h3>
          </div>
          <p class="card-description">
            24/7 discord channels where 15-year-olds are shipping faster than 
            billion-dollar corporations. real builders, real solutions.
          </p>
          <div class="card-footer">
            <span class="online-indicator"></span>
            <span class="online-text">1,247 online now</span>
          </div>
        </div>
        
        <div class="community-card" data-tilt>
          <div class="card-glow"></div>
          <div class="card-header">
            <div class="card-icon">⚡</div>
            <h3 class="card-title">DEMO MATRIX</h3>
          </div>
          <p class="card-description">
            monthly showcases where teenagers pitch to legends. your bedroom 
            project becomes tomorrow's unicorn. no cap.
          </p>
          <div class="card-footer">
            <span class="live-indicator"></span>
            <span class="live-text">NEXT: 3 days</span>
          </div>
        </div>
        
        <div class="community-card" data-tilt>
          <div class="card-glow"></div>
          <div class="card-header">
            <div class="card-icon">🎯</div>
            <h3 class="card-title">CO-FOUNDER MATCH</h3>
          </div>
          <p class="card-description">
            ai-powered matching system. find your technical co-founder, your 
            business genius, your design wizard. chemistry guaranteed.
          </p>
          <div class="card-footer">
            <span class="match-indicator"></span>
            <span class="match-text">73 matches today</span>
          </div>
        </div>
      </div>
      
      <!-- Matrix Code Rain Effect -->
      <div class="matrix-section">
        <div class="matrix-rain">
          {#each Array(20) as _, i}
            <div class="matrix-column" style="--delay: {i * 0.1}s; left: {i * 5}%">
              {#each Array(20) as _, j}
                <span class="matrix-char">{Math.random() > 0.5 ? '1' : '0'}</span>
              {/each}
            </div>
          {/each}
        </div>
        
        <div class="matrix-content">
          <h3 class="matrix-title">THIS IS WHERE YOU FIND YOUR:</h3>
          <div class="connection-grid">
            <div class="connection-item">
              <span class="connection-icon">👥</span>
              <span class="connection-text">TRIBE</span>
              <div class="connection-line"></div>
            </div>
            <div class="connection-item">
              <span class="connection-icon">🚀</span>
              <span class="connection-text">CO-FOUNDER</span>
              <div class="connection-line"></div>
            </div>
            <div class="connection-item">
              <span class="connection-icon">💰</span>
              <span class="connection-text">FIRST CUSTOMERS</span>
              <div class="connection-line"></div>
            </div>
            <div class="connection-item">
              <span class="connection-icon">🏆</span>
              <span class="connection-text">BIGGEST FANS</span>
              <div class="connection-line"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Closing Statement with Hologram Effect -->
      <div class="hologram-statement">
        <div class="hologram-text">
          <p class="statement-line">because entrepreneurship is a team sport.</p>
          <p class="statement-highlight">and we're building the best team on earth.</p>
        </div>
        <div class="hologram-scanlines"></div>
      </div>
      
    </div>
  </div>
</section>

<style>
  /* CSS Variables */
  :root {
    --cyber-lime: #00ff88;
    --cyber-blue: #00ffff;
    --cyber-pink: #ff0080;
    --dark-bg: #0a0b14;
    --darker-bg: #050508;
    --card-bg: #1a1b2e;
    --text-primary: #ffffff;
    --text-secondary: #8892b0;
    --border-glow: rgba(0, 255, 136, 0.3);
  }
  
  .cyber-community {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 50%, #0f0f1a 100%);
    position: relative;
    overflow: hidden;
    padding: 8rem 0;
  }
  
  /* Animated Grid Background */
  .grid-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    pointer-events: none;
  }
  
  .grid-lines {
    position: absolute;
    background: linear-gradient(90deg, transparent 98%, var(--cyber-lime) 100%);
  }
  
  .grid-lines.horizontal {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 48px,
      var(--cyber-lime) 50px,
      var(--cyber-lime) 51px
    );
    animation: gridPulse 4s ease-in-out infinite;
  }
  
  .grid-lines.vertical {
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px,
      transparent 48px,
      var(--cyber-lime) 50px,
      var(--cyber-lime) 51px
    );
    animation: gridPulse 4s ease-in-out infinite reverse;
  }
  
  @keyframes gridPulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; }
  }
  
  /* Floating Particles */
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--cyber-lime);
    border-radius: 50%;
    left: var(--x);
    top: var(--y);
    animation: particleFloat 10s linear infinite var(--delay);
  }
  
  @keyframes particleFloat {
    0% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) scale(1);
      opacity: 0;
    }
  }
  
  /* Main Content */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 2;
  }
  
  .community-content {
    opacity: 0;
    transform: translateY(100px);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .community-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Glitch Header */
  .glitch-header {
    text-align: center;
    margin-bottom: 6rem;
  }
  
  .main-title {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    line-height: 0.9;
    margin-bottom: 2rem;
  }
  
  .glitch-text {
    position: relative;
    color: var(--text-primary);
    animation: glitch 2s infinite;
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .glitch-text::before {
    animation: glitch-1 0.5s infinite;
    color: var(--cyber-pink);
    z-index: -1;
  }
  
  .glitch-text::after {
    animation: glitch-2 0.5s infinite;
    color: var(--cyber-blue);
    z-index: -2;
  }
  
  @keyframes glitch {
    0%, 99% { text-shadow: none; }
    1% { 
      text-shadow: 
        2px 0 var(--cyber-pink),
        -2px 0 var(--cyber-blue);
    }
  }
  
  @keyframes glitch-1 {
    0% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(-2px); }
    60% { transform: translateX(2px); }
    80% { transform: translateX(2px); }
    100% { transform: translateX(0); }
  }
  
  @keyframes glitch-2 {
    0% { transform: translateX(0); }
    20% { transform: translateX(2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-2px); }
    80% { transform: translateX(-2px); }
    100% { transform: translateX(0); }
  }
  
  .subtitle-container {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .subtitle-static {
    color: var(--text-secondary);
  }
  
  .subtitle-glitch {
    color: var(--cyber-lime);
    font-weight: 700;
    animation: textGlow 2s ease-in-out infinite alternate;
  }
  
  @keyframes textGlow {
    from { text-shadow: 0 0 10px var(--cyber-lime); }
    to { text-shadow: 0 0 20px var(--cyber-lime), 0 0 30px var(--cyber-lime); }
  }
  
  /* Cyber Stats Terminal */
  .cyber-stats {
    margin-bottom: 6rem;
    display: flex;
    justify-content: center;
  }
  
  .stat-terminal {
    background: var(--card-bg);
    border: 1px solid var(--border-glow);
    border-radius: 8px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.1);
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 1rem;
    border-bottom: 1px solid var(--border-glow);
    background: rgba(0, 255, 136, 0.05);
  }
  
  .terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .terminal-dot.red { background: #ff5f57; }
  .terminal-dot.yellow { background: #ffbd2e; }
  .terminal-dot.green { background: #28ca42; }
  
  .terminal-title {
    color: var(--text-primary);
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    margin-left: auto;
  }
  
  .terminal-content {
    padding: 2rem;
    font-family: 'Courier New', monospace;
  }
  
  .stat-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(136, 146, 176, 0.1);
  }
  
  .stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
  
  .stat-value {
    color: var(--cyber-lime);
    font-weight: bold;
    text-shadow: 0 0 5px var(--cyber-lime);
  }
  
  .counting {
    animation: counterGlow 1s ease-in-out infinite alternate;
  }
  
  @keyframes counterGlow {
    from { text-shadow: 0 0 5px var(--cyber-lime); }
    to { text-shadow: 0 0 15px var(--cyber-lime); }
  }
  
  /* 3D Cards Grid */
  .community-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
    margin-bottom: 8rem;
    perspective: 1000px;
  }
  
  .community-card {
    background: var(--card-bg);
    border: 1px solid transparent;
    border-radius: 16px;
    padding: 2.5rem;
    position: relative;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform-style: preserve-3d;
  }
  
  .community-card:hover {
    transform: rotateX(5deg) rotateY(5deg) translateY(-10px);
    border-color: var(--cyber-lime);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 50px rgba(0, 255, 136, 0.2);
  }
  
  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--cyber-lime), var(--cyber-blue));
    border-radius: 16px;
    opacity: 0;
    filter: blur(20px);
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  .community-card:hover .card-glow {
    opacity: 0.1;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .card-icon {
    font-size: 2.5rem;
    filter: drop-shadow(0 0 10px var(--cyber-lime));
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .card-description {
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .card-footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  
  .online-indicator,
  .live-indicator,
  .match-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }
  
  .online-indicator { background: #28ca42; }
  .live-indicator { background: var(--cyber-pink); }
  .match-indicator { background: var(--cyber-blue); }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
  
  /* Matrix Section */
  .matrix-section {
    position: relative;
    background: var(--darker-bg);
    border-radius: 20px;
    padding: 4rem 2rem;
    margin-bottom: 6rem;
    overflow: hidden;
  }
  
  .matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    pointer-events: none;
  }
  
  .matrix-column {
    position: absolute;
    top: -100%;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: var(--cyber-lime);
    animation: matrixFall 10s linear infinite var(--delay);
  }
  
  @keyframes matrixFall {
    to { transform: translateY(100vh); }
  }
  
  .matrix-char {
    display: block;
    opacity: 0.8;
    animation: matrixGlow 2s ease-in-out infinite;
  }
  
  @keyframes matrixGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  
  .matrix-content {
    position: relative;
    text-align: center;
    z-index: 2;
  }
  
  .matrix-title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 3rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .connection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .connection-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: rgba(26, 27, 46, 0.8);
    border: 1px solid var(--border-glow);
    border-radius: 12px;
    position: relative;
    transition: all 0.3s ease;
  }
  
  .connection-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 255, 136, 0.2);
  }
  
  .connection-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 10px var(--cyber-lime));
  }
  
  .connection-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--cyber-lime);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .connection-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 2px;
    height: 0;
    background: var(--cyber-lime);
    transform: translateX(-50%);
    transition: height 0.5s ease;
  }
  
  .connection-item:hover .connection-line {
    height: 20px;
  }
  
  /* Hologram Statement */
  .hologram-statement {
    position: relative;
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(0, 255, 136, 0.05), rgba(0, 255, 255, 0.05));
    border: 1px solid var(--border-glow);
    border-radius: 20px;
    overflow: hidden;
  }
  
  .hologram-text {
    position: relative;
    z-index: 2;
  }
  
  .statement-line {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }
  
  .statement-highlight {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 900;
    color: var(--cyber-lime);
    text-shadow: 0 0 20px var(--cyber-lime);
    animation: hologramGlow 3s ease-in-out infinite;
  }
  
  @keyframes hologramGlow {
    0%, 100% { 
      text-shadow: 0 0 20px var(--cyber-lime);
      filter: brightness(1);
    }
    50% { 
      text-shadow: 0 0 40px var(--cyber-lime), 0 0 60px var(--cyber-lime);
      filter: brightness(1.2);
    }
  }
  
  .hologram-scanlines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 255, 136, 0.05) 2px,
      rgba(0, 255, 136, 0.05) 4px
    );
    animation: scanlines 2s linear infinite;
    pointer-events: none;
  }
  
  @keyframes scanlines {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .cyber-community {
      padding: 4rem 0;
    }
    
    .community-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .community-card {
      padding: 2rem;
    }
    
    .connection-grid {
      grid-template-columns: 1fr;
    }
    
    .cyber-stats {
      margin-bottom: 4rem;
    }
    
    .matrix-section {
      padding: 3rem 1.5rem;
      margin-bottom: 4rem;
    }
    
    .subtitle-container {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .cyber-community {
      padding: 3rem 0;
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .community-card {
      padding: 1.5rem;
    }
    
    .terminal-content {
      padding: 1.5rem;
    }
    
    .hologram-statement {
      padding: 2rem;
    }
  }
</style>