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
    document.querySelectorAll('.zoom-in').forEach(section => {
        observer.observe(section);
    });
});
