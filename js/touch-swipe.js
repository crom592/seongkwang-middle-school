/**
 * 터치 스와이프 기능을 구현하는 클래스
 * 모바일 환경에서 슬라이더를 손가락으로 넘길 수 있게 합니다.
 */
class TouchSwipe {
  /**
   * 터치 스와이프 초기화
   * @param {HTMLElement} element - 스와이프 대상 요소
   * @param {Function} onSwipeLeft - 왼쪽 스와이프 시 콜백 함수
   * @param {Function} onSwipeRight - 오른쪽 스와이프 시 콜백 함수
   */
  constructor(element, onSwipeLeft, onSwipeRight) {
    this.element = element;
    this.onSwipeLeft = onSwipeLeft;
    this.onSwipeRight = onSwipeRight;
    
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.threshold = 50; // 스와이프로 인식할 최소 거리 (픽셀)
    this.restraint = 100; // 수직 제한 거리 (픽셀)
    this.allowedTime = 300; // 스와이프 허용 시간 (밀리초)
    this.startTime = 0;
    
    this.init();
  }
  
  /**
   * 이벤트 리스너 초기화
   */
  init() {
    // 터치 이벤트 리스너 등록
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
    
    // 마우스 이벤트 리스너 등록 (데스크톱 지원)
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
    document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
    document.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
    
    // 디버깅 메시지
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('터치 스와이프 초기화 완료:', this.element);
    }
  }
  
  /**
   * 터치 시작 이벤트 핸들러
   * @param {TouchEvent} e - 터치 이벤트
   */
  handleTouchStart(e) {
    const touch = e.changedTouches[0];
    this.startX = touch.pageX;
    this.startY = touch.pageY;
    this.startTime = new Date().getTime();
  }
  
  /**
   * 터치 이동 이벤트 핸들러
   * @param {TouchEvent} e - 터치 이벤트
   */
  handleTouchMove(e) {
    // 스와이프 중 페이지 스크롤 방지
    // e.preventDefault();
  }
  
  /**
   * 터치 종료 이벤트 핸들러
   * @param {TouchEvent} e - 터치 이벤트
   */
  handleTouchEnd(e) {
    const touch = e.changedTouches[0];
    this.endX = touch.pageX;
    this.endY = touch.pageY;
    this.handleSwipe();
  }
  
  /**
   * 마우스 다운 이벤트 핸들러
   * @param {MouseEvent} e - 마우스 이벤트
   */
  handleMouseDown(e) {
    e.preventDefault();
    this.startX = e.pageX;
    this.startY = e.pageY;
    this.startTime = new Date().getTime();
    this.isMouseDown = true;
  }
  
  /**
   * 마우스 이동 이벤트 핸들러
   * @param {MouseEvent} e - 마우스 이벤트
   */
  handleMouseMove(e) {
    if (!this.isMouseDown) return;
    e.preventDefault();
  }
  
  /**
   * 마우스 업 이벤트 핸들러
   * @param {MouseEvent} e - 마우스 이벤트
   */
  handleMouseUp(e) {
    if (!this.isMouseDown) return;
    e.preventDefault();
    this.endX = e.pageX;
    this.endY = e.pageY;
    this.isMouseDown = false;
    this.handleSwipe();
  }
  
  /**
   * 스와이프 처리 함수
   */
  handleSwipe() {
    const elapsedTime = new Date().getTime() - this.startTime;
    const distanceX = this.endX - this.startX;
    const distanceY = this.endY - this.startY;
    
    // 스와이프 조건 확인
    if (elapsedTime <= this.allowedTime) {
      // 수평 스와이프 확인
      if (Math.abs(distanceX) >= this.threshold && Math.abs(distanceY) <= this.restraint) {
        // 왼쪽 또는 오른쪽 스와이프 처리
        if (distanceX < 0) {
          // 왼쪽 스와이프
          if (typeof this.onSwipeLeft === 'function') {
            this.onSwipeLeft();
          }
        } else {
          // 오른쪽 스와이프
          if (typeof this.onSwipeRight === 'function') {
            this.onSwipeRight();
          }
        }
      }
    }
  }
}

// 전역 스코프에 노출
window.TouchSwipe = TouchSwipe;
