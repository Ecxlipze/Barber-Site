// Scroll-Based Animations and Effects

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

(function() {
  window.scrollTo(0, 0);
  
  let scrollDisabled = true;
  const originalScrollTo = window.scrollTo;
  
  window.scrollTo = function() {
    if (!scrollDisabled) {
      return originalScrollTo.apply(this, arguments);
    }
  };
  
  window.addEventListener('load', function() {
    scrollDisabled = false;
    window.scrollTo = originalScrollTo;
    window.scrollTo(0, 0);
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  window.scrollTo(0, 0);
  
  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      } else {
        entry.target.classList.remove('animate-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  //Parallax effect for hero section
  let ticking = false;
  const hero = document.querySelector('.hero');
  const heroBg1 = document.querySelector('.hero-bg-1');
  const heroBg2 = document.querySelector('.hero-bg-2');
  const heroContent = document.querySelector('.hero-content');
  
  function updateParallax() {
    if (!ticking) {
      requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const rate1 = scrolled * 0.3;
        const rate2 = scrolled * 0.5;
        const rate3 = scrolled * -0.1;
        
        if (hero && scrolled < hero.offsetHeight) {
          heroBg1.style.transform = `translate3d(0, ${rate1}px, 0)`;
          heroBg2.style.transform = `translate3d(0, ${rate2}px, 0)`;
          heroContent.style.transform = `translate3d(0, ${rate3}px, 0)`;
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', updateParallax, { passive: true });
  
  // Fixed navbar hide/show on scroll
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  let scrollThreshold = 100; 
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for background effects
    if (scrollTop > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) {
      return; 
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down - hide navbar
      navbar.classList.add('navbar-hidden');
    } else {
      // Scrolling up - show navbar
      navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollTop = scrollTop;
  });
});

window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was restored from bfcache
    window.scrollTo(0, 0);
  }
});
