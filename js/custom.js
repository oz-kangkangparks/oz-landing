document.addEventListener("DOMContentLoaded", function () {
    // --- 스크롤 애니메이션 ---
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting)
                    entry.target.classList.add("is-visible");
            });
        },
        { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));

    // --- 상단 메뉴바 스크롤 이벤트 ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("bg-cream-warm/95", "shadow-md", "py-4");
            navbar.classList.remove("py-6");
        } else {
            navbar.classList.remove("bg-cream-warm/95", "shadow-md", "py-4");
            navbar.classList.add("py-6");
        }
    });

    // --- 모바일 메뉴 토글 ---
    const body = document.querySelector("body");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    const toggleMenu = () => {
        const isMenuOpen = !mobileMenu.classList.contains("hidden");
        mobileMenu.classList.toggle("hidden");
        body.classList.toggle("no-scroll");

        if (!isMenuOpen) {
            mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
        } else {
            mobileMenuButton.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-4 6h10"></path></svg>`;
        }
    };

    mobileMenuButton.addEventListener("click", toggleMenu);
    mobileLinks.forEach((link) => {
        link.addEventListener("click", toggleMenu);
    });
});
