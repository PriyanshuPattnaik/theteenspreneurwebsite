<script lang="ts">
  // Main layout for the landing page
</script>

<main class="main-content">
  <slot />
</main>

<style>
  .main-content {
    min-height: 100vh;
    background: var(--bg-primary);
  }
</style>