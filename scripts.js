// Intersection Observer for Zoom-In Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener("DOMContentLoaded", () => {
    // Observe all sections with the 'zoom-in' class
    document.querySelectorAll('.zoom-in').forEach(section => {
        observer.observe(section);
    });

    // Vision modal logic
    const section = document.getElementById('vision');
    const modal = document.getElementById('visionModal');
    const closeBtn = document.getElementById('closeModal');

    if (section && modal && closeBtn) {
        section.addEventListener('click', () => {
            // Create the star overlay div
            const starOverlay = document.createElement('div');
            starOverlay.classList.add('star-transition');
            document.body.appendChild(starOverlay);

            // Blur everything except the modal (modal shown after delay)
            document.querySelectorAll('body > *:not(#visionModal):not(.star-transition)').forEach(el => {
                el.classList.add('blur');
            });

            // Show modal after 3 seconds and remove star overlay
            setTimeout(() => {
                modal.style.display = 'flex';
                starOverlay.remove();
            }, 3000);
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';

            // Remove blur from everything
            document.querySelectorAll('.blur').forEach(el => {
                el.classList.remove('blur');
            });
        });

        // Optional: close modal when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click(); // simulate close button click
            }
        });
    }
});

function scrollInsights(direction) {
  const container = document.getElementById('insightsCards');
  const scrollAmount = 300; // pixels

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}
const video = document.getElementById('scrollVideo');
  const section = document.querySelector('.video-scroll-section');
  const afterText = document.getElementById('afterText');

  let scrollFraction = 0;
  let targetTime = 0;
  let duration = 1;

  // Wait for video metadata to load
  video.addEventListener('loadedmetadata', () => {
    duration = video.duration;
  });

  // Update scrollFraction on scroll
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      scrollFraction = (scrollTop - sectionTop) / (sectionHeight - window.innerHeight);
      scrollFraction = Math.min(Math.max(scrollFraction, 0), 1);
      targetTime = scrollFraction * duration;
    }

    if (rect.bottom <= window.innerHeight + 10) {
      afterText.style.opacity = 1;
      afterText.style.transform = 'translateY(0)';
    }
  });

  // Smoothly update currentTime with easing
  function smoothScrub() {
    if (!isNaN(video.duration)) {
      const currentTime = video.currentTime;
      const delta = targetTime - currentTime;
      video.currentTime += delta * 0.1; // 0.1 = easing factor (adjust for smoother/faster)
    }
    requestAnimationFrame(smoothScrub);
  }

  // Start the loop
  requestAnimationFrame(smoothScrub);