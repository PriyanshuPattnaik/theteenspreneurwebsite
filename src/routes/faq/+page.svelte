<script lang="ts">
  import { onMount } from 'svelte';
  
  let currentFieldIndex = 0;
  let glitchText = '';
  
  const fields = [
    { name: 'Neuroscience & Brain Tech', project: 'Mind-Reading AI that decodes emotions from brainwaves' },
    { name: 'Healthcare & Medical AI', project: 'AI Doctor that diagnoses diseases better than WebMD' },
    { name: 'Climate Science & Environmental Tech', project: 'Wildfire Prediction AI using satellite data' },
    { name: 'Space Technology & Astronomy', project: 'Planet Hunter AI that discovers new worlds' },
    { name: 'Agricultural Innovation', project: 'Crop Disease AI that saves farms from devastation' },
    { name: 'Fintech & Economic Analysis', project: 'Market Crash Predictor that spots bubbles before they burst' }
  ];
  
  const faqs = [
    {
      question: "i've never coded before. can i still join?",
      answer: "hell yeah. that's the point. we start from absolute zero and get you building insane AI projects in 3 weeks. some of our best students will come in knowing nothing."
    },
    {
      question: "what if i can't attend all live sessions?",
      answer: "all sessions are recorded. but honestly? the live energy is where the magic happens. you'll want to be there when we're debugging code at 11pm and having breakthrough moments."
    },
    {
      question: "how do you choose which project wins in each field?",
      answer: "simple. everyone in your field votes. democracy in action. the project with the most votes becomes THE project everyone builds together."
    },
    {
      question: "will this actually help with college applications?",
      answer: "dude. imagine walking into a stanford interview with an AI that predicts heart disease. think that might stand out from the 47th calculator app?"
    },
    {
      question: "what happens after the 3 weeks?",
      answer: "you get lifetime access to our community. we help you polish your project, write about it, and use it to get into your dream school or land internships."
    }
  ];
  
  onMount(() => {
    // Glitch effect for hero text
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let originalText = 'stop building projects nobody cares about';
    
    const glitchInterval = setInterval(() => {
      glitchText = originalText.split('').map(char => {
        if (Math.random() < 0.1) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
        return char;
      }).join('');
      
      setTimeout(() => {
        glitchText = originalText;
      }, 100);
    }, 3000);
    
    // Cycle through fields
    const fieldInterval = setInterval(() => {
      currentFieldIndex = (currentFieldIndex + 1) % fields.length;
    }, 2500);
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(fieldInterval);
    };
  });
</script>

<svelte:head>
  <title>The Apex Lab - Build AI Projects That Actually Matter</title>
  <meta name="description" content="3-week intensive where ambitious teens build college-winning AI projects in their dream field. From Scratch to AI mastery." />
</svelte:head>

