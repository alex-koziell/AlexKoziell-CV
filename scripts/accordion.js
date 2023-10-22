var accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach(accordion => {
    accordion.addEventListener("click", function() {
        var currentChar = this.lastElementChild.textContent
        this.lastElementChild.textContent = currentChar == '+' ? '–' : '+'
        var panel = this.nextElementSibling
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
            accordion.classList.remove('active')
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px"
            accordion.classList.add('active')
        }
        })
})