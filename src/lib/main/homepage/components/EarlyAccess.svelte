<script lang="ts">
  import { onMount } from 'svelte';
  
  let sectionVisible = false;
  let earlyAccessSection: HTMLElement;
  let currentStep = 0;
  let email = '';
  let isSubmitting = false;
  let showSuccess = false;
  let showGrid = false;
  let mouseX = 0;
  let mouseY = 0;
  
  const accessSteps = [
    {
      step: '01',
      title: 'SECURE YOUR SPOT',
      description: 'limited beta access opening soon',
      icon: '🔐'
    },
    {
      step: '02', 
      title: 'GET EARLY INTEL',
      description: 'exclusive updates and insider access',
      icon: '📡'
    },
    {
      step: '03',
      title: 'LAUNCH FIRST',
      description: 'be among the first teenage founders',
      icon: '🚀'
    }
  ];
  
  const urgencyStats = [
    { label: 'spots remaining', value: '47', color: '#FF6B35' },
    { label: 'applications today', value: '127', color: '#00FF88' },
    { label: 'countries represented', value: '23', color: '#9D4EDD' },
    { label: 'avg. age of applicants', value: '16.2', color: '#06FFA5' }
  ];
  
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionVisible = true;
            showGrid = true;
            startStepAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );
    
    if (earlyAccessSection) {
      observer.observe(earlyAccessSection);
    }
    
    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = earlyAccessSection?.getBoundingClientRect();
      if (rect) {
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });
  
  function startStepAnimation() {
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % accessSteps.length;
    }, 2500);
    
    setTimeout(() => clearInterval(interval), 10000);
  }
  
  async function handleSubmit() {
    if (!email || isSubmitting) return;
    
    isSubmitting = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showSuccess = true;
    isSubmitting = false;
    email = '';
    
    setTimeout(() => {
      showSuccess = false;
    }, 5000);
  }
</script>

