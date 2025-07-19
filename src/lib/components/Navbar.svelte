<script lang="ts">
  import { page } from '$app/stores';
  import blackLogo from '../../assets/blacklogo1.png';
  
  let mobileMenuOpen = false;

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
  };

  // Navigation items
  const navItems = [
    { href: '/about', label: 'About' },
    { href: '/faq', label: 'FAQ' },
    { href: '/apply', label: 'Join Us' }
  ];
</script>

<nav class="navbar">
  <div class="nav-container">
    <!-- Logo Section -->
    <div class="nav-logo">
      <a href="/" on:click={closeMobileMenu}>
        <img src={blackLogo} alt="TheTeenspreneur Logo" class="logo" />
      </a>
    </div>

    <!-- Desktop Navigation -->
    <div class="nav-links desktop-nav">
      {#each navItems as item}
        <a 
          href={item.href} 
          class="nav-link"
          class:active={$page.url.pathname === item.href}
        >
          {item.label}
        </a>
      {/each}
    </div>

    <!-- Mobile Menu Button -->
    <button 
      class="mobile-menu-btn"
      on:click={toggleMobileMenu}
      aria-label="Toggle navigation menu"
    >
      <div class="hamburger" class:open={mobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" class:open={mobileMenuOpen}>
      <div class="mobile-nav-content">
        {#each navItems as item}
          <a 
            href={item.href} 
            class="mobile-nav-link"
            class:active={$page.url.pathname === item.href}
            on:click={closeMobileMenu}
          >
            {item.label}
          </a>
        {/each}
      </div>
    </div>
  </div>

  <!-- Mobile backdrop -->
  {#if mobileMenuOpen}
    <div class="mobile-backdrop" on:click={closeMobileMenu}></div>
  {/if}
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Logo Styles */
  .nav-logo a {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 250px;
    width: 250px;
    transition: all 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.05);
  }

  /* Desktop Navigation */
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    position: relative;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0em;
    text-transform: lowercase;
  }

  .nav-link:hover {
    color: var(--text-primary);
    background: var(--hover-bg);
  }

  .nav-link.active {
    color: var(--brand-lime);
    background: rgba(0, 255, 65, 0.1);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: var(--brand-lime);
    border-radius: 50%;
  }

  /* Mobile Menu Button */
  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    transition: background 0.3s ease;
  }

  .mobile-menu-btn:hover {
    background: var(--hover-bg);
  }

  .hamburger {
    width: 24px;
    height: 18px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hamburger span {
    width: 100%;
    height: 2px;
    background: var(--text-primary);
    border-radius: 1px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open span:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
  }

  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open span:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
  }

  /* Mobile Navigation */
  .mobile-nav {
    position: fixed;
    top: 70px;
    right: -100%;
    width: 280px;
    height: calc(100vh - 70px);
    background: var(--bg-secondary);
    border-left: 1px solid var(--border-color);
    transition: right 0.3s ease;
    z-index: 999;
  }

  .mobile-nav.open {
    right: 0;
  }

  .mobile-nav-content {
    padding: 2rem;
  }

  .mobile-nav-link {
    display: block;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0em;
    text-transform: lowercase;
  }

  .mobile-nav-link:hover {
    color: var(--text-primary);
    padding-left: 1rem;
  }

  .mobile-nav-link.active {
    color: var(--brand-lime);
    border-left: 3px solid var(--brand-lime);
    padding-left: 1rem;
  }

  .mobile-nav-link:last-child {
    border-bottom: none;
  }

  .mobile-backdrop {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .nav-container {
      padding: 0 16px;
    }

    .logo {
      height: 200px;
      width: 200px;
    }
  }

  @media (max-width: 480px) {
    .nav-container {
      height: 60px;
    }

    .mobile-nav {
      top: 60px;
      height: calc(100vh - 60px);
      width: 100%;
      right: -100%;
    }

    .logo {
      height: 150px;
      width: 150px;
    }
  }

  @media (max-width: 320px) {
    .nav-container {
      height: 50px;
    }

    .mobile-nav {
      top: 50px;
      height: calc(100vh - 50px);
    }

    .logo {
      height: 120px;
      width: 120px;
    }
  }
</style>