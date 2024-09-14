<script>
	import '../app.css';
	import img from '$lib/assets/logo.png';
</script>

<div class="hero bg-base-200 min-h-[95vh]">
	<div class="hero-content">
		<div class="w-screen">
			<h1><img src={img} alt="Svelte 5 Guessing Game" class="mb-6" /></h1>
			<slot />
		</div>
	</div>
</div>
<footer class="w-screen bg-cover bg-base-200 min-h-[5vh]">
	<p class="text-center">Made by Tracy Ridge</p>
</footer>
