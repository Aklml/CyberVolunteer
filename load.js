document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header');
    const footerPlaceholder = document.getElementById('footer');
    
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
        <header class="header">
            <div class="logo">
                <img src="logo.svg" alt="Logo"> 
                <span class="logo-text">КИБЕРВОЛОНТЕРЫ</span>
            </div>
            <div class="nav-links">
                <a href="news.html">НОВОСТИ</a>
                <a href="index.html#about">О НАС</a>
                <a href="index.html#directions">НАПРАВЛЕНИЯ</a>
                <a href="index.html#team">КОМАНДА</a>
                <a href="#">ПАРТНЕРЫ</a>
                <a href="index.html#contacts">КОНТАКТЫ</a>
                <a href="join.html" class="btn">ВСТУПИТЬ</a>
            </div>
        </header>
        `;
    }
    
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
              <div class="footer-links">
                <a href="news.html">Новости</a>
                <a href="index.html#about">О нас</a>
                <a href="index.html#directions">Направления</a>
                <a href="index.html#team">Команда</a>
                <a href="#">Партнеры</a>
                <a href="index.html#contacts">Контакты</a>
              </div>
              
              <div class="social-section">
                <span class="social-title">Мы в соцсетях:</span>
                <div class="social-icons">
                  <a href="https://t.me/kibervolonterykhv" target="_blank" aria-label="Telegram" class="social-icon-link">
                    <img src="ico/telegram_logo_88nqim2ujuw9.svg" alt="Telegram">
                  </a>
                  <a href="https://vk.com/kibervolonterykhv?from=groups" target="_blank" aria-label="VK" class="social-icon-link">
                    <img src="ico/vk_oj1e7d18w6lo.svg" alt="VK">
                  </a>
                </div>
              </div>
            </div>
          
            <div class="footer-bottom">
              © Киберволонтёры, 2025
            </div>
        </footer>
        `;
    }
});


// Кнопка "Наверх"
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scrollToTopBtn';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<img src="ico/up_h03c8j056n20.svg" alt="Наверх">';
document.body.appendChild(scrollToTopBtn);

// Показываем/скрываем кнопку при скролле
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

// Плавная прокрутка вверх при клике
scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

