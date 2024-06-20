const scrollLeftButtons = document.querySelectorAll('.scroll-left')
const scrollRightButtons = document.querySelectorAll('.scroll-right')

scrollLeftButtons.forEach(scrollLeftButton => {
    var collage = scrollLeftButton.parentNode.parentNode.firstElementChild
    scrollLeftButton.addEventListener('click', () => {
        var amount = collage.firstElementChild.width * 2
        collage.scrollLeft -= amount
      })
})

scrollRightButtons.forEach(scrollRightButton => {
    var collage = scrollRightButton.parentNode.parentNode.firstElementChild
    scrollRightButton.addEventListener('click', () => {
        var amount = collage.firstElementChild.width * 2
        collage.scrollLeft += amount
      })
})