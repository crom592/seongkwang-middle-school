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
 * 페이지 로드 시 실행되는 초기화 함수
 */
function initPage() {
  handleScrollAnimations();
  initTestimonialSlider();
  initSmoothScroll();
  initLetterSlider();
  
  // 개발 환경에서만 콘솔 로그 출력
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('성광교회 중등부 웹사이트가 성공적으로 로드되었습니다.');
  }
}

// 페이지 로드 시 초기화 함수 실행
document.addEventListener('DOMContentLoaded', initPage);
