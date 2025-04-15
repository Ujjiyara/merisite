// Add a subtle flicker effect to the title
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.title');
  if (!title) return;
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
    if (!lightningContainer) return; // Prevent error if not present

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

// Check if the scroll-indicator element exists before adding the event listener
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const achievements = document.getElementById('achievements');
    if (achievements) {
      achievements.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Function to log events
function logEvent(eventType, eventTarget) {
  const timestamp = new Date().toISOString(); // Get the current timestamp
  const targetType = eventTarget.tagName.toLowerCase(); // Get the tag name of the target
  const targetClass = eventTarget.className || 'No class'; // Get the class name (if any)
  const targetId = eventTarget.id || 'No ID'; // Get the ID (if any)

  console.log(`${timestamp}, ${eventType}, Target: ${targetType}, Class: ${targetClass}, ID: ${targetId}`);
}

// Capture all click events
document.addEventListener('click', (event) => {
  logEvent('click', event.target);
});

// Capture page views (when the DOM is fully loaded)
document.addEventListener('DOMContentLoaded', () => {
  logEvent('view', document.body);
});

document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const inputText = document.getElementById('inputText');
  const analysisResult = document.getElementById('analysisResult');
  if (!analyzeBtn || !inputText || !analysisResult) return;

  analyzeBtn.addEventListener('click', () => {
    const text = inputText.value;

    // Basic counts
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    // Tokenize words (case-insensitive)
    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    // Pronouns, prepositions, indefinite articles
    const pronouns = [
      "i","me","my","mine","myself","we","us","our","ours","ourselves",
      "you","your","yours","yourself","yourselves",
      "he","him","his","himself","she","her","hers","herself",
      "it","its","itself","they","them","their","theirs","themselves"
    ];
    const prepositions = [
      "about","above","across","after","against","along","among","around","at","before","behind","below","beneath","beside","between","beyond","but","by","concerning","despite","down","during","except","for","from","in","inside","into","like","near","of","off","on","onto","out","outside","over","past","regarding","since","through","throughout","to","toward","under","underneath","until","up","upon","with","within","without"
    ];
    const articles = ["a", "an"];

    // Count occurrences
    function countGroup(group) {
      const counts = {};
      group.forEach(word => counts[word] = 0);
      tokens.forEach(token => {
        if (group.includes(token)) counts[token]++;
      });
      return counts;
    }

    const pronounCounts = countGroup(pronouns);
    const prepositionCounts = countGroup(prepositions);
    const articleCounts = countGroup(articles);

    // Display results
    analysisResult.innerHTML = `
      <h3>Basic Counts</h3>
      <ul>
        <li>Letters: ${letters}</li>
        <li>Words: ${words}</li>
        <li>Spaces: ${spaces}</li>
        <li>Newlines: ${newlines}</li>
        <li>Special Symbols: ${specialSymbols}</li>
      </ul>
      <div class="analysis-flex">
        <div>
          <h3>Pronouns Count</h3>
          <ul>
            ${Object.entries(pronounCounts).filter(([_,v])=>v>0).map(([k,v])=>`<li>${k}: ${v}</li>`).join('') || '<li>None found</li>'}
          </ul>
        </div>
        <div>
          <h3>Prepositions Count</h3>
          <ul>
            ${Object.entries(prepositionCounts).filter(([_,v])=>v>0).map(([k,v])=>`<li>${k}: ${v}</li>`).join('') || '<li>None found</li>'}
          </ul>
        </div>
        <div>
          <h3>Indefinite Articles Count</h3>
          <ul>
            ${Object.entries(articleCounts).filter(([_,v])=>v>0).map(([k,v])=>`<li>${k}: ${v}</li>`).join('') || '<li>None found</li>'}
          </ul>
        </div>
      </div>
    `;
  });
});