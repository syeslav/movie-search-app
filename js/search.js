// cервис для работы с поиском фильмов

const SearchService = {
    // поиск фильмов
    async searchMovies(searchTerm, type = '', page = 1) {
        UI.toggleLoading(true);
        
        try {
            const url = this.buildSearchURL(searchTerm, type, page);
            const response = await fetch(url);
            const data = await response.json();
            
            UI.toggleLoading(false);
            
            if (data.Response === 'True') {
                // обновление состояния
                state.totalResults = parseInt(data.totalResults);
                state.totalPages = Math.ceil(state.totalResults / 10);
                state.currentPage = page;
                
                // отображение результатов
                UI.displayMovies(data.Search);
                Pagination.setupPagination(state.totalResults, page);
            } else {
                UI.displayErrorMessage(data.Error || 'Фильмы не найдены');
                Pagination.clearPagination();
            }
        } catch (error) {
            UI.toggleLoading(false);
            console.error('Ошибка при выполнении запроса:', error);
            UI.displayErrorMessage('Произошла ошибка при поиске фильмов');
            Pagination.clearPagination();
        }
    },
    
    // получение детальной информации о фильме
    async getMovieDetails(imdbID) {
        UI.toggleLoading(true);
        
        try {
            const url = `${config.BASE_URL}?apikey=${config.API_KEY}&i=${imdbID}&plot=full`;
            const response = await fetch(url);
            const data = await response.json();
            
            UI.toggleLoading(false);
            
            if (data.Response === 'True') {
                UI.displayMovieDetails(data);
            } else {
                UI.displayMovieDetailsError('Не удалось загрузить информацию о фильме');
            }
        } catch (error) {
            UI.toggleLoading(false);
            console.error('Ошибка при загрузке деталей фильма:', error);
            UI.displayMovieDetailsError('Произошла ошибка при загрузке информации о фильме');
        }
    },
    
    // построение URL для поиска
    buildSearchURL(searchTerm, type, page) {
        let url = `${config.BASE_URL}?apikey=${config.API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
        if (type) {
            url += `&type=${type}`;
        }
        return url;
    },
    
    // поиск на следующей странице
    searchNextPage() {
        if (state.currentPage < state.totalPages) {
            this.searchMovies(state.currentSearchTerm, state.currentType, state.currentPage + 1);
        }
    },
    
    // поиск на предыдущей странице
    searchPreviousPage() {
        if (state.currentPage > 1) {
            this.searchMovies(state.currentSearchTerm, state.currentType, state.currentPage - 1);
        }
    },
    
    // поиск на конкретной странице
    searchPage(page) {
        this.searchMovies(state.currentSearchTerm, state.currentType, page);
    }
};