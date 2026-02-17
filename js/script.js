// ================= MÚSICAS =================
const tracks = [
    { title: "Alguém Me Disse", src: "audio/Alguém Me Disse.mpeg" },
    { title: "Derrota", src: "audio/Derrota.mpeg" },
    { title: "Eu Vivo Sem Amor Nesse Mundo", src: "audio/Eu Vivo Sem Amor Nesse Mundo.mpeg" },
    { title: "Fui Andando Nesta Rua", src: "audio/Fui Andando Nesta Rua.mpeg" },
    { title: "Minhas Qualidades, Meus Defeitos - Verônica", src: "audio/Minhas Qualidades, Meus Defeitos - Verônica.mpeg" },
    { title: "Quando Abaixo a Cabeça", src: "audio/Quando Abaixo a Cabeça.mpeg" },
    { title: "Quem Eu Quero Não Me Quer", src: "audio/Quem Eu Quero Não Me Quer.mpeg" },
    { title: "Tu És o Maior da Minha Vida", src: "audio/Tu És o Maior da Minha Vida.mpeg" },
    { title: "Vou Estudar Meu Pensamento", src: "audio/Vou Estudar Meu Pensamento.mpeg" },
];

let currentTrack = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const trackTitle = document.getElementById("track-title");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Formatar tempo
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Carregar música
function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
}

loadTrack(currentTrack);

// Play/Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Próxima
nextBtn.addEventListener("click", () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "⏸";
});

// Anterior
prevBtn.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playBtn.textContent = "⏸";
});

// Tempo
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Auto próxima
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// ================= SLIDESHOW =================
const images = [
    "img/joaquim cantando.jpeg",
    "img/joaquim, marivelton e marialvo.jpeg",
    "img/Joaquim cantando e Marialvo na Guitarra.jpeg",
    "img/Joaquim cantando, Marialvo guitarra e Erimar Teclados.jpeg"
];

let currentSlide = 0;
const slide = document.getElementById("slide");

setInterval(() => {
    currentSlide = (currentSlide + 1) % images.length;

    slide.style.transition = "opacity 2s ease-in-out";
    slide.style.opacity = 0;

    setTimeout(() => {
        slide.src = images[currentSlide];
        slide.style.opacity = 1;
    }, 1000);

}, 8000);

// ================= POPUP =================
const popup = document.getElementById("welcome-popup");
const enterBtn = document.getElementById("enter-btn");

enterBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// ================= PWA =================
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
