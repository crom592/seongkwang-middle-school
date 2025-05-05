/**
 * 스크롤 기반 슬라이더 기능 구현
 * 스크롤 시 자동으로 다음 슬라이드로 넘어가는 기능을 제공합니다.
 */
class ScrollSlider {
  /**
   * 스크롤 슬라이더 초기화
   * @param {HTMLElement} container - 슬라이더 컨테이너
   * @param {Function} onSlideChange - 슬라이드 변경 시 콜백 함수
   */
  constructor(container, onSlideChange) {
    this.container = container;
    this.onSlideChange = onSlideChange;
    this.isScrolling = false;
    this.scrollTimeout = null;
    this.scrollThreshold = 50; // 스크롤 감지 임계값
    this.lastScrollTop = 0;
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.slides = [];
    this.isEnabled = true;
    
    this.init();
  }
  
  /**
   * 초기화 함수
   */
  init() {
    if (!this.container) return;
    
    // 슬라이드 요소 가져오기
    this.slides = Array.from(this.container.querySelectorAll('.letter-card'));
    this.totalSlides = this.slides.length;
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    // 디버깅 메시지
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('스크롤 슬라이더 초기화 완료:', {
        컨테이너: this.container,
        슬라이드수: this.totalSlides
      });
    }
  }
  
  /**
   * 휠 이벤트 핸들러
   * @param {WheelEvent} e - 휠 이벤트
   */
  handleWheel(e) {
    // 슬라이더 섹션 내에 있는지 확인
    if (!this.isInSliderSection() || !this.isEnabled) return;
    
    // 스크롤 방향 확인
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // 이미 스크롤 중이면 무시
    if (this.isScrolling) return;
    
    // 스크롤 방향에 따라 슬라이드 변경
    if (direction === 'down' && this.currentSlide < this.totalSlides - 1) {
      e.preventDefault(); // 기본 스크롤 동작 방지
      this.goToNextSlide();
    } else if (direction === 'up' && this.currentSlide > 0) {
      e.preventDefault(); // 기본 스크롤 동작 방지
      this.goToPrevSlide();
    }
  }
  
  /**
   * 스크롤 이벤트 핸들러
   */
  handleScroll() {
    if (!this.isEnabled) return;
    
    // 스크롤 중복 호출 방지
    clearTimeout(this.scrollTimeout);
    
    this.scrollTimeout = setTimeout(() => {
      // 스크롤 방향 확인
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
      
      // 스크롤 거리가 임계값보다 크면 슬라이드 변경
      if (Math.abs(scrollTop - this.lastScrollTop) > this.scrollThreshold) {
        if (this.isInSliderSection()) {
          if (direction === 'down' && this.currentSlide < this.totalSlides - 1) {
            this.goToNextSlide();
          } else if (direction === 'up' && this.currentSlide > 0) {
            this.goToPrevSlide();
          }
        }
      }
      
      this.lastScrollTop = scrollTop;
    }, 100);
  }
  
  /**
   * 슬라이더 섹션 내에 있는지 확인
   * @returns {boolean} 슬라이더 섹션 내 여부
   */
  isInSliderSection() {
    const sliderSection = document.querySelector('.letter-slider-section');
    if (!sliderSection) return false;
    
    const rect = sliderSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 슬라이더 섹션이 화면에 보이는지 확인
    return (
      rect.top <= windowHeight / 2 &&
      rect.bottom >= windowHeight / 2
    );
  }
  
  /**
   * 다음 슬라이드로 이동
   */
  goToNextSlide() {
    if (this.currentSlide >= this.totalSlides - 1) return;
    
    this.isScrolling = true;
    this.currentSlide++;
    
    if (typeof this.onSlideChange === 'function') {
      this.onSlideChange(this.currentSlide);
    }
    
    // 스크롤 애니메이션 완료 후 플래그 해제
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }
  
  /**
   * 이전 슬라이드로 이동
   */
  goToPrevSlide() {
    if (this.currentSlide <= 0) return;
    
    this.isScrolling = true;
    this.currentSlide--;
    
    if (typeof this.onSlideChange === 'function') {
      this.onSlideChange(this.currentSlide);
    }
    
    // 스크롤 애니메이션 완료 후 플래그 해제
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }
  
  /**
   * 현재 슬라이드 설정
   * @param {number} index - 설정할 슬라이드 인덱스
   */
  setCurrentSlide(index) {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;
    }
  }
  
  /**
   * 스크롤 슬라이더 활성화/비활성화
   * @param {boolean} enabled - 활성화 여부
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
}

// 전역 스코프에 노출
window.ScrollSlider = ScrollSlider;
