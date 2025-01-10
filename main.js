let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('visible');
        } 
    } else {
        navbar.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

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

const sessionData = [
    {
        title: "HOW TO BUILD",
        subtitle: "By: Mr. Quittman Farmer",
        description: "Step into the future with an insightful talk session on the Metaverse, where technology meets imagination. This session delved into the transformative potential of virtual reality and digital interaction, offering attendees a glimpse into how the Metaverse is reshaping the way we connect, work, and play.",
        image: "images/gfg_ws1.jpg"
    },
    {
        title: "HOW TO NFT",
        subtitle: "By: Mr. Tejas Chopra",
        description: "Unlock the world of digital ownership with an enlightening session on NFTs (Non-Fungible Tokens). This discussion explored the concepts behind NFTs, their role in revolutionizing art, gaming, and technology, and how they are shaping the future of digital assets and blockchain innovation.",
        image: "images/gfg_ws2.jpg"
    },
    {
        title: "HOW TO META",
        subtitle: "By: Mr. James DiMeo",
        description: "Exploring the transformative potential of the Metaverse and its real-life applications in the Web3 era, this session highlighted contributions to pioneering platforms like Sandbox and Decentraland, diving deep into the future of virtual worlds.",
        image: "images/gfg_ws3.jpg"
    },
    {
        title: "HOW TO WEB 3.0",
        subtitle: "Speakers from Netflix, QUED animations and many more",
        description: "Navigate the future of the internet with an insightful session on Web 3.0. Explore its decentralized architecture, blockchain technologies, and transformative applications that are redefining how we connect, share, and innovate in the digital world.",
        image: "images/gfg_ws4.jpg"
    },
    {
        title: "HOW TO CRYPTO",
        subtitle: "By: Mr. Varun Sethi",
        description: "Dive into the fascinating world of cryptocurrency with this session, unraveling the basics of blockchain, the mechanics of digital currencies, and their growing impact on the global financial landscape.",
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