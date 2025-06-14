document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
  
  // Back to Top Button
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });
  
  // Current Year in Footer
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
  
  // Animate Skills Progress Bars on Scroll
  const skillItems = document.querySelectorAll('.skill-item');
  
  function animateSkills() {
    skillItems.forEach(item => {
      const progressBar = item.querySelector('.progress-bar');
      const percent = progressBar.parentElement.querySelector('span:last-child').textContent;
      progressBar.style.width = '0';
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            progressBar.style.width = percent;
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(item);
    });
  }
  
  animateSkills();
  
  // Form Submission - Updated Solution
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Only prevent default if you need custom handling
      // Otherwise let the form submit normally
      if (!this.checkValidity()) {
        e.preventDefault();
        this.reportValidity();
        return;
      }
      
      // If you want to use FormSubmit.co (recommended):
      // 1. Keep the form's action and method attributes as is
      // 2. Remove the preventDefault() below
      // 3. The form will submit to FormSubmit normally
      
      // If you want to handle submission manually:
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: this.querySelector('[name="name"]').value,
        email: this.querySelector('[name="email"]').value,
        subject: this.querySelector('[name="subject"]').value,
        message: this.querySelector('[name="message"]').value
      };
      
      // Store form data in localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
      
      // Submit the form programmatically
      this.submit(); // This will use the form's action/method attributes
      
      // OR redirect to thank-you page
      // window.location.href = 'thankyou.html';
    });
  }

  // Initialize AOS Animation
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
});