document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const signInBtn = document.querySelector('.sign-in');
    const joinNowBtn = document.querySelector('.join-now');
    const signInModal = document.getElementById('signInModal');
    const joinNowModal = document.getElementById('joinNowModal');
    const closeSignIn = document.getElementById('closeSignIn');
    const closeJoinNow = document.getElementById('closeJoinNow');

    // Initialize modals as hidden
    signInModal.style.display = 'none';
    joinNowModal.style.display = 'none';

    // Function to handle modal visibility
    function toggleModal(modal, show) {
        modal.style.display = show ? 'flex' : 'none';
    }

    // Function to handle URL hash changes
    function handleHashChange() {
        const hash = window.location.hash;
        
        // Hide both modals first
        toggleModal(signInModal, false);
        toggleModal(joinNowModal, false);
        
        // Show the appropriate modal based on hash
        if (hash === '#signInModal') {
            toggleModal(signInModal, true);
        } else if (hash === '#joinNowModal') {
            toggleModal(joinNowModal, true);
        }
    }

    // Initial check on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Button click handlers
    signInBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = '#signInModal';
    });

    joinNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = '#joinNowModal';
    });

    // Close modal handlers
    closeSignIn.addEventListener('click', function() {
        toggleModal(signInModal, false);
        history.pushState("", document.title, window.location.pathname + window.location.search);
    });

    closeJoinNow.addEventListener('click', function() {
        toggleModal(joinNowModal, false);
        history.pushState("", document.title, window.location.pathname + window.location.search);
    });

    // Close when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === signInModal) {
            toggleModal(signInModal, false);
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
        if (e.target === joinNowModal) {
            toggleModal(joinNowModal, false);
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    });

    // Form validation for Sign In
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate email
            const email = document.getElementById('signInEmail');
            const emailError = document.getElementById('signInEmailError');
            if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate password
            const password = document.getElementById('signInPassword');
            const passwordError = document.getElementById('signInPasswordError');
            if (!password.value || password.value.length < 6) {
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }
            
            if (isValid) {
                alert('Sign in successful! Redirecting to your account...');
                toggleModal(signInModal, false);
                signInForm.reset();
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        });
    }
    
    // Form validation for Join Now
    const joinNowForm = document.getElementById('joinNowForm');
    if (joinNowForm) {
        joinNowForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate full name
            const fullName = document.getElementById('fullName');
            const fullNameError = document.getElementById('fullNameError');
            if (!fullName.value) {
                fullNameError.style.display = 'block';
                isValid = false;
            } else {
                fullNameError.style.display = 'none';
            }
            
            // Validate email
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                emailError.style.display = 'block';
                isValid = false;
            } else {
                emailError.style.display = 'none';
            }
            
            // Validate phone
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            if (!phone.value || !/^\d{10,}$/.test(phone.value.replace(/\D/g, ''))) {
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneError.style.display = 'none';
            }
            
            // Validate password
            const password = document.getElementById('password');
            const passwordError = document.getElementById('passwordError');
            if (!password.value || password.value.length < 6) {
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }
            
            if (isValid) {
                const membershipType = document.querySelector('input[name="membership"]:checked').value;
                alert(`Registration successful! Welcome to our gym. Your ${membershipType} membership has been activated.`);
                toggleModal(joinNowModal, false);
                joinNowForm.reset();
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        });
    }

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

