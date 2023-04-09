const burgerBtn = document.querySelector('.burger-btn');
const dropdown = document.querySelector('.dropdown');
const arrow = document.querySelector('.icon');

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

	console.log(top);
};

document.addEventListener('scroll', handleArrowOnScroll);
burgerBtn.addEventListener('click', handleNav);
