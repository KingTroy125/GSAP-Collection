/**
 * GSAP utilities and configuration
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.7
});

// Custom easing functions
const customEasing = {
  smooth: 'power3.out',
  bounce: 'elastic(1, 0.3)',
  sharp: 'power4.out'
};

// Helper function for text splitting and animation
const splitTextAndAnimate = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach(element => {
    // Store original text
    const originalText = element.textContent;
    element.textContent = '';
    
    // Create spans for each character
    for (let i = 0; i < originalText.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.textContent = originalText[i];
      charSpan.style.display = 'inline-block';
      element.appendChild(charSpan);
    }
    
    // Get all character spans
    const chars = element.querySelectorAll('.char');
    
    // Set initial state
    gsap.set(chars, { 
      opacity: 0, 
      y: options.y || 20 
    });
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: options.scrollTrigger || null,
      delay: options.delay || 0
    });
    
    tl.to(chars, {
      opacity: 1,
      y: 0,
      stagger: options.stagger || 0.05,
      duration: options.duration || 0.5,
      ease: options.ease || 'power2.out',
      onComplete: options.onComplete || null
    });
    
    return tl;
  });
};

// Helper function for parallax elements
const createParallaxEffect = (triggerSelector, targetSelector, options = {}) => {
  const trigger = document.querySelector(triggerSelector);
  const targets = document.querySelectorAll(targetSelector);
  
  if (!trigger || targets.length === 0) return;
  
  targets.forEach((target, index) => {
    const direction = options.direction || 'y';
    const amount = options.amount || 100;
    const multiplier = options.multiplier ? index * options.multiplier : 1;
    
    ScrollTrigger.create({
      trigger: trigger,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub || true,
      onUpdate: (self) => {
        const progress = self.progress;
        const value = progress * amount * multiplier;
        
        if (direction === 'y') {
          gsap.set(target, { y: -value });
        } else if (direction === 'x') {
          gsap.set(target, { x: -value });
        }
      }
    });
  });
};

export { gsap, ScrollTrigger, customEasing, splitTextAndAnimate, createParallaxEffect };
