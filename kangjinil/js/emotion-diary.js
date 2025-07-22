// LocalStorage key
const STORAGE_KEY = 'emotionRecords';

// 현재 편집 중인 감정 기록 ID
let currentEditingId = null;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 앱 초기화
function initializeApp() {
    // 감정 선택 이벤트 리스너 추가
    document.querySelectorAll('.emotion-option').forEach(option => {
        option.addEventListener('click', function() {
            selectEmotion(this);
        });
    });
    
    // 코멘트 입력 글자수 카운트
    const commentInputs = document.querySelectorAll('.comment-input');
    commentInputs.forEach(input => {
        input.addEventListener('input', function() {
            updateCharCount(this);
        });
    });
    
    // 기본적으로 등록 화면 표시
    showRecordScreen();
}

// 감정 선택
function selectEmotion(element) {
    const parent = element.closest('.emotion-selector');
    parent.querySelectorAll('.emotion-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
}

// 글자수 업데이트
function updateCharCount(textarea) {
    const charCount = textarea.value.length;
    const charCountElement = textarea.nextElementSibling;
    charCountElement.textContent = `${charCount}/100`;
}

// 등록 화면 표시
function showRecordScreen() {
    document.getElementById('recordScreen').classList.add('active');
    document.getElementById('listScreen').classList.remove('active');
    
    // 폼 초기화
    resetRecordForm();
}

// 목록 화면 표시
function showListScreen() {
    document.getElementById('recordScreen').classList.remove('active');
    document.getElementById('listScreen').classList.add('active');
    
    // 목록 새로고침
    refreshEmotionList();
}

// 등록 폼 초기화
function resetRecordForm() {
    document.querySelectorAll('#recordScreen .emotion-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById('emotionComment').value = '';
    updateCharCount(document.getElementById('emotionComment'));
}

// 감정 저장
function saveEmotion() {
    const selectedEmotion = document.querySelector('#recordScreen .emotion-option.selected');
    
    if (!selectedEmotion) {
        alert('감정을 선택해주세요.');
        return;
    }
    
    const emotion = selectedEmotion.dataset.emotion;
    const value = selectedEmotion.dataset.value;
    const comment = document.getElementById('emotionComment').value.trim();
    
    const record = {
        id: Date.now().toString(),
        emotion: emotion,
        value: value,
        comment: comment,
        date: new Date().toISOString()
    };
    
    // LocalStorage에서 기존 기록 가져오기
    const records = getEmotionRecords();
    
    // 새 기록 추가
    records.unshift(record);
    
    // LocalStorage에 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    
    // 목록 화면으로 이동
    showListScreen();
}

// 감정 기록 가져오기
function getEmotionRecords() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// 감정 목록 새로고침
function refreshEmotionList() {
    const records = getEmotionRecords();
    const listContainer = document.getElementById('emotionList');
    const emptyState = document.getElementById('emptyState');
    
    if (records.length === 0) {
        listContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    listContainer.style.display = 'flex';
    emptyState.style.display = 'none';
    
    // 목록 렌더링
    listContainer.innerHTML = records.map(record => {
        const date = new Date(record.date);
        const dateStr = formatDate(date);
        
        return `
            <div class="emotion-item" onclick="openEditModal('${record.id}')">
                <div class="emotion-item-header">
                    <span class="emotion-item-emoji">${record.emotion}</span>
                    <span class="emotion-item-date">${dateStr}</span>
                </div>
                ${record.comment ? `<p class="emotion-item-comment">${record.comment}</p>` : ''}
            </div>
        `;
    }).join('');
}

// 날짜 포맷팅
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 편집 모달 열기
function openEditModal(recordId) {
    const records = getEmotionRecords();
    const record = records.find(r => r.id === recordId);
    
    if (!record) return;
    
    currentEditingId = recordId;
    
    // 모달에 데이터 설정
    const modal = document.getElementById('editModal');
    
    // 감정 선택
    modal.querySelectorAll('.emotion-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.value === record.value) {
            option.classList.add('selected');
        }
    });
    
    // 코멘트 설정
    const editComment = document.getElementById('editComment');
    editComment.value = record.comment || '';
    updateCharCount(editComment);
    
    // 모달 표시
    modal.classList.add('active');
}

// 모달 닫기
function closeModal() {
    document.getElementById('editModal').classList.remove('active');
    currentEditingId = null;
}

// 감정 업데이트
function updateEmotion() {
    const selectedEmotion = document.querySelector('#editModal .emotion-option.selected');
    
    if (!selectedEmotion) {
        alert('감정을 선택해주세요.');
        return;
    }
    
    const records = getEmotionRecords();
    const recordIndex = records.findIndex(r => r.id === currentEditingId);
    
    if (recordIndex === -1) return;
    
    // 기록 업데이트 (날짜는 변경하지 않음)
    records[recordIndex].emotion = selectedEmotion.dataset.emotion;
    records[recordIndex].value = selectedEmotion.dataset.value;
    records[recordIndex].comment = document.getElementById('editComment').value.trim();
    
    // LocalStorage 업데이트
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    
    // 모달 닫고 목록 새로고침
    closeModal();
    refreshEmotionList();
}

// 감정 삭제
function deleteEmotion() {
    if (!confirm('이 감정 기록을 삭제하시겠습니까?')) {
        return;
    }
    
    const records = getEmotionRecords();
    const filteredRecords = records.filter(r => r.id !== currentEditingId);
    
    // LocalStorage 업데이트
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
    
    // 모달 닫고 목록 새로고침
    closeModal();
    refreshEmotionList();
}

// 모달 외부 클릭 시 닫기
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});