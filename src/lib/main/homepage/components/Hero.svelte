<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  let currentPhase = 0;
  let typewriterText = '';
  let showMatrix = false;
  let showSubContent = false;
  let showCTA = false;
  let glitchActive = false;
  let matrixLines: string[] = [];
  
  const hooks = [
    "while you're asking for permission, gen-z is printing money.",
    "16-year-olds are building what VCs can't even imagine.",
    "the youngest billionaire won't wait for college.",
    "your bedroom is the new silicon valley."
  ];
  
  let currentHook = hooks[0];
  
  const finalMessage = "where 13-21 becomes inevitable.";
  
  const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  
  onMount(() => {
    mounted = true;
    generateMatrixLines();
    
    setTimeout(() => {
      showMatrix = true;
      startGlitchCycle();
    }, 500);
    
    setTimeout(() => {
      startTypewriter();
    }, 2800);
  });
  
  function generateMatrixLines() {
    const lineCount = window.innerWidth < 768 ? 8 : 15;
    for (let i = 0; i < lineCount; i++) {
      let line = '';
      for (let j = 0; j < 20; j++) {
        line += matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      }
      matrixLines.push(line);
    }
    matrixLines = [...matrixLines];
  }
  
  function startGlitchCycle() {
    let hookIndex = 0;
    
    const cycleHooks = () => {
      glitchActive = true;
      
      setTimeout(() => {
        currentHook = hooks[hookIndex];
        glitchActive = false;
        hookIndex = (hookIndex + 1) % hooks.length;
      }, 150);
    };
    
    const interval = setInterval(cycleHooks, 2000);
    
    setTimeout(() => {
      clearInterval(interval);
      currentHook = hooks[3];
    }, 8500);
  }
  
  function startTypewriter() {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < finalMessage.length) {
        typewriterText += finalMessage.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          showSubContent = true;
          setTimeout(() => {
            showCTA = true;
          }, 1500);
        }, 800);
      }
    }, 60);
  }
</script>

