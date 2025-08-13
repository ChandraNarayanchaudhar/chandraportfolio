// Helper: intersection observer for reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal-up, .reveal-grid').forEach(el => observer.observe(el));

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form using EmailJS (optional)
/*
  1. Sign up at https://www.emailjs.com/
  2. Create a service and template.
  3. Replace EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID below.
  4. Uncomment the CDN script in index.html if you add EmailJS:
     <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
*/
const statusEl = document.getElementById('formStatus');
document.getElementById('sendBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){
    statusEl.textContent = 'Please fill all fields.';
    statusEl.style.color = '#b91c1c';
    return;
  }
  statusEl.textContent = 'Sending...';
  statusEl.style.color = '#0f172a';

  // Demo: just simulate success (remove this if you enable EmailJS)
  setTimeout(() => {
    statusEl.textContent = 'Message sent! (Demo)';
    statusEl.style.color = '#16a34a';
    document.getElementById('contactForm').reset();
  }, 700);

  // --- If using EmailJS, uncomment and configure below ---
  
  emailjs.init('zVPwf0iB7KetEYc6s');
  try{
    await emailjs.send('service_sczdk2c', 'template_a0i60e8', {
      from_name: name, reply_to: email, message
    });
    statusEl.textContent = 'Message sent successfully!';
    statusEl.style.color = '#16a34a';
    document.getElementById('contactForm').reset();
  }catch(err){
    statusEl.textContent = 'Failed to send. Please try again.';
    statusEl.style.color = '#b91c1c';
    console.error(err);
  }
  
});
