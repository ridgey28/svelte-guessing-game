<script lang="ts">
	type Props = {
		levelSwitch: (val: number) => void;
		currentLevel: number;
	};
	const buttons = [
		{ level: 'Easy', val: 10 },
		{ level: 'Medium', val: 5 },
		{ level: 'Hard', val: 2 }
	];
	let { currentLevel, levelSwitch }: Props = $props();
</script>

{#each buttons as b}
	<button
		onclick={() => levelSwitch(b.val)}
		class="btn mr-4 btn-sm {currentLevel === b.val ? 'btn-secondary' : 'btn-accent'}"
	>
		{b.level}
	</button>
{/each}
