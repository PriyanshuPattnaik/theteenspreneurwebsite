<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionVisible = false;
  let visionSection: HTMLElement;
  let mouseX = 0;
  let mouseY = 0;
  let gridOffset = 0;
  let glitchActive = false;
  
  const manifestos = [
    {
      title: "while you're waiting for college",
      content: "we're building unicorns.<br>mark was 19. bill was 20.<br><span class='highlight'>you're already late.</span>",
      delay: 0
    },
    {
      title: "permission is a luxury",
      content: "billionaires can't afford.<br>the system wants you to wait.<br><span class='highlight'>we teach you to break it.</span>",
      delay: 300
    },
    {
      title: "every revolution needs soldiers",
      content: "every empire needs builders.<br>every future needs rebels.<br><span class='highlight'>we're recruiting both.</span>",
      delay: 600
    }
  ];
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
            setTimeout(() => {
              glitchActive = true;
            }, 1000);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (visionSection) {
      observer.observe(visionSection);
    }
    
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = visionSection?.getBoundingClientRect();
      if (rect) {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        mouseX = (clientX - rect.left) / rect.width - 0.5;
        mouseY = (clientY - rect.top) / rect.height - 0.5;
      }
    };
    
    const animateGrid = () => {
      gridOffset += 0.3;
      requestAnimationFrame(animateGrid);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    animateGrid();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  });
</script>

