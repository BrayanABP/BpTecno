// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const serviceForm = document.getElementById('serviceForm');
const formStatus = document.getElementById('formStatus');

serviceForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const formData = new FormData(this);
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    formStatus.style.display = 'none';

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok && result.ok) {
            // Success
            formStatus.className = 'form-status success';
            formStatus.innerHTML = '✅ <strong>¡Mensaje enviado con éxito!</strong><br>Te contactaremos pronto.';
            formStatus.style.display = 'block';
            this.reset();
        } else {
            throw new Error(result.error || 'Error en el envío');
        }
    } catch (error) {
        // Error
        formStatus.className = 'form-status error';
        formStatus.innerHTML = '❌ <strong>Error al enviar el mensaje</strong><br>Por favor, intenta nuevamente o contáctanos por WhatsApp.';
        formStatus.style.display = 'block';
        console.error('Error:', error);
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar Solicitud';
    }
});

// WhatsApp message generator
function generateWhatsAppMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    let whatsappText = `Hola, estoy interesado en sus servicios técnicos.%0A%0A`;
    whatsappText += `*Nombre:* ${name || 'No especificado'}%0A`;
    whatsappText += `*Email:* ${email || 'No especificado'}%0A`;
    whatsappText += `*Teléfono:* ${phone || 'No especificado'}%0A`;
    whatsappText += `*Servicio:* ${service || 'No especificado'}%0A`;
    
    if (message) {
        whatsappText += `*Mensaje:* ${message}%0A`;
    }
    
    return `https://wa.me/3143152243?text=${whatsappText}`;
}

// Update WhatsApp link when form changes
const formInputs = document.querySelectorAll('#serviceForm input, #serviceForm select, #serviceForm textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.href = generateWhatsAppMessage();
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.querySelectorAll('.service-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Obtener el año actual
    const year = new Date().getFullYear();
    // Actualizar el contenido del elemento con id "currentYear"
    document.getElementById("currentYear").textContent = year;