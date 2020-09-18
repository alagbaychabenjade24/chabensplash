const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const home = document.querySelector('.home'); 


home.addEventListener('click', load => {
    load.preventDefault();
});


let ready = false;
let imagesLoaded = 0; 
let totalImages = 0;
let photosArray = [];

// Unsplase API
const count = 30;
const apiKey = 'oL5Hq_C8EVp-KyEOuGgFf6b_cpOaaNxFfXPKKP7phn4';
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {   
    imagesLoaded = 0;

    totalImages = photosArray.length;

    // Run function for each object in photosArray
    photosArray.forEach(photo => {  
        // Create <a></a> to link Unsplash  
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });        

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a></a>, then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};  

// Get photos from Unsplash API
const getPhotos = async () => {
    try {  
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(err) {
        // Catch Error Here
    }
};

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();

const menu = document.querySelector('.menu');
const navLink = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

const navAnimations = () => {
    menu.addEventListener('click', () => {
        navLink.classList.toggle('nav-active');  
        menu.classList.toggle('rotate');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLink.classList.remove('nav-active');  
            menu.classList.remove('rotate');
        });
    });
};

navAnimations();