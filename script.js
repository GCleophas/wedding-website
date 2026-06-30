/* =======================================================
   CONFIGURATION
   Edit these arrays to swap in real photos later.
======================================================= */

// Slideshow: each entry becomes one horizontal slide.
// gradient: CSS gradient string used as mock photo.
// caption: small text shown on the slide.
const SLIDES = [
  { gradient: 'linear-gradient(135deg,#C9A99A,#E8D5CE)', caption: 'Getting ready' },
  { gradient: 'linear-gradient(135deg,#B8965A,#D4B98A)', caption: 'De ringen' },
  { gradient: 'linear-gradient(135deg,#8A9CAA,#B0C4CC)', caption: 'Eerste blik' },
  { gradient: 'linear-gradient(135deg,#C9A99A,#B8965A)', caption: 'Fotoshoot' },
  { gradient: 'linear-gradient(135deg,#9CAA8A,#C4CCAA)', caption: 'De ceremonie' },
  { gradient: 'linear-gradient(135deg,#AA8A9C,#CCB0C4)', caption: 'Ja, ik wil!' },
  { gradient: 'linear-gradient(135deg,#B89A65,#E8D5A0)', caption: 'Borrel' },
  { gradient: 'linear-gradient(135deg,#6A8AAA,#A0B8CC)', caption: 'Eerste dans' },
];

// Timeline moments: each moment has a title (Dutch)
// and an array of mock photo aspect ratios + gradients.
const MOMENTS = {
  voorbereiding: {
    title: 'Voorbereiding',
    photos: [
      { ar: '3/4', g: 'linear-gradient(160deg,#E8D5CE,#C9A99A)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#D4B98A,#B8965A)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#C4CCAA,#9CAA8A)' },
      { ar: '1/1', g: 'linear-gradient(160deg,#E0D0C8,#C9A99A)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#B8965A,#D4B98A)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#C9A99A,#E8D5CE)' },
    ]
  },
  fotoshoot: {
    title: 'Fotoshoot',
    photos: [
      { ar: '4/3', g: 'linear-gradient(160deg,#8A9CAA,#B0C4CC)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#9CAA8A,#C4CCAA)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#AA8A9C,#CCB0C4)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#B0C4CC,#8A9CAA)' },
      { ar: '1/1', g: 'linear-gradient(160deg,#C4CCAA,#9CAA8A)' },
    ]
  },
  ceremonie: {
    title: 'Ceremonie',
    photos: [
      { ar: '3/4', g: 'linear-gradient(160deg,#C9A99A,#B8965A)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#B8965A,#E8D5A0)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#D4B98A,#C9A99A)' },
      { ar: '1/1', g: 'linear-gradient(160deg,#E8D5CE,#B8965A)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#B8965A,#D4B98A)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#C9A99A,#E8D5CE)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#D4B98A,#B8965A)' },
    ]
  },
  borrel: {
    title: 'Borrel',
    photos: [
      { ar: '4/3', g: 'linear-gradient(160deg,#6A8AAA,#A0B8CC)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#A0B8CC,#6A8AAA)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#8A9CAA,#6A8AAA)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#B0C4CC,#8A9CAA)' },
    ]
  },
  feest: {
    title: 'Feest',
    photos: [
      { ar: '3/4', g: 'linear-gradient(160deg,#AA8A9C,#CCB0C4)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#CCB0C4,#AA8A9C)' },
      { ar: '1/1', g: 'linear-gradient(160deg,#C9A99A,#AA8A9C)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#B8965A,#AA8A9C)' },
      { ar: '4/3', g: 'linear-gradient(160deg,#AA8A9C,#B8965A)' },
      { ar: '3/4', g: 'linear-gradient(160deg,#CCB0C4,#C9A99A)' },
    ]
  },
};

/* =======================================================
   BUILD HORIZONTAL SLIDESHOW
======================================================= */
const track = document.getElementById('slideshow-track');

SLIDES.forEach((slide) => {
  const item = document.createElement('div');
  item.className = 'slide-item';
  item.setAttribute('role', 'listitem');
  item.innerHTML = `
    <div class="slide-mock" style="background:${slide.gradient};">
      <span class="slide-caption">${slide.caption}</span>
    </div>`;
  track.appendChild(item);
});

// Prev / Next buttons scroll by one slide width
const SLIDE_WIDTH = () => track.querySelector('.slide-item').offsetWidth + 20; // 20 = gap

document.getElementById('slide-prev').addEventListener('click', () => {
  track.scrollBy({ left: -SLIDE_WIDTH(), behavior: 'smooth' });
});
document.getElementById('slide-next').addEventListener('click', () => {
  track.scrollBy({ left: SLIDE_WIDTH(), behavior: 'smooth' });
});

// Drag-to-scroll on desktop
let isDragging = false, startX = 0, scrollLeft = 0;

track.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.classList.add('is-dragging');
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  track.scrollLeft = scrollLeft - (x - startX);
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  track.classList.remove('is-dragging');
});

/* =======================================================
   BUILD TIMELINE PHOTO GRIDS
======================================================= */
Object.entries(MOMENTS).forEach(([key, data]) => {
  const panel = document.getElementById(`panel-${key}`);

  // Title inside the panel
  const heading = document.createElement('h3');
  heading.textContent = data.title;
  panel.appendChild(heading);

  // CSS-columns photo grid
  const grid = document.createElement('div');
  grid.className = 'photo-grid';

  data.photos.forEach((photo) => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `
      <div class="photo-mock"
           style="background:${photo.g}; aspect-ratio:${photo.ar};"
           aria-label="Trouwfoto">
      </div>`;
    grid.appendChild(item);
  });

  panel.appendChild(grid);
});

/* =======================================================
   TIMELINE TAB SWITCHING
======================================================= */
const timelineBtns   = document.querySelectorAll('.timeline-btn');
const timelinePanels = document.querySelectorAll('.timeline-panel');

timelineBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.moment;

    // Deactivate all tabs and panels
    timelineBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    timelinePanels.forEach(p => p.classList.remove('active'));

    // Activate the clicked tab and its panel
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(`panel-${target}`).classList.add('active');
  });
});
