let accordionHeaders = document.querySelectorAll(".accordion-header")

accordionHeaders.forEach(accordionHeader => {
    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active')
        let isActive = accordionHeader.classList.contains('active')
        accordionHeader.lastElementChild.innerHTML = isActive ? '–' : '+'
        let accordionPanel = accordionHeader.nextElementSibling
        if (isActive) {
            accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px'
        } else {
            accordionPanel.style.maxHeight = null
        }
        })
})