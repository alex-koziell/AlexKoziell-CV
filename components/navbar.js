
class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar sticky-top navbar-expand-lg navbar-light" style="background-color: #b9d7ea;">
            <a class="navbar-brand" href="index.html"><img src="public/favicon/favicon-32x32.png" width="30" height="30" alt=""> Alex Koziell</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <!-- <a class="nav-item nav-link" href="#">Blog</a> -->
                    <a class="nav-item nav-link" target="_blank" href="https://github.com/alex-koziell">GitHub</a>
                    <!-- <a class="nav-item nav-link" href="#">PolyMath</a> -->
                    <a class="nav-item nav-link" target="_blank" href="public/CV.pdf">CV/Resume</a>
                    <a class="nav-item nav-link" href="vision.html">Machine Learning</a>
                    <a class="nav-item nav-link" href="fractals.html">Fractals</a>
                </div>
            </div>
        </nav>
        `;
    }
}

customElements.define("navbar-custom", Navbar);