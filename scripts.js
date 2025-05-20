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
