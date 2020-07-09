console.log('This soundboard is a tribute to Wes Bos for his entertaining and accessible videos.');

function playSound(soundKey) {
  const audio = document.querySelector(`audio[data-key="${soundKey}"]`);
  const key = document.querySelector(`div[data-key="${soundKey}"]`);
  if (!audio) return;

  // Match animation to the duration
  key.setAttribute('style', `transition-duration: ${audio.duration}s`);

  key.classList.add('playing');   // Highlight the currently playing sound
  audio.currentTime = 0;
  audio.play();
  
  countdown(key, audio.duration); // Display a countdown

  // Remove highlight after the effect finishes playing
  audio.addEventListener('ended', function() {
    key.classList.remove('playing');
  });
}

// Displays a countdown while the audio clip plays
function countdown(key, duration) {
  let kbdTag = key.querySelector('kbd');

  if (key.dataset.key != "76") {            // Insert duration for non-turtle
    kbdTag.innerHTML = duration.toFixed(1); // sound clips
  }

  timer = duration.toFixed(1);

  function updateTimeLeft() {
      timer -= 0.1;
      if (key.dataset.key === "76") {
        // When the turtle clip is played, display the turtle
        kbdTag.style.display = 'none';
        turtle();
      } else {
        kbdTag.innerHTML = timer.toFixed(1);
      }

      if (timer < 0) {
        clearInterval(intervalId);      // Stop updateTimeLeft() from running
        if (key.dataset.key === "76") {  
          document.querySelector('.turtle').style.display = 'none';
          kbdTag.style.display = 'block';
        }
        kbdTag.innerHTML = key.dataset.letter;
      }
  }

  let intervalId = window.setInterval(updateTimeLeft, 100);
}

function turtle() {
  let turtle = document.querySelector('.turtle');
  turtle.style.display = 'inline-block';
  turtle.classList.add('shake');
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