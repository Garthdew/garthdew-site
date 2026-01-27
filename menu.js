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
