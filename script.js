/**
 * Digital Portfolio - Bùi Thị Huyền Linh
 * MSV: 25100028 | Y khoa
 * Trường Đại học Y Dược, ĐHQGHN
 */

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  function activateSection(targetId) {
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add('active');

    const targetNav = document.getElementById('nav-' + targetId);
    if (targetNav) targetNav.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(`Activated section: ${targetId}`);
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        activateSection(href.substring(1));
      }
    });
  });

  // Keyboard navigation (arrow keys)
  const sectionIds = ['intro', 'practices', 'reflection', 'skills', 'conclusion'];
  document.addEventListener('keydown', (e) => {
    // Avoid capturing keys when typing in form elements
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return;
    
    const currentIdx = sectionIds.indexOf(activeSection.id);
    if (currentIdx === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      const nextIdx = Math.min(currentIdx + 1, sectionIds.length - 1);
      activateSection(sectionIds[nextIdx]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      const prevIdx = Math.max(currentIdx - 1, 0);
      activateSection(sectionIds[prevIdx]);
    }
  });

  // Premium Creative Forest Sage & Coral Cream Spark Particle Effect
  const avatarContainer = document.querySelector('.avatar-container');
  const particleEmitter = document.querySelector('.avatar-particle-emitter');

  if (avatarContainer && particleEmitter) {
    particleEmitter.style.position = 'absolute';
    particleEmitter.style.inset = '0';
    particleEmitter.style.pointerEvents = 'none';
    particleEmitter.style.overflow = 'hidden';
    particleEmitter.style.borderRadius = '50%';
    particleEmitter.style.zIndex = '3';

    let particleInterval = null;

    function createSpark() {
      const spark = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 15 + 60; // Spawn near edge of 120px ring (radius 60px)
      
      const startX = 60 + Math.cos(angle) * 50;
      const startY = 60 + Math.sin(angle) * 50;
      const destX = 60 + Math.cos(angle) * distance;
      const destY = 60 + Math.sin(angle) * distance;
      
      spark.style.position = 'absolute';
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = '50%';
      // Forest Sage (#0e5f59) or Coral (#e07a5f)
      spark.style.backgroundColor = Math.random() > 0.5 ? '#0e5f59' : '#e07a5f';
      spark.style.boxShadow = `0 0 6px ${spark.style.backgroundColor}`;
      spark.style.left = `${startX}px`;
      spark.style.top = `${startY}px`;
      spark.style.opacity = '1';
      spark.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
      
      particleEmitter.appendChild(spark);
      
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${destX - startX}px, ${destY - startY}px)`;
        spark.style.opacity = '0';
      });
      
      setTimeout(() => {
        spark.remove();
      }, 800);
    }

    avatarContainer.addEventListener('mouseenter', () => {
      // Emit burst of particles initially
      for (let i = 0; i < 8; i++) {
        createSpark();
      }
      particleInterval = setInterval(createSpark, 150);
    });

    avatarContainer.addEventListener('mouseleave', () => {
      if (particleInterval) {
        clearInterval(particleInterval);
        particleInterval = null;
      }
    });
  }

  // Clinical console greeting
  console.log('%c🩺 Digital Portfolio Bùi Thị Huyền Linh | Y khoa | UMP-VNU', 
    'color: #0e5f59; font-size: 14px; font-family: sans-serif; font-weight: bold;');
  console.log('%c💊 Medical Digital Portfolio initialized successfully.', 'color: #e07a5f; font-family: sans-serif;');
});
