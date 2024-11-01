<script>
	import '../app.css';
	export const ssr = false;
</script>

<div class="hero bg-base-200 min-h-[95vh]">
	<div class="hero-content">
		<div class="w-screen">
			<div class="mb-6 text-5xl font-extrabold font-mono">
				<h1 class="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
					Svelte 5 Guessing Game
				</h1>
			</div>
			<slot />
		</div>
	</div>
</div>
<footer class="w-screen bg-cover bg-base-200 min-h-[5vh]">
	<p class="text-center">Made by Tracy Ridge</p>
</footer>
