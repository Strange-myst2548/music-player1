// Music Streaming MVP - Main JavaScript
class StreamFlowApp {
    constructor() {
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.7;
        this.searchResults = [];
        this.recentlyPlayed = [];
        this.userFavorites = [];
        this.playQueue = [];
        this.currentQueueIndex = 0;
        
        this.initializeApp();
        this.loadMusicCatalog();
        this.setupEventListeners();
        this.initializeUI();
    }

    // Music Catalog - Diverse collection across genres
    loadMusicCatalog() {
        this.musicCatalog = [
            // Jazz Classics
            { id: 1, title: "So What", artist: "Miles Davis", album: "Kind of Blue", genre: "Jazz", year: 1959, duration: "9:22", cover: "https://kimi-web-img.moonshot.cn/img/www.udiscovermusic.com/b81918ea1f8985cb4b3efbe13d4ac5b2f993b624.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 2, title: "My Favorite Things", artist: "John Coltrane", album: "My Favorite Things", genre: "Jazz", year: 1961, duration: "13:41", cover: "https://kimi-web-img.moonshot.cn/img/jazzfuel.com/a4b1cb9f03a37fa392e621c27e68d3e3d6f385b0.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 3, title: "Strange Fruit", artist: "Billie Holiday", album: "Strange Fruit", genre: "Jazz", year: 1939, duration: "3:12", cover: "https://kimi-web-img.moonshot.cn/img/i.etsystatic.com/c6e33b70415235768435e4ca743e77abd65299f2.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Electronic Masters
            { id: 4, title: "Windowlicker", artist: "Aphex Twin", album: "Windowlicker", genre: "Electronic", year: 1999, duration: "6:07", cover: "https://kimi-web-img.moonshot.cn/img/s3.gomedia.us/8be8f7e023dbd5da16f759263ea3b1f3213c0bfa.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 5, title: "Autobahn", artist: "Kraftwerk", album: "Autobahn", genre: "Electronic", year: 1974, duration: "22:43", cover: "https://kimi-web-img.moonshot.cn/img/marketplace.canva.com/7a17dcce254c78bbf68f830d79d9c3e9e26ab2ce.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 6, title: "Around the World", artist: "Daft Punk", album: "Homework", genre: "Electronic", year: 1997, duration: "7:09", cover: "https://kimi-web-img.moonshot.cn/img/preview.redd.it/d5a6b518f746ef70d1365bf18b89c62d76572c5a.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Indie Rock Gems
            { id: 7, title: "Wake Up", artist: "Arcade Fire", album: "Funeral", genre: "Indie Rock", year: 2004, duration: "5:39", cover: "https://kimi-web-img.moonshot.cn/img/i.etsystatic.com/ec5cc1106e7b71e4ffd1902f5656f66c6a5a32a8.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 8, title: "Paranoid Android", artist: "Radiohead", album: "OK Computer", genre: "Indie Rock", year: 1997, duration: "6:27", cover: "https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/e886a3a0003d4c5e80e8e1df07ad809627539bff.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 9, title: "White Winter Hymnal", artist: "Fleet Foxes", album: "Fleet Foxes", genre: "Indie Rock", year: 2008, duration: "2:27", cover: "https://kimi-web-img.moonshot.cn/img/i.etsystatic.com/88eaacd0c97bf0b5bf8fdd021cc44d9ed7d7d995.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Classical Excellence
            { id: 10, title: "Air on the G String", artist: "Johann Sebastian Bach", album: "Orchestral Suite No. 3", genre: "Classical", year: 1723, duration: "3:35", cover: "https://kimi-web-img.moonshot.cn/img/i.scdn.co/01d94944ee98d4d7d2276d739ac5689f1ea080aa", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 11, title: "Clair de Lune", artist: "Claude Debussy", album: "Suite Bergamasque", genre: "Classical", year: 1905, duration: "5:08", cover: "https://kimi-web-img.moonshot.cn/img/is1-ssl.mzstatic.com/4635a972721f054fe9bce31a7af96164dcf1ce35.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 12, title: "Glassworks", artist: "Philip Glass", album: "Glassworks", genre: "Classical", year: 1982, duration: "6:54", cover: "https://kimi-web-img.moonshot.cn/img/is1-ssl.mzstatic.com/a65d5980b37bd0eadc125952d8c7d70139188efc.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Hip Hop Classics
            { id: 13, title: "Alright", artist: "Kendrick Lamar", album: "To Pimp a Butterfly", genre: "Hip Hop", year: 2015, duration: "7:04", cover: "https://kimi-web-img.moonshot.cn/img/wallpapercave.com/c5c048b0b9ebc4a75ea9e406e9c96b323c09d45a.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 14, title: "Work It", artist: "J Dilla", album: "Donuts", genre: "Hip Hop", year: 2006, duration: "2:18", cover: "https://kimi-web-img.moonshot.cn/img/www.udiscovermusic.com/250b5d22d2546d56bbab8fa8aee2d8c7f0f6f41c.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 15, title: "Electric Relaxation", artist: "A Tribe Called Quest", album: "Midnight Marauders", genre: "Hip Hop", year: 1993, duration: "3:46", cover: "https://kimi-web-img.moonshot.cn/img/i.ebayimg.com/3e2671340b8fc7c86df8b995b520239f7da68da5.webp", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Folk & Acoustic
            { id: 16, title: "The Times They Are A-Changin'", artist: "Bob Dylan", album: "The Times They Are A-Changin'", genre: "Folk", year: 1964, duration: "3:15", cover: "https://kimi-web-img.moonshot.cn/img/d1csarkz8obe9u.cloudfront.net/b3b87578e142056298e895b8cfe5417af26ab0b5.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 17, title: "Big Yellow Taxi", artist: "Joni Mitchell", album: "Ladies of the Canyon", genre: "Folk", year: 1970, duration: "2:16", cover: "https://kimi-web-img.moonshot.cn/img/www.premadepixels.com/80be629070a86713157b6e1b407610519792cc03.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 18, title: "Landslide", artist: "Fleetwood Mac", album: "Fleetwood Mac", genre: "Folk Rock", year: 1975, duration: "3:19", cover: "https://kimi-web-img.moonshot.cn/img/b3pmusic.com/37674bee500703975f2d8d731a31491b9effed7a.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Blues Legends
            { id: 19, title: "The Thrill Is Gone", artist: "B.B. King", album: "Completely Well", genre: "Blues", year: 1969, duration: "5:26", cover: "https://kimi-web-img.moonshot.cn/img/images-na.ssl-images-amazon.com/745d3f32962ccaef2a2e7d19a34d2f3cb70bcb5f.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 20, title: "Hoochie Coochie Man", artist: "Muddy Waters", album: "The Best of Muddy Waters", genre: "Blues", year: 1954, duration: "2:51", cover: "https://kimi-web-img.moonshot.cn/img/is1-ssl.mzstatic.com/7ba2ebc3026ed1886f5e3c80ec47f618ec502c0b.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 21, title: "At Last", artist: "Etta James", album: "At Last!", genre: "Blues", year: 1960, duration: "3:02", cover: "https://kimi-web-img.moonshot.cn/img/www.udiscovermusic.com/35eff809f31ff095629a82b98433116f976280f8.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            
            // Reggae Vibes
            { id: 22, title: "No Woman, No Cry", artist: "Bob Marley", album: "Live!", genre: "Reggae", year: 1975, duration: "7:08", cover: "https://kimi-web-img.moonshot.cn/img/is2-ssl.mzstatic.com/f40b98bce0708659468cb8bbb2d2e57cd2af256b.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 23, title: "Red Red Wine", artist: "UB40", album: "Labour of Love", genre: "Reggae", year: 1983, duration: "5:21", cover: "https://kimi-web-img.moonshot.cn/img/substackcdn.com/7dd7e45d02e5a786dc6133cb9bd5c204b3a16c9b.jpeg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" },
            { id: 24, title: "Pressure Drop", artist: "Toots & The Maytals", album: "Funky Kingston", genre: "Reggae", year: 1973, duration: "3:45", cover: "https://kimi-web-img.moonshot.cn/img/is1-ssl.mzstatic.com/50d06798f5cce91ccbd83640bdc162733d0b135b.jpg", audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" }
        ];

        // Initialize trending and favorites with sample data
        this.trendingMusic = this.musicCatalog.slice(0, 8);
        this.userFavorites = this.musicCatalog.slice(8, 12);
        this.recentlyPlayed = [];
    }

    initializeApp() {
        this.audioPlayer = document.getElementById('audioPlayer');
        this.setupAudioEvents();
        this.initializeAnimations();
    }

    setupAudioEvents() {
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.onMetadataLoaded());
        this.audioPlayer.addEventListener('ended', () => this.onTrackEnded());
        this.audioPlayer.addEventListener('play', () => this.onPlay());
        this.audioPlayer.addEventListener('pause', () => this.onPause());
    }

    initializeAnimations() {
        // Initialize text splitting animation
        if (typeof Splitting !== 'undefined') {
            Splitting();
            
            // Animate hero text
            anime({
                targets: '[data-splitting] .char',
                translateY: [100, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 1400,
                delay: (el, i) => 30 * i
            });
        }

        // Animate floating notes
        anime({
            targets: '.floating-note',
            translateY: [-20, 20],
            rotate: [0, 360],
            opacity: [0.3, 0.8, 0.3],
            easing: 'easeInOutSine',
            duration: 4000,
            loop: true,
            direction: 'alternate',
            delay: (el, i) => i * 1000
        });

        // Initialize carousel
        if (typeof Splide !== 'undefined') {
            this.featuredCarousel = new Splide('#featured-carousel', {
                type: 'loop',
                perPage: 5,
                perMove: 1,
                gap: '2rem',
                autoplay: true,
                interval: 3000,
                pauseOnHover: true,
                breakpoints: {
                    1024: { perPage: 4 },
                    768: { perPage: 3 },
                    640: { perPage: 2 }
                }
            });
        }
    }

    initializeUI() {
        this.populateFeaturedCarousel();
        this.populateQuickActions();
        this.setupSearchFunctionality();
    }

    populateFeaturedCarousel() {
        const featuredList = document.getElementById('featuredList');
        const featuredTracks = this.musicCatalog.slice(0, 10);
        
        featuredList.innerHTML = featuredTracks.map(track => `
            <li class="splide__slide">
                <div class="album-card bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300" onclick="app.playTrack(${track.id})">
                    <img src="${track.cover}" alt="${track.album}" class="w-full aspect-square object-cover rounded-xl mb-3">
                    <h4 class="font-semibold text-white text-sm truncate">${track.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${track.artist}</p>
                    <p class="text-gray-500 text-xs">${track.genre} • ${track.year}</p>
                </div>
            </li>
        `).join('');

        if (this.featuredCarousel) {
            this.featuredCarousel.mount();
        }
    }

    populateQuickActions() {
        this.populateRecentlyPlayed();
        this.populateTrending();
        this.populateFavorites();
    }

    populateRecentlyPlayed() {
        const container = document.getElementById('recentlyPlayed');
        const tracks = this.recentlyPlayed.slice(0, 5);
        
        if (tracks.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-sm">No recently played tracks</p>';
            return;
        }

        container.innerHTML = tracks.map(track => `
            <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onclick="app.playTrack(${track.id})">
                <img src="${track.cover}" alt="${track.title}" class="w-10 h-10 rounded object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">${track.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${track.artist}</p>
                </div>
            </div>
        `).join('');
    }

    populateTrending() {
        const container = document.getElementById('trendingMusic');
        const tracks = this.trendingMusic.slice(0, 5);
        
        container.innerHTML = tracks.map((track, index) => `
            <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onclick="app.playTrack(${track.id})">
                <span class="text-gray-400 text-sm font-medium w-6">${index + 1}</span>
                <img src="${track.cover}" alt="${track.title}" class="w-10 h-10 rounded object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">${track.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${track.artist}</p>
                </div>
            </div>
        `).join('');
    }

    populateFavorites() {
        const container = document.getElementById('userFavorites');
        const tracks = this.userFavorites.slice(0, 5);
        
        if (tracks.length === 0) {
            container.innerHTML = '<p class="text-gray-400 text-sm">No favorite tracks yet</p>';
            return;
        }

        container.innerHTML = tracks.map(track => `
            <div class="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" onclick="app.playTrack(${track.id})">
                <img src="${track.cover}" alt="${track.title}" class="w-10 h-10 rounded object-cover">
                <div class="flex-1 min-w-0">
                    <h4 class="text-white text-sm font-medium truncate">${track.title}</h4>
                    <p class="text-gray-400 text-xs truncate">${track.artist}</p>
                </div>
                <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                </svg>
            </div>
        `).join('');
    }

    setupSearchFunctionality() {
        const mainSearch = document.getElementById('mainSearch');
        const globalSearch = document.getElementById('globalSearch');
        const mainResults = document.getElementById('mainSearchResults');
        const globalResults = document.getElementById('searchResults');

        // Main search functionality
        mainSearch.addEventListener('input', (e) => this.handleSearch(e.target.value, mainResults));
        mainSearch.addEventListener('focus', () => {
            if (mainSearch.value) mainResults.classList.remove('hidden');
        });
        mainSearch.addEventListener('blur', () => {
            setTimeout(() => mainResults.classList.add('hidden'), 200);
        });

        // Global search functionality
        globalSearch.addEventListener('input', (e) => this.handleSearch(e.target.value, globalResults));
        globalSearch.addEventListener('focus', () => {
            if (globalSearch.value) globalResults.classList.remove('hidden');
        });
        globalSearch.addEventListener('blur', () => {
            setTimeout(() => globalResults.classList.add('hidden'), 200);
        });
    }

    handleSearch(query, resultsContainer) {
        if (!query.trim()) {
            resultsContainer.classList.add('hidden');
            return;
        }

        const results = this.musicCatalog.filter(track => 
            track.title.toLowerCase().includes(query.toLowerCase()) ||
            track.artist.toLowerCase().includes(query.toLowerCase()) ||
            track.album.toLowerCase().includes(query.toLowerCase()) ||
            track.genre.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(results, resultsContainer);
        resultsContainer.classList.remove('hidden');
    }

    displaySearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div class="p-4 text-gray-400 text-center">No results found</div>';
            return;
        }

        container.innerHTML = results.map(track => `
            <div class="search-result p-3 border-b border-gray-700 last:border-b-0" onclick="app.playTrack(${track.id})">
                <div class="flex items-center space-x-3">
                    <img src="${track.cover}" alt="${track.title}" class="w-12 h-12 rounded object-cover">
                    <div class="flex-1 min-w-0">
                        <h4 class="text-white font-medium truncate">${track.title}</h4>
                        <p class="text-gray-400 text-sm truncate">${track.artist} • ${track.album}</p>
                        <p class="text-gray-500 text-xs">${track.genre} • ${track.year} • ${track.duration}</p>
                    </div>
                    <button class="text-blue-400 hover:text-blue-300 p-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5v10l8-5-8-5z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    playTrack(trackId) {
        const track = this.musicCatalog.find(t => t.id === trackId);
        if (!track) return;

        this.currentTrack = track;
        this.addToRecentlyPlayed(track);
        
        // Update UI
        this.updateNowPlaying(track);
        this.loadAndPlayTrack(track);
        
        // Hide search results
        document.getElementById('mainSearchResults').classList.add('hidden');
        document.getElementById('searchResults').classList.add('hidden');
    }

    addToRecentlyPlayed(track) {
        this.recentlyPlayed = this.recentlyPlayed.filter(t => t.id !== track.id);
        this.recentlyPlayed.unshift(track);
        if (this.recentlyPlayed.length > 10) {
            this.recentlyPlayed.pop();
        }
        this.populateRecentlyPlayed();
    }

    updateNowPlaying(track) {
        document.getElementById('currentSong').textContent = track.title;
        document.getElementById('currentArtist').textContent = track.artist;
        document.getElementById('currentAlbumArt').src = track.cover;
        document.getElementById('totalTime').textContent = track.duration;
    }

    loadAndPlayTrack(track) {
        // In a real app, this would load the actual audio file
        // For demo purposes, we'll simulate audio playback
        this.audioPlayer.src = track.audio;
        this.audioPlayer.load();
        
        // Simulate metadata loading
        setTimeout(() => {
            this.duration = this.parseDuration(track.duration);
            this.play();
        }, 500);
    }

    parseDuration(duration) {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    play() {
        this.isPlaying = true;
        this.audioPlayer.play().catch(e => {
            // Handle autoplay restrictions
            console.log('Autoplay prevented, user interaction required');
        });
        
        this.updatePlayPauseButton();
        this.startProgressSimulation();
    }

    pause() {
        this.isPlaying = false;
        this.audioPlayer.pause();
        this.updatePlayPauseButton();
        this.stopProgressSimulation();
    }

    updatePlayPauseButton() {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        
        if (this.isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        }
    }

    startProgressSimulation() {
        if (this.progressInterval) clearInterval(this.progressInterval);
        
        this.progressInterval = setInterval(() => {
            if (this.isPlaying && this.currentTime < this.duration) {
                this.currentTime += 0.1;
                this.updateProgressDisplay();
            } else if (this.currentTime >= this.duration) {
                this.onTrackEnded();
            }
        }, 100);
    }

    stopProgressSimulation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }

    updateProgress() {
        this.currentTime = this.audioPlayer.currentTime;
        this.updateProgressDisplay();
    }

    updateProgressDisplay() {
        if (this.duration > 0) {
            const progress = (this.currentTime / this.duration) * 100;
            document.getElementById('progressFill').style.width = `${progress}%`;
            
            const currentMinutes = Math.floor(this.currentTime / 60);
            const currentSeconds = Math.floor(this.currentTime % 60);
            document.getElementById('currentTime').textContent = 
                `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        }
    }

    onMetadataLoaded() {
        this.duration = this.audioPlayer.duration;
    }

    onTrackEnded() {
        this.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayPauseButton();
        this.stopProgressSimulation();
        
        // Auto-play next track in queue
        this.playNext();
    }

    onPlay() {
        this.isPlaying = true;
        this.updatePlayPauseButton();
    }

    onPause() {
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }

    playNext() {
        // Simple next track logic - could be enhanced with shuffle/repeat
        const currentIndex = this.musicCatalog.findIndex(t => t.id === this.currentTrack?.id);
        const nextIndex = (currentIndex + 1) % this.musicCatalog.length;
        this.playTrack(this.musicCatalog[nextIndex].id);
    }

    playPrevious() {
        const currentIndex = this.musicCatalog.findIndex(t => t.id === this.currentTrack?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.musicCatalog.length - 1;
        this.playTrack(this.musicCatalog[prevIndex].id);
    }

    seekTo(time) {
        this.currentTime = time;
        this.audioPlayer.currentTime = time;
        this.updateProgressDisplay();
    }

    setVolume(volume) {
        this.volume = volume;
        this.audioPlayer.volume = volume;
    }

    setupEventListeners() {
        // Player controls
        document.getElementById('playPauseBtn').addEventListener('click', () => {
            if (this.currentTrack) {
                this.isPlaying ? this.pause() : this.play();
            }
        });

        document.getElementById('prevBtn').addEventListener('click', () => this.playPrevious());
        document.getElementById('nextBtn').addEventListener('click', () => this.playNext());

        // Progress bar
        const progressBar = document.getElementById('progressBar');
        progressBar.addEventListener('click', (e) => {
            if (this.currentTrack && this.duration > 0) {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newTime = (clickX / rect.width) * this.duration;
                this.seekTo(newTime);
            }
        });

        // Volume control
        document.getElementById('volumeSlider').addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });

        // Shuffle and repeat buttons (placeholder functionality)
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            // Toggle shuffle mode
            const btn = document.getElementById('shuffleBtn');
            btn.classList.toggle('text-blue-400');
            btn.classList.toggle('text-gray-400');
        });

        document.getElementById('repeatBtn').addEventListener('click', () => {
            // Toggle repeat mode
            const btn = document.getElementById('repeatBtn');
            btn.classList.toggle('text-blue-400');
            btn.classList.toggle('text-gray-400');
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new StreamFlowApp();
});

// Add some utility functions for enhanced interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effects to cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.album-card')) {
            anime({
                targets: e.target.closest('.album-card'),
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.album-card')) {
            anime({
                targets: e.target.closest('.album-card'),
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (!window.app) return;
        
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if (window.app.currentTrack) {
                    window.app.isPlaying ? window.app.pause() : window.app.play();
                }
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) window.app.playPrevious();
                break;
            case 'ArrowRight':
                if (e.ctrlKey) window.app.playNext();
                break;
        }
    });
});