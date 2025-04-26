document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.querySelector('.navbar');
  
  menuBtn.addEventListener('click', function() {
      navbar.classList.toggle('active');
      menuBtn.classList.toggle('fa-times');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('click', function() {
          navbar.classList.remove('active');
          menuBtn.classList.remove('fa-times');
      });
  });

  // Sticky Header on Scroll
  window.addEventListener('scroll', function() {
      const header = document.querySelector('.header');
      header.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('active');
      } else {
          backToTopBtn.classList.remove('active');
      }
  });

  backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  function animateCounters() {
      counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = target / speed;
          
          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(animateCounters, 1);
          } else {
              counter.innerText = target;
          }
      });
  }

  // Start counter animation when stats section is in view
  const statsSection = document.querySelector('.stats');
  const observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
          animateCounters();
          observer.unobserve(statsSection);
      }
  });

  observer.observe(statsSection);

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  function showSlide(index) {
      testimonialCards.forEach(card => card.classList.remove('active'));
      sliderDots.forEach(dot => dot.classList.remove('active'));
      
      testimonialCards[index].classList.add('active');
      sliderDots[index].classList.add('active');
      currentSlide = index;
  }

  sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', function() {
          showSlide(index);
      });
  });

  // Auto slide change
  setInterval(function() {
      currentSlide = (currentSlide + 1) % testimonialCards.length;
      showSlide(currentSlide);
  }, 5000);

  // Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // Here you would typically send the form data to a server
          console.log('Form submitted:', { name, email, subject, message });
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
});