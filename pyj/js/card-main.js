document.addEventListener("DOMContentLoaded", function () {
    // --- 데이터 ---
    const allQuotesData = [
        {
            id: "edison-01",
            quote: "저는 실패한 적이 없습니다. 그저 작동하지 않는 1만 가지 방법을 찾았을 뿐입니다.",
            author: "토머스 에디슨",
            story: "전구를 발명하기까지 수천 번의 실패를 겪었지만, 그는 모든 시도를 성공으로 가는 과정의 일부로 여겼습니다.",
            comment:
                "모든 시도는 그 자체로 소중한 데이터가 된대요. 대표님의 오늘도 그랬을 거예요.",
        },
        {
            id: "churchill-01",
            quote: "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 계속 나아갈 용기다.",
            author: "윈스턴 처칠",
            story: "수많은 정치적 실패와 좌절을 겪었음에도, 그는 결코 굴하지 않고 2차 세계대전을 승리로 이끈 리더가 되었습니다.",
            comment:
                "넘어져도 괜찮아요. 다시 일어날 용기, 그거 하나면 충분해요!",
        },
        {
            id: "jordan-01",
            quote: "나는 내 경력에서 9000번 이상의 슛을 놓쳤다. 나는 인생에서 몇 번이고 실패를 거듭했다. 그리고 그것이 내가 성공한 이유다.",
            author: "마이클 조던",
            story: "농구 황제로 불리는 그조차 수많은 실패를 겪었습니다. 그는 실패를 성공의 필수적인 과정으로 받아들였습니다.",
            comment:
                "최고의 선수도 실패를 두려워하지 않았대요. 대표님의 실패도 성공을 향한 슛이에요!",
        },
        {
            id: "disney-01",
            quote: "우리가 가진 모든 꿈은, 그것을 추구할 용기만 있다면 이루어질 수 있다.",
            author: "월트 디즈니",
            story: "신문사에서 '상상력이 부족하다'는 이유로 해고당하고, 여러 사업에 실패했지만 그는 꿈을 포기하지 않고 세계적인 엔터테인먼트 제국을 건설했습니다.",
            comment:
                "누군가 대표님의 꿈을 작다고 해도 믿지 마세요. 용기만 있다면요!",
        },
        {
            id: "rowling-01",
            quote: "우리가 진정으로 어떤 사람인지는 우리의 능력이 아니라, 우리의 선택을 통해 나타난다.",
            author: "J.K. 롤링",
            story: "해리포터를 출간하기 전, 그녀는 12곳의 출판사로부터 거절당했습니다. 가난과 우울 속에서도 그녀는 계속 글을 쓰는 것을 선택했습니다.",
            comment:
                "어떤 상황에 있는지가 아니라, 어떤 선택을 하는지가 중요하대요.",
        },
    ];

    let currentQuoteOnMain;

    // --- HTML 요소 가져오기 (이전과 동일) ---
    const mainView = document.getElementById("main-view");
    const archiveView = document.getElementById("archive-view");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");
    const quoteStory = document.getElementById("quote-story");
    const characterComment = document.getElementById("character-comment");
    const backBtn = document.getElementById("back-btn");
    const saveBtn = document.getElementById("save-btn");
    const saveBtnText = document.getElementById("save-btn-text");
    const iconSave = saveBtn.querySelector(".icon-save");
    const iconSaved = saveBtn.querySelector(".icon-saved");
    const openArchiveBtn = document.getElementById("open-archive-btn");
    const closeArchiveBtn = document.getElementById("close-archive-btn");
    const archiveList = document.getElementById("archive-list");
    const emptyMsg = document.getElementById("empty-archive-msg");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalQuoteText = document.getElementById("modal-quote-text");
    const modalQuoteAuthor = document.getElementById("modal-quote-author");
    const modalQuoteStory = document.getElementById("modal-quote-story");
    const modalCharacterComment = document.getElementById(
        "modal-character-comment"
    );
    const copyBtn = document.getElementById("copy-btn");

    // --- 함수 ---

    const getSavedQuotes = () =>
        JSON.parse(localStorage.getItem("savedQuotes")) || [];
    const saveQuotesToStorage = (quotes) =>
        localStorage.setItem("savedQuotes", JSON.stringify(quotes));

    const displayQuoteOnMain = (quoteData) => {
        if (!quoteData) return;
        currentQuoteOnMain = quoteData;
        quoteText.textContent = quoteData.quote;
        quoteAuthor.textContent = `- ${quoteData.author} -`;
        quoteStory.textContent = quoteData.story;
        characterComment.textContent = quoteData.comment;
        updateSaveButtonStatus();
    };

    const updateSaveButtonStatus = () => {
        const savedQuotes = getSavedQuotes();
        const isSaved = savedQuotes.some((q) => q.id === currentQuoteOnMain.id);
        saveBtn.classList.toggle("saved", isSaved);
        saveBtnText.textContent = isSaved ? "보관됨" : "보관하기";
        iconSave.classList.toggle("hidden", isSaved);
        iconSaved.classList.toggle("hidden", !isSaved);
    };

    const renderArchive = () => {
        const savedQuotes = getSavedQuotes();
        archiveList.innerHTML = "";
        emptyMsg.classList.toggle("hidden", savedQuotes.length > 0);
        savedQuotes.forEach((q) => {
            const li = document.createElement("li");
            li.className = "archive-item";
            li.dataset.id = q.id;
            li.innerHTML = `
                <div class="archive-item-content">
                    <p class="quote">“${q.quote.substring(0, 25)}...”</p>
                    <p class="author">- ${q.author}</p>
                </div>
                <button class="delete-btn icon-button" data-id="${
                    q.id
                }" aria-label="삭제하기">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            `;
            archiveList.appendChild(li);
        });
    };

    const switchView = (viewToShow) => {
        if (viewToShow === "archive") {
            renderArchive();
            mainView.classList.remove("active");
            archiveView.classList.add("active");
        } else {
            archiveView.classList.remove("active");
            mainView.classList.add("active");
        }
    };

    const showModalWithQuote = (quoteId) => {
        // [버그 수정] 전체 명언 목록이 아닌, 저장된 명언 목록에서 데이터를 찾도록 수정
        const quoteData = allQuotesData.find((q) => q.id === quoteId);
        if (!quoteData) return;

        modalQuoteText.textContent = quoteData.quote;
        modalQuoteAuthor.textContent = `- ${quoteData.author} -`;
        modalQuoteStory.textContent = quoteData.story;
        modalCharacterComment.textContent = quoteData.comment;

        modalOverlay.classList.add("active");
        modalOverlay.classList.remove("hidden");
    };

    const closeModal = () => {
        modalOverlay.classList.remove("active");
        modalOverlay.classList.add("hidden");
    };

    // --- 이벤트 리스너 ---

    backBtn.addEventListener("click", () => {
        window.history.back();
        // alert("홈으로 이동");
    });

    saveBtn.addEventListener("click", () => {
        let savedQuotes = getSavedQuotes();
        const quoteIndex = savedQuotes.findIndex(
            (q) => q.id === currentQuoteOnMain.id
        );
        if (quoteIndex > -1) {
            savedQuotes.splice(quoteIndex, 1);
        } else {
            savedQuotes.unshift(currentQuoteOnMain);
        }
        saveQuotesToStorage(savedQuotes);
        updateSaveButtonStatus();
    });

    openArchiveBtn.addEventListener("click", () => switchView("archive"));
    closeArchiveBtn.addEventListener("click", () => switchView("main"));

    archiveList.addEventListener("click", (e) => {
        const deleteButton = e.target.closest(".delete-btn");
        const archiveItem = e.target.closest(".archive-item");

        if (deleteButton) {
            e.stopPropagation();
            const quoteIdToDelete = deleteButton.dataset.id;
            let savedQuotes = getSavedQuotes();
            const updatedQuotes = savedQuotes.filter(
                (q) => q.id !== quoteIdToDelete
            );
            saveQuotesToStorage(updatedQuotes);

            if (currentQuoteOnMain.id === quoteIdToDelete) {
                updateSaveButtonStatus();
            }
            renderArchive();
        } else if (archiveItem) {
            const quoteIdToShow = archiveItem.dataset.id;
            showModalWithQuote(quoteIdToShow);
        }
    });

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    copyBtn.addEventListener("click", () => {
        // alert("앱에서 만날 수 있는 기능이에요");
        window.navigator.clipboard.writeText(
            `<오늘의 실패 명언>

${quoteText.textContent}
${quoteAuthor.textContent}     

배경 이야기
${quoteStory.textContent}

${characterComment.textContent}`
        );

        alert("복사가 완료되었어요!");
    });

    // --- 앱 초기화 ---
    const initializeApp = () => {
        // 앱 최초 실행 시에만 보관함 데이터 설정
        if (localStorage.getItem("savedQuotes") === null) {
            const initialArchiveQuotes = allQuotesData.slice(1);
            saveQuotesToStorage(initialArchiveQuotes);
        }

        const todayQuote = allQuotesData[0];
        displayQuoteOnMain(todayQuote);
    };

    initializeApp();
});
