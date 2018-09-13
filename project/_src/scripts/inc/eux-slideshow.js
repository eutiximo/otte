function euxSlideShow(selector, params) {
    var AllSlides = document.querySelectorAll(selector || '.eux-slideshow');
    
    /*
     * Core function that build the slide show
     */
    function buildSlide(Slide) {
        var slides = Slide.children,
            slideLong = slides.length,
            wrapSlides;
        
        //Wrap slides in ".content"
        wrapSlides = document.createElement('div');
        wrapSlides.innerHTML = '';
        wrapSlides.className = 'wrap-slides';
        
        wrapSlides.appendChild(slides[1]);
        Slide.innerHTML = wrapSlides;
        
        console.log(wrapSlides);
    }
    
    /*
     * Fetch all slides in the DOM and apply setting per slide
     */
    AllSlides.forEach(function (elem) {
        buildSlide(elem);
    });
}