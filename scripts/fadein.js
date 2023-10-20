const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    // Check if any of the elements are intersecting the viewport.
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Run the function when the element enters the viewport.
        entry.target.classList.add('is-visible')
        // Ensure the function is only called once.
        observer.unobserve(entry.target)
      }
    }
})

fadeInElements = document.querySelectorAll('.fade-in')
fadeInElements.forEach(element => {
    fadeInObserver.observe(element)
})