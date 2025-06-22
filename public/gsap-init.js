// Import GSAP from node_modules
import { gsap } from 'gsap';

// Hero section animation
document.addEventListener('DOMContentLoaded', () => {
  // Hero section animation
  const heroTl = gsap.timeline();
  heroTl
    .from('.hero-by', { 
      opacity: 0, 
      y: 20, 
      duration: 0.8,
      ease: 'power3.out' 
    })
    .from('.hero-mid', { 
      opacity: 0, 
      y: 30, 
      duration: 0.8, 
      ease: 'power3.out' 
    }, '-=0.6')
    .from('.hero-title', { 
      opacity: 0, 
      y: 40, 
      duration: 0.8,
      ease: 'power3.out' 
    }, '-=0.6');

  // Navbar animation
  gsap.from('.navbar', {
    opacity: 0,
    y: -20,
    duration: 1,
    ease: 'power2.out'
  });

  // Project cards animation
  gsap.from('.project-card', {
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 80%',
    }
  });
});
