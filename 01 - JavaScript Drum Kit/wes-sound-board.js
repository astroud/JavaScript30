// List of audio events for addEventListener:
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

// Animation ideas for project
// https://javascript.info/js-animation

console.log('This is a tribute to Wes Bos for his entertaining and accessible videos.');

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(soundKey) {
  const audio = document.querySelector(`audio[data-key="${soundKey}"]`);
  const key = document.querySelector(`div[data-key="${soundKey}"]`);
  if (!audio) return;

  key.classList.add('playing');   // Highlight the currently sound
  audio.currentTime = 0;
  audio.play();

  // Remove highlight after the effect finishes playing
  audio.addEventListener('ended', function() {
    key.classList.remove('playing');
  });
}

function handleKey(e) {
  let soundKey = e.keyCode;
  playSound(soundKey);
}

function handleClick(e) {
  let soundKey = e.target.closest('div.key').dataset.key;
  playSound(soundKey);
}

const keys = Array.from(document.querySelectorAll('.key'));

// Handle keys and clicks
window.addEventListener('keydown', handleKey);
keys.forEach(key => key.addEventListener('click', handleClick));