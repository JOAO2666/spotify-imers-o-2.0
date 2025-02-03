// Sample playlist data
const playlists = [
    {
        title: 'Músicas Curtidas',
        image: 'assets/playlist/1.jpeg',
        songs: [
            { title: 'Música 1', artist: 'Artista 1' },
            { title: 'Música 2', artist: 'Artista 2' },
            { title: 'Música 3', artist: 'Artista 3' }
        ]
    },
    {
        title: 'Daily Mix 1',
        image: 'assets/playlist/3.jpeg',
        songs: []
    },
    {
        title: 'Descobertas da Semana',
        image: 'assets/playlist/4.jpeg',
        songs: []
    },
    {
        title: 'Top Brasil',
        image: 'assets/playlist/5.jpeg',
        songs: []
    },
    {
        title: 'Rock Nacional',
        image: 'assets/playlist/6.jpeg',
        songs: []
    },
    {
        title: 'Pop Mix',
        image: 'assets/playlist/7.jpeg',
        songs: []
    }
];

// DOM Elements
const playButton = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress-filled');
const volumeBar = document.querySelector('.volume-filled');
const currentTimeSpan = document.querySelector('.current-time');
const totalTimeSpan = document.querySelector('.total-time');
const likeButton = document.querySelector('.like-btn');
const recentlyPlayedContainer = document.querySelector('.recently-played');

// Player state
let isPlaying = false;
let currentTime = 0;
const totalTime = 180; // 3 minutes in seconds

// Toggle play/pause
playButton.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playButton.textContent = isPlaying ? '⏸' : '▶';
});

// Update progress bar
function updateProgress() {
    if (isPlaying && currentTime < totalTime) {
        currentTime++;
        const progress = (currentTime / totalTime) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update time display
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime % 60;
        currentTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize time display
const totalMinutes = Math.floor(totalTime / 60);
const totalSeconds = totalTime % 60;
totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;

// Start progress update interval
setInterval(updateProgress, 1000);

// Toggle like button
likeButton.addEventListener('click', () => {
    const isLiked = likeButton.textContent === '❤️';
    likeButton.textContent = isLiked ? '🤍' : '❤️';
});

// Volume control
const volumeControl = document.querySelector('.volume-bar');
volumeControl.addEventListener('click', (e) => {
    const rect = volumeControl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const volumePercent = (x / rect.width) * 100;
    volumeBar.style.width = `${volumePercent}%`;
});

// Progress bar control
const progressControl = document.querySelector('.progress');
progressControl.addEventListener('click', (e) => {
    const rect = progressControl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progressPercent = (x / rect.width) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTime = Math.floor((progressPercent / 100) * totalTime);
});

// Render playlists
function renderPlaylists() {
    playlists.forEach(playlist => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.innerHTML = `
            <img src="${playlist.image}" alt="${playlist.title}">
            <h3>${playlist.title}</h3>
        `;
        recentlyPlayedContainer.appendChild(playlistCard);
    });
}

// Initialize playlists
renderPlaylists();