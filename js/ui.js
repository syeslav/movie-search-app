// Управление пользовательским интерфейсом

const UI = {
    // инициализация UI
    init() {
        this.resultsContainer = document.getElementById('results-container');
        this.movieResults = document.getElementById('movie-results');
        this.loading = document.getElementById('loading');
        this.movieDetails = document.getElementById('movie-details');
        
        // скрываем контейнер результатов при загрузке
        this.resultsContainer.style.display = 'none';
    },
    
    // показать/скрыть загрузку
    toggleLoading(show) {
        this.loading.style.display = show ? 'block' : 'none';
        this.resultsContainer.style.display = show ? 'none' : 'block';
    },
    
    // отображение списка фильмов
    displayMovies(movies) {
        this.movieResults.innerHTML = '';
        
        const movieGrid = document.createElement('div');
        movieGrid.className = 'movie-grid';
        
        movies.forEach(movie => {
            const movieCard = this.createMovieCard(movie);
            movieGrid.appendChild(movieCard);
        });
        
        this.movieResults.appendChild(movieGrid);
        this.attachDetailsHandlers();
    },
    
    // создание карточки фильма
    createMovieCard(movie) {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title}" class="movie-poster">
            <div class="movie-info">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-year">${movie.Year}</div>
                <button class="details-btn" data-id="${movie.imdbID}">Подробнее</button>
            </div>
        `;
        
        return movieCard;
    },
    
    // прикрепление обработчиков для кнопок "Подробнее"
    attachDetailsHandlers() {
        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', function() {
                const imdbID = this.getAttribute('data-id');
                SearchService.getMovieDetails(imdbID);
            });
        });
    },
    
    // отображение сообщения об ошибке
    displayErrorMessage(message) {
        this.movieResults.innerHTML = `<div class="error-message">${message}</div>`;
    },
    
    // отображение детальной информации о фильме
    displayMovieDetails(movie) {
        const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        
        let ratingsHTML = '';
        if (movie.Ratings && movie.Ratings.length > 0) {
            ratingsHTML = '<div class="details-ratings">';
            movie.Ratings.forEach(rating => {
                ratingsHTML += `
                    <div class="rating">
                        <div class="rating-source">${rating.Source}</div>
                        <div class="rating-value">${rating.Value}</div>
                    </div>
                `;
            });
            ratingsHTML += '</div>';
        }
        
        this.movieDetails.innerHTML = `
            <div class="details-header">
                <img src="${poster}" alt="${movie.Title}" class="details-poster">
                <div class="details-info">
                    <h2 class="details-title">${movie.Title} (${movie.Year})</h2>
                    <div class="details-meta">
                        <p><strong>Рейтинг:</strong> ${movie.Rated}</p>
                        <p><strong>Жанр:</strong> ${movie.Genre}</p>
                        <p><strong>Продолжительность:</strong> ${movie.Runtime}</p>
                        <p><strong>Режиссер:</strong> ${movie.Director}</p>
                        <p><strong>Актеры:</strong> ${movie.Actors}</p>
                        <p><strong>Язык:</strong> ${movie.Language}</p>
                        <p><strong>Страна:</strong> ${movie.Country}</p>
                    </div>
                    ${ratingsHTML}
                </div>
            </div>
            <div class="details-plot">
                <h3>Сюжет</h3>
                <p>${movie.Plot}</p>
            </div>
            <div class="details-meta">
                <p><strong>Награды:</strong> ${movie.Awards}</p>
                <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>
                <p><strong>Production:</strong> ${movie.Production}</p>
                <p><strong>Website:</strong> ${movie.Website !== 'N/A' ? `<a href="${movie.Website}" target="_blank">${movie.Website}</a>` : 'N/A'}</p>
            </div>
        `;
        
        this.movieDetails.style.display = 'block';
        this.movieDetails.scrollIntoView({ behavior: 'smooth' });
    },
    
    // отображение ошибки при загрузке деталей фильма
    displayMovieDetailsError(message) {
        this.movieDetails.innerHTML = `<div class="error-message">${message}</div>`;
        this.movieDetails.style.display = 'block';
    }
};