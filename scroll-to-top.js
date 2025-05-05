/**
 * 맨 위로 올라가는 플로팅 버튼 기능
 */
document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopButton = document.getElementById('scrollToTop');
  
  // 스크롤 이벤트 감지
  window.addEventListener('scroll', function() {
    // 스크롤 위치가 300px 이상이면 버튼 표시
    if (window.scrollY > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  });
  
  // 버튼 클릭 시 맨 위로 스크롤
  scrollToTopButton.addEventListener('click', function() {
    // 부드러운 스크롤 효과
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
