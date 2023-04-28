const navButton = document.querySelector('#btn-ham');
const navigation = document.querySelector('#navigation');
const crossBtn = document.querySelector('#btn-cross');
const main = document.querySelector('#main');
const header = document.querySelector('.nav-header');

navButton.addEventListener('click', () => {
	navigation.setAttribute('data-visible', true);
	main.classList.add('blur');
});

crossBtn.addEventListener('click', () => {
	navigation.setAttribute('data-visible', false);
	main.classList.remove('blur');
});

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	let currentScrollPos = window.pageYOffset;
	if (currentScrollPos < 30) {
		header.classList.remove('nav-scroll-up');
	} else {
		if (prevScrollpos > currentScrollPos) {
			header.classList.add('nav-scroll-up');
			header.classList.remove('nav-scroll-down');
		} else {
			header.classList.add('nav-scroll-down');
			header.classList.remove('nav-scroll-up');
		}
	}
	prevScrollpos = currentScrollPos;
};
