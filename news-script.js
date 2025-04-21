document.addEventListener('DOMContentLoaded', function() {
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