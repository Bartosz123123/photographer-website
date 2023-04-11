const burgerBtn = document.querySelector('.burger-btn');
const dropdown = document.querySelector('.dropdown');
const arrow = document.querySelector('.icon');

const heroes = document.querySelectorAll('.parallax-hero');

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
document.addEventListener('scroll', handleArrowOnScroll);
burgerBtn.addEventListener('click', handleNav);
