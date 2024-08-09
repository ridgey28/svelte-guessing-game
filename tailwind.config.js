import daisyui from 'daisyui';
module.exports = {
	content: ['./src/**/*.{svelte,js,ts}'],

	plugins: [daisyui],
	daisyui: {
		themes: ['light', 'sunset']
	}
};
