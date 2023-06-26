const burgerBtn = document.querySelector('.burger-btn');
const dropdown = document.querySelector('.dropdown');
const arrows = document.querySelectorAll('.icon');
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
// const popup = document.querySelector('.popup');
const popup = document.querySelector('.popup');
const closePopupBtn = document.querySelector('.close-popup');
const imgInPopup = document.querySelector('.popup-img');
const popupArrowRight = document.querySelector('.popup-arrow-right');
const popupArrowLeft = document.querySelector('.popup-arrow-left');
const body = document.querySelector('.body');
let currentImageIndex;

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const data = document.querySelector('#date');
const place = document.querySelector('#place');
const sendBtn = document.querySelector('.send-btn');
const error = document.querySelectorAll('.error-text');
const clearBtn = document.querySelector('.clear-btn');

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError();
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText} składa się z min. ${min} znaków.`
		);
	}
};

const showError = (input, msg) => {
	if (input && input.parentElement) {
		const formBox = input.parentElement;
		const errorMsg = formBox.querySelector('.error-text');

		formBox.classList.add('error');
		errorMsg.textContent = msg;
	}
};

const clearError = (input) => {
	if (input && input.parentElement) {
		const formBox = input.parentElement;
		formBox.classList.remove('error');
	}
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

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

	// sliderBox.style.transform = `translateX(${-index * carouselWidth}%)`;
	if (sliderBox) {
		sliderBox.style.transform = `translateX(${-index * carouselWidth}%)`;
	}
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
	arrows.forEach((arrow) => {
		if (top > 80) {
			arrow.classList.add('hide-arrow');
			arrow.classList.remove('show-arrow');
		} else if (top < 45) {
			arrow.classList.add('show-arrow');
			arrow.classList.remove('hide-arrow');
		}
	});
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
	if (popup !== null) {
		if (!popup.classList.contains('popup-hidden')) {
			if (e.key === 'ArrowRight' || e.keyCode === 39) {
				handleRightArrowPopup();
			} else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
				handleLeftArrowPopup();
			} else if (e.key === 'Escape' || e.keyCode === 27) {
				closePopup();
			}
		}
	}
});

if (thumbnails !== null) {
	thumbnails.forEach((thumbnail, index) => {
		thumbnail.addEventListener('click', (e) => {
			popup.classList.remove('popup-hidden');
			imgInPopup.src = e.target.src;
			body.classList.add('body-hidden');
			currentImageIndex = index;
		});
	});
}

if (popupArrowRight !== null) {
	popupArrowRight.addEventListener('click', handleRightArrowPopup);
}

if (popupArrowLeft !== null) {
	popupArrowLeft.addEventListener('click', handleLeftArrowPopup);
}
if (closePopupBtn !== null) {
	closePopupBtn.addEventListener('click', closePopup);
}
if (showAllBtn !== null) {
	showAllBtn.addEventListener('click', swapGalleryAndCarousel);
}
if (leftBtn !== null) {
	leftBtn.addEventListener('click', handleLeftArrow);
}
if (rightBtn !== null) {
	rightBtn.addEventListener('click', handleRightArrow);
}
document.addEventListener('scroll', handleArrowOnScroll);

if (burgerBtn !== null) {
	burgerBtn.addEventListener('click', handleNav);
}

if (popup !== null) {
	popup.addEventListener('click', (e) => {
		if (e.target === popup) {
			closePopup();
		}
	});
}

if (clearBtn !== null) {
	clearBtn.addEventListener('click', (e) => {
		e.preventDefault();

		[username, email, data, place].forEach((el) => {
			el.value = '';
		});
	});
}

if (sendBtn !== null) {
	sendBtn.addEventListener('click', (e) => {
		e.preventDefault();

		checkForm([username, email, data, place]);
		checkLength(username, 3);
		checkMail(email);
	});
}
