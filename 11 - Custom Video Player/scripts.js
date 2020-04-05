// Get our elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const fullscreen = player.querySelector("[data-fullscreen]");
const ranges = player.querySelectorAll(".player__slider");

let volume = 1;
let playbackrate = 1;

// Build our functions
function togglePlay(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleKeyPress(e) {
  if (e.key !== " ")  return null;

  togglePlay();
}

function handleRangeUpdate() {
  const { name, value } = this;
  video[name] = value;
}

function handleTimeChanged() {
  const { currentTime, duration } = video;
  const width = (currentTime / duration) * 100;
  progressBar.style.flexBasis = `${width}%`;
}

function handleChangeTime(e) {
  const width = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = width;
}

function toggleFullscreen() {
  video.requestFullscreen();
}



video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(btn => btn.addEventListener("click", skip));
window.addEventListener("keypress", handleKeyPress);
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
video.addEventListener('timeupdate', handleTimeChanged);

let mousedown = false;
progress.addEventListener('click', handleChangeTime);
progress.addEventListener('mousemove', (e) => mousedown && handleChangeTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


fullscreen.addEventListener('click', toggleFullscreen);