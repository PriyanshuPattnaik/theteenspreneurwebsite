<script lang="ts">
  export let team = [
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

<section class="team">
  <div class="container">
    <h2>Our Team</h2>
    <div class="team-grid">
      {#each team as member}
        <div class="team-member">
          <img src={member.image} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .team {
    padding: 3rem 0;
  }
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  .team-member {
    text-align: center;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>