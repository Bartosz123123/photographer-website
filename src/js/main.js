const burgerBtn = document.querySelector('.burger-btn');
const dropdown = document.querySelector('.dropdown');
const arrow = document.querySelector('.icon');
const heroes = document.querySelectorAll('.parallax-hero');

const sliderBox = document.querySelector('.slider-box');
const leftBtn = document.querySelector('.btn-left');
const rightBtn = document.querySelector('.btn-right');
const carouselImages = document.querySelectorAll('.slider-img');
const carouselWidth = 100;
const carouselSpeed = 5000;
let index = 0;

const showAllBtn = document.querySelector('.show-all');
const gallery = document.querySelector('.gallery');
const slider = document.querySelector('.slider');

const thumbnails = document.querySelectorAll('.gallery-img');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.close-popup');
const imgInPopup = document.querySelector('.popup-img');
const popupArrowLeft = document.querySelector('.popup-arrow-left');
const popupArrowRgiht = document.querySelector('.popup-arrow-right');
const body = document.querySelector('.body');
let currentImageIndex;

const handleRightArrowPopup = () => {
	if (currentImageIndex === thumbnails.length - 1) {
		currentImageIndex = 0;
	} else {
		currentImageIndex++;
	}
	imgInPopup.src = thumbnails[currentImageIndex].src;
};

const handleLeftArrowPopup = () => {
	if (currentImageIndex === 0) {
		currentImageIndex = thumbnails.length - 1;
	} else {
		currentImageIndex--;
	}
	imgInPopup.src = thumbnails[currentImageIndex].src;
};

const closePopup = () => {
	popup.classList.add('popup-fade-out');
	body.classList.remove('body-hidden');

	setTimeout(() => {
		popup.classList.add('popup-hidden');
		popup.classList.remove('popup-fade-out');
	}, 300);
};

const swapGalleryAndCarousel = () => {
	gallery.classList.toggle('show-gallery');
	slider.classList.toggle('hide-carousel');
};

const handleCarousel = () => {
	index++;
	changeImages();
};

let startCarousel = setInterval(handleCarousel, carouselSpeed);

const changeImages = () => {
	if (index > carouselImages.length - 1) {
		index = 0;
	} else if (index < 0) {
		index = carouselImages.length - 1;
	}

	sliderBox.style.transform = `translateX(${-index * carouselWidth}%)`;
};

const handleRightArrow = () => {
	index++;
	resetInterval();
};

const handleLeftArrow = () => {
	index--;
	resetInterval();
};

const resetInterval = () => {
	changeImages();
	clearInterval(startCarousel);
	startCarousel = setInterval(handleCarousel, carouselSpeed);
};

const handleNav = () => {
	dropdown.classList.toggle('active');
};

const handleArrowOnScroll = () => {
	const top = window.scrollY;
	if (top > 80) {
		arrow.classList.add('hide-arrow');
		arrow.classList.remove('show-arrow');
	} else if (top < 45) {
		arrow.classList.add('show-arrow');
		arrow.classList.remove('hide-arrow');
	}
};

window.addEventListener('scroll', () => {
	heroes.forEach((hero) => {
		let scrollPosition = window.pageYOffset;
		const number = 0.2;
		// let sum = scrollPosition * number;
		let heroPosition = hero.offsetTop;
		let sum = scrollPosition - heroPosition;
		let sum2 = sum * number + 'px';

		hero.style.transform = `translateY(${sum2})`;
	});
});

document.addEventListener('keydown', (e) => {
	if (!popup.classList.contains('popup-hidden')) {
		if (e.key === 'ArrowRight' || e.keyCode === 39) {
			handleRightArrowPopup();
		} else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
			handleLeftArrowPopup();
		} else if (e.key === 'Escape' || e.keyCode === 27) {
			closePopup();
		}
	}
});

thumbnails.forEach((thumbnail, index) => {
	thumbnail.addEventListener('click', (e) => {
		popup.classList.remove('popup-hidden');
		imgInPopup.src = e.target.src;
		body.classList.add('body-hidden');
		currentImageIndex = index;
	});
});

popupArrowRgiht.addEventListener('click', handleRightArrowPopup);
popupArrowLeft.addEventListener('click', handleLeftArrowPopup);
closePopupBtn.addEventListener('click', closePopup);
showAllBtn.addEventListener('click', swapGalleryAndCarousel);
leftBtn.addEventListener('click', handleLeftArrow);
rightBtn.addEventListener('click', handleRightArrow);
document.addEventListener('scroll', handleArrowOnScroll);
burgerBtn.addEventListener('click', handleNav);
popup.addEventListener('click', (e) =>
	e.target === popup ? closePopup() : false
);
