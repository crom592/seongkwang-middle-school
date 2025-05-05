/**
 * 사랑의 편지 슬라이더 초기화 함수
 * 편지 슬라이더의 기능을 구현합니다.
 */
function initLetterSlider() {
  // 기본 요소 선택
  const slider = document.querySelector('.letter-slider');
  const cards = document.querySelectorAll('.letter-card');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  // 요소가 없으면 종료
  if (!slider || !cards.length || !prevBtn || !nextBtn || !dotsContainer) {
    console.error('편지 슬라이더 요소를 찾을 수 없습니다.');
    return;
  }
  
  // 모든 카드의 active 클래스 제거
  cards.forEach(card => {
    card.classList.remove('active');
  });
  
  // 도트 컨테이너 초기화
  dotsContainer.innerHTML = '';
  
  // 현재 카드 인덱스 초기화
  let currentIndex = 0;
  
  /**
   * 슬라이드 이동 함수
   * @param {number} index - 이동할 카드 인덱스
   */
  function goToSlide(index) {
    // 현재 카드 비활성화
    cards[currentIndex].classList.remove('active');
    
    // 새 인덱스 설정
    currentIndex = index;
    
    // 새 카드 활성화
    cards[currentIndex].classList.add('active');
    
    // 도트 업데이트
    updateDots();
    
    // 디버깅 로그
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(`카드 이동: ${index}`);
    }
  }
  
  /**
   * 도트 업데이트 함수
   */
  function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // 도트 생성
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    dot.setAttribute('data-index', index);
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `편지 ${index + 1}번`);
    dot.setAttribute('tabindex', '0');
    
    // 클릭 이벤트 추가
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    
    // 키보드 접근성
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToSlide(index);
      }
    });
    
    // 도트 컨테이너에 추가
    dotsContainer.appendChild(dot);
  });
  
  // 첫 번째 카드 활성화
  goToSlide(0);
  
  // 이전 버튼 클릭 이벤트
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    goToSlide(newIndex);
  });
  
  // 다음 버튼 클릭 이벤트
  nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % cards.length;
    goToSlide(newIndex);
  });
  
  // 키보드 이벤트 처리
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const newIndex = (currentIndex - 1 + cards.length) % cards.length;
      goToSlide(newIndex);
    } else if (e.key === 'ArrowRight') {
      const newIndex = (currentIndex + 1) % cards.length;
      goToSlide(newIndex);
    }
  });
  
  // 디버깅용 콘솔 로그
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('편지 슬라이더 초기화 완료:', {
      '슬라이더 요소': slider,
      '카드 개수': cards.length,
      '현재 인덱스': currentIndex
    });
  }
}

// 페이지 로드 시 초기화 함수 실행
document.addEventListener('DOMContentLoaded', function() {
  // DOM 로드 후 슬라이더 초기화
  initLetterSlider();
});

// 페이지 로드 완료 후 추가 초기화를 위한 이벤트 리스너
window.addEventListener('load', function() {
  // 페이지가 완전히 로드된 후 슬라이더 초기화 재실행
  setTimeout(initLetterSlider, 500);
});

// 재시도 버튼 추가 (문제 발생 시 사용)
window.resetLetterSlider = function() {
  initLetterSlider();
  return '슬라이더가 재설정되었습니다.';
};
