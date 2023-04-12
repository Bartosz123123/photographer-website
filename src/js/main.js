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

showAllBtn.addEventListener('click', swapGalleryAndCarousel);
leftBtn.addEventListener('click', handleLeftArrow);
rightBtn.addEventListener('click', handleRightArrow);
document.addEventListener('scroll', handleArrowOnScroll);
burgerBtn.addEventListener('click', handleNav);
