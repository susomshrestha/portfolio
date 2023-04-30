const navButton = document.querySelector('#btn-ham');
const navigation = document.querySelector('#navigation');
const crossBtn = document.querySelector('#btn-cross');
const main = document.querySelector('#main');
const header = document.querySelector('.nav-header');

const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		tabs.forEach(tab => {
			tab.classList.remove('active');
		})
		tab.classList.add('active');
		const target = document.querySelector(tab.dataset.tabTarget);
		tabContents.forEach((content) => {
			content.classList.remove('active');
		});
		target.classList.add('active');
	});
});

navButton.addEventListener('click', () => {
	navigation.setAttribute('data-visible', true);
	main.classList.add('blur');
});

crossBtn.addEventListener('click', () => {
	navigation.setAttribute('data-visible', false);
	main.classList.remove('blur');
});

// show or remove navbar on scroll up and down
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
