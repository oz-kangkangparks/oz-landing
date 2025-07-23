// 퇴근 메시지 목록
const clockOutMessages = [
    "정말 고생 많았어요, 대표님 🌙\n오늘 하루도 참 열심히 달려오셨네요.",
    "이제는 당신의 마음을 돌볼 시간이에요 💝\n일은 내일도 있지만, 오늘의 당신은 오늘뿐이니까요.",
    "퇴근 시간입니다 🏠\n세상의 모든 일을 오늘 다 끝낼 순 없어요. 이제 쉬어도 돼요.",
    "오늘도 충분히 잘하셨어요 ✨\n완벽하지 않아도 괜찮아요. 당신은 이미 최선을 다했으니까요.",
    "일을 놓는 것도 실력이에요 💪\n건강한 휴식이 더 나은 내일을 만듭니다.",
    "대표님, 당신도 누군가의 소중한 사람이에요 💕\n자신을 위한 시간을 가지세요.",
    "오늘의 당신에게 박수를 보내요 👏\n내일은 또 다른 기회가 기다리고 있어요.",
    "휴식은 게으름이 아니에요 🌿\n재충전의 시간입니다. 편안한 저녁 되세요."
];

// DOM Elements
const form = document.getElementById('clock-out-form');
const timeInput = document.getElementById('clock-out-time');
const weekdayInputs = document.querySelectorAll('input[name="weekday"]');
const testMessageBtn = document.getElementById('test-message-btn');
const saveNotification = document.getElementById('save-notification');
const displayMessage = document.getElementById('display-message');
const mainScreen = document.getElementById('main-screen');
const messageScreen = document.getElementById('message-screen');
const backButton = document.getElementById('back-button');

// 페이지 로드 시 저장된 설정 불러오기
window.addEventListener('DOMContentLoaded', () => {
    loadSavedSettings();
});

// 저장된 설정 불러오기
function loadSavedSettings() {
    const savedSettings = localStorage.getItem('clockOutSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // 시간 설정
        if (settings.clockOutTime) {
            timeInput.value = settings.clockOutTime;
        }
        
        // 요일 설정
        if (settings.weekdays && settings.weekdays.length > 0) {
            weekdayInputs.forEach(input => {
                input.checked = settings.weekdays.includes(input.value);
            });
        }
    }
}

// 폼 제출 처리
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 선택된 요일 수집
    const selectedWeekdays = [];
    weekdayInputs.forEach(input => {
        if (input.checked) {
            selectedWeekdays.push(input.value);
        }
    });
    
    // 유효성 검사
    if (selectedWeekdays.length === 0) {
        alert('최소 하나 이상의 요일을 선택해주세요.');
        return;
    }
    
    // 설정 저장
    const settings = {
        clockOutTime: timeInput.value,
        weekdays: selectedWeekdays,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('clockOutSettings', JSON.stringify(settings));
    
    // 저장 알림 표시
    showSaveNotification();
});

// 테스트 메시지 받기
testMessageBtn.addEventListener('click', () => {
    // 랜덤 메시지 선택
    const randomMessage = clockOutMessages[Math.floor(Math.random() * clockOutMessages.length)];
    
    // 메시지 결과 표시
    showMessageResult(randomMessage);
});

// 메시지 결과 표시 함수
function showMessageResult(message) {
    // 메시지 텍스트 설정
    displayMessage.textContent = message;
    
    // 화면 전환
    mainScreen.classList.remove('active');
    messageScreen.classList.add('active');
}

// 돌아가기 버튼 이벤트
backButton.addEventListener('click', () => {
    // 메인 화면으로 전환
    messageScreen.classList.remove('active');
    mainScreen.classList.add('active');
});

// 저장 알림 표시
function showSaveNotification() {
    saveNotification.classList.remove('hidden');
    
    // 3초 후 자동 숨김
    setTimeout(() => {
        saveNotification.classList.add('hidden');
    }, 3000);
}

