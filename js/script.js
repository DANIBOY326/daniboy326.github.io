// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
};

// remove toggle icon and navbar when click navbar link (scroll)
    document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });
});

// scroll reveal
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Reveal different sections
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


// ====== Testimonial Modal ======
const testimonialBtn = document.querySelector('.open-testimonial-form');
const modal = document.getElementById('testimonialModal');
const closeModal = document.querySelector('.close-modal');

testimonialBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// ====== Add Testimonial Dynamically ======
const form = document.querySelector('#testimonialModal form');
const testimonialGrid = document.querySelector('.testimonial-grid');

form.addEventListener('submit', (e) => {
  e.preventDefault();  // Stop page reload

  const name = form.name.value;
  const project = form.project.value;
  const message = form.message.value;

  // Create a new testimonial card
  const newCard = document.createElement('div');
  newCard.classList.add('testimonial-card');
  newCard.innerHTML = `
    <p>"${message}"</p>
    <h4>- ${name}${project ? ', ' + project : ''}</h4>
  `;

  // Add it to the grid live on the website
  testimonialGrid.appendChild(newCard);

  // Close modal + reset
  modal.style.display = 'none';
  form.reset();
});

// typed js
const typed = new Typed ('.multiple-text', {
    strings: ['Visual Designer', 'Graphic Designer', 'Brand Designer', 'UI/UX Designer',],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true

});
