// Add a subtle flicker effect to the title
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  setInterval(() => {
    title.style.opacity = Math.random() > 0.9 ? '0.8' : '1';
  }, 300);
});

// Add functionality for the CV link
document.addEventListener('DOMContentLoaded', () => {
  const cvLink = document.getElementById('cv-link');

  cvLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Check if the CV file exists
    fetch('assets/cv.pdf')
      .then((response) => {
        if (response.ok) {
          // If the file exists, trigger the download
          const link = document.createElement('a');
          link.href = 'assets/cv.pdf';
          link.download = 'cv.pdf';
          link.click();
        } else {
          // If the file does not exist, display an alert
          alert('CV not found.');
        }
      })
      .catch(() => {
        // Handle any errors (e.g., network issues)
        alert('CV not found.');
      });
  });
});

let clickCount = 0; // Initialize click counter

// Get the element with the name
const nameElement = document.getElementById('name');
if (nameElement) {
  nameElement.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 5) {
      window.location.href = 'assets/sakshamee.jpeg';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lightningContainer = document.querySelector('.lightning-container');

  function createLightning() {
    const lightningPath = document.createElement('div');
    lightningPath.classList.add('lightning-path');

    // Randomize the starting position (left, right, or top)
    const side = Math.random();
    let startX, startY;

    if (side < 0.33) {
      // Start from the left
      startX = 0;
      startY = Math.random() * window.innerHeight;
    } else if (side < 0.66) {
      // Start from the right
      startX = window.innerWidth;
      startY = Math.random() * window.innerHeight;
    } else {
      // Start from the top
      startX = Math.random() * window.innerWidth;
      startY = 0;
    }

    // Set the initial position of the lightning path
    lightningPath.style.left = `${startX}px`;
    lightningPath.style.top = `${startY}px`;

    // Generate a connected lightning path
    let currentX = startX;
    let currentY = startY;
    const segments = 10; // Number of segments in the lightning
    const maxOffset = 50; // Maximum offset for each segment
    let path = '';

    for (let i = 0; i < segments; i++) {
      // Randomize the angle and length of each segment
      const angle = Math.random() * 60 - 30; // Random angle between -30 and 30 degrees
      const length = Math.random() * 50 + 20; // Random length between 20 and 50px

      // Calculate the end position of the segment
      const endX = currentX + length * Math.cos((angle * Math.PI) / 180);
      const endY = currentY + length * Math.sin((angle * Math.PI) / 180);

      // Add the segment to the path
      path += `M ${currentX} ${currentY} L ${endX} ${endY} `;

      // Update the current position for the next segment
      currentX = endX;
      currentY = endY;
    }

    // Create an SVG element to draw the lightning path
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';

    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
    pathElement.setAttribute('stroke-width', '2');
    pathElement.setAttribute('fill', 'none');
    pathElement.style.animation = 'grow 0.5s ease-out, fadeOut 1s ease-out 0.5s';

    svg.appendChild(pathElement);
    lightningContainer.appendChild(svg);

    // Remove the lightning path after the animation ends
    setTimeout(() => {
      svg.remove();
    }, 1500); // Match the duration of the animations
  }

  // Create lightning streaks at random intervals
  setInterval(() => {
    if (Math.random() > 0.2) { // Increase probability of lightning (80% chance)
      createLightning();
    }
  }, 400); // Check every 400ms for more frequent lightning
});

document.getElementById('scroll-indicator').addEventListener('click', () => {
  document.getElementById('achievements').scrollIntoView({ behavior: 'smooth' });
});