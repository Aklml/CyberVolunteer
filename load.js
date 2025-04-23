document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.burger-menu').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    const headerPlaceholder = document.getElementById('header');
    const footerPlaceholder = document.getElementById('footer');
    
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = `
      <header class="header">
          <div class="header-top">
              <a href="index.html" class="logo">
                  <img src="logo.svg" alt="Logo"> 
                  <span class="logo-text">КИБЕРВОЛОНТЕРЫ</span>
              </a>
              <div class="burger-menu">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          </div>
          <div class="nav-links">
              <a href="news.html">НОВОСТИ</a>
              <a href="index.html#about">О НАС</a>
              <a href="index.html#directions">НАПРАВЛЕНИЯ</a>
              <a href="index.html#team">КОМАНДА</a>
              <a href="index.html#contacts">КОНТАКТЫ</a>
              <button class="btn join-btn">ВСТУПИТЬ</button>
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
                <a href="index.html#contacts">Контакты</a>
                <a href="privacy.html">Политика конфиденциальности</a>
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


// Создаем модальное окно для формы вступления
const joinModal = document.createElement('div');
joinModal.className = 'join-modal';
joinModal.style.display = 'none';
joinModal.innerHTML = `
    <div class="join-modal-content">
        <span class="close-join-modal">&times;</span>
        <h2>Правила вступления</h2>
        <p>Мы приглашаем всех, кто:</p>
        <ul>
            <li>Возрастом от 18 до 35 лет.</li>
            <li>Проживает в Хабаровске или Хабаровском крае.</li>
            <li>Устойчивая психика.</li>
            <li>Готов периодически присутствовать очно по договоренности (с учетом вашего графика).</li>
            <li>Хочет сделать онлайн-мир безопаснее, даже если у вас пока нет опыта в этой области.</li>
        </ul>
        <div class="join-form">
            <input type="text" placeholder="ФИО" required>
            <input type="text" placeholder="ДД.ММ.ГГГГ" required>
            <input type="tel" placeholder="+7 777 777 77 77" required>
            <input type="text" placeholder="@tg, @vk, @ok" required>
            
            <div class="interests">
                <h3>Интересующие направления</h3>
                <label><input type="checkbox" name="direction" value="smm"> СММ</label>
                <label><input type="checkbox" name="direction" value="monitoring"> Мониторинг</label>
                <label><input type="checkbox" name="direction" value="lectures"> Лекционное</label>
            </div>
            
            <button class="submit-join">Отправить</button>
            
            <p class="consent">*Отправляя заявку вы даёте согласие на <a href="privacy.html" target="_blank">обработку персональных данных</a></p>
        </div>
    </div>
`;
document.body.appendChild(joinModal);

// Обработчики для модального окна вступления
const joinModalElement = document.querySelector('.join-modal');
const closeJoinModal = joinModal.querySelector('.close-join-modal');
const submitJoinBtn = joinModal.querySelector('.submit-join');

// Открытие модального окна при клике на кнопку Вступить
document.body.addEventListener('click', (e) => {
  const joinBtn = e.target.closest('.join-btn');
  if (joinBtn) {
      e.preventDefault();
      joinModalElement.style.display = 'block';
      document.body.style.overflow = 'hidden';
  }
});

// Закрытие модального окна
closeJoinModal.addEventListener('click', () => {
    joinModalElement.style.display = 'none';
    document.body.style.overflow = 'auto';
});

joinModalElement.addEventListener('click', (e) => {
    if (e.target === joinModalElement) {
        joinModalElement.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка отправки формы
submitJoinBtn.addEventListener('click', () => {
  const form = joinModal.querySelector('.join-form');
  const fio = form.querySelector('input[placeholder="ФИО"]');
  const birth = form.querySelector('input[placeholder="ДД.ММ.ГГГГ"]');
  const phone = form.querySelector('input[placeholder="+7 777 777 77 77"]');
  const social = form.querySelector('input[placeholder="@tg, @vk, @ok, и др."]');
  const allInputs = [fio, birth, phone, social];
  let hasError = false;

  // Удалим старые сообщения
  form.querySelectorAll('.error-message').forEach(el => el.remove());
  allInputs.forEach(input => input.classList.remove('error'));

  // Проверка + сообщения
  function check(input, regex, message) {
      if (!regex.test(input.value.trim())) {
          input.classList.add('error');
          const msg = document.createElement('div');
          msg.className = 'error-message';
          msg.innerText = message;
          input.after(msg);
          hasError = true;
      }
  }

  check(fio, /^([А-ЯЁа-яё]+\s){2}[А-ЯЁа-яё]+$/, 'Введите ФИО полностью (три слова)');
  check(birth, /^\d{2}\.\d{2}\.\d{4}$/, 'Формат даты: ДД.ММ.ГГГГ');
  check(phone, /^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Формат телефона: +7 999 999 99 99');
  check(social, /^@[\w\d_.-]{3,}$/, 'Укажите соцсеть, начиная с @');

  if (hasError) return;

  // Успех
  submitJoinBtn.disabled = true;
  showMessage('Заявка отправлена! Мы свяжемся с вами ❤️', true);

  setTimeout(() => {
      allInputs.forEach(input => input.value = '');
      form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
      submitJoinBtn.disabled = false;
      joinModalElement.style.display = 'none';
      joinModalElement.style.display = 'none'; 
      document.body.style.overflow = 'auto';
  }, 2000);
});

// Удаление ошибок при вводе
document.querySelectorAll('.join-form input').forEach(input => {
  input.addEventListener('input', () => {
      input.classList.remove('error');
      const msg = input.nextElementSibling;
      if (msg && msg.classList.contains('error-message')) {
          msg.remove();
      }
  });
});

