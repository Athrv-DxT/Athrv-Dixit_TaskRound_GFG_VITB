// Main section animations
function typeText(text, element, speed = 120) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            document.querySelector('.logo').style.animationDelay = '0.3s';
            document.querySelector('.logo').style.animationPlayState = 'running';
            setupAnimations();
        }
    }
    typing();
}

function setupAnimations() {
    const text = "GEEKS FOR GEEKS • STUDENT CHAPTER • ";
    const textContainer = document.getElementById('curved-text');
    
    textContainer.innerHTML = '';
    
    const angleStep = 360 / text.length;
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.transform = `rotate(${angleStep * i-73}deg)`;
        span.style.animation = `fadeIn 0.5s ease forwards ${i * 50}ms`;
        textContainer.appendChild(span);
    });

    setTimeout(() => {
        const scrollBtn = document.querySelector('.scroll-btn');
        if (scrollBtn) {
            scrollBtn.style.visibility = 'visible';
        }
    }, 3000);
}

function smoothScroll() {
    const windowHeight = window.innerHeight;
    const scrollTarget = windowHeight * 0.35; 
    
    window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
}

// Events section animations
function initializeEvents() {
    const hexagons = document.querySelectorAll('.hexagon');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const hexagonObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const hexagon = entry.target;
                const delay = Array.from(hexagons).indexOf(hexagon) * 100;
                
                hexagon.style.animation = `hexagonFadeIn 0.5s ease forwards ${delay}ms`;
                hexagonObserver.unobserve(hexagon);
            }
        });
    }, observerOptions);

    hexagons.forEach(hexagon => {
        hexagon.style.opacity = '0';
        hexagonObserver.observe(hexagon);
        
        hexagon.addEventListener('click', function() {
            this.classList.add('hexagon-pulse');
            setTimeout(() => {
                this.classList.remove('hexagon-pulse');
            }, 500);
        });
    });
}

// Session carousel functionality
const sessionData = [
    {
        title: "HOW TO BUILD",
        subtitle: "Blooming Envo + Nature",
        description: "Spring brings renewal, fresh blooms, and the gentle awakening of nature from its winter slumber.",
        image: "images/gfg_ws1.jpg"
    },
    {
        title: "HOW TO NFT",
        subtitle: "Hot Envo + Vacations",
        description: "Summer days filled with sunshine, adventure, and the endless possibilities of warm, golden moments.",
        image: "images/gfg_ws2.jpg"
    },
    {
        title: "HOW TO META",
        subtitle: "Rainy Envo + sessioning",
        description: "Monsoon brings the rhythm of rain, the dance of lightning, and the fresh scent of wet earth.",
        image: "images/gfg_ws3.jpg"
    },
    {
        title: "HOW TO WEB 3.0",
        subtitle: "Cool Envo + Colors",
        description: "Autumn paints the world in warm hues, as nature prepares for its winter rest.",
        image: "images/gfg_ws4.jpg"
    },
    {
        title: "HOW TO CRYPTO",
        subtitle: "Cold Envo + Vacations",
        description: "Winter, a session of crisp air, cozy nights by the fire, and the magic of snow-covered landscapes.",
        image: "images/gfg_ws5.jpg"
    }
];

function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelector('.carousel-indicators');
    let currentSlide = 0;

    sessionData.forEach((session, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        slide.innerHTML = `
            <img src="${session.image}" alt="${session.title}">
            <div class="slide-content">
                <h2>${session.title}</h2>
                <div class="slide-details">
                    <p class="subtitle">${session.subtitle}</p>
                    <p class="description">"${session.description}"</p>
                </div>
            </div>
        `;
        
        track.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });

    function updateSlides() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % sessionData.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + sessionData.length) % sessionData.length;
        updateSlides();
    }

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    setInterval(nextSlide, 20000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel
    initializeCarousel();
    
    initializeEvents();
    
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-btn';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    scrollBtn.onclick = smoothScroll;
    document.querySelector('#main').appendChild(scrollBtn);
});


window.onload = function() {
    const typingElement = document.querySelector('.typing-text');
    setTimeout(() => {
        typeText('WELCOME TO', typingElement);
    }, 300);
};

const style = document.createElement('style');
style.textContent = `
    @keyframes hexagonFadeIn {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes hexagonPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .hexagon-pulse {
        animation: hexagonPulse 0.5s ease;
    }
`;

document.head.appendChild(style);

const leafBg = document.getElementById('leafBg');
const numLeaves = 25;

for (let i = 0; i < numLeaves; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.top = `${Math.random() * 100}%`;
    
    const translateX = (Math.random() - 0.5) * 200;
    const translateY = (Math.random() - 0.5) * 200;
    leaf.style.setProperty('--translateX', `${translateX}px`);
    leaf.style.setProperty('--translateY', `${translateY}px`);
    
    leaf.style.animationDelay = `${Math.random() * 10}s`;
    
    leafBg.appendChild(leaf);
};