function openImageModal(imageSrc) {
    let modal = new bootstrap.Modal(document.getElementById("galleryModal"));
    let img = document.getElementById("modalImage");
    
    img.src = imageSrc;
    img.classList.remove("d-none");
    document.getElementById("modalVideo").classList.add("d-none");
    
    modal.show();
    setTimeout(() => img.classList.add("show"), 100);
}

function openVideoModal(videoSrc) {
    let modal = new bootstrap.Modal(document.getElementById("galleryModal"));
    let video = document.getElementById("modalVideo");
    
    video.src = videoSrc;
    video.classList.remove("d-none");
    document.getElementById("modalImage").classList.add("d-none");
    
    modal.show();
    setTimeout(() => video.classList.add("show"), 100);
}


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelectorAll(".fade-in").forEach(el => {
            el.classList.add("animate");
        });
    }, 100);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("animate");
        });
    });

    document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
});


document.addEventListener("DOMContentLoaded", () => {
    const photoSlider = document.querySelector('.gallery-slider .gallery-row'); 
    const items = photoSlider.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    function updatePhotoSlider() {
        
        photoSlider.style.transform = `translateX(-${currentIndex * 33.333}%)`;
        
        
        items.forEach((item, i) => {
            item.classList.remove('highlight', 'blur-left', 'blur-right');
            const relativeIndex = i - currentIndex;
            if (relativeIndex === 1) { 
                item.classList.add('highlight');
            } else if (relativeIndex === 0) { 
                item.classList.add('blur-left');
            } else if (relativeIndex === 2) { 
                item.classList.add('blur-right');
            }
        });
        
        
        currentIndex = (currentIndex + 1) % (items.length - 2); 
    }
    
    setInterval(updatePhotoSlider, 3000);
    updatePhotoSlider(); 
});