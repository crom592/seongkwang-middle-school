/**
 * 드래그 가능한 스티커 이미지 기능
 * 사용자가 이미지를 드래그하여 위치를 변경할 수 있음
 */

// 스티커 드래그 기능 구현
document.addEventListener('DOMContentLoaded', function() {
  // 모든 스티커 요소 선택
  const stickers = document.querySelectorAll('.sticker');
  
  // 각 스티커에 드래그 이벤트 추가
  stickers.forEach(sticker => {
    let isDragging = false;
    let offsetX, offsetY;
    
    // 터치 이벤트 (모바일)
    sticker.addEventListener('touchstart', function(e) {
      isDragging = true;
      const touch = e.touches[0];
      const rect = sticker.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      sticker.style.zIndex = 1000;
    });
    
    // 마우스 이벤트 (데스크톱)
    sticker.addEventListener('mousedown', function(e) {
      isDragging = true;
      offsetX = e.clientX - sticker.getBoundingClientRect().left;
      offsetY = e.clientY - sticker.getBoundingClientRect().top;
      sticker.style.zIndex = 1000;
    });
    
    // 드래그 중 이벤트
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      sticker.style.left = `${x}px`;
      sticker.style.top = `${y}px`;
    });
    
    // 터치 이동 이벤트 (모바일)
    document.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;
      
      sticker.style.left = `${x}px`;
      sticker.style.top = `${y}px`;
      
      e.preventDefault(); // 스크롤 방지
    }, { passive: false });
    
    // 드래그 종료 이벤트
    document.addEventListener('mouseup', function() {
      isDragging = false;
      sticker.style.zIndex = 999;
    });
    
    // 터치 종료 이벤트 (모바일)
    document.addEventListener('touchend', function() {
      isDragging = false;
      sticker.style.zIndex = 999;
    });
  });
  
  // 랜덤 위치 및 회전 적용
  function randomizeStickers() {
    stickers.forEach(sticker => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 화면 내에서 랜덤 위치 계산 (가장자리 제외)
      const maxX = viewportWidth - 150;
      const maxY = viewportHeight - 150;
      
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      
      // 랜덤 회전 (-15도 ~ 15도)
      const randomRotation = Math.floor(Math.random() * 30) - 15;
      
      // 스타일 적용
      sticker.style.left = `${randomX}px`;
      sticker.style.top = `${randomY}px`;
      sticker.style.transform = `rotate(${randomRotation}deg)`;
    });
  }
  
  // 초기 위치 설정
  randomizeStickers();
  
  // 창 크기 변경 시 위치 재조정
  window.addEventListener('resize', randomizeStickers);
});
