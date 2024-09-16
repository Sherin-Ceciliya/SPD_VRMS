document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll to sections on link click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add a fade-in effect for the main content
    const missionContent = document.querySelector('.mission-content');
    missionContent.style.opacity = 0;
    missionContent.style.transition = 'opacity 1s ease';
    window.addEventListener('scroll', function() {
        const rect = missionContent.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            missionContent.style.opacity = 1;
        }
    });
});
