// ===== NAVBAR TOGGLE =====
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ===== SCROLL ACTIVE LINK =====
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

// ===== CLOSE NAVBAR ON LINK CLICK =====
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ===== SCROLL REVEAL =====
ScrollReveal({ reset: true, distance: '80px', duration: 2000, delay: 200 });
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// ===== TYPED JS =====
const typed = new Typed('.multiple-text', {
    strings: ['Visual Designer', 'Graphic Designer', 'Brand Designer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ===== TESTIMONIAL MODAL =====
const testimonialBtn = document.querySelector('.open-testimonial-form');
const modal = document.getElementById('testimonialModal');
const closeModal = document.querySelector('.close-modal');

testimonialBtn.addEventListener('click', () => { modal.style.display = 'flex'; });
closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

// ===== FIRESTORE TESTIMONIALS =====
const form = document.querySelector('#testimonialModal form');
const testimonialGrid = document.querySelector('.testimonial-grid');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const project = form.project.value;
    const message = form.message.value;

    try {
        await window.addDoc(window.collection(window.db, "testimonials"), {
            name,
            project,
            message,
            timestamp: Date.now()
        });

        showToast("Thank you! Your testimonial has been submitted."); // <- toast replaces alert
        modal.style.display = "none";
        form.reset();

        loadTestimonials();

    } catch (error) {
        console.error("Error saving testimonial:", error);
        showToast("Oops! Something went wrong. Please try again.");
    }
});

// Load testimonials dynamically
async function loadTestimonials() {
    testimonialGrid.innerHTML = "";

    const q = window.query(window.collection(window.db, "testimonials"), window.orderBy("timestamp", "desc"));
    const snapshot = await window.getDocs(q);

    snapshot.forEach(doc => {
        const data = doc.data();
        const newCard = document.createElement("div");
        newCard.classList.add("testimonial-card");
        newCard.innerHTML = `
            <p>"${data.message}"</p>
            <h4>- ${data.name}${data.project ? ', ' + data.project : ''}</h4>
        `;
        testimonialGrid.appendChild(newCard);
    });
}

// Load on page load
loadTestimonials();
