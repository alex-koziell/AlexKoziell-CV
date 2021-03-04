
class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="navbar">
                <a class="nav-btn" href="index.html"><img src="public/favicon/favicon-32x32.png" width="30" height="30" alt="">Alex Koziell</a>
                <a class="nav-btn" target="_blank" href="https://github.com/alex-koziell">GitHub</a>
                <a class="nav-btn" target="_blank" href="public/CV.pdf">CV/Resume</a>
                <a class="nav-btn" href="vision.html">Machine Learning</a>
                <a class="nav-btn" href="fractals.html">Fractals</a>
            </div>
        `;
    }
}

customElements.define("navbar-custom", Navbar);