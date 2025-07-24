document.addEventListener("DOMContentLoaded", function () {
    // --- 요소 가져오기 ---
    const logEmotionBtn = document.getElementById("log-emotion-btn");

    // 네비게이션 아이템
    const navHome = document.getElementById("nav-home");
    const navEmotionLog = document.getElementById("nav-emotion-log");
    const navAlarm = document.getElementById("nav-alarm");
    const navQuotes = document.getElementById("nav-quotes");
    const navStats = document.getElementById("nav-stats");

    // --- 이벤트 리스너 ---

    // 오늘의 감정 기록하기 버튼
    logEmotionBtn.addEventListener("click", () => {
        //alert("감정 기록 화면으로 이동합니다.");
        this.location.href = "../kangjinil/index.html";
    });

    // 하단 네비게이션
    navHome.addEventListener("click", () => {
        alert("이미 홈 화면입니다.");
    });

    navEmotionLog.addEventListener("click", () => {
        // alert("감정 기록 화면으로 이동합니다.");
    });

    navAlarm.addEventListener("click", () => {
        // alert("퇴근 알림 설정 화면으로 이동합니다.");
    });

    navQuotes.addEventListener("click", () => {
        // alert("실패 명언 화면으로 이동합니다.");
    });

    navStats.addEventListener("click", () => {
        // alert("감정 통계 화면으로 이동합니다.");
    });
});
