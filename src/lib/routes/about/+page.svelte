<script lang="ts">
  import Hero from './components/Hero.svelte';
  import Mission from './components/Mission.svelte';
  import Team from './components/Team.svelte';

  const teamMembers = [
    {
      name: "Team Member 1",
      role: "Founder",
      image: "/path/to/image1.jpg"
    },
    {
      name: "Team Member 2",
      role: "Co-Founder",
      image: "/path/to/image2.jpg"
    }
  ];
</script>

<Hero 
  title="About The Teenspreneur" 
  subtitle="Empowering the next generation of entrepreneurs"
/>

<Mission 
  mission="Our mission is to provide teenagers with the knowledge, skills, and resources they need to become successful entrepreneurs."
/>

<Team team={teamMembers} />

<style>
  :global(.container) {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
</style>