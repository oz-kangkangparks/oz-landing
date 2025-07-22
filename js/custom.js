document.addEventListener("DOMContentLoaded", function () {
    // --- 스크롤 페이드인 애니메이션 ---
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    sections.forEach((section) => observer.observe(section));

    // --- 상단 메뉴바 스크롤 이벤트 ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- 모바일 메뉴 토글 ---
    const body = document.querySelector("body");
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");
    const openIcon = document.getElementById("menu-open-icon");
    const closeIcon = document.getElementById("menu-close-icon");

    const toggleMenu = () => {
        const isMenuOpen = mobileMenu.classList.contains("active");

        mobileMenu.classList.toggle("active");
        body.classList.toggle("no-scroll");
        openIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
    };

    mobileMenuButton.addEventListener("click", toggleMenu);

    // 모바일 메뉴에서 링크 클릭 시 메뉴 닫기
    mobileLinks.forEach((link) => {
        link.addEventListener("click", toggleMenu);
    });
});
