
document.addEventListener("DOMContentLoaded", () => {

    // Sélectionner les éléments à animer
    const elements = document.querySelectorAll(
        "section, .project-card, .skill-card, .timeline-item"
    );

    // Vérifier les préférences d'animation
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    // Préparer chaque élément avec un délai progressif
    elements.forEach((element, index) => {
        element.classList.add("reveal");

        // Décalage progressif, plafonné à 400 ms
        const delay = Math.min(index * 80, 400);

        element.style.animationDelay = `${delay}ms`;
    });

    // Observer les éléments pendant le défilement
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                // Ne plus observer après l'apparition
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    // Lancer l'observation
    elements.forEach((element) => {
        observer.observe(element);
    });

});
