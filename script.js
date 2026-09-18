
// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


// Close mobile menu after clicking a link

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// ================================
// CONTACT FORM
// ================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailBody =
        `Hello,

Name: ${name}
Email: ${email}

${message}`;

    const mailtoURL =
        `mailto:hemanth192005@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoURL;

});


// ================================
// SCROLL REVEAL
// ================================

const revealElements = document.querySelectorAll(
    ".section-title, .skill-card, .project-card, .timeline-item, .about-container, .contact-container"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});

// =========================================================
// VIBRANT INTERACTIONS
// =========================================================

// Typing hero subtitle
const typingTarget = document.querySelector(".hero h2");

if (typingTarget) {
    const roles = [
        "AI & Data Science Student",
        "Machine Learning Enthusiast",
        "Python & Java Developer",
        "Data Analytics Explorer"
    ];

    typingTarget.classList.add("typing-text");

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeRole() {
        const role = roles[roleIndex];

        if (!deleting) {
            typingTarget.textContent = role.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === role.length) {
                deleting = true;
                setTimeout(typeRole, 1700);
                return;
            }
            setTimeout(typeRole, 70);
        } else {
            typingTarget.textContent = role.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            setTimeout(typeRole, 40);
        }
    }

    typeRole();
}

// Mouse-following purple glow
if (window.matchMedia("(pointer: fine)").matches) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        glow.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
        glow.style.opacity = "0";
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * .10;
        glowY += (mouseY - glowY) * .10;
        glow.style.left = glowX + "px";
        glow.style.top = glowY + "px";
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// 3D card tilt
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".skill-card, .project-card").forEach(card => {
        card.classList.add("tilt-card");

        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - .5) * 7;
            const rotateX = ((y / rect.height) - .5) * -7;

            card.style.transform =
                `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

// Back to top
const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active navigation while scrolling
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navMenu a");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active-link",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach(section => sectionObserver.observe(section));

// Magnetic social icons
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".social-links a, .footer-socials a").forEach(icon => {
        icon.addEventListener("mousemove", event => {
            const rect = icon.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            icon.style.transform =
                `translate(${x * .18}px, ${y * .18}px) scale(1.08)`;
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "";
        });
    });
}
