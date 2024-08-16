<script>
	import '../app.css';
	import img from '$lib/assets/logo.png';
</script>

<div class="hero bg-base-200 min-h-screen">
	<div class="hero-content">
		<div class="w-screen">
			<img src={img} alt="logo" class="mb-6" />
			<slot />
		</div>
	</div>
</div>
