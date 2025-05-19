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
            modal.style.display = 'flex';

            // Blur everything except the modal
            document.querySelectorAll('body > *:not(#visionModal)').forEach(el => {
                el.classList.add('blur');
            });
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
