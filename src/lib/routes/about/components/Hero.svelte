<script lang="ts">
  export let title: string = "About Us";
  export let subtitle: string = "Learn about our mission and vision";
</script>

<section class="hero">
  <div class="container">
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
</section>

<style>
  .hero {
    padding: 4rem 0;
    background-color: #f5f5f5;
  }
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    color: #666;
  }
</style>