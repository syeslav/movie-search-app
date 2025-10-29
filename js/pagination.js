// Управление пагинацией

const Pagination = {
    // настройка пагинации
    setupPagination(totalResults, currentPage) {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';
        
        const totalPages = Math.ceil(totalResults / 10);
        
        if (totalPages <= 1) {
            return;
        }
        
        // определяем диапазон страниц для отображения
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);
        
        // добавляем кнопку "Предыдущая"
        if (currentPage > 1) {
            this.createPageButton(paginationContainer, '←', currentPage - 1, false);
        }
        
        // добавляем кнопки с номерами страниц
        for (let i = startPage; i <= endPage; i++) {
            this.createPageButton(paginationContainer, i, i, i === currentPage);
        }
        
        // добавляем кнопку "Следующая"
        if (currentPage < totalPages) {
            this.createPageButton(paginationContainer, '→', currentPage + 1, false);
        }
    },
    
    // создание кнопки страницы
    createPageButton(container, text, page, isActive) {
        const pageButton = document.createElement('button');
        pageButton.className = `page-btn ${isActive ? 'active' : ''}`;
        pageButton.textContent = text;
        pageButton.addEventListener('click', () => SearchService.searchPage(page));
        container.appendChild(pageButton);
    },
    
    // очистка пагинации
    clearPagination() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';
    }
};