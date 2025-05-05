/**
 * 스크롤 애니메이션 처리 함수
 * 화면에 요소가 나타날 때 애니메이션 효과를 적용합니다.
 */
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * 테스티모니얼 슬라이더 초기화 함수
 * 자동 슬라이드 기능을 구현합니다.
 */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  
  if (!slider || testimonials.length <= 1) return;
  
  let currentIndex = 0;
  const slideWidth = testimonials[0].offsetWidth + 30; // 30px는 gap 값
  
  // 자동 슬라이드 함수
  const autoSlide = () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    slider.scrollTo({
      left: currentIndex * slideWidth,
      behavior: 'smooth'
    });
  };
  
  // 3초마다 자동 슬라이드
  setInterval(autoSlide, 5000);
}

/**
 * 스무스 스크롤 기능 구현 함수
 * 내비게이션 링크 클릭 시 부드럽게 스크롤되도록 합니다.
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 카카오맵 반응형 렌더링 처리
 * 지도가 완전히 로드되고 렌더링된 후 리사이징을 위한 스타일 적용
 */
function initKakaoMap() {
  // 대기 후 랜더링 상태 확인 (DOMContentLoaded와 맵 초기화 시간차 고려)
  setTimeout(() => {
    const mapContainer = document.getElementById('daumRoughmapContainer1745679233203');
    if (mapContainer) {
      // 카카오맵 렌더링 후 스타일링을 위한 클래스 추가
      const mapParent = mapContainer.closest('.map');
      if (mapParent) {
        mapParent.classList.add('map-rendered');
      }
      
      // 윈도우 리사이즈 이벤트에 맵 상태 갱신
      window.addEventListener('resize', () => {
        // 카카오맵 API가 제공하는 객체가 있는지 확인
        if (window.daum && window.daum.roughmap) {
          try {
            // 지도 갱신 시도
            window.daum.roughmap.fromId('roughmap.2nu85').redraw();
          } catch (e) {
            // 오류 무시 - 카카오맵 API 호환성 이슈
          }
        }
      });
    }
  }, 1000); // 1초 뒤 확인
}

/**
 * 페이지 로드 시 실행되는 초기화 함수
 */
function initPage() {
  handleScrollAnimations();
  initTestimonialSlider();
  initSmoothScroll();
  initLetterSlider();
  initKakaoMap();
  
  // 개발 환경에서만 콘솔 로그 출력
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('성광교회 중등부 웹사이트가 성공적으로 로드되었습니다.');
  }
}

// 페이지 로드 시 초기화 함수 실행
document.addEventListener('DOMContentLoaded', initPage);
