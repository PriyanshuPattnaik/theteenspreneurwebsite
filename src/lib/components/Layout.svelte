<script lang="ts">
  import Navbar from './Navbar.svelte';
</script>

<div class="app">
  <Navbar />
  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    background: var(--bg-primary);
  }

  .main-content {
    padding-top: 70px; /* Account for fixed navbar height */
  }

  /* Responsive padding adjustment */
  @media (max-width: 480px) {
    .main-content {
      padding-top: 60px;
    }
  }
</style>