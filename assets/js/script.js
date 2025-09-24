// Scroll-Based Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Element is entering the viewport - add animation class
        entry.target.classList.add('animate-in');
      } else {
        // Element is leaving the viewport - remove animation class
        entry.target.classList.remove('animate-in');
      }
    });
  }, observerOptions);
  
  // Add animation classes to sections
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
        const rate1 = scrolled * 0.3; // Background moves slower
        const rate2 = scrolled * 0.5; // Middle layer moves medium
        const rate3 = scrolled * -0.1; // Content moves opposite direction slightly
        
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
});
