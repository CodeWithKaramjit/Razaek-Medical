/* ==========================================================================
   Razaek Medical Tourism Landing Page JavaScript
   ========================================================================== */

// Treatment Cost Database (High Fidelity Mock Data)
const costDatabase = {
    cardiology: {
        name: "Cardiology (Heart Bypass / CABG)",
        usCost: 120000,
        indiaCost: 8500,
        daysNeeded: 21,
        hospital: "Fortis Escorts / Medanta Medicity"
    },
    orthopedics: {
        name: "Orthopedics (Total Knee Replacement)",
        usCost: 45000,
        indiaCost: 5500,
        daysNeeded: 14,
        hospital: "Max Healthcare / Artemis Hospital"
    },
    oncology: {
        name: "Oncology (Complex Tumor Surgery)",
        usCost: 150000,
        indiaCost: 12000,
        daysNeeded: 30,
        hospital: "Apollo Proton Cancer Centre"
    },
    ivf: {
        name: "IVF & Fertility Treatment Cycle",
        usCost: 22000,
        indiaCost: 3500,
        daysNeeded: 20,
        hospital: "Cloudnine Fertility / Nova IVF"
    },
    bariatric: {
        name: "Bariatric (Gastric Bypass Surgery)",
        usCost: 30000,
        indiaCost: 4500,
        daysNeeded: 10,
        hospital: "Max Smart / Fortis Hospital"
    },
    wellness: {
        name: "Wellness (Complete Ayurvedic Rejuvenation)",
        usCost: 12000,
        indiaCost: 2200,
        daysNeeded: 14,
        hospital: "Ananda in Himalayas / Somatheeram"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initNavbar();
    initCostCalculator();
    initTestimonialsSlider();
    initInquiryForm();
});

/* ==========================================================================
   1. Theme Switching (Light/Dark Mode)
   ========================================================================== */
function initThemeToggle() {
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon = themeBtn.querySelector("i");
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    
    if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add("light-theme");
        themeIcon.className = "fas fa-moon";
    } else {
        themeIcon.className = "fas fa-sun";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

/* ==========================================================================
   2. Navbar Scroll and Mobile Menu
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const burger = document.getElementById("burger-menu");
    const navLinks = document.getElementById("nav-links");
    const links = navLinks.querySelectorAll("a");
    const sections = document.querySelectorAll("section");

    // Scroll listener for sticky styling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Highlight navigation links on scroll
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });

    // Mobile Hamburger Toggle
    burger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        burger.classList.toggle("toggle");
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            burger.classList.remove("toggle");
        });
    });
}

/* ==========================================================================
   3. Treatment Cost Calculator
   ========================================================================== */
function initCostCalculator() {
    const treatmentSelect = document.getElementById("treatment-select");
    const companionSelect = document.getElementById("companion-select");
    
    const usCostEl = document.getElementById("us-cost");
    const indiaCostEl = document.getElementById("india-cost");
    const savingCostEl = document.getElementById("saving-cost");
    const durationNoticeEl = document.getElementById("duration-notice");

    function calculateCosts() {
        const selectedKey = treatmentSelect.value;
        const addCompanion = companionSelect.value === "yes";
        
        if (!costDatabase[selectedKey]) return;

        const data = costDatabase[selectedKey];
        let usCost = data.usCost;
        let indiaCost = data.indiaCost;
        
        // Companions add flight & hotel costs to the India package (e.g. ~$2,000 extra)
        if (addCompanion) {
            indiaCost += 2000;
        }

        const savings = usCost - indiaCost;

        // Format currency helper
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(amount);
        };

        // Render with simple fade transition
        [usCostEl, indiaCostEl, savingCostEl].forEach(el => {
            el.style.opacity = 0;
        });

        setTimeout(() => {
            usCostEl.textContent = formatCurrency(usCost);
            indiaCostEl.textContent = formatCurrency(indiaCost);
            savingCostEl.textContent = formatCurrency(savings);
            
            durationNoticeEl.innerHTML = `
                <i class="fas fa-info-circle"></i> Estimated duration: <strong>${data.daysNeeded} days</strong> of recovery & tourism. Partner Facilities: <strong>${data.hospital}</strong>.
            `;
            
            [usCostEl, indiaCostEl, savingCostEl].forEach(el => {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = 1;
            });
        }, 150);
    }

    // Event listeners for recalculating
    treatmentSelect.addEventListener("change", calculateCosts);
    companionSelect.addEventListener("change", calculateCosts);

    // Initial calculation
    calculateCosts();
}

/* ==========================================================================
   4. Testimonials Slider
   ========================================================================== */
function initTestimonialsSlider() {
    const track = document.getElementById("testimonial-track");
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    
    let currentIndex = 0;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // wrap around
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // wrap around
        }
        updateSliderPosition();
    });

    // Auto play every 6 seconds
    setInterval(() => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSliderPosition();
    }, 6000);
}

/* ==========================================================================
   5. Interactive Multi-Step Inquiry Form
   ========================================================================== */
function initInquiryForm() {
    const steps = Array.from(document.querySelectorAll(".step-content"));
    const stepIndicators = Array.from(document.querySelectorAll(".step-indicator"));
    const prevBtn = document.getElementById("form-prev-btn");
    const nextBtn = document.getElementById("form-next-btn");
    const inquiryForm = document.getElementById("inquiry-form");
    const successMessage = document.getElementById("form-success");

    let currentStep = 0;

    function updateFormSteps() {
        // Toggle step contents
        steps.forEach((step, idx) => {
            step.classList.toggle("active", idx === currentStep);
        });

        // Toggle step indicators
        stepIndicators.forEach((indicator, idx) => {
            indicator.classList.toggle("active", idx <= currentStep);
        });

        // Toggle buttons visibility
        prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";
        
        if (currentStep === steps.length - 1) {
            nextBtn.innerHTML = `Submit Details <i class="fas fa-paper-plane"></i>`;
        } else {
            nextBtn.innerHTML = `Next Step <i class="fas fa-arrow-right"></i>`;
        }
    }

    function validateCurrentStep() {
        const currentFields = steps[currentStep].querySelectorAll("[required]");
        let isValid = true;

        currentFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = "#ef4444"; // high-contrast error border
                field.addEventListener("input", function clearError() {
                    field.style.borderColor = "";
                    field.removeEventListener("input", clearError);
                });
            }
        });

        return isValid;
    }

    nextBtn.addEventListener("click", () => {
        if (!validateCurrentStep()) return;

        if (currentStep < steps.length - 1) {
            currentStep++;
            updateFormSteps();
        } else {
            // Last step: Submit form mock
            submitForm();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            updateFormSteps();
        }
    });

    function submitForm() {
        // Extract inputs mock
        const formData = new FormData(inquiryForm);
        console.log("Submitting consultation request:", Object.fromEntries(formData));

        // Hide form contents
        inquiryForm.style.display = "none";
        document.querySelector(".form-steps").style.display = "none";
        
        // Show success state
        successMessage.classList.add("active");
    }

    // Initialize layout
    updateFormSteps();
}
