<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Redirect to main landing page
    goto('/main');
  });
</script>

<!-- Temporary loading state while redirecting -->
<div class="loading">
  <div class="container">
    <h1>Loading TheTeenspreneur...</h1>
  </div>
</div>

<style>
  .loading {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
  }
</style>
