document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS Animation
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 50
    });
  }

  // Display submitted form data
  const displayFormData = () => {
    const formData = JSON.parse(localStorage.getItem('formData'));
    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'submitted-data mt-4 p-3 bg-light rounded';
    
    if (formData) {
      detailsContainer.innerHTML = `
        <h4 class="mb-3">Your Message Details:</h4>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.subject ? `<p><strong>Subject:</strong> ${formData.subject}</p>` : ''}
        <p><strong>Message:</strong> ${formData.message}</p>
      `;
      
      // Insert after the thank you message
      const thankYouMessage = document.querySelector('.thank-you-message');
      thankYouMessage.insertAdjacentElement('afterend', detailsContainer);
      
      // Clear stored data
      localStorage.removeItem('formData');
    }
  };

  // Social Icons Click Animation
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const targetUrl = this.getAttribute('href');
      
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'translateY(-5px)';
        window.open(targetUrl, '_blank');
      }, 200);
    });
  });

  // Button Ripple Effect (excluding form buttons)
  const buttons = document.querySelectorAll('.btn:not([type="submit"])');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Display form data on page load
  displayFormData();
});