<section class="hero" class:mounted>
  <div class="cyber-grid">
    <div class="grid-overlay" class:show-matrix={showMatrix}>
      {#each Array(Math.floor(window.innerWidth / 40)) as _, i}
        <div class="grid-line horizontal" style="top: {i * 3.33}%; animation-delay: {i * 0.03}s;"></div>
      {/each}
      {#each Array(Math.floor(window.innerWidth / 40)) as _, i}
        <div class="grid-line vertical" style="left: {i * 3.33}%; animation-delay: {i * 0.03}s;"></div>
      {/each}
    </div>
    
    <div class="matrix-rain">
      {#each Array(Math.floor(window.innerWidth / 100)) as _, i}
        <div class="matrix-column" style="left: {i * (100 / (window.innerWidth / 100))}%; animation-delay: {i * 0.3}s;">
          {#each matrixLines as line, j}
            <div class="matrix-char" style="animation-delay: {j * 0.1}s;">{line.charAt(i % line.length)}</div>
          {/each}
        </div>
      {/each}
    </div>
    
    <div class="neon-elements">
      <div class="neon-triangle triangle-1"></div>
      <div class="neon-circle circle-1"></div>
      <div class="neon-square square-1"></div>
      <div class="data-stream stream-1"></div>
      <div class="data-stream stream-2"></div>
      <div class="scanning-line"></div>
    </div>
  </div>
  
  <div class="container">
    <div class="hero-content">
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn red"></span>
            <span class="btn yellow"></span>
            <span class="btn green"></span>
          </div>
          <div class="terminal-title">reality.exe</div>
        </div>
        <div class="terminal-content">
          <div class="prompt">
            <span class="user">guest@thefuture</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
          </div>
          <div class="reality-hook" class:glitch={glitchActive}>
            {currentHook}
          </div>
        </div>
      </div>
      
      <h1 class="cyber-manifesto">
        {typewriterText}<span class="cyber-cursor">█</span>
      </h1>
      
      {#if showSubContent}
        <div class="manifesto-body animate-rise">
          <div class="philosophy-block">
            <div class="philosophy-header">
              <span class="bracket">[</span>
              <span class="philosophy-label">CORE_BELIEF.txt</span>
              <span class="bracket">]</span>
            </div>
            <div class="philosophy-content">
              <p class="philosophy-text">
                age is a social construct.<br>
                <span class="neon-highlight">ambition is the only currency that matters.</span>
              </p>
            </div>
          </div>
          
          <div class="system-map">
            <div class="system-header">
              <div class="system-title">
                <span class="chevron">>></span>
                <span class="title-text">LAUNCHING INFRASTRUCTURE.SYS</span>
                <span class="loading-dots">...</span>
              </div>
              <div class="system-status">
                <span class="status-text">STATUS:</span>
                <span class="status-value">REVOLUTIONARY</span>
              </div>
            </div>
            
            <div class="architecture-flow">
              <div class="arch-node node-start">
                <div class="node-number">01</div>
                <div class="node-label">LAUNCH_PROTOCOL</div>
                <div class="node-desc">zero to mvp in weeks</div>
              </div>
              
              <div class="data-flow">
                <div class="flow-line"></div>
                <div class="flow-arrow">→</div>
              </div>
              
              <div class="arch-node node-mid">
                <div class="node-number">02</div>
                <div class="node-label">FORGE_ACCELERATOR</div>
                <div class="node-desc">scale or die trying</div>
              </div>
              
              <div class="data-flow">
                <div class="flow-line"></div>
                <div class="flow-arrow">→</div>
              </div>
              
              <div class="arch-node node-end">
                <div class="node-number">∞</div>
                <div class="node-label">UNICORN_STATUS</div>
                <div class="node-desc">inevitable outcome</div>
              </div>
            </div>
          </div>
          
          <div class="transformation-visual">
            <div class="before-after">
              <div class="transformation-line">
                <span class="before">"maybe i should wait until i'm older"</span>
                <span class="transform-arrow">→</span>
                <span class="after">"we just raised our seed round"</span>
              </div>
            </div>
            
            <div class="brand-command">
              <div class="command-line">
                <span class="prompt-symbol">></span>
                <span class="command-text">initialize</span>
                <span class="brand-name">theTeenspreneur</span>
                <span class="execution-status">--execute-dreams</span>
              </div>
              <div class="output-line">
                <span class="output-text">infrastructure for the inevitable generation.</span>
              </div>
              <div class="final-output">
                <span class="final-text">where teenage <span class="cyber-glow">vision</span> becomes market dominance.</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      {#if showCTA}
        <div class="action-matrix animate-emerge">
          <div class="access-panel">
            <div class="panel-header">
              <span class="access-label">RESTRICTED_ACCESS</span>
              <span class="security-level">LEVEL_∞</span>
            </div>
            
            <button class="matrix-button">
              <div class="button-bg"></div>
              <div class="button-content">
                <span class="button-text">REQUEST_ACCESS</span>
                <span class="button-subtext">// exclusive beta launch</span>
              </div>
              <div class="button-scan"></div>
            </button>
          </div>
          
          <div class="intelligence-brief">
            <div class="brief-header">
              <span class="classified">CLASSIFIED:</span>
              <span class="brief-title">The most serious accelerator for gen-z founders is booting up...</span>
            </div>
            <div class="brief-content">
              <p class="brief-text">
                y_combinator.scale × buildspace.community × localhost.execution<br>
                <span class="tech-spec">= the infrastructure you've been waiting for</span>
              </p>
            </div>
            <div class="queue-monitor">
              <div class="monitor-line">
                <span class="pulse-dot"></span>
                <span class="queue-count">1,847 founders in evaluation queue</span>
                <span class="urgency">// slots filling fast</span>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }
  
  .hero {
    min-height: 100vh;
    background: radial-gradient(ellipse at center, #0f0f1a 0%, #050508 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(2rem, 8vw, 6rem) 0;
    width: 100%;
    box-sizing: border-box;
  }
  
  .cyber-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  .grid-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease;
  }
  
  .grid-overlay.show-matrix {
    opacity: 0.12;
  }
  
  .grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, #00ff41, transparent);
    opacity: 0;
    animation: cyberGrid 8s ease-in-out infinite;
  }
  
  .grid-line.horizontal {
    width: 100%;
    height: 1px;
  }
  
  .grid-line.vertical {
    height: 100%;
    width: 1px;
    background: linear-gradient(180deg, transparent, #00ff41, transparent);
  }
  
  @keyframes cyberGrid {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.4; }
  }
  
  .matrix-rain {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.08;
  }
  
  .matrix-column {
    position: absolute;
    top: -100%;
    width: clamp(12px, 2vw, 16px);
    height: 200%;
    animation: matrixFall 15s linear infinite;
  }
  
  .matrix-char {
    color: #00ff41;
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.6rem, 1.5vw, 0.8rem);
    font-weight: 600;
    line-height: 1.2;
    opacity: 0;
    animation: charFlicker 2s ease-in-out infinite;
  }
  
  @keyframes matrixFall {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  
  @keyframes charFlicker {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.8; }
  }
  
  .neon-elements {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .neon-triangle {
    position: absolute;
    width: clamp(40px, 5vw, 60px);
    height: clamp(40px, 5vw, 60px);
    border: 2px solid #00ff41;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    animation: neonFloat 10s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    top: 20%;
    right: clamp(5%, 10vw, 15%);
  }
  
  .neon-circle {
    position: absolute;
    width: clamp(50px, 7vw, 80px);
    height: clamp(50px, 7vw, 80px);
    border: 2px solid #00ff41;
    border-radius: 50%;
    animation: neonPulse 8s ease-in-out infinite;
    box-shadow: 0 0 25px rgba(0, 255, 65, 0.3);
    bottom: 30%;
    left: clamp(5%, 8vw, 10%);
  }
  
  .neon-square {
    position: absolute;
    width: clamp(30px, 4vw, 50px);
    height: clamp(30px, 4vw, 50px);
    border: 2px solid #00ff41;
    animation: neonRotate 12s linear infinite;
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
    top: 60%;
    right: clamp(10%, 15vw, 25%);
  }
  
  .scanning-line {
    position: absolute;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff41, transparent);
    top: 40%;
    animation: scanLine 6s ease-in-out infinite;
    opacity: 0.6;
  }
  
  @keyframes neonFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
    50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
  }
  
  @keyframes neonPulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.2); opacity: 0.8; }
  }
  
  @keyframes neonRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes scanLine {
    0%, 100% { opacity: 0; transform: translateX(-100%); }
    50% { opacity: 0.8; transform: translateX(0); }
  }
  
  .data-stream {
    position: absolute;
    width: 1px;
    background: linear-gradient(180deg, transparent, #00ff41, transparent);
    animation: dataStreamFlow 4s ease-in-out infinite;
  }
  
  .stream-1 {
    height: clamp(100px, 15vh, 180px);
    top: 15%;
    left: clamp(20%, 30vw, 35%);
  }
  
  .stream-2 {
    height: clamp(80px, 10vh, 120px);
    bottom: 20%;
    right: clamp(15%, 25vw, 30%);
    animation-delay: 2s;
  }
  
  @keyframes dataStreamFlow {
    0%, 100% { opacity: 0; transform: scaleY(0); }
    50% { opacity: 0.9; transform: scaleY(1); }
  }
  
  .container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: clamp(300px, 90vw, 1200px);
    margin: 0 auto;
    padding: 0 clamp(1rem, 5vw, 2rem);
    box-sizing: border-box;
  }
  
  .hero-content {
    text-align: center;
    width: 100%;
  }
  
  .terminal-window {
    background: rgba(5, 5, 8, 0.9);
    border: 1px solid #00ff41;
    border-radius: 8px;
    margin-bottom: clamp(2rem, 5vw, 4rem);
    max-width: clamp(280px, 90vw, 800px);
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
    backdrop-filter: blur(10px);
  }
  
  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: clamp(0.5rem, 2vw, 0.8rem) clamp(0.8rem, 3vw, 1.5rem);
    background: rgba(0, 255, 65, 0.1);
    border-bottom: 1px solid #00ff41;
  }
  
  .terminal-buttons {
    display: flex;
    gap: clamp(0.3rem, 1vw, 0.5rem);
  }
  
  .btn {
    width: clamp(8px, 1.5vw, 12px);
    height: clamp(8px, 1.5vw, 12px);
    border-radius: 50%;
  }
  
  .btn.red { background: #ff5f5f; }
  .btn.yellow { background: #ffff5f; }
  .btn.green { background: #5fff5f; }
  
  .terminal-title {
    font-family: 'JetBrains Mono', monospace;
    color: #00ff41;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    font-weight: 600;
  }
  
  .terminal-content {
    padding: clamp(1rem, 3vw, 1.5rem);
    font-family: 'JetBrains Mono', monospace;
  }
  
  .prompt {
    margin-bottom: clamp(0.5rem, 2vw, 0.8rem);
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  }
  
  .user { color: #00ff41; }
  .separator { color: #ffffff; margin: 0 0.2rem; }
  .path { color: #4a9eff; }
  .dollar { color: #ffffff; margin-left: 0.3rem; }
  
  .reality-hook {
    font-size: clamp(0.9rem, 2.2vw, 1.3rem);
    color: #e2e8f0;
    font-weight: 400;
    line-height: 1.4;
    transition: all 0.15s ease;
  }
  
  .reality-hook.glitch {
    animation: terminalGlitch 0.15s ease-in-out;
    color: #00ff41;
    text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  }
  
  @keyframes terminalGlitch {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-1px, 1px); filter: hue-rotate(90deg); }
    50% { transform: translate(1px, -1px); filter: hue-rotate(180deg); }
    75% { transform: translate(-1px, -1px); filter: hue-rotate(270deg); }
  }
  
  .cyber-manifesto {
    font-size: clamp(2rem, 6vw, 5rem);
    font-weight: 800;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: clamp(2rem, 5vw, 4rem);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  
  .cyber-cursor {
    color: #00ff41;
    animation: cyberPulse 1.2s infinite;
    font-weight: 400;
    text-shadow: 0 0 15px rgba(0, 255, 65, 0.6);
  }
  
  @keyframes cyberPulse {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .manifesto-body {
    opacity: 0;
    transform: translateY(50px);
    animation: cyberRise 1.5s ease forwards;
  }
  
  @keyframes cyberRise {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .philosophy-block {
    margin-bottom: clamp(3rem, 8vw, 5rem);
    background: rgba(0, 255, 65, 0.03);
    border: 1px solid rgba(0, 255, 65, 0.2);
    border-radius: 8px;
    padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
    backdrop-filter: blur(10px);
  }
  
  .philosophy-header {
    font-family: 'JetBrains Mono', monospace;
    color: #00ff41;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    margin-bottom: clamp(1rem, 3vw, 2rem);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .bracket {
    font-weight: 700;
  }
  
  .philosophy-content {
    font-size: clamp(1rem, 2.5vw, 1.6rem);
    color: #cbd5e1;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: -0.01em;
  }
  
  .neon-highlight {
    color: #00ff41;
    font-weight: 500;
    text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  
  .system-map {
    margin: clamp(3rem, 8vw, 6rem) 0;
    background: rgba(5, 5, 8, 0.8);
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem);
    backdrop-filter: blur(15px);
    box-shadow: 0 0 40px rgba(0, 255, 65, 0.1);
  }
  
  .system-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: clamp(1.5rem, 4vw, 3rem);
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .system-title {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 1rem);
  }
  
  .chevron {
    color: #00ff41;
    font-weight: 800;
  }
  
  .title-text {
    color: #ffffff;
    font-weight: 600;
  }
  
  .loading-dots {
    color: #00ff41;
    animation: loadingDots 2s infinite;
  }
  
  @keyframes loadingDots {
    0%, 20% { opacity: 0; }
    40% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  .system-status {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 0.8rem);
  }
  
  .status-text {
    color: #64748b;
  }
  
  .status-value {
    color: #00ff41;
    font-weight: 700;
  }
  
  .architecture-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
  }
  
  .arch-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 1rem);
    min-width: clamp(150px, 25vw, 200px);
  }
  
  .node-number {
    width: clamp(40px, 8vw, 60px);
    height: clamp(40px, 8vw, 60px);
    border: 2px solid #00ff41;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 255, 65, 0.05);
    color: #00ff41;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 800;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  }
  
  .node-end .node-number {
    border-color: #ff6b35;
    color: #ff6b35;
    background: rgba(255, 107, 53, 0.05);
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  
  .node-label {
    font-family: 'JetBrains Mono', monospace;
    color: #ffffff;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    font-weight: 700;
    text-align: center;
    letter-spacing: 1px;
  }
  
  .node-desc {
    color: #64748b;
    font-size: clamp(0.65rem, 1.5vw, 0.85rem);
    text-align: center;
    font-style: italic;
  }
  
  .data-flow {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 1rem);
  }
  
  .flow-line {
    width: clamp(40px, 10vw, 80px);
    height: 2px;
    background: linear-gradient(90deg, #00ff41, #005f1a);
    animation: dataFlowPulse 3s ease-in-out infinite;
  }
  
  .flow-arrow {
    color: #00ff41;
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    font-weight: 800;
    animation: arrowPulse 2s ease-in-out infinite;
  }
  
  @keyframes dataFlowPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  
  @keyframes arrowPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
  
  .transformation-visual {
    margin: clamp(3rem, 8vw, 6rem) 0 clamp(2rem, 5vw, 4rem) 0;
  }
  
  .before-after {
    margin-bottom: clamp(2rem, 5vw, 4rem);
  }
  
  .transformation-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
    font-size: clamp(0.9rem, 2.2vw, 1.3rem);
    line-height: 1.4;
  }
  
  .before {
    color: #64748b;
    font-style: italic;
    text-align: center;
  }
  
  .transform-arrow {
    color: #00ff41;
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    animation: transformPulse 2.5s ease-in-out infinite;
  }
  
  .after {
    color: #00ff41;
    font-weight: 600;
    text-align: center;
    text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  
  @keyframes transformPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.3); opacity: 1; }
  }
  
  .brand-command {
    background: rgba(5, 5, 8, 0.9);
    border: 1px solid rgba(0, 255, 65, 0.3);
    border-radius: 8px;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    font-family: 'JetBrains Mono', monospace;
  }
  
  .command-line {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 0.8rem);
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .prompt-symbol {
    color: #00ff41;
    font-weight: 800;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
  }
  
  .command-text {
    color: #4a9eff;
    font-weight: 600;
  }
  
  .brand-name {
    color: #00ff41;
    font-weight: 800;
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    text-shadow: 0 0 15px rgba(0, 255, 65, 0.4);
  }
  
  .execution-status {
    color: #ff6b35;
    font-weight: 500;
  }
  
  .output-line {
    margin-bottom: clamp(0.5rem, 2vw, 1rem);
    color: #cbd5e1;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
  }
  
  .output-text {
    color: #e2e8f0;
    font-size: clamp(0.8rem, 1.8vw, 1rem);
    font-weight: 400;
    text-align: center;
  }
  
  .final-output {
    margin-top: clamp(1rem, 2.5vw, 1.5rem);
    text-align: center;
  }
  
  .final-text {
    color: #ffffff;
    font-size: clamp(1rem, 2.5vw, 1.6rem);
    font-weight: 600;
    line-height: 1.3;
  }
  
  .cyber-glow {
    color: #00ff41;
    text-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
    font-weight: 800;
  }
  
  .action-matrix {
    margin-top: clamp(2rem, 5vw, 4rem);
    opacity: 0;
    transform: scale(0.95);
    animation: cyberEmerge 1.8s ease forwards;
  }
  
  @keyframes cyberEmerge {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .access-panel {
    background: rgba(5, 5, 8, 0.95);
    border: 1px solid #00ff41;
    border-radius: 8px;
    padding: clamp(1rem, 3vw, 2rem);
    margin-bottom: clamp(1.5rem, 4vw, 3rem);
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
    backdrop-filter: blur(12px);
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: clamp(1rem, 3vw, 2rem);
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  }
  
  .access-label {
    color: #00ff41;
    font-weight: 700;
    letter-spacing: 1px;
  }
  
  .security-level {
    color: #ff6b35;
    font-weight: 600;
  }
  
  .matrix-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
    width: 100%;
    max-width: clamp(250px, 80vw, 400px);
    background: none;
    border: 2px solid #00ff41;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  
  .matrix-button:hover .button-bg,
  .matrix-button:active .button-bg {
    transform: translateX(0);
    opacity: 0.3;
  }
  
  .matrix-button:hover .button-text,
  .matrix-button:active .button-text {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(0, 255, 65, 0.8);
  }
  
  .button-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.5));
    transform: translateX(-100%);
    transition: transform 0.4s ease, opacity 0.4s ease;
    opacity: 0;
  }
  
  .button-content {
    position: relative;
    z-index: 1;
    text-align: center;
  }
  
  .button-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(0.9rem, 2.2vw, 1.2rem);
    font-weight: 700;
    color: #00ff41;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .button-subtext {
    font-size: clamp(0.6rem, 1.5vw, 0.8rem);
    color: #64748b;
    font-style: italic;
  }
  
  .button-scan {
    position: absolute;
    top: 0;
    left: -100%;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.4), transparent);
    animation: buttonScan 3s linear infinite;
  }
  
  @keyframes buttonScan {
    0% { transform: translateX(0); }
    100% { transform: translateX(500%); }
  }
  
  .intelligence-brief {
    background: rgba(5, 5, 8, 0.85);
    border: 1px solid rgba(0, 255, 65, 0.25);
    border-radius: 8px;
    padding: clamp(1rem, 3vw, 2rem);
    backdrop-filter: blur(10px);
  }
  
  .brief-header {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 1rem);
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    font-family: 'JetBrains Mono', monospace;
    flex-wrap: wrap;
  }
  
  .classified {
    color: #ff6b35;
    font-weight: 700;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  }
  
  .brief-title {
    color: #ffffff;
    font-size: clamp(0.8rem, 2vw, 1rem);
    font-weight: 600;
  }
  
  .brief-content {
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
  }
  
  .brief-text {
    font-size: clamp(0.8rem, 1.8vw, 1.1rem);
    color: #cbd5e1;
    line-height: 1.6;
    font-weight: 400;
  }
  
  .tech-spec {
    color: #00ff41;
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 255, 65, 0.3);
  }
  
  .queue-monitor {
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 1.5vw, 1rem);
    justify-content: center;
    font-family: 'JetBrains Mono', monospace;
    flex-wrap: wrap;
  }
  
  .pulse-dot {
    width: clamp(8px, 1.5vw, 10px);
    height: clamp(8px, 1.5vw, 10px);
    background: #00ff41;
    border-radius: 50%;
    animation: pulseDot 1.5s ease-in-out infinite;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  }
  
  .queue-count {
    color: #ffffff;
    font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    font-weight: 600;
  }
  
  .urgency {
    color: #ff6b35;
    font-size: clamp(0.6rem, 1.5vw, 0.8rem);
    font-style: italic;
  }
  
  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.4); opacity: 1; }
  }
  
  @media (max-width: 1024px) {
    .hero {
      padding: clamp(2rem, 6vw, 4rem) clamp(0.5rem, 2vw, 1rem);
    }
  
    .cyber-manifesto {
      font-size: clamp(1.8rem, 5vw, 3.5rem);
    }
  
    .architecture-flow {
      flex-direction: column;
      gap: clamp(0.5rem, 2vw, 1rem);
    }
  
    .data-flow {
      transform: rotate(90deg);
      width: clamp(20px, 5vw, 40px);
    }
  
    .flow-line {
      width: clamp(20px, 5vw, 40px);
    }
  
    .transformation-line {
      flex-direction: column;
      gap: clamp(0.5rem, 2vw, 1rem);
    }
  
    .matrix-button {
      max-width: 100%;
    }
  
    .philosophy-content {
      font-size: clamp(0.9rem, 2.2vw, 1.2rem);
    }
  }
  
  @media (max-width: 768px) {
    .hero {
      padding: clamp(1.5rem, 5vw, 3rem) clamp(0.5rem, 1.5vw, 1rem);
    }
  
    .cyber-manifesto {
      font-size: clamp(1.5rem, 4.5vw, 2.5rem);
    }
  
    .terminal-window {
      margin-bottom: clamp(1.5rem, 4vw, 2rem);
    }
  
    .philosophy-block {
      padding: clamp(1rem, 3vw, 1.5rem);
    }
  
    .system-map {
      padding: clamp(1rem, 3vw, 1.5rem);
    }
  
    .access-panel {
      padding: clamp(0.8rem, 2.5vw, 1.5rem);
    }
  
    .intelligence-brief {
      padding: clamp(0.8rem, 2.5vw, 1.5rem);
    }
  
    .brief-title {
      font-size: clamp(0.7rem, 1.8vw, 0.9rem);
    }
  }
  
  @media (max-width: 480px) {
    .hero {
      padding: clamp(1rem, 4vw, 2rem) clamp(0.3rem, 1vw, 0.8rem);
    }
  
    .cyber-manifesto {
      font-size: clamp(1.2rem, 4vw, 2rem);
    }
  
    .terminal-window {
      margin-bottom: clamp(1rem, 3vw, 1.5rem);
    }
  
    .philosophy-block {
      padding: clamp(0.8rem, 2.5vw, 1.2rem);
    }
  
    .system-map {
      padding: clamp(0.8rem, 2.5vw, 1.2rem);
    }
  
    .access-panel {
      padding: clamp(0.6rem, 2vw, 1rem);
    }
  
    .intelligence-brief {
      padding: clamp(0.6rem, 2vw, 1rem);
    }
  
    .brief-title {
      font-size: clamp(0.6rem, 1.5vw, 0.8rem);
    }
  
    .queue-monitor {
      flex-direction: column;
      text-align: center;
      gap: clamp(0.3rem, 1vw, 0.5rem);
    }
  
    .matrix-button {
      padding: clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem);
    }
  }
  
  @media (max-width: 360px) {
    .cyber-manifesto {
      font-size: clamp(1rem, 3.5vw, 1.8rem);
    }
  
    .philosophy-content {
      font-size: clamp(0.8rem, 2vw, 1rem);
    }
  
    .brief-text {
      font-size: clamp(0.7rem, 1.5vw, 0.9rem);
    }
  }
</style>