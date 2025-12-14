(function () {
  const card = document.getElementById('draggableCard');

  let dragging = false;
  let startX = 0;
  let startY = 0;
  let baseX = 0; // current translate X
  let baseY = 0; // current translate Y

  // Limits so the card doesn't go wild (tweak as needed)
  const MAX_ROT = 18; // degrees
  const MAX_TRANSLATE = 220; // px (max distance from base)

  // Helpers to get pointer coords for mouse & touch
  function getPoint(e) {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  }

  function onPointerDown(e) {
    e.preventDefault();
    const p = getPoint(e);
    dragging = true;
    card.classList.add('dragging');
    startX = p.x;
    startY = p.y;
    // compute current transforms to continue from (if card returned)
    // we'll treat baseX/baseY as zero initial
    baseX = 0;
    baseY = 0;

    // Stop transition during drag
    card.style.transition = 'none';

    // add listeners to document so drag still works if pointer leaves card
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
    document.addEventListener('touchmove', onPointerMove, { passive: false });
    document.addEventListener('touchend', onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const p = getPoint(e);
    let dx = p.x - startX;
    let dy = p.y - startY;

    // Limit translations to reasonable values
    if (dx > MAX_TRANSLATE) dx = MAX_TRANSLATE;
    if (dx < -MAX_TRANSLATE) dx = -MAX_TRANSLATE;
    if (dy > MAX_TRANSLATE) dy = MAX_TRANSLATE;
    if (dy < -MAX_TRANSLATE) dy = -MAX_TRANSLATE;

    // rotation based on drag direction — more horizontal drag => more yaw (rotateY),
    // more vertical drag => more pitch (rotateX). Scale to MAX_ROT degrees.
    const rotateY = (dx / MAX_TRANSLATE) * MAX_ROT; // left-right
    const rotateX = (-dy / MAX_TRANSLATE) * (MAX_ROT / 1.8); // up-down (smaller range)

    // Apply transform — translate then rotate from top center (anchor)
    card.style.transform = `translate3d(${dx}px, ${dy}px, 0px) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('dragging');

    // remove move listeners
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('touchend', onPointerUp);

    // When release — animate back to resting position.
    // We re-enable transition for a nice spring-like effect.
    card.style.transition = 'transform 700ms cubic-bezier(.2,.9,.3,1)';
    card.style.transform = 'translate3d(0px, 0px, 0px) perspective(1200px) rotateX(0deg) rotateY(0deg)';
  }

  // Mouse/touch start
  card.addEventListener('mousedown', onPointerDown);
  card.addEventListener('touchstart', onPointerDown, { passive: false });
})();



/* ==========================================================
   FIXED STICKY NAVBAR (UPDATED)
=========================================================== */
document.addEventListener('DOMContentLoaded', function () {
    const stickyNavbar = document.getElementById('stickyNavbar');
    const heroSection = document.querySelector('.hero-section');

    function checkNavbar() {
        if (!stickyNavbar || !heroSection) return;

        const heroHeight = heroSection.offsetHeight;

        if (window.scrollY > heroHeight * 0.7) {
            stickyNavbar.style.display = 'flex';
            document.body.style.paddingTop = '120px';  // ⬅ push page down
        } else {
            stickyNavbar.style.display = 'none';
            document.body.style.paddingTop = '0px';
        }
    }

    checkNavbar();
    window.addEventListener('scroll', checkNavbar);
});



/* ==========================================================
   ACTIVE NAV BUTTON HIGHLIGHT
=========================================================== */
const sections = ['about', 'skills', 'projects', 'resume'];
const buttons = sections.map(id => document.getElementById('btn-' + id));

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach((id, idx) => {
        const section = document.getElementById(id);
        if (
            section &&
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            buttons.forEach(btn => btn.classList.remove('active'));
            buttons[idx].classList.add('active');
        }
    });
});


let currentIndex = 0;

function moveSlide(direction) {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.skill-card');
    const cardWidth = cards[0].offsetWidth + 30; // include gap
    const totalCards = cards.length;

    currentIndex += direction;

    // Loop logic
    if (currentIndex < 0) {
        currentIndex = totalCards - 1; // go to last card
    } 
    if (currentIndex >= totalCards) {
        currentIndex = 0; // go back to first card
    }

    track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

document.addEventListener("DOMContentLoaded", () => {

    const imgEl = document.getElementById("resumeImage");
    const textEl = document.getElementById("resumeCaption");

    const resumeData = [
        {
            img: imgEl.dataset.cert1,
            text: "CISCO Certification 2025"
        },
        {
            img: imgEl.dataset.cert2,
            text: "CISCO Certification 2025"
        },
        {
            img: imgEl.dataset.cert3,
            text: "CISCO Certification 2025"
        },
        {
            img: imgEl.dataset.cert4,
            text: "CISCO Certification 2025"
        },
        {
            img: imgEl.dataset.cert5,
            text: "CISCO Certification 2025"
        },
        {
            img: imgEl.dataset.cert7,
            text: "Webinar 2022"
        },

        {
            img: imgEl.dataset.cert8,
            text: "Webinar 2023"
        },
        {
            img: imgEl.dataset.cert9,
            text: "TESDA Certification 2022"
        },
        
        {
            img: imgEl.dataset.cert6,
            text: "CISCO Certification 2025"
        }
    ];

    let index = 0;

    const nextBtn = document.querySelector(".resume-slider .next");
    const prevBtn = document.querySelector(".resume-slider .prev");

    function updateSlider() {
        imgEl.src = resumeData[index].img;
        textEl.textContent = resumeData[index].text;
    }

    updateSlider();

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % resumeData.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + resumeData.length) % resumeData.length;
        updateSlider();
    });

});
