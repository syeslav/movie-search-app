// Главный файл приложения - инициализация и обработчики событий

// конфигурация приложения
const config = {
    API_KEY: '7666ed22', // 
    BASE_URL: 'https://www.omdbapi.com/'
};

// состояние приложения
const state = {
    currentPage: 1,
    totalPages: 1,
    currentSearchTerm: '',
    currentType: '',
    totalResults: 0
};

// инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // обработчики событий
    searchBtn.addEventListener('click', handleSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Инициализация UI
    UI.init();
});

// обработчик поиска
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const typeSelect = document.getElementById('type-select');
    
    const searchTerm = searchInput.value.trim();
    const type = typeSelect.value;
    
    if (!searchTerm) {
        alert('Пожалуйста, введите название фильма для поиска');
        return;
    }
    
    // сброс состояния
    state.currentPage = 1;
    state.currentSearchTerm = searchTerm;
    state.currentType = type;
    
    // Выполнение поиска
    SearchService.searchMovies(searchTerm, type, 1);
}