document.addEventListener("DOMContentLoaded", function () {
    // --- 요소 가져오기 ---
    const backBtn = document.getElementById("back-btn");
    const timeSelector = document.querySelector(".time-selector");
    const timeButtons = document.querySelectorAll(".time-btn");
    const saveReportBtn = document.getElementById("save-report-btn");

    // --- 이벤트 리스너 ---

    // 뒤로가기 버튼
    backBtn.addEventListener("click", () => {
        window.history.back();
    });

    // 기간 선택 버튼
    timeSelector.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            timeButtons.forEach((btn) => btn.classList.remove("active"));
            e.target.classList.add("active");
            const period = e.target.dataset.period;
            alert(`'${period}' 기간의 통계를 불러옵니다.`);
        }
    });

    // 리포트 저장 버튼
    saveReportBtn.addEventListener("click", () => {
        alert("마음 리포트가 저장되었습니다.");
    });
});
