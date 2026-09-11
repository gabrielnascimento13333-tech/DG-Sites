document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const projectType = document.getElementById('projectType').value;
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name) {
                showError('Por favor, preencha seu nome.');
                return;
            }
            
            if (!whatsapp) {
                showError('Por favor, preencha seu WhatsApp.');
                return;
            }
            
            if (!projectType) {
                showError('Por favor, selecione o tipo de projeto.');
                return;
            }
            
            if (!message) {
                showError('Por favor, escreva sua mensagem.');
                return;
            }
            
            // Format WhatsApp number (remove non-digits)
            const whatsappClean = whatsapp.replace(/\D/g, '');
            
            // Create WhatsApp message
            let whatsappMessage = `Olá! Gostaria de solicitar um orçamento.\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            if (company) whatsappMessage += `*Empresa:* ${company}\n`;
            whatsappMessage += `*WhatsApp:* ${whatsapp}\n`;
            whatsappMessage += `*Tipo de Projeto:* ${getProjectTypeName(projectType)}\n`;
            whatsappMessage += `*Mensagem:* ${message}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp
            window.open(`https://wa.me/5521989820283?text=${encodedMessage}`, '_blank');
            
            // Show success message
            showSuccess('Redirecionando para o WhatsApp...');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Helper function to get project type name
    function getProjectTypeName(value) {
        const types = {
            'site': 'Site Profissional',
            'landing': 'Landing Page',
            'local': 'Página para Negócios Locais',
            'agendamento': 'Integração de Agendamento',
            'outro': 'Outro'
        };
        return types[value] || value;
    }

    // Show error message
    function showError(message) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        alert.style.cssText = `
            position: fixed;
            top: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: #FEE2E2;
            color: #DC2626;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 14px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    // Show success message
    function showSuccess(message) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        alert.style.cssText = `
            position: fixed;
            top: 90px;
            left: 50%;
            transform: translateX(-50%);
            background: #D1FAE5;
            color: #059669;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 14px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    document.querySelectorAll('.service-card, .diff-item, .process-step, .contact-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Phone number formatting
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }
});