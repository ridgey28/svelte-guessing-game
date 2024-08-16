<script lang="ts">
	type Props = {
		level: string;
		val: number;
		currentLevel: number;
		onclick: () => void;
	};

	let { level, val, currentLevel, ...props }: Props = $props();
</script>

<button {...props} class="btn mr-4 btn-sm {currentLevel === val ? 'btn-secondary' : 'btn-accent'}"
	>{level}
</button>
