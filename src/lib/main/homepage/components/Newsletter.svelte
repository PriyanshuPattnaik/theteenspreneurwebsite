<script lang="ts">
  let email = '';
  
  function handleSubmit() {
    // Newsletter signup logic will go here
    console.log('Newsletter signup:', email);
  }
</script>

<section class="newsletter">
  <div class="container">
    <h2 class="section-title">stay in the loop</h2>
    <p class="newsletter-description">
      get updates on new cohorts, success stories, and opportunities
    </p>
    <form on:submit|preventDefault={handleSubmit} class="newsletter-form">
      <input 
        type="email" 
        bind:value={email}
        placeholder="your email address"
        class="email-input"
        required
      />
      <button type="submit" class="btn btn-primary">subscribe</button>
    </form>
  </div>
</section>

<style>
  .newsletter {
    padding: 5rem 0;
    background: var(--bg-primary);
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .newsletter-description {
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    font-size: 1.1rem;
  }
  
  .newsletter-form {
    display: flex;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .email-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-card);
    color: var(--text-primary);
    font-family: inherit;
  }
  
  .email-input::placeholder {
    color: var(--text-muted);
  }
  
  @media (max-width: 640px) {
    .newsletter-form {
      flex-direction: column;
    }
  }
</style>