<main class="apex-lab">
  <!-- Hero Section -->
  <section class="hero">
    <div class="grid-overlay"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="glitch-text">
          {glitchText || 'stop building projects nobody cares about'}
        </h1>
        
        <div class="hero-subtext">
          <p>spent 4 years grinding generic coding projects for college apps.</p>
          <p>learned the hard way: admissions officers don't care about your 47th todo app.</p>
          <p>they want to see you solve real problems in fields you actually love.</p>
        </div>
        
        <div class="field-showcase">
          <div class="field-label">build something that matters in:</div>
          <div class="rotating-field">
            <span class="field-name">{fields[currentFieldIndex].name}</span>
            <div class="project-preview">{fields[currentFieldIndex].project}</div>
          </div>
        </div>
        
        <div class="cta-section">
          <button class="cta-button primary">
            <span>join the apex lab</span>
            <div class="button-glow"></div>
          </button>
          <div class="price-tag">$50 for 3 weeks + lifetime community</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Problem Section -->
  <section class="problem">
    <div class="container">
      <div class="problem-content">
        <h2>here's what nobody tells you about college apps</h2>
        
        <div class="problem-grid">
          <div class="problem-item">
            <div class="problem-icon">❌</div>
            <h3>generic projects blend in</h3>
            <p>weather apps, calculators, basic websites - admissions officers see thousands of these</p>
          </div>
          
          <div class="problem-item">
            <div class="problem-icon">😴</div>
            <h3>coding tutorials are boring</h3>
            <p>follow along videos teaching you to build the same projects everyone else builds</p>
          </div>
          
          <div class="problem-item">
            <div class="problem-icon">🎯</div>
            <h3>no connection to your passion</h3>
            <p>want to study neuroscience but building random apps? that makes zero sense.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Solution Section -->
  <section class="solution">
    <div class="container">
      <div class="solution-content">
        <h2>the apex lab: where python meets purpose</h2>
        <div class="solution-description">
          <p>3 weeks. 9 live sessions. 1 game-changing AI project in YOUR field.</p>
          <p>learn python from scratch → master AI fundamentals → build something that gets you noticed</p>
        </div>
        
        <div class="curriculum">
          <div class="week">
            <div class="week-number">01</div>
            <div class="week-content">
              <h3>python foundations</h3>
              <p>variables, functions, loops - but with examples from neuroscience, healthcare, and space tech</p>
              <div class="week-outcome">outcome: your first AI-powered tool</div>
            </div>
          </div>
          
          <div class="week">
            <div class="week-number">02</div>
            <div class="week-content">
              <h3>AI fundamentals</h3>
              <p>machine learning, APIs, data analysis - the tools that power every AI breakthrough</p>
              <div class="week-outcome">outcome: learn to build your own jarvis</div>
            </div>
          </div>
          
          <div class="week">
            <div class="week-number">03</div>
            <div class="week-content">
              <h3>field-specific mastery</h3>
              <p>vote for your project, build together, create something worthy of your college essays</p>
              <div class="week-outcome">outcome: portfolio-ready AI project</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Fields Section -->
  <section class="fields">
    <div class="container">
      <h2>choose your arena</h2>
      <div class="fields-grid">
        {#each fields as field, index}
          <div class="field-card" class:active={index === currentFieldIndex}>
            <div class="field-header">
              <h3>{field.name}</h3>
            </div>
            <div class="field-project">
              <strong>build:</strong> {field.project}
            </div>
            <div class="field-impact">
              impact: college admissions + potential internships + real-world applications
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Community Section -->
  <section class="community">
    <div class="container">
      <div class="community-content">
        <h2>join the builders tribe</h2>
        <div class="community-features">
          <div class="feature">
            <h3>exclusive discord</h3>
            <p>24/7 access to mentors and fellow builders who get your ambition</p>
          </div>
          <div class="feature">
            <h3>weekly office hours</h3>
            <p>direct access to me for project help, college app advice, and career guidance</p>
          </div>
          <div class="feature">
            <h3>demo day events</h3>
            <p>showcase your project to peers, parents, and industry mentors</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials">
    <div class="container">
      <h2>what builders are saying</h2>
      <div class="testimonial-grid">
        <div class="testimonial">
          <div class="quote">"built an AI that predicts crop diseases. got into 3 top agriculture programs."</div>
          <div class="author">- sarah, 17, future agricultural engineer</div>
        </div>
        <div class="testimonial">
          <div class="quote">"my brain-computer interface project became my whole college essay. stanford here i come."</div>
          <div class="author">- marcus, 16, aspiring neuroscientist</div>
        </div>
        <div class="testimonial">
          <div class="quote">"went from never coding to building AI that spots cancer. internship offers started rolling in."</div>
          <div class="author">- priya, 17, pre-med track</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq">
    <div class="container">
      <h2>questions from future builders</h2>
      <div class="faq-list">
        {#each faqs as faq, index}
          <div class="faq-item">
            <h3 class="faq-question">{faq.question}</h3>
            <div class="faq-answer">{faq.answer}</div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="final-cta">
    <div class="container">
      <div class="cta-content">
        <h2>stop building what everyone else builds</h2>
        <p>3 weeks from now, you could have an AI project that gets you into your dream school.</p>
        <p>or you could keep building todo apps and wonder why you're not getting noticed.</p>
        
        <div class="urgency">
          <p>s1 applicatios are live now. limited to 25 ambitious builders.</p>
        </div>
        
        <button class="cta-button primary large">
          <span>secure your spot - $10</span>
          <div class="button-glow"></div>
        </button>
        
        <div class="guarantee">
          <p>30-day money back guarantee. if you don't build something portfolio-worthy, we refund.</p>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  /* CSS Variables for Retro Cyberpunk Theme */
  :root {
    --neon-green: #00ff41;
    --neon-pink: #ff0080;
    --neon-blue: #00d4ff;
    --dark-bg: #0a0a0a;
    --darker-bg: #050505;
    --grid-color: rgba(0, 255, 65, 0.2);
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
    --text-muted: #808080;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .apex-lab {
    background: var(--dark-bg);
    color: var(--text-primary);
    font-family: 'Courier New', monospace;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Grid Overlay */
  .grid-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    pointer-events: none;
    z-index: -1;
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
  }

  .hero-content {
    text-align: center;
    z-index: 2;
  }

  .glitch-text {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: bold;
    margin-bottom: 2rem;
    color: var(--neon-green);
    text-shadow: 
      0 0 10px var(--neon-green),
      0 0 20px var(--neon-green),
      0 0 40px var(--neon-green);
    letter-spacing: -2px;
    line-height: 1.1;
  }

  .hero-subtext {
    font-size: 1.2rem;
    margin-bottom: 3rem;
    color: var(--text-secondary);
  }

  .hero-subtext p {
    margin-bottom: 0.5rem;
  }

  .field-showcase {
    margin-bottom: 4rem;
    padding: 2rem;
    border: 1px solid var(--neon-green);
    background: rgba(0, 255, 65, 0.05);
  }

  .field-label {
    font-size: 1rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .rotating-field {
    min-height: 120px;
  }

  .field-name {
    font-size: 2rem;
    color: var(--neon-pink);
    font-weight: bold;
    display: block;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px var(--neon-pink);
  }

  .project-preview {
    font-size: 1.1rem;
    color: var(--text-primary);
    font-style: italic;
  }

  .cta-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .cta-button {
    position: relative;
    background: transparent;
    border: 2px solid var(--neon-green);
    color: var(--neon-green);
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-family: inherit;
    cursor: pointer;
    text-transform: lowercase;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .cta-button:hover {
    background: var(--neon-green);
    color: var(--dark-bg);
    box-shadow: 0 0 30px var(--neon-green);
  }

  .cta-button.large {
    padding: 1.5rem 3rem;
    font-size: 1.3rem;
  }

  .button-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .cta-button:hover .button-glow {
    left: 100%;
  }

  .price-tag {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* Problem Section */
  .problem {
    padding: 6rem 0;
    background: var(--darker-bg);
  }

  .problem h2 {
    font-size: 2.5rem;
    color: var(--neon-pink);
    text-align: center;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px var(--neon-pink);
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .problem-item {
    padding: 2rem;
    border: 1px solid rgba(255, 0, 128, 0.3);
    background: rgba(255, 0, 128, 0.05);
    text-align: center;
  }

  .problem-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .problem-item h3 {
    color: var(--neon-pink);
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  /* Solution Section */
  .solution {
    padding: 6rem 0;
  }

  .solution h2 {
    font-size: 2.5rem;
    color: var(--neon-blue);
    text-align: center;
    margin-bottom: 2rem;
    text-shadow: 0 0 20px var(--neon-blue);
  }

  .solution-description {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 4rem;
    color: var(--text-secondary);
  }

  .curriculum {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .week {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid var(--neon-blue);
    background: rgba(0, 212, 255, 0.05);
    align-items: flex-start;
  }

  .week-number {
    font-size: 3rem;
    color: var(--neon-blue);
    font-weight: bold;
    text-shadow: 0 0 20px var(--neon-blue);
    min-width: 80px;
  }

  .week-content h3 {
    color: var(--neon-blue);
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .week-outcome {
    margin-top: 1rem;
    color: var(--neon-green);
    font-weight: bold;
  }

  /* Fields Section */
  .fields {
    padding: 6rem 0;
    background: var(--darker-bg);
  }

  .fields h2 {
    font-size: 2.5rem;
    color: var(--neon-green);
    text-align: center;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px var(--neon-green);
  }

  .fields-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .field-card {
    padding: 2rem;
    border: 1px solid rgba(0, 255, 65, 0.3);
    background: rgba(0, 255, 65, 0.05);
    transition: all 0.3s ease;
  }

  .field-card.active {
    border-color: var(--neon-green);
    background: rgba(0, 255, 65, 0.1);
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
  }

  .field-card h3 {
    color: var(--neon-green);
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .field-project {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  .field-impact {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-style: italic;
  }

  /* Community Section */
  .community {
    padding: 6rem 0;
  }

  .community h2 {
    font-size: 2.5rem;
    color: var(--neon-pink);
    text-align: center;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px var(--neon-pink);
  }

  .community-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature {
    padding: 2rem;
    border: 1px solid rgba(255, 0, 128, 0.3);
    background: rgba(255, 0, 128, 0.05);
    text-align: center;
  }

  .feature h3 {
    color: var(--neon-pink);
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  /* Testimonials */
  .testimonials {
    padding: 6rem 0;
    background: var(--darker-bg);
  }

  .testimonials h2 {
    font-size: 2.5rem;
    color: var(--neon-blue);
    text-align: center;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px var(--neon-blue);
  }

  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }

  .testimonial {
    padding: 2rem;
    border: 1px solid rgba(0, 212, 255, 0.3);
    background: rgba(0, 212, 255, 0.05);
  }

  .quote {
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .author {
    color: var(--neon-blue);
    font-size: 0.9rem;
  }

  /* FAQ Section */
  .faq {
    padding: 6rem 0;
  }

  .faq h2 {
    font-size: 2.5rem;
    color: var(--neon-green);
    text-align: center;
    margin-bottom: 3rem;
    text-shadow: 0 0 20px var(--neon-green);
  }

  .faq-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-item {
    margin-bottom: 2rem;
    padding: 2rem;
    border: 1px solid rgba(0, 255, 65, 0.3);
    background: rgba(0, 255, 65, 0.05);
  }

  .faq-question {
    color: var(--neon-green);
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .faq-answer {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Final CTA */
  .final-cta {
    padding: 8rem 0;
    background: var(--darker-bg);
    text-align: center;
  }

  .final-cta h2 {
    font-size: 3rem;
    color: var(--neon-pink);
    margin-bottom: 2rem;
    text-shadow: 0 0 20px var(--neon-pink);
  }

  .final-cta p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  .urgency {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid var(--neon-pink);
    background: rgba(255, 0, 128, 0.1);
  }

  .urgency p {
    color: var(--neon-pink);
    font-weight: bold;
  }

  .guarantee {
    margin-top: 2rem;
  }

  .guarantee p {
    font-size: 0.9rem;
    color: var(--text-muted);
    font-style: italic;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .week {
      flex-direction: column;
      text-align: center;
    }
    
    .week-number {
      min-width: auto;
    }
    
    .field-showcase {
      padding: 1rem;
    }
    
    .cta-section {
      margin-top: 2rem;
    }
  }
</style>