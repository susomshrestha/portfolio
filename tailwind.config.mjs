/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'rgba(var(--surface-background))',
				border: 'rgba(var(--surface-border))',
				card: 'rgba(var(--surface-card))',
				'text-primary': 'rgba(var(--text-primary))',
				'text-secondary': 'rgba(var(--text-secondary))',
				'accent-primary': 'rgba(var(--accent-primary))',
				'text-on-accent': 'rgba(var(--text-on-accent))',
			},
		},
	},
	plugins: [],
};
