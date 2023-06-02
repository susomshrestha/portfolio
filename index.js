const navButton = document.querySelector('#btn-ham');
const navigation = document.querySelector('#navigation');
const crossBtn = document.querySelector('#btn-cross');
const main = document.querySelector('#main');
const header = document.querySelector('.nav-header');

const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		tabs.forEach((tab) => {
			tab.classList.remove('active');
		});
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
	if (navigation.getAttribute('data-visible') === 'false') {
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
	} else {
	}
};

const projects = [
	{
		title: 'Wordle Clone',
		description: 'A simple wordle clone in javascript.',
		link: 'https://susomshrestha.github.io/wordle-clone/public/index.html',
		github: 'https://github.com/susomshrestha/wordle-clone',
		technologies: 'HTML, SCSS, Javascript',
	},
	{
		title: 'Weather App',
		description: 'A simple weather app in iOS.',
		link: '',
		github: 'https://github.com/susomshrestha/weather',
		technologies: 'iOS Storyboard, Swift',
	},
];

function populateProjects() {
	const projectBody = document.querySelector('.project-body');
	let html = '';
	projects.forEach((project) => {
		html += `
		<div class="proj">
			<div>
				<div class="proj-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 512 512">
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="32"
							d="M448 341.37V170.61A32 32 0 0 0 432.11 143l-152-88.46a47.94 47.94 0 0 0-48.24 0L79.89 143A32 32 0 0 0 64 170.61v170.76A32 32 0 0 0 79.89 369l152 88.46a48 48 0 0 0 48.24 0l152-88.46A32 32 0 0 0 448 341.37Z" />
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="32"
							d="m69 153.99l187 110l187-110m-187 310v-200" />
					</svg>
				</div>
				<div class="proj-head">${project.title}</div>
				<div class="proj-desc">
					${project.description}
				</div>
			</div>
			<div>
				<div class="links">
					${
						project.link
							? `
						<a href="${project.link}" target="_blank">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24">
								<title>External Link</title>
								<path
									fill="currentColor"
									d="M18 10.82a1 1 0 0 0-1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L8.29 14.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z" />
							</svg>
						</a>
						`
							: ''
					}
					<a href="${project.github}" target="_blank">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24">
							<title>Github</title>
							<path
								fill="currentColor"
								d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
						</svg>
					</a>
				</div>
				<div class="proj-tech">
					<div>${project.technologies}</div>
				</div>
			</div>
		</div>
		`;
	});

	projectBody.innerHTML = html;
}

populateProjects();

const skills = [
	{
		name: 'HTML',
		weight: 5,
	},
	{
		name: 'Angular',
		weight: 8,
	},
	{
		name: 'Javascript',
		weight: 7,
	},
	{
		name: 'Ionic',
		weight: 5,
	},
	{
		name: 'Node',
		weight: 4,
	},
	{
		name: 'CSS',
		weight: 6,
	},
	{
		name: 'React Native',
		weight: 3,
	},
	{
		name: 'iOS',
		weight: 2,
	},
	{
		name: 'Android',
		weight: 1,
	},
	{
		name: 'Git',
		weight: 5,
	},
	{
		name: 'Firebase',
		weight: 6,
	},
	{
		name: 'SQL',
		weight: 4,
	},
];

function populateSkills() {
	const projectBody = document.querySelector('.skills-body');
	let html = '';
	skills.forEach((skill, index) => {
		const element = document.createElement('div');
		const span = document.createElement('span');
		span.innerHTML = skill.name;
		element.appendChild(span);
		element.classList.add('skill', skill.name.replace(' ', '').toLowerCase());
		element.style.fontSize = (skill.weight * 0.25 + 0.5) / 10 + 'em';
		if (index % 3 === 0) {
			element.style.writingMode = 'vertical-lr';
		}
		element.style.opacity = (15 - (9 - skill.weight)) / 15;

		projectBody.appendChild(element);
	});
}

populateSkills();

window.onbeforeunload = () => {
	for (const form of document.getElementsByTagName('form')) {
		form.reset();
	}
};

function scrollTo(e, target) {
	console.log(target);
	const elmntToView = document.getElementById(target);
	console.log(elmntToView);
	elmntToView.scrollIntoView({ behavior: 'smooth' });
}

const elements = document.getElementsByClassName('scroll');
Array.from(elements).forEach((el) => {
	const target = el.getAttribute('data-scroll');
	el.addEventListener('click', () => {
		document.querySelector(`#${target}`).scrollIntoView({
			behavior: 'smooth',
		});
		navigation.setAttribute('data-visible', false);
		main.classList.remove('blur');
	});
});
