const menuHTML = `
    <ul>
        <li><a href="index.html"><strong>Garth Dew</strong></a></li>
        <br>
        <li><a href="index.html">Index</a></li>
        <li><a href="publications.html">Publications (CAN-DID)</a></li>
        <li><a href="studio.html">Studio</a></li>
        <li><a href="info.html">Information</a></li>
    </ul>
`;

document.addEventListener("DOMContentLoaded", function() {
    const navElement = document.getElementById('main-nav');
    if (navElement) {
        navElement.innerHTML = menuHTML;
    }
});

let currentSlide = 0;

function moveSlide(direction) {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-image');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
}
