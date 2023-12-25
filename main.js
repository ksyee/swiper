const nextBtn = document.querySelector('.swiper-button-next');
const prevBtn = document.querySelector('.swiper-button-prev');
const slide = document.querySelectorAll('.swiper-slide');

const command = {
  next: ['다음', '다음페이지', '다음페이지로', '다음페이지로이동'],
  prev: ['이전', '이전페이지', '이전페이지로', '이전페이지로이동'],
  1: ['처음', '첫번째', '첫번째페이지', '첫번째페이지로', '첫번째페이지로이동'],
  2: ['두번째', '두번째페이지', '두번째페이지로', '두번째페이지로이동'],
  3: ['세번째', '세번째페이지', '세번째페이지로', '세번째페이지로이동'],
  4: ['네번째', '네번째페이지', '네번째페이지로', '네번째페이지로이동'],
  last: ['마지막', '마지막페이지', '마지막페이지로', '마지막페이지로이동'],
  suggestion: [
    '추천영화',
    '추천영화로',
    '추천영화로이동',
    '제일재밌는거',
    '꼭봐야하는영화',
  ],
};

// Swiper
var swiper = new Swiper('.mySwiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// pagination 클릭 시 해당 페이지로 이동하는 함수
const movePage = (num) => {
  swiper.slideTo(num - 1);
};

// slide의 data-title이 transcript와 일치하는지 확인하는하고 일치하면 이동하는 함수
const checkData = (transcript) => {
  slide.forEach((el) => {
    if (el.dataset.title === transcript) {
      movePage(el.dataset.index);
    }
  });
};

const startBtn = document.getElementById('start-btn');
const result = document.getElementById('result');

// 음성 인식을 위한 SpeechRecognition 객체 생성
const recognition = new webkitSpeechRecognition();
recognition.continuous = true; // 상시 마이크 감지 설정
recognition.lang = 'ko-KR'; // 인식할 언어 설정
recognition.start(); // 음성 인식 시작

// 음성 인식 결과 처리
recognition.onresult = (event) => {
  const index = event.resultIndex; // 음성 인식 결과의 인덱스
  const transcript = event.results[index][0].transcript.replace(/ /g, ''); // 인식된 텍스트 추출

  if (command.next.includes(transcript)) {
    nextBtn.click();
  } else if (command.prev.includes(transcript)) {
    prevBtn.click();
  } else if (command[1].includes(transcript)) {
    movePage(1);
  } else if (command[2].includes(transcript)) {
    movePage(2);
  } else if (command[3].includes(transcript)) {
    movePage(3);
  } else if (command[4].includes(transcript)) {
    movePage(4);
  } else if (command.last.includes(transcript)) {
    movePage(slide.length);
  } else if (command.suggestion.includes(transcript)) {
    movePage(3);
  }
  checkData(transcript);

  console.log(transcript);
};
