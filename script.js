document.addEventListener("DOMContentLoaded", () => {
    // Preloader Elements
    const counterElement = document.getElementById("counter");
    const preloader = document.getElementById("preloader");
    const helloText = document.getElementById("hello-text");
    const mainContent = document.getElementById("main");

    let currentProgress = 0;

    // Simulate loading percentage increment matching video speed
    const progressInterval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 4;
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(progressInterval);
            startPortfolioIntro();
        }
        
        counterElement.textContent = currentProgress + "%";
    }, 35);

    // GSAP Animation Timeline for Preloader & Intro Transition (Exact Video Match)
    function startPortfolioIntro() {
        const tl = gsap.timeline();

        tl.to(".loader-content", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        })
        .fromTo(helloText, 
            { opacity: 0, y: 30, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
        )
        .to(helloText, {
            opacity: 0,
            y: -30,
            scale: 1.05,
            duration: 0.5,
            delay: 0.4,
            ease: "power2.in"
        })
        .to(preloader, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            onStart: () => {
                mainContent.style.visibility = "visible";
            }
        })
        .to(mainContent, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");
    }

    // Mobile Hamburger Menu Toggle Logic
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        hamburgerBtn.classList.toggle("open");
        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
    });

    // Close mobile menu when any link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            hamburgerBtn.classList.remove("open");
            document.body.style.overflow = "auto";
        });
    });

    // Project Hover Floating Image Preview (Exact video feature)
    const projectItems = document.querySelectorAll(".project-item");
    const popupImg = document.getElementById("project-popup");

    projectItems.forEach(item => {
        const imgSrc = item.getAttribute("data-img");

        item.addEventListener("mouseenter", () => {
            popupImg.src = imgSrc;
            popupImg.style.opacity = 1;
            popupImg.style.transform = "scale(1) translate(-50%, -50%)";
        });

        item.addEventListener("mouseleave", () => {
            popupImg.style.opacity = 0;
            popupImg.style.transform = "scale(0.8) translate(-50%, -50%)";
        });

        item.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            popupImg.style.left = `${x}px`;
            popupImg.style.top = `${y}px`;
        });
    });
});
                                     
