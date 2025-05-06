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
  
  // 슬라이더 래퍼 요소 추가
  if (!slider.querySelector('.letter-slider-wrapper')) {
    const wrapper = document.createElement('div');
    wrapper.className = 'letter-slider-wrapper';
    
    // 기존 카드들을 래퍼로 이동
    while (slider.firstChild) {
      wrapper.appendChild(slider.firstChild);
    }
    
    slider.appendChild(wrapper);
  }
  
  // 래퍼 요소 참조 업데이트
  const wrapper = slider.querySelector('.letter-slider-wrapper');
  
  // 모든 카드의 클래스 초기화
  cards.forEach(card => {
    card.classList.remove('active', 'prev', 'next');
  });
  
  // 도트 컨테이너 초기화
  dotsContainer.innerHTML = '';
  
  // 현재 카드 인덱스 초기화
  let currentIndex = 0;
  let isAnimating = false; // 애니메이션 중복 방지 플래그
  
  /**
   * 카드 상태 업데이트 함수
   */
  function updateCardStates() {
    // 모든 카드 클래스 초기화
    cards.forEach((card, index) => {
      card.classList.remove('active', 'prev', 'next');
      
      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        card.classList.add('prev');
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add('next');
      }
    });
  }
  
  /**
   * 슬라이드 이동 함수
   * @param {number} index - 이동할 카드 인덱스
   */
  function goToSlide(index) {
    // 애니메이션 중이면 무시
    if (isAnimating) return;
    
    // 유효한 인덱스인지 확인
    if (index < 0 || index >= cards.length) return;
    
    // 애니메이션 중복 방지
    isAnimating = true;
    
    // 새 인덱스 설정
    currentIndex = index;
    
    // 카드 상태 업데이트
    updateCardStates();
    
    // 도트 업데이트
    updateDots();
    
    // 애니메이션 완료 후 플래그 초기화
    setTimeout(() => {
      isAnimating = false;
    }, 600); // 애니메이션 시간과 동일하게 설정
  }
  
  /**
   * 다음 슬라이드로 이동
   */
  function goToNextSlide() {
    const newIndex = (currentIndex + 1) % cards.length;
    goToSlide(newIndex);
  }
  
  /**
   * 이전 슬라이드로 이동
   */
  function goToPrevSlide() {
    const newIndex = (currentIndex - 1 + cards.length) % cards.length;
    goToSlide(newIndex);
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
  updateCardStates(); // 초기 카드 상태 설정
  goToSlide(0);
  
  // 이전 버튼 클릭 이벤트
  prevBtn.addEventListener('click', goToPrevSlide);
  
  // 다음 버튼 클릭 이벤트
  nextBtn.addEventListener('click', goToNextSlide);
  
  // 키보드 이벤트 처리
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevSlide();
    } else if (e.key === 'ArrowRight') {
      goToNextSlide();
    }
  });
  
  // 직접 터치/마우스 이벤트 처리
  let startX, startY, isDragging = false;
  const MIN_SWIPE_DISTANCE = 50; // 최소 스와이프 거리
  
  // 터치 시작 이벤트
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });
  
  // 마우스 다운 이벤트
  slider.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
    e.preventDefault();
  });
  
  // 터치 이동 이벤트
  slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  }, { passive: false });
  
  // 마우스 이동 이벤트
  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });
  
  // 터치 종료 이벤트
  slider.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    // 수평 이동이 수직 이동보다 크면 좌우 스와이프으로 간주
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > MIN_SWIPE_DISTANCE) {
      if (diffX > 0) {
        goToPrevSlide(); // 오른쪽으로 스와이프하면 이전 슬라이드
      } else {
        goToNextSlide(); // 왼쪽으로 스와이프하면 다음 슬라이드
      }
    }
    
    isDragging = false;
  }, { passive: false });
  
  // 마우스 업 이벤트
  slider.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    const endX = e.clientX;
    const endY = e.clientY;
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    // 수평 이동이 수직 이동보다 크면 좌우 스와이프으로 간주
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > MIN_SWIPE_DISTANCE) {
      if (diffX > 0) {
        goToPrevSlide(); // 오른쪽으로 스와이프하면 이전 슬라이드
      } else {
        goToNextSlide(); // 왼쪽으로 스와이프하면 다음 슬라이드
      }
    }
    
    isDragging = false;
  });
  
  // 마우스 이탈 이벤트
  slider.addEventListener('mouseleave', () => {
    isDragging = false;
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
