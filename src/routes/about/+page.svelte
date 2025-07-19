<script lang="ts">
  import { fade } from 'svelte/transition';
  import Hero from './components/Hero.svelte';

  let isVisible = false;
  setTimeout(() => (isVisible = true), 100);
</script>

<section class="about" in:fade={{ duration: 1000 }}>
  <div class="container" class:animate={isVisible}>
    <Hero />
  </div>
</section>

<style>
  .about {
    background: #0A0B14;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    padding: 4rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .animate {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
</style>