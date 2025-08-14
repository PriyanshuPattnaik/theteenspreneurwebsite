<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut, backOut, elasticOut } from 'svelte/easing';

  let isVisible = false;
  let heroSection: HTMLElement;
  let letterSection: HTMLElement;
  let teamSection: HTMLElement;
  let manifestoSection: HTMLElement;
  
  // Enhanced animation stores
  const heroOpacity = tweened(0, { duration: 1500, easing: cubicOut });
  const letterOpacity = tweened(0, { duration: 1200, easing: cubicOut });
  const teamOpacity = tweened(0, { duration: 800, easing: cubicOut });
  const manifestoOpacity = tweened(0, { duration: 1000, easing: cubicOut });
  const glitchIntensity = tweened(0, { duration: 200 });
  const scanlineProgress = tweened(0, { duration: 3000, easing: cubicOut });

  // Team members data with cyberpunk roles
  const team = [
    {
      name: "Priyanshu Pattnaik",
      role: "Founder & CEO",
      subtitle: "The Wannabe Tony Stark",
      description: "building the impossible since he learned to code. believes teenagers don't need permission to change the world. drinks coffee like it's code fuel and codes like the matrix is real.",
      image: "assets/team/priyanshu.png",
      accent: "primary",
      status: "SYSTEM_ARCHITECT"
    },
    {
      name: "Khyati Kapur",
      role: "Business Development & Strategy",
      subtitle: "The Neural Network",
      description: "turns chaos into systems. makes sure our rebellion actually builds something that matters. sees patterns where others see noise. the brain behind our digital revolution.",
      image: "assets/team/khyati.png",
      accent: "secondary",
      status: "VISION_CORE"
    },
    {
      name: "Shubham Chakrovorty",
      role: "Partner & Business Operations",
      subtitle: "The Reality Compiler",
      description: "takes wild ideas and makes them work in the real world. bridges dreams and delivery. speaks fluent startup and translates visions into victories.",
      image: "assets/team/shubham.png",
      accent: "tertiary",
      status: "EXECUTION_ENGINE"
    },
    {
      name: "Atharva Cholke",
      role: "Operations & Systems",
      subtitle: "The Infrastructure Hacker",
      description: "builds the infrastructure that lets thousands of teen founders scale their dreams simultaneously. architecting the backbone of teenage entrepreneurship.",
      image: "/atharva-cyber.jpg",
      accent: "quaternary",
      status: "SCALE_PROTOCOL"
    }
  ];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === heroSection) {
            heroOpacity.set(1);
            scanlineProgress.set(1);
            isVisible = true;
          }
          if (entry.target === letterSection) {
            letterOpacity.set(1);
          }
          if (entry.target === teamSection) {
            teamOpacity.set(1);
          }
          if (entry.target === manifestoSection) {
            manifestoOpacity.set(1);
          }
        }
      });
    }, { threshold: 0.2 });

    if (heroSection) observer.observe(heroSection);
    if (letterSection) observer.observe(letterSection);
    if (teamSection) observer.observe(teamSection);
    if (manifestoSection) observer.observe(manifestoSection);

    const glitchTimer = setInterval(() => {
      if (Math.random() > 0.92) {
        glitchIntensity.set(1);
        setTimeout(() => glitchIntensity.set(0), Math.random() * 300 + 100);
      }
    }, 800);

    return () => {
      observer.disconnect();
      clearInterval(glitchTimer);
    };
  });

  let mouseX = 0;
  let mouseY = 0;
  
  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<main class="about-page" style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;">
  <div class="bg-matrix"></div>
  <div class="bg-grid"></div>
  <div class="bg-neural-network"></div>
  <div class="cursor-glow"></div>
  <div class="scanlines" style="transform: translateY({$scanlineProgress * 100}vh)"></div>

  <div class="terminal-header">
    <div class="terminal-controls">
      <div class="control close"></div>
      <div class="control minimize"></div>
      <div class="control maximize"></div>
    </div>
    <div class="terminal-title">TEENSPRENEUR_SYSTEM_v2.0 - ABOUT_MODULE_LOADED</div>
  </div>

  <section bind:this={heroSection} class="hero" style="opacity: {$heroOpacity}">
    <div class="container">
      <div class="hero-content" class:glitch={$glitchIntensity > 0.5}>
        <div class="system-status">
          <div class="status-line">
            <span class="prompt">$</span>
            <span class="command">initializing_rebellion.exe</span>
          </div>
          <div class="status-line">
            <span class="prompt">></span>
            <span class="output">system status: OPERATIONAL</span>
          </div>
          <div class="status-line">
            <span class="prompt">></span>
            <span class="output">teenage dreams: LOADING...</span>
          </div>
        </div>
        
        <h1 class="hero-title">
          <span class="line-1">we're not building</span>
          <span class="line-2 accent-text">a startup.</span>
          <span class="line-3">we're hacking</span>
          <span class="line-4 accent-text">the future.</span>
        </h1>

        <div class="hologram-display">
          <div class="hologram-text">REBELLION_PROTOCOL_ACTIVE</div>
          <div class="data-stream"></div>
        </div>
      </div>
    </div>
  </section>

  <section bind:this={letterSection} class="letter-section" style="opacity: {$letterOpacity}">
    <div class="container">
      <div class="letter-content">
        <div class="letter-header">
          <div class="timestamp">2024.07.19_03:42:AM</div>
          <div class="sender">FROM: the_rebels@teenspreneur.system</div>
          <div class="recipient">TO: every_teenager_who_refuses_to_wait</div>
        </div>

        <div class="letter-body">
          <p class="opening">dear future founder,</p>

          <p>if you're reading this, you probably feel it too. that restless energy. that voice in your head saying "I could build something that matters" while adults tell you to wait until you're "ready."</p>

          <p><strong>here's the thing they won't tell you:</strong> you're already ready.</p>

          <p>we started TheTeenspreneur because we got tired of watching brilliant teenagers get told to sit down, shut up, and wait their turn. tired of seeing 16-year-olds with world-changing ideas get dismissed because they don't have a degree or 10 years of "experience."</p>

          <p class="highlight">that's bullshit. and we're done with it.</p>

          <p>mark zuckerberg was 19. bill gates was 20. steve jobs was 21. they didn't wait for permission. they didn't ask if they were qualified. they just built.</p>

          <p>but here's what they had that you might not: a system. a network. people who believed in them when nobody else did.</p>

          <p><strong>that's what we're building.</strong></p>

          <p>not another "youth program" with condescending adults patting you on the head. not another competition where you pitch to judges who don't get it. we're building the infrastructure for teenage rebellion. the tools, the network, the resources you need to build something real.</p>

          <p>because entrepreneurship isn't about age. it's about vision. and teenagers have the clearest vision of all - you haven't been told what's impossible yet.</p>

          <p class="closing">so here's our promise: we'll give you the tools. you bring the audacity.</p>

          <div class="signature">
            <p>let's break some rules,</p>
            <p class="signature-name">the founder</p>
            <p class="signature-name">priyanshu</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section bind:this={teamSection} class="team-section" style="opacity: {$teamOpacity}">
    <div class="container">
      <h2 class="section-title">
        <span class="title-bracket">[</span>
        <span class="title-text">the_architects</span>
        <span class="title-bracket">]</span>
      </h2>
      <p class="team-intro">four rebels who decided the old rules don't apply to teenage potential.</p>
      
      <div class="team-grid">
        {#each team as member, index}
          <div class="team-card" style="--delay: {index * 150}ms">
            <div class="card-terminal">
              <div class="terminal-bar">
                <div class="terminal-dots">
                  <div class="dot red"></div>
                  <div class="dot yellow"></div>
                  <div class="dot green"></div>
                </div>
                <div class="terminal-filename">{member.status}.profile</div>
              </div>
              
              <div class="card-content">
                <div class="member-image">
                  <div class="image-placeholder" style="background-image: url({member.image});">
                    <div class="wireframe-overlay"></div>
                    <div class="scan-line"></div>
                    <div class="status-indicator">{member.status}</div>
                  </div>
                </div>
                
                <div class="member-data">
                  <div class="data-field">
                    <span class="field-label">NAME:</span>
                    <span class="field-value">{member.name}</span>
                  </div>
                  <div class="data-field">
                    <span class="field-label">ROLE:</span>
                    <span class="field-value accent-text">{member.role}</span>
                  </div>
                  <div class="data-field">
                    <span class="field-label">ALIAS:</span>
                    <span class="field-value">{member.subtitle}</span>
                  </div>
                  <div class="bio-section">
                    <div class="field-label">BIO:</div>
                    <div class="bio-text">{member.description}</div>
                  </div>
                </div>
              </div>
              
              <div class="card-footer">
                <div class="status-bar">STATUS: ACTIVE</div>
                <div class="access-level">ACCESS_LEVEL: FOUNDER</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section bind:this={manifestoSection} class="manifesto-section" style="opacity: {$manifestoOpacity}">
    <div class="container">
      <div class="manifesto-content">
        <h2 class="manifesto-title">our_manifesto.txt</h2>
        
        <div class="manifesto-terminal">
          <div class="manifesto-item">
            <span class="line-number">01</span>
            <span class="manifesto-text">teenagers are the most underestimated force on the planet. that's about to change.</span>
          </div>
          <div class="manifesto-item">
            <span class="line-number">02</span>
            <span class="manifesto-text">entrepreneurship isn't taught in schools because schools are designed to create employees, not creators.</span>
          </div>
          <div class="manifesto-item">
            <span class="line-number">03</span>
            <span class="manifesto-text">the next trillion-dollar company won't come from silicon valley. it'll come from someone's bedroom at 2am.</span>
          </div>
          <div class="manifesto-item">
            <span class="line-number">04</span>
            <span class="manifesto-text">community beats competition. always. that's why we're building the most connected teenage entrepreneur ecosystem in history.</span>
          </div>
          <div class="manifesto-item">
            <span class="line-number">05</span>
            <span class="manifesto-text">permission is overrated. execution is everything.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <div class="cta-terminal">
        <div class="cta-prompt">
          <span class="prompt">$</span>
          <span class="command">join_the_rebellion</span>
          <span class="cursor-blink">_</span>
        </div>
        <div class="cta-message">
          <p>this isn't a program. it's a movement.</p>
          <p>and movements need builders.</p>
        </div>
        <button class="cta-button">
          <span class="button-text">initialize_sequence</span>
          <div class="button-glow"></div>
        </button>
      </div>
    </div>
  </section>
</main>

<style>
  :root {
    --midnight-black: #0A0B14;
    --electric-lime: #00FF44;
    --neon-green: #00DD33;
    --deep-navy: #1A1B2E;
    --slate-gray: #8892B0;
    --dark-charcoal: #2D2E3F;
    --pure-white: #FFFFFF;
    --terminal-green: #00FF44;
    --warning-red: #FF3366;
    --warning-yellow: #FFDD33;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .about-page {
    background: var(--midnight-black);
    color: var(--pure-white);
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    overflow-x: hidden;
    position: relative;
    line-height: 1.6;
    min-height: 100vh;
  }

  .bg-matrix {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 255, 68, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 68, 0.02) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: matrix-scroll 25s linear infinite;
    z-index: 1;
  }

  .bg-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: 
      linear-gradient(rgba(0, 221, 51, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 221, 51, 0.05) 1px, transparent 1px);
    background-size: 80px 80px;
    z-index: 1;
  }

  .bg-neural-network {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle at 20% 50%, rgba(0, 255, 68, 0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 255, 68, 0.02) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(0, 255, 68, 0.02) 0%, transparent 50%);
    z-index: 1;
  }

  .cursor-glow {
    position: fixed;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 68, 0.08) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    left: var(--mouse-x);
    top: var(--mouse-y);
    z-index: 2;
    transition: opacity 0.3s ease;
    opacity: 0.8;
  }

  .scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--terminal-green), transparent);
    z-index: 2;
    opacity: 0.6;
    box-shadow: 0 0 10px var(--terminal-green);
    animation: scanlines-move 5s linear infinite;
  }

  @keyframes matrix-scroll {
    0% { transform: translateY(0); }
    100% { transform: translateY(30px); }
  }

  @keyframes scanlines-move {
    0% { transform: translateY(0); }
    100% { transform: translateY(100vh); }
  }

  .terminal-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: var(--dark-charcoal);
    border-bottom: 1px solid var(--terminal-green);
    display: flex;
    align-items: center;
    padding: 0 1rem;
    z-index: 10;
    font-size: 0.75rem;
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

  .control.close { background: var(--warning-red); }
  .control.minimize { background: var(--warning-yellow); }
  .control.maximize { background: var(--terminal-green); }

  .terminal-title {
    color: var(--terminal-green);
    font-weight: 600;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
    z-index: 3;
  }

  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 40px;
    text-align: center;
  }

  .hero-content {
    width: 100%;
    max-width: 600px;
  }

  .system-status {
    margin-bottom: 2rem;
    font-size: 0.875rem;
  }

  .status-line {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }

  .prompt {
    color: var(--terminal-green);
    font-weight: 700;
  }

  .command {
    color: var(--pure-white);
  }

  .output {
    color: var(--slate-gray);
  }

  .hero-title {
    font-size: clamp(1.5rem, 10vw, 5rem);
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 2rem;
  }

  .hero-title span {
    display: block;
    animation: slide-up 0.8s ease forwards;
    opacity: 0;
    transform: translateY(30px);
  }

  .hero-title .line-1 { animation-delay: 0.3s; }
  .hero-title .line-2 { animation-delay: 0.5s; }
  .hero-title .line-3 { animation-delay: 0.7s; }
  .hero-title .line-4 { animation-delay: 0.9s; }

  @keyframes slide-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .accent-text {
    color: var(--terminal-green);
    text-shadow: 0 0 20px rgba(0, 255, 68, 0.5);
  }

  .hologram-display {
    border: 1px solid var(--terminal-green);
    padding: 1.5rem;
    background: rgba(0, 255, 68, 0.03);
    position: relative;
    margin-top: 1.5rem;
    border-radius: 8px;
  }

  .hologram-text {
    color: var(--terminal-green);
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
    animation: flicker 3s infinite;
  }

  .data-stream {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--terminal-green);
    animation: stream 2s linear infinite;
  }

  @keyframes flicker {
    0%, 95% { opacity: 1; }
    96%, 98% { opacity: 0.5; }
    99%, 100% { opacity: 1; }
  }

  @keyframes stream {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .letter-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, var(--deep-navy), var(--midnight-black));
  }

  .letter-content {
    max-width: 600px;
    margin: 0 auto;
    background: var(--dark-charcoal);
    border: 1px solid var(--terminal-green);
    padding: 1.5rem;
    border-radius: 8px;
  }

  .letter-header {
    border-bottom: 1px solid var(--slate-gray);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    font-size: 0.75rem;
    color: var(--slate-gray);
    text-align: center;
  }

  .timestamp, .sender, .recipient {
    margin-bottom: 0.25rem;
  }

  .letter-body {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }

  .opening {
    color: var(--terminal-green);
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .letter-body p {
    margin-bottom: 1rem;
  }

  .highlight {
    background: linear-gradient(120deg, transparent 0%, rgba(0, 255, 68, 0.2) 50%, transparent 100%);
    padding: 0.5rem;
    border-left: 3px solid var(--terminal-green);
    margin: 1.5rem 0;
    font-weight: 600;
  }

  .closing {
    margin-top: 2rem;
    font-style: italic;
  }

  .signature {
    margin-top: 1.5rem;
    text-align: right;
  }

  .signature-name {
    color: var(--terminal-green);
    font-weight: 700;
  }

  .team-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .title-bracket {
    color: var(--terminal-green);
  }

  .team-intro {
    text-align: center;
    font-size: 1rem;
    color: var(--slate-gray);
    margin-bottom: 2rem;
    font-style: italic;
  }

  .team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0.5rem;
  }

  .team-card {
    animation: fade-in-up 0.8s ease forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateY(30px);
  }

  @keyframes fade-in-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-terminal {
    background: var(--dark-charcoal);
    border: 1px solid var(--terminal-green);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 100%;
  }

  .card-terminal:hover {
    border-color: var(--terminal-green);
    box-shadow: 0 0 20px rgba(0, 255, 68, 0.2);
    transform: translateY(-5px);
  }

  .terminal-bar {
    background: var(--midnight-black);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--terminal-green);
  }

  .terminal-dots {
    display: flex;
    gap: 0.25rem;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot.red { background: var(--warning-red); }
  .dot.yellow { background: var(--warning-yellow); }
  .dot.green { background: var(--terminal-green); }

  .terminal-filename {
    font-size: 0.75rem;
    color: var(--terminal-green);
  }

  .card-content {
    padding: 1rem;
  }

  .member-image {
    height: 200px;
    margin-bottom: 1rem;
    position: relative;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border: 1px dashed var(--terminal-green);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .wireframe-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(var(--terminal-green) 1px, transparent 1px),
      linear-gradient(90deg, var(--terminal-green) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.3;
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--terminal-green);
    animation: scan-vertical 3s linear infinite;
    box-shadow: 0 0 10px var(--terminal-green);
  }

  @keyframes scan-vertical {
    0% { top: -2px; }
    100% { top: 100%; }
  }

  .status-indicator {
    color: var(--terminal-green);
    font-size: 0.75rem;
    font-weight: 600;
    text-align: center;
  }

  .member-data {
    font-size: 0.875rem;
  }

  .data-field {
    display: flex;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  .field-label {
    color: var(--terminal-green);
    min-width: 60px;
    font-weight: 600;
  }

  .field-value {
    color: var(--pure-white);
  }

  .bio-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--slate-gray);
  }

  .bio-text {
    color: var(--slate-gray);
    line-height: 1.4;
    margin-top: 0.5rem;
    font-style: italic;
  }

  .card-footer {
    background: var(--midnight-black);
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--terminal-green);
    display: flex;
    justify-content: space-between;
    font-size: 0.625rem;
    color: var(--terminal-green);
  }

  .manifesto-section {
    padding: 4rem 0;
    background: linear-gradient(135deg, var(--midnight-black), var(--deep-navy));
  }

  .manifesto-title {
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--terminal-green);
  }

  .manifesto-terminal {
    background: var(--dark-charcoal);
    border: 1px solid var(--terminal-green);
    padding: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
    border-radius: 8px;
  }

  .manifesto-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: flex-start;
  }

  .line-number {
    color: var(--terminal-green);
    font-weight: 700;
    min-width: 20px;
  }

  .manifesto-text {
    color: var(--pure-white);
    font-size: 0.9rem;
  }

  .cta-section {
    padding: 4rem 0;
    background: var(--deep-navy);
    text-align: center;
  }

  .cta-terminal {
    background: var(--dark-charcoal);
    border: 1px solid var(--terminal-green);
    padding: 1.5rem;
    max-width: 400px;
    margin: 0 auto;
    border-radius: 8px;
  }

  .cta-prompt {
    font-size: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .cta-message p {
    font-size: 0.9rem;
    color: var(--slate-gray);
    margin-bottom: 1rem;
  }

  .cta-button {
    background: none;
    border: 2px solid var(--terminal-green);
    color: var(--terminal-green);
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    border-radius: 4px;
  }

  .cta-button:hover {
    background: var(--terminal-green);
    color: var(--midnight-black);
    transform: scale(1.05);
  }

  .button-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(0, 255, 68, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
  }

  .cta-button:hover .button-glow {
    width: 200px;
    height: 200px;
  }

  /* Mobile-First Responsive Design */
  @media (min-width: 481px) {
    .container { padding: 0 2rem; }
    .hero-content { max-width: 800px; }
    .hero-title { font-size: clamp(2rem, 8vw, 5rem); }
    .hologram-display { padding: 2rem; }
    .letter-content { padding: 2rem; max-width: 800px; }
    .team-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
    .member-image { height: 250px; }
    .manifesto-terminal { max-width: 900px; padding: 2rem; }
    .manifesto-text { font-size: 1rem; }
    .cta-terminal { max-width: 600px; padding: 2rem; }
    .cta-message p { font-size: 1.125rem; }
    .cta-button { padding: 0.75rem 2rem; font-size: 1rem; }
  }

  @media (min-width: 769px) {
    .hero { min-height: 100vh; }
    .hero-content { padding: 0; }
    .system-status { font-size: 1rem; }
    .letter-section, .team-section, .manifesto-section, .cta-section { padding: 6rem 0; }
    .section-title { font-size: 3rem; }
    .team-intro { font-size: 1.125rem; }
    .manifesto-title { font-size: 2.5rem; }
    .manifesto-item { flex-direction: row; }
    .cursor-glow { width: 300px; height: 300px; opacity: 1; }
  }

  @media (min-width: 1025px) {
    .container { padding: 0 2rem; }
    .hero-title { font-size: clamp(2.5rem, 8vw, 5rem); }
    .hologram-display { padding: 2rem; }
    .letter-content { padding: 3rem; }
    .team-grid { gap: 2rem; }
    .member-image { height: 200px; }
    .manifesto-terminal { padding: 2rem; }
    .cta-terminal { padding: 2rem; }
  }
</style>