<section class="early-access" bind:this={earlyAccessSection} class:visible={sectionVisible}>
  <!-- Animated Grid Background -->
  <div class="grid-container">
    <div class="grid-background" class:show-grid={showGrid}>
      {#each Array(15) as _, i}
        <div class="grid-line horizontal" style="top: {i * 6.67}%; animation-delay: {i * 0.15}s;"></div>
      {/each}
      {#each Array(15) as _, i}
        <div class="grid-line vertical" style="left: {i * 6.67}%; animation-delay: {i * 0.15}s;"></div>
      {/each}
    </div>
    
    <!-- Floating Elements -->
    <div class="floating-elements">
      <div class="data-stream stream-1" style="transform: translateX({mouseX * 20}px) translateY({mouseY * 10}px)"></div>
      <div class="data-stream stream-2" style="transform: translateX({mouseX * -15}px) translateY({mouseY * 15}px)"></div>
      <div class="data-stream stream-3" style="transform: translateX({mouseX * 25}px) translateY({mouseY * -10}px)"></div>
      
      <div class="floating-orb orb-1" style="transform: translateX({mouseX * 30}px) translateY({mouseY * 20}px)"></div>
      <div class="floating-orb orb-2" style="transform: translateX({mouseX * -20}px) translateY({mouseY * 25}px)"></div>
    </div>
  </div>
  
  <div class="container">
    <div class="early-access-content">
      
      <!-- Header Section -->
      <div class="access-header">
        <div class="terminal-prompt">
          <span class="prompt-symbol">></span>
          <span class="prompt-text">initializing_early_access_protocol...</span>
          <span class="cursor-blink">_</span>
        </div>
        
        <h2 class="access-title">
          <span class="title-line">THE MATRIX IS</span>
          <span class="title-highlight">LOADING</span>
        </h2>
        
        <p class="access-subtitle">
          we're building something that's never existed before.<br>
          <span class="subtitle-emphasis">and you can be part of it from day one.</span>
        </p>
      </div>
      
      <!-- Urgency Stats -->
      <div class="urgency-dashboard">
        <div class="dashboard-header">
          <span class="dashboard-title">LIVE METRICS</span>
          <span class="status-indicator">● ONLINE</span>
        </div>
        <div class="stats-grid">
          {#each urgencyStats as stat, index}
            <div class="stat-card" style="animation-delay: {index * 0.1}s; border-color: {stat.color};">
              <div class="stat-value" style="color: {stat.color};">{stat.value}</div>
              <div class="stat-label">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Access Steps -->
      <div class="access-steps">
        <div class="steps-header">
          <h3 class="steps-title">YOUR PATH TO THE INNER CIRCLE</h3>
        </div>
        <div class="steps-grid">
          {#each accessSteps as step, index}
            <div class="step-card" class:active={currentStep === index} style="animation-delay: {index * 0.2}s;">
              <div class="step-number">{step.step}</div>
              <div class="step-icon">{step.icon}</div>
              <h4 class="step-title">{step.title}</h4>
              <p class="step-description">{step.description}</p>
              <div class="step-connector"></div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Email Signup Form -->
      <div class="signup-terminal">
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-controls">
              <span class="control close"></span>
              <span class="control minimize"></span>
              <span class="control maximize"></span>
            </div>
            <span class="terminal-title">early_access_request.exe</span>
          </div>
          
          <div class="terminal-body">
            {#if !showSuccess}
              <div class="terminal-content">
                <div class="input-line">
                  <span class="input-prompt">theteenspreneur@beta:~$</span>
                  <span class="input-command">request_access --email=</span>
                </div>
                
                <form on:submit|preventDefault={handleSubmit} class="access-form">
                  <div class="input-group">
                    <input 
                      type="email" 
                      bind:value={email}
                      placeholder="your.email@domain.com"
                      class="email-input"
                      required
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit" 
                      class="submit-btn"
                      disabled={!email || isSubmitting}
                    >
                      {#if isSubmitting}
                        <span class="loading-dots">PROCESSING</span>
                      {:else}
                        <span class="btn-text">EXECUTE</span>
                      {/if}
                      <div class="btn-glow"></div>
                    </button>
                  </div>
                </form>
                
                <div class="form-footer">
                  <p class="disclaimer">
                    <span class="warning-icon">⚠</span>
                    limited spots available. early access closes when we hit capacity.
                  </p>
                </div>
              </div>
            {:else}
              <div class="success-message">
                <div class="success-icon">✓</div>
                <div class="success-text">
                  <h4>ACCESS REQUEST CONFIRMED</h4>
                  <p>you're in the queue. expect intel soon.</p>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Final CTA -->
      <div class="final-cta">
        <div class="cta-content">
          <p class="cta-text">
            while others wait for permission,<br>
            <span class="cta-emphasis">you'll be building the future.</span>
          </p>
          <div class="cta-subtext">
            <span class="cta-line">></span>
            <span class="cta-message">the revolution starts with early access.</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</section>

<style>
  .early-access {
    min-height: 100vh;
    background: linear-gradient(135deg, #0A0B14 0%, #1A1B2E 50%, #0F0F1A 100%);
    position: relative;
    overflow: hidden;
    padding: 6rem 0;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease;
  }
  
  .early-access.visible {
    opacity: 1;
    transform: translateY(0);
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
    opacity: 0.15;
  }
  
  .grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, #00FF88, transparent);
    opacity: 0;
    animation: gridPulse 5s ease-in-out infinite;
  }
  
  .grid-line:nth-child(3n) {
    background: linear-gradient(90deg, transparent, #FF6B35, transparent);
  }
  
  .grid-line:nth-child(5n) {
    background: linear-gradient(90deg, transparent, #9D4EDD, transparent);
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
  
  @keyframes gridPulse {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.6; }
  }
  
  .floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .data-stream {
    position: absolute;
    width: 2px;
    height: 100px;
    background: linear-gradient(180deg, transparent, #00FF88, transparent);
    animation: dataFlow 3s ease-in-out infinite;
  }
  
  .stream-1 {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }
  
  .stream-2 {
    top: 60%;
    right: 20%;
    animation-delay: 1s;
    background: linear-gradient(180deg, transparent, #FF6B35, transparent);
  }
  
  .stream-3 {
    bottom: 30%;
    left: 70%;
    animation-delay: 2s;
    background: linear-gradient(180deg, transparent, #9D4EDD, transparent);
  }
  
  .floating-orb {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 1px solid rgba(0, 255, 136, 0.3);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.1), transparent);
    animation: orbFloat 6s ease-in-out infinite;
  }
  
  .orb-1 {
    top: 25%;
    right: 15%;
    animation-delay: 0s;
  }
  
  .orb-2 {
    bottom: 35%;
    left: 20%;
    animation-delay: 3s;
    border-color: rgba(255, 107, 53, 0.3);
    background: radial-gradient(circle, rgba(255, 107, 53, 0.1), transparent);
  }
  
  @keyframes dataFlow {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
  }
  
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
    z-index: 10;
  }
  
  .early-access-content {
    text-align: center;
  }
  
  .access-header {
    margin-bottom: 4rem;
  }
  
  .terminal-prompt {
    font-family: 'JetBrains Mono', monospace;
    color: #8892B0;
    margin-bottom: 2rem;
    font-size: 1rem;
  }
  
  .prompt-symbol {
    color: #00FF88;
  }
  
  .prompt-text {
    color: #FFFFFF;
  }
  
  .cursor-blink {
    animation: blink 1.2s infinite;
    color: #00FF88;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .access-title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 900;
    line-height: 0.9;
    margin-bottom: 2rem;
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .title-line {
    display: block;
    color: #8892B0;
  }
  
  .title-highlight {
    display: block;
    color: #00FF88;
    text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
    animation: titleGlow 2s ease-in-out infinite alternate;
  }
  
  @keyframes titleGlow {
    from { text-shadow: 0 0 30px rgba(0, 255, 136, 0.5); }
    to { text-shadow: 0 0 50px rgba(0, 255, 136, 0.8); }
  }
  
  .access-subtitle {
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    color: #8892B0;
    line-height: 1.5;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .subtitle-emphasis {
    color: #FFFFFF;
    font-weight: 600;
  }
  
  .urgency-dashboard {
    margin: 4rem 0;
    background: rgba(26, 27, 46, 0.8);
    border: 1px solid #2D2E3F;
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(10px);
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #2D2E3F;
  }
  
  .dashboard-title {
    font-family: 'JetBrains Mono', monospace;
    color: #00FF88;
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 1px;
  }
  
  .status-indicator {
    color: #00FF88;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  
  .stat-card {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: cardSlideIn 0.6s ease forwards;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  @keyframes cardSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Space Grotesk', sans-serif;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #8892B0;
    font-size: 0.9rem;
    text-transform: lowercase;
  }
  
  .access-steps {
    margin: 5rem 0;
  }
  
  .steps-header {
    margin-bottom: 3rem;
  }
  
  .steps-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #FFFFFF;
    font-family: 'Space Grotesk', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    position: relative;
  }
  
  .step-card {
    background: rgba(26, 27, 46, 0.6);
    border: 1px solid #2D2E3F;
    border-radius: 12px;
    padding: 2rem;
    position: relative;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: stepSlideIn 0.8s ease forwards;
  }
  
  .step-card.active {
    border-color: #00FF88;
    background: rgba(26, 27, 46, 0.9);
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
  }
  
  @keyframes stepSlideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .step-number {
    position: absolute;
    top: -15px;
    left: 2rem;
    background: #00FF88;
    color: #0A0B14;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .step-icon {
    font-size: 2.5rem;
    margin: 1rem 0;
  }
  
  .step-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 1rem;
    font-family: 'Space Grotesk', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .step-description {
    color: #8892B0;
    line-height: 1.5;
  }
  
  .signup-terminal {
    margin: 5rem 0;
    display: flex;
    justify-content: center;
  }
  
  .terminal-window {
    background: #0A0B14;
    border: 1px solid #00FF88;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(0, 255, 136, 0.2);
    max-width: 600px;
    width: 100%;
  }
  
  .terminal-header {
    background: #1A1B2E;
    padding: 1rem;
    border-bottom: 1px solid #2D2E3F;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .terminal-controls {
    display: flex;
    gap: 0.5rem;
  }
  
  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .control.close { background: #FF5F57; }
  .control.minimize { background: #FFBD2E; }
  .control.maximize { background: #28CA42; }
  
  .terminal-title {
    color: #8892B0;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9rem;
  }
  
  .terminal-body {
    padding: 2rem;
  }
  
  .terminal-content {
    font-family: 'JetBrains Mono', monospace;
  }
  
  .input-line {
    margin-bottom: 1.5rem;
    color: #8892B0;
  }
  
  .input-prompt {
    color: #00FF88;
    margin-right: 0.5rem;
  }
  
  .input-command {
    color: #FFFFFF;
  }
  
  .access-form {
    margin-bottom: 2rem;
  }
  
  .input-group {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .email-input {
    flex: 1;
    background: rgba(26, 27, 46, 0.8);
    border: 1px solid #2D2E3F;
    border-radius: 6px;
    padding: 1rem;
    color: #FFFFFF;
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .email-input:focus {
    outline: none;
    border-color: #00FF88;
    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
  }
  
  .email-input::placeholder {
    color: #8892B0;
  }
  
  .submit-btn {
    background: linear-gradient(135deg, #00FF88, #00CC6A);
    color: #0A0B14;
    border: none;
    padding: 1rem 2rem;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 255, 136, 0.3);
  }
  
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .loading-dots {
    animation: loadingDots 1.5s infinite;
  }
  
  @keyframes loadingDots {
    0%, 20% { content: 'PROCESSING'; }
    40% { content: 'PROCESSING.'; }
    60% { content: 'PROCESSING..'; }
    80%, 100% { content: 'PROCESSING...'; }
  }
  
  .btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  
  .submit-btn:hover .btn-glow {
    left: 100%;
  }
  
  .form-footer {
    text-align: left;
  }
  
  .disclaimer {
    color: #8892B0;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .warning-icon {
    color: #FFD60A;
  }
  
  .success-message {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: rgba(0, 255, 136, 0.1);
    border: 1px solid #00FF88;
    border-radius: 8px;
  }
  
  .success-icon {
    width: 60px;
    height: 60px;
    background: #00FF88;
    color: #0A0B14;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .success-text h4 {
    color: #00FF88;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .success-text p {
    color: #FFFFFF;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .final-cta {
    margin-top: 4rem;
  }
  
  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .cta-text {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    color: #8892B0;
    line-height: 1.4;
    margin-bottom: 1.5rem;
  }
  
  .cta-emphasis {
    color: #00FF88;
    font-weight: 700;
  }
  
  .cta-subtext {
    font-family: 'JetBrains Mono', monospace;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .cta-line {
    color: #00FF88;
  }
  
  .cta-message {
    font-weight: 600;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .early-access {
      padding: 4rem 0;
    }
    
    .container {
      padding: 0 1rem;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .steps-grid {
      grid-template-columns: 1fr;
    }
    
    .input-group {
      flex-direction: column;
      align-items: stretch;
    }
    
    .submit-btn {
      padding: 1rem;
    }
    
    .success-message {
      flex-direction: column;
      text-align: center;
    }
    
    .floating-orb {
      width: 60px;
      height: 60px;
    }
    
    .grid-background.show-grid {
      opacity: 0.1;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .terminal-body {
      padding: 1.5rem;
    }
    
    .step-card {
      padding: 1.5rem;
    }
    
    .access-title {
      font-size: 2.5rem;
    }
  }
  
  /* Accessibility and Performance */
  @media (prefers-reduced-motion: reduce) {
    .grid-line,
    .data-stream,
    .floating-orb,
    .cursor-blink {
      animation: none;
    }
    
    .grid-background.show-grid {
      opacity: 0.05;
    }
    
    .floating-elements {
      display: none;
    }
  }
  
  @media (prefers-contrast: high) {
    .early-access {
      background: #000000;
    }
    
    .terminal-window,
    .urgency-dashboard,
    .step-card {
      border-color: #FFFFFF;
    }
    
    .submit-btn {
      background: #FFFFFF;
      color: #000000;
    }
  }
</style>