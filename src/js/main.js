const burgerBtn = document.querySelector('.burger-btn');
const dropdown = document.querySelector('.dropdown');

const handleNav = () => {
	dropdown.classList.toggle('active');
};

burgerBtn.addEventListener('click', handleNav);
