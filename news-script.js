document.addEventListener('DOMContentLoaded', function() {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <button class="modal-nav prev"><i class="fas fa-chevron-left"></i></button>
        <button class="modal-nav next"><i class="fas fa-chevron-right"></i></button>
        <div class="modal-content"></div>
        <div class="modal-dots"></div>
    `;
    document.body.appendChild(modal);

    // Обработчики для модального окна
    const closeModal = modal.querySelector('.close-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalPrevBtn = modal.querySelector('.modal-nav.prev');
    const modalNextBtn = modal.querySelector('.modal-nav.next');
    const modalDots = modal.querySelector('.modal-dots');

    let currentMediaContainer = null;
    let currentModalIndex = 0;
    let mediaItems = [];
    let dots = [];

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Функция для обновления модального окна
    function updateModal(index) {
        currentModalIndex = index;
        modalContent.innerHTML = '';
        
        const item = mediaItems[currentModalIndex];
        const activeItem = item.querySelector('img, iframe');
        
        if (activeItem) {
            const clonedElement = activeItem.cloneNode(true);
            if (clonedElement.tagName === 'IMG') {
                clonedElement.style.maxWidth = '100%';
                clonedElement.style.maxHeight = '100%';
                clonedElement.style.objectFit = 'contain';
            }
            modalContent.appendChild(clonedElement);
        }
        
        // Обновляем активные точки
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentModalIndex);
        });
        
        // Обновляем активный элемент в миниатюре
        if (currentMediaContainer) {
            const thumbItems = currentMediaContainer.querySelectorAll('.media-item');
            const thumbDots = currentMediaContainer.querySelectorAll('.dot');
            
            thumbItems.forEach((item, i) => {
                item.classList.toggle('active', i === currentModalIndex);
            });
            
            thumbDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentModalIndex);
            });
        }
    }

    // Навигация в модальном окне
    modalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex - 1 + mediaItems.length) % mediaItems.length;
        updateModal(currentModalIndex);
    });

    modalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentModalIndex = (currentModalIndex + 1) % mediaItems.length;
        updateModal(currentModalIndex);
    });

    // Добавляем обработчики кликов на все изображения в новостях
    document.querySelectorAll('.media-item').forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(item);
            });
        }
    });

    function openModal(item) {
        currentMediaContainer = item.closest('.media-container');
        mediaItems = Array.from(currentMediaContainer.querySelectorAll('.media-item'));
        currentModalIndex = Array.from(mediaItems).findIndex(el => el.classList.contains('active'));
        
        // Создаем точки для модального окна
        modalDots.innerHTML = '';
        dots = [];
        mediaItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === currentModalIndex) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                updateModal(index);
            });
            modalDots.appendChild(dot);
            dots.push(dot);
        });
        
        updateModal(currentModalIndex);
        modal.style.display = 'flex';
    }

    // Инициализация медиа-слайдеров
    document.querySelectorAll('.media-container').forEach(container => {
        const items = container.querySelectorAll('.media-item');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const dotsContainer = container.querySelector('.media-dots');
        
        let currentIndex = 0;
        
        // Создаем точки навигации
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToMedia(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = container.querySelectorAll('.dot');
        
        // Функция переключения медиа
        function goToMedia(index) {
            currentIndex = index;
            items.forEach(item => item.classList.remove('active'));
            items[currentIndex].classList.add('active');
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        // Кнопки навигации
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            goToMedia(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            goToMedia(currentIndex);
        });
    });

    // Раскрытие/скрытие полного текста новости
    document.querySelectorAll('.news-read-more').forEach(button => {
        button.addEventListener('click', function() {
            const newsCard = this.closest('.news-card');
            const fullText = newsCard.querySelector('.news-full');
            const excerpt = newsCard.querySelector('.news-excerpt');
            
            if (fullText.style.display === 'none' || !fullText.style.display) {
                fullText.style.display = 'block';
                excerpt.style.display = 'none';
                this.innerHTML = 'Свернуть <i class="fas fa-chevron-up"></i>';
                this.classList.add('active');
                
                // Плавное раскрытие
                fullText.style.maxHeight = '0';
                setTimeout(() => {
                    fullText.style.maxHeight = fullText.scrollHeight + 'px';
                }, 10);
            } else {
                fullText.style.maxHeight = '0';
                setTimeout(() => {
                    fullText.style.display = 'none';
                    excerpt.style.display = 'block';
                    this.innerHTML = 'Читать далее <i class="fas fa-chevron-down"></i>';
                    this.classList.remove('active');
                }, 300);
            }
        });
    });
});