<section class="vision-realm" bind:this={visionSection} role="region" aria-label="Vision Realm Section">
  <!-- Neural Network Grid Background -->
  <div class="neural-grid" style="transform: translate3d({mouseX * 30}px, {mouseY * 30}px, 0)">
    <div class="grid-layer-1" style="transform: translateY({gridOffset % 60}px)"></div>
    <div class="grid-layer-2" style="transform: translateY({(gridOffset * 0.7) % 80}px)"></div>
    <div class="grid-layer-3" style="transform: translateY({(gridOffset * 0.4) % 100}px)"></div>
  </div>
  
  <!-- Digital Rain Effect -->
  <div class="digital-rain">
    {#each Array(30) as _, i}
      <div class="rain-column" style="
        left: {Math.random() * 100}%;
        animation-delay: {Math.random() * 5}s;
        animation-duration: {2 + Math.random() * 3}s;
      ">
        {#each Array(20) as _, j}
          <span class="rain-char">{String.fromCharCode(33 + Math.random() * 93)}</span>
        {/each}
      </div>
    {/each}
  </div>
  
  <!-- Floating Data Nodes -->
  <div class="data-nodes">
    {#each Array(15) as _, i}
      <div class="data-node" style="
        left: {10 + (i * 6)}%;
        top: {20 + Math.random() * 60}%;
        animation-delay: {Math.random() * 8}s;
      ">
        <div class="node-core"></div>
        <div class="node-ring"></div>
        <div class="node-pulse"></div>
      </div>
    {/each}
  </div>
  
  <div class="container">
    <div class="vision-matrix" class:visible={sectionVisible}>
      
      <!-- Main Neural Hook -->
      <div class="neural-header">
        <div class="system-text">SYSTEM_INIT: teenage_revolution.exe</div>
        <h1 class="matrix-title" class:glitch={glitchActive} data-text="they said wait your turn">
          they said wait your turn
        </h1>
        <div class="response-line">
          <span class="cursor-blink">></span>
          <span class="terminal-text">we said fuck that.</span>
          <span class="cursor" aria-hidden="true">_</span>
        </div>
        <div class="boot-sequence">
          <div class="boot-line">loading: rebellion.dll ████████████ 100%</div>
          <div class="boot-line">initializing: empire_builder.exe ████████████ 100%</div>
          <div class="boot-line">status: READY TO DOMINATE</div>
        </div>
      </div>
      
      <!-- Manifesto Cards with Neural Network Design -->
      <div class="manifesto-grid">
        {#each manifestos as manifesto, i}
          <div 
            class="manifesto-node" 
            class:active={sectionVisible}
            style="animation-delay: {manifesto.delay}ms"
            role="article"
            aria-labelledby="node-title-{i}"
          >
            <div class="node-connections">
              <div class="connection-line line-top"></div>
              <div class="connection-line line-bottom"></div>
              <div class="connection-line line-left"></div>
              <div class="connection-line line-right"></div>
            </div>
            
            <div class="node-header">
              <div class="node-id">NODE_{String(i+1).padStart(2, '0')}</div>
              <div class="node-status">ACTIVE</div>
            </div>
            
            <div class="node-content">
              <h3 id="node-title-{i}" class="manifesto-title">{manifesto.title}</h3>
              <div class="manifesto-body">{@html manifesto.content}</div>
            </div>
            
            <div class="node-footer">
              <div class="data-stream">
                <span class="stream-text">data_stream:</span>
                <div class="stream-bars">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Revolutionary Call to Action Block -->
      <div class="revolution-terminal" role="complementary" aria-label="Revolution Terminal">
        <div class="terminal-header">
          <div class="terminal-controls">
            <span class="control-dot red" aria-hidden="true"></span>
            <span class="control-dot yellow" aria-hidden="true"></span>
            <span class="control-dot green" aria-hidden="true"></span>
          </div>
          <div class="terminal-title">THETEENSPRENEUR://REVOLUTION_PROTOCOL</div>
        </div>
        
        <div class="terminal-body">
          <div class="terminal-line">
            <span class="prompt">root@future:~$</span> 
            <span class="command">analyze teen_potential --verbose</span>
          </div>
          <div class="terminal-output">
            <div class="output-line">scanning global database...</div>
            <div class="output-line">processing 1.2B teenagers worldwide</div>
            <div class="output-line warning">WARNING: 99.8% are being wasted</div>
            <div class="output-line success">SOLUTION: theteenspreneur ecosystem</div>
          </div>
          
          <div class="stats-display">
            <div class="stat-block">
              <div class="stat-label">age_range:</div>
              <div class="stat-value">13-19</div>
            </div>
            <div class="stat-block">
              <div class="stat-label">success_rate:</div>
              <div class="stat-value">∞%</div>
            </div>
            <div class="stat-block">
              <div class="stat-label">waiting_time:</div>
              <div class="stat-value">0ms</div>
            </div>
          </div>
          
          <div class="final-command">
            <div class="terminal-line">
              <span class="prompt">root@future:~$</span> 
              <span class="command">execute revolution.sh</span>
            </div>
            <div class="execution-result">
              <div class="result-text">
                while others are getting degrees,<br>
                <span class="highlight-terminal">you'll be getting equity.</span>
              </div>
            </div>
          </div>
          
          <button class="hack-button" aria-label="Initiate Takeover">
            <span class="button-text">INITIATE TAKEOVER</span>
            <div class="button-glitch"></div>
            <div class="button-scan"></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .vision-realm {
    min-height: 100vh;
    background: #0A0B14;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: clamp(4rem, 10vw, 8rem) 0;
  }
  
  /* Neural Network Grid Background */
  .neural-grid {
    position: absolute;
    inset: 0;
    opacity: 0.2;
    transition: transform 0.1s ease-out;
  }
  
  .grid-layer-1, .grid-layer-2, .grid-layer-3 {
    position: absolute;
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    background-size: 50px 50px, 50px 50px;
    background-position: 0 0, 0 0;
  }
  
  .grid-layer-1 {
    background-image: 
      linear-gradient(rgba(0, 204, 102, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 204, 102, 0.3) 1px, transparent 1px);
    animation: gridPulse1 4s ease-in-out infinite;
  }
  
  .grid-layer-2 {
    background-image: 
      linear-gradient(rgba(0, 204, 102, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 204, 102, 0.15) 1px, transparent 1px);
    background-size: 25px 25px;
    animation: gridPulse2 6s ease-in-out infinite;
  }
  
  .grid-layer-3 {
    background-image: 
      linear-gradient(rgba(0, 204, 102, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 204, 102, 0.1) 1px, transparent 1px);
    background-size: 100px 100px;
    animation: gridPulse3 8s ease-in-out infinite;
  }
  
  @keyframes gridPulse1 {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
  
  @keyframes gridPulse2 {
    0%, 100% { opacity: 0.15; }
    50% { opacity: 0.4; }
  }
  
  @keyframes gridPulse3 {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.25; }
  }
  
  /* Digital Rain Effect */
  .digital-rain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.1;
  }
  
  .rain-column {
    position: absolute;
    width: 2px;
    height: 100%;
    animation: digitalFall infinite linear;
  }
  
  .rain-char {
    display: block;
    color: #00CC66;
    font-family: 'Courier New', monospace;
    font-size: clamp(8px, 2vw, 10px);
    line-height: 1;
    opacity: 0.7;
  }
  
  @keyframes digitalFall {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  
  /* Floating Data Nodes */
  .data-nodes {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  .data-node {
    position: absolute;
    width: clamp(15px, 3vw, 20px);
    height: clamp(15px, 3vw, 20px);
    animation: nodeFloat 6s ease-in-out infinite;
  }
  
  .node-core {
    width: 4px;
    height: 4px;
    background: #00CC66;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #00CC66;
  }
  
  .node-ring {
    width: clamp(10px, 2vw, 12px);
    height: clamp(10px, 2vw, 12px);
    border: 1px solid rgba(0, 204, 102, 0.4);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: nodeRotate 3s linear infinite;
  }
  
  .node-pulse {
    width: clamp(15px, 3vw, 20px);
    height: clamp(15px, 3vw, 20px);
    border: 1px solid rgba(0, 204, 102, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: nodePulse 2s ease-in-out infinite;
  }
  
  @keyframes nodeFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes nodeRotate {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes nodePulse {
    0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.5); }
  }
  
  .container {
    max-width: clamp(800px, 90vw, 1400px);
    margin: 0 auto;
    padding: 0 clamp(1rem, 5vw, 2rem);
    position: relative;
    z-index: 10;
  }
  
  .vision-matrix {
    opacity: 0;
    transform: translateY(100px);
    transition: all 1.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .vision-matrix.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Neural Header */
  .neural-header {
    text-align: center;
    margin-bottom: clamp(4rem, 10vw, 8rem);
  }
  
  .system-text {
    font-family: 'Courier New', monospace;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    color: #00CC66;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .matrix-title {
    font-size: clamp(2rem, 6vw, 6rem);
    font-weight: 900;
    color: #FFFFFF;
    position: relative;
    text-transform: lowercase;
    letter-spacing: -0.02em;
    margin-bottom: clamp(1rem, 3vw, 2rem);
    font-family: Inter, sans-serif;
  }
  
  .matrix-title.glitch::before,
  .matrix-title.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .matrix-title.glitch::before {
    animation: glitch-1 2s infinite;
    color: #ff0080;
    z-index: -1;
  }
  
  .matrix-title.glitch::after {
    animation: glitch-2 2s infinite;
    color: #00CC66;
    z-index: -2;
  }
  
  @keyframes glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
  }
  
  @keyframes glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(3px, -3px); }
    40% { transform: translate(3px, 3px); }
    60% { transform: translate(-3px, -3px); }
    80% { transform: translate(-3px, 3px); }
  }
  
  .response-line {
    font-family: 'Courier New', monospace;
    font-size: clamp(1rem, 3vw, 2.5rem);
    color: #FFFFFF;
    margin-bottom: clamp(1.5rem, 5vw, 3rem);
  }
  
  .cursor-blink {
    color: #00CC66;
    animation: blink 1s infinite;
  }
  
  .terminal-text {
    font-weight: 600;
  }
  
  .cursor {
    color: #00CC66;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .boot-sequence {
    font-family: 'Courier New', monospace;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    text-align: left;
    max-width: clamp(300px, 50vw, 400px);
    margin: 0 auto;
  }
  
  .boot-line {
    color: #00CC66;
    margin-bottom: 0.5rem;
    animation: typewriter 2s steps(40) 1s both;
  }
  
  .boot-line:nth-child(2) { animation-delay: 2s; }
  .boot-line:nth-child(3) { animation-delay: 3s; }
  
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  
  /* Manifesto Grid */
  .manifesto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(300px, 45vw, 400px), 1fr));
    gap: clamp(2rem, 5vw, 4rem);
    margin-bottom: clamp(4rem, 10vw, 8rem);
    position: relative;
  }
  
  .manifesto-node {
    position: relative;
    background: linear-gradient(135deg, rgba(26, 27, 46, 0.8), rgba(10, 11, 20, 0.9));
    border: 1px solid rgba(0, 204, 102, 0.3);
    border-radius: 12px;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    transform: translateY(80px) rotateX(15deg);
    opacity: 0;
    transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }
  
  .manifesto-node.active {
    transform: translateY(0) rotateX(0deg);
    opacity: 1;
  }
  
  .manifesto-node::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(0, 204, 102, 0.1), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .manifesto-node:hover::before {
    opacity: 1;
  }
  
  .manifesto-node:hover {
    border-color: #00CC66;
    box-shadow: 0 20px 40px rgba(0, 204, 102, 0.2);
  }
  
  .node-connections {
    position: absolute;
    inset: -1px;
    pointer-events: none;
  }
  
  .connection-line {
    position: absolute;
    background: linear-gradient(45deg, #00CC66, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .manifesto-node:hover .connection-line {
    opacity: 1;
  }
  
  .line-top { top: 0; left: 20%; width: 60%; height: 2px; }
  .line-bottom { bottom: 0; left: 20%; width: 60%; height: 2px; }
  .line-left { left: 0; top: 20%; width: 2px; height: 60%; }
  .line-right { right: 0; top: 20%; width: 2px; height: 60%; }
  
  .node-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
    font-family: 'Courier New', monospace;
    font-size: clamp(0.625rem, 1.5vw, 0.75rem);
  }
  
  .node-id {
    color: #00CC66;
    font-weight: 600;
  }
  
  .node-status {
    color: #00CC66;
    padding: 0.25rem 0.75rem;
    border: 1px solid #00CC66;
    border-radius: 4px;
    animation: statusPulse 2s ease-in-out infinite;
  }
  
  @keyframes statusPulse {
    0%, 100% { box-shadow: 0 0 5px rgba(0, 204, 102, 0.3); }
    50% { box-shadow: 0 0 15px rgba(0, 204, 102, 0.6); }
  }
  
  .manifesto-title {
    font-size: clamp(1rem, 3vw, 1.25rem);
    font-weight: 800;
    color: #FFFFFF;
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    text-transform: lowercase;
  }
  
  .manifesto-body {
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    line-height: 1.6;
    color: #8892B0;
    margin-bottom: clamp(1rem, 3vw, 1.5rem);
  }
  
  .node-footer {
    margin-top: clamp(1rem, 3vw, 1.5rem);
  }
  
  .data-stream {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: 'Courier New', monospace;
    font-size: clamp(0.625rem, 1.5vw, 0.75rem);
    color: #00CC66;
  }
  
  .stream-bars {
    display: flex;
    gap: 2px;
  }
  
  .bar {
    width: 3px;
    height: 12px;
    background: #00CC66;
    animation: barPulse 1s ease-in-out infinite;
  }
  
  .bar:nth-child(1) { animation-delay: 0s; }
  .bar:nth-child(2) { animation-delay: 0.2s; }
  .bar:nth-child(3) { animation-delay: 0.4s; }
  .bar:nth-child(4) { animation-delay: 0.6s; }
  
  @keyframes barPulse {
    0%, 100% { height: 4px; opacity: 0.5; }
    50% { height: 12px; opacity: 1; }
  }
  
  /* Revolution Terminal */
  .revolution-terminal {
    background: #0A0B14;
    border: 1px solid #00CC66;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 204, 102, 0.2);
  }
  
  .terminal-header {
    background: linear-gradient(135deg, #1A1B2E, #2D2E3F);
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 1rem);
    border-bottom: 1px solid rgba(0, 204, 102, 0.3);
  }
  
  .terminal-controls {
    display: flex;
    gap: clamp(0.3rem, 1vw, 0.5rem);
  }
  
  .control-dot {
    width: clamp(8px, 2vw, 12px);
    height: clamp(8px, 2vw, 12px);
    border-radius: 50%;
  }
  
  .red { background: #ff5f56; }
  .yellow { background: #ffbd2e; }
  .green { background: #27ca3f; }
  
  .terminal-title {
    font-family: 'Courier New', monospace;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    color: #00CC66;
    font-weight: 600;
  }
  
  .terminal-body {
    padding: clamp(1rem, 4vw, 2rem);
    font-family: 'Courier New', monospace;
    font-size: clamp(0.75rem, 2vw, 0.875rem);
    line-height: 1.6;
  }
  
  .terminal-line {
    margin-bottom: 0.5rem;
  }
  
  .prompt {
    color: #00CC66;
    font-weight: 600;
  }
  
  .command {
    color: #FFFFFF;
    margin-left: 0.5rem;
  }
  
  .terminal-output {
    margin: clamp(1rem, 3vw, 1.5rem) 0;
    padding-left: 1rem;
    border-left: 2px solid rgba(0, 204, 102, 0.3);
  }
  
  .output-line {
    color: #8892B0;
    margin-bottom: 0.25rem;
  }
  
  .output-line.warning {
    color: #ffbd2e;
  }
  
  .output-line.success {
    color: #00CC66;
  }
  
  .stats-display {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(clamp(120px, 30vw, 150px), 1fr));
    gap: clamp(0.5rem, 2vw, 1rem);
    margin: clamp(1rem, 3vw, 2rem) 0;
    padding: clamp(1rem, 3vw, 1.5rem);
    background: rgba(26, 27, 46, 0.5);
    border-radius: 8px;
    border: 1px solid rgba(0, 204, 102, 0.3);
  }
  
  .stat-block {
    text-align: center;
  }
  
  .stat-label {
    color: #8892B0;
    font-size: clamp(0.625rem, 1.5vw, 0.75rem);
    margin-bottom: 0.5rem;
  }
  
  .stat-value {
    color: #00CC66;
    font-size: clamp(1rem, 3vw, 1.5rem);
    font-weight: 600;
  }
  
  .final-command {
    margin: clamp(1rem, 3vw, 2rem) 0;
  }
  
  .execution-result {
    margin-top: 1rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    background: linear-gradient(135deg, rgba(0, 204, 102, 0.1), rgba(26, 27, 46, 0.8));
    border-radius: 8px;
    border: 1px solid rgba(0, 204, 102, 0.4);
  }
  
  .result-text {
    font-size: clamp(1rem, 3vw, 1.25rem);
    color: #FFFFFF;
    line-height: 1.4;
  }
  
  .highlight,
  .highlight-terminal {
    color: #00CC66;
    font-weight: 600;
  }
  
  /* Hack Button */
  .hack-button {
    position: relative;
    width: 100%;
    background: linear-gradient(135deg, #00CC66, #00AA55);
    border: none;
    border-radius: 6px;
    padding: clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 4vw, 2rem);
    font-family: 'Courier New', monospace;
    font-size: clamp(0.875rem, 2.5vw, 1rem);
    font-weight: 600;
    text-transform: uppercase;
    color: #0A0B14;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    letter-spacing: 0.1em;
    min-height: 48px; /* Accessibility: minimum touch target size */
  }
  
  .button-glitch {
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  .button-scan {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.6);
    transform: translateX(-100%);
    animation: scanLine 2s ease-in-out infinite;
  }
  
  @keyframes scanLine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .hack-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 204, 102, 0.4);
  }
  
  .hack-button:hover .button-glitch {
    transform: translateX(100%);
  }
  
  .hack-button:active {
    transform: translateY(-1px);
  }
  
  /* Responsive Design */
  @media (max-width: 1440px) {
    .container {
      max-width: 90vw;
    }
    
    .manifesto-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 3rem;
    }
  }
  
  @media (max-width: 1024px) {
    .manifesto-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    
    .vision-realm {
      padding: clamp(3rem, 8vw, 4rem) 1rem;
    }
    
    .matrix-title {
      font-size: clamp(1.75rem, 5vw, 4rem);
    }
    
    .response-line {
      font-size: clamp(0.875rem, 2.5vw, 2rem);
    }
    
    .manifesto-node {
      padding: clamp(1.25rem, 3vw, 2rem);
    }
    
    .revolution-terminal {
      margin: 0 clamp(0.5rem, 2vw, 1rem);
    }
    
    .terminal-body {
      padding: clamp(0.75rem, 2vw, 1.5rem);
    }
    
    .stats-display {
      grid-template-columns: 1fr;
      padding: clamp(0.75rem, 2vw, 1rem);
    }
    
    .stat-value {
      font-size: clamp(0.875rem, 2.5vw, 1.25rem);
    }
    
    .hack-button {
      padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem);
      font-size: clamp(0.75rem, 2vw, 0.875rem);
    }
    
    .neural-grid {
      opacity: 0.15; /* Reduce intensity for performance */
    }
    
    .digital-rain {
      opacity: 0.05; /* Reduce intensity for performance */
    }
    
    .data-node {
      animation: none; /* Disable animations on smaller screens for performance */
    }
  }
  
  @media (max-width: 768px) {
    .neural-header {
      margin-bottom: clamp(2rem, 6vw, 4rem);
    }
    
    .manifesto-grid {
      gap: clamp(1.5rem, 4vw, 2rem);
    }
    
    .manifesto-title {
      font-size: clamp(0.875rem, 2.5vw, 1.125rem);
    }
    
    .manifesto-body {
      font-size: clamp(0.75rem, 2vw, 0.875rem);
    }
    
    .terminal-title {
      font-size: clamp(0.625rem, 1.5vw, 0.75rem);
    }
    
    .terminal-body {
      font-size: clamp(0.625rem, 1.5vw, 0.75rem);
    }
    
    .result-text {
      font-size: clamp(0.875rem, 2.5vw, 1rem);
    }
    
    .vision-realm {
      padding: clamp(2rem, 6vw, 3rem) 0.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .vision-realm {
      padding: clamp(1.5rem, 5vw, 2rem) 0.5rem;
    }
    
    .container {
      padding: 0 0.5rem;
    }
    
    .matrix-title {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
    }
    
    .response-line {
      font-size: clamp(0.75rem, 2vw, 1.5rem);
    }
    
    .boot-sequence {
      max-width: 90%;
    }
    
    .manifesto-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .manifesto-node {
      padding: 1rem;
    }
    
    .manifesto-title {
      font-size: 0.875rem;
    }
    
    .manifesto-body {
      font-size: 0.75rem;
    }
    
    .stats-display {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
    
    .stat-value {
      font-size: 1rem;
    }
    
    .hack-button {
      padding: 0.75rem 1rem;
      font-size: 0.75rem;
      min-height: 44px;
    }
    
    .neural-grid {
      display: none; /* Disable heavy background for performance on small devices */
    }
    
    .digital-rain {
      display: none; /* Disable for performance */
    }
  }
  
  @media (min-width: 1440px) {
    .container {
      max-width: 1600px;
    }
    
    .manifesto-grid {
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 5rem;
    }
    
    .matrix-title {
      font-size: clamp(4rem, 6vw, 7rem);
    }
    
    .response-line {
      font-size: clamp(2rem, 3vw, 3rem);
    }
  }
  
  /* Accessibility Improvements */
  .hack-button:focus {
    outline: 2px solid #00CC66;
    outline-offset: 2px;
  }
  
  @media (prefers-reduced-motion: reduce) {
    .vision-matrix,
    .manifesto-node,
    .data-node,
    .node-ring,
    .node-pulse,
    .grid-layer-1,
    .grid-layer-2,
    .grid-layer-3,
    .rain-column,
    .bar,
    .hack-button .button-glitch,
    .hack-button .button-scan,
    .matrix-title.glitch::before,
    .matrix-title.glitch::after,
    .node-status,
    .cursor,
    .cursor-blink {
      animation: none !important;
      transition: none !important;
    }
    
    .manifesto-node.active {
      transform: none;
      opacity: 1;
    }
    
    .vision-matrix.visible {
      transform: none;
      opacity: 1;
    }
  }
</style>