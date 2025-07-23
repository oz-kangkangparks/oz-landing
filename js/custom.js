document.addEventListener("DOMContentLoaded", function () {
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

    // 메뉴 화면 안의 닫기 버튼 요소를 가져옵니다.
    const menuCloseButton = document.getElementById("menu-close-button");

    // 메뉴를 열고 닫는 함수
    const toggleMenu = () => {
        mobileMenu.classList.toggle("active");
        body.classList.toggle("no-scroll");
    };

    // 햄버거 버튼을 누르면 메뉴가 열립니다.
    mobileMenuButton.addEventListener("click", toggleMenu);

    // 메뉴 안의 X 버튼을 누르면 메뉴가 닫힙니다.
    menuCloseButton.addEventListener("click", toggleMenu);

    // 메뉴 안의 링크를 클릭했을 때도 메뉴가 닫힙니다.
    mobileLinks.forEach((link) => {
        link.addEventListener("click", toggleMenu);
    });

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
});
