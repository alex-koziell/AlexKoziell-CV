random_normal = (mean, variance, skew) => {
    // Draw samples from a normal distribution

    // Box-Muller transform
    let u = 0, v = 0
    while(u === 0) u = Math.random() // Convert [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    // Transform from standard normal
    x = mean + variance * z

    // Apply skew
    x = x + skew * Math.sign(z) * Math.pow(Math.abs(z), 1 / 3)

    return x
}

typewriter = textElement => {
    let text = textElement.textContent
    let textLength = text.length
    textElement.textContent = ''

    let cursorPosition = 0
    let typeDelay = 50

    let typeText = () => {
        textElement.textContent += text[cursorPosition]
    
        cursorPosition += 1;
        if (cursorPosition < textLength - 1) {
            let factor = -1
            while (factor <= 0)
                factor = random_normal(1, 2, -1)
            console.log(factor)
            setTimeout(typeText, typeDelay * factor)
        } else {
            setTimeout(
                () => textElement.classList.remove('blinking-cursor'),
                5000
            )
            
        }
    }

    return typeText
}

const observer = new IntersectionObserver(function(entries, observer) {
    // Check if any of the elements are intersecting the viewport.
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Run the function when the element enters the viewport.
        typeText = typewriter(entry.target)
        typeText()
        // Ensure the function is only called once.
        observer.unobserve(entry.target)
      }
    }
})

typewriterElements = document.querySelectorAll('.typewriter')
typewriterElements.forEach(element => {
    observer.observe(element)
})
observer.observe(document.querySelector('.typewriter'))