// 퇴근 메시지 목록
const clockOutMessages = [
    "정말 고생 많았어요, 대표님 🌙<br>오늘 하루도 참 열심히 달려오셨네요.<br>이제는 일을 내려놓고 자신을 위한 시간을 가져보세요.<br>당신의 건강과 행복이 회사의 가장 큰 자산이니까요.",
    "이제는 당신의 마음을 돌볼 시간이에요 💝<br>일은 내일도 있지만, 오늘의 당신은 오늘뿐이니까요.<br>따뜻한 차 한 잔과 함께 하루를 마무리해보세요.<br>충분한 휴식이 더 나은 내일을 만들어줄 거예요.",
    "퇴근 시간입니다 🏠<br>세상의 모든 일을 오늘 다 끝낼 순 없어요.<br>이제 쉬어도 돼요.<br>가족과 함께하는 저녁 시간이 기다리고 있을 거예요.",
    "오늘도 충분히 잘하셨어요 ✨<br>완벽하지 않아도 괜찮아요.<br>당신은 이미 최선을 다했으니까요.<br>스스로에게 박수를 보내주세요.",
    "일을 놓는 것도 실력이에요 💪<br>건강한 휴식이 더 나은 내일을 만듭니다.<br>오늘 밤은 푹 쉬고, 내일 다시 활기차게 시작해요.<br>당신은 충분히 그럴 자격이 있어요.",
    "대표님, 당신도 누군가의 소중한 사람이에요 💕<br>자신을 위한 시간을 가지세요.<br>좋아하는 음악을 듣거나 산책을 해보는 건 어떨까요?<br>작은 행복이 큰 에너지가 될 거예요.",
    "오늘의 당신에게 박수를 보내요 👏<br>힘든 하루였더라도 잘 견뎌내셨어요.<br>내일은 또 다른 기회가 기다리고 있어요.<br>오늘 밤은 편안하게 쉬세요.",
    "휴식은 게으름이 아니에요 🌿<br>재충전의 시간입니다.<br>몸과 마음이 쉬어야 더 좋은 아이디어가 나와요.<br>편안한 저녁 되세요."
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
    // 메시지 HTML 설정 (br 태그 사용을 위해 innerHTML 사용)
    displayMessage.innerHTML = message;
    
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

