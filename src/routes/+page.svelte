<script lang="ts">
	import { localStore } from '$lib/localStore.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup.svelte';

	let currentLevel = localStore('currentLevel', 5);
	let modal: boolean = $state(false);
	let ref: HTMLElement;
	let guess: number | string = $state('');
	let randomNumber: number = $state.raw(Math.floor(Math.random() * (1 - 100) + 100));
	let message: string = $state('Pick a number');
	let guesses: number = $state(0);
	let badges: number[] = $state([]);

	const restartGame = () => {
		randomNumber = Math.floor(Math.random() * (1 - 100) + 100);
		guesses = 0;
		badges = [];
		message = 'Pick a number';
		guess = 0;
		modal = false;
		ref.focus();
	};

	const levelSwitch = (value: number) => {
		if (guesses > currentLevel.value) {
			message = 'You will lose, please switch to a different level';
			return;
		} else {
			currentLevel.value = value;
		}
	};
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			checkNumber();
		}
	};

	const checkNumber = () => {
		guess = Number(guess);
		ref.focus();

		if (guess < 1 || guess > 100) {
			message = 'Please enter a number between 1 and 100';
			return;
		}
		if (badges.includes(guess)) {
			message = 'You have already guessed that number';
			return;
		}

		guesses++;
		if (guesses >= currentLevel.value) {
			message = 'You have reached the maximum number of guesses. The number was ' + randomNumber;
			modal = true;
			return;
		}
		badges.push(guess);
		if (guess !== randomNumber) {
			if (guess > randomNumber) {
				message = 'You need to go lower 👇';
			} else {
				message = 'You need to go higher 👆';
			}
		} else {
			message = `Super, you guessed right. You guessed it in ${guesses} tries.`;
			modal = true;
		}
		guess = '';
	};
	$effect(() => {
		ref.focus();
	});
</script>

<svelte:head>
	<title>Svelte 5 Guessing Game</title>
</svelte:head>
<ButtonGroup currentLevel={currentLevel.value} {levelSwitch} />

<div class="my-6">
	<h2 class="text-4xl font-bold">{message}</h2>
</div>
<div class="my-6">
	<div class="join w-full">
		<input
			type="number"
			min="1"
			max="100"
			maxlength="3"
			bind:this={ref}
			bind:value={guess}
			placeholder="Enter number"
			class="input input-bordered join-item w-5/6"
			onkeydown={handleKeydown}
		/>
		<button onclick={checkNumber} class="btn btn-primary join-item rounded-r-full">Submit</button>
	</div>
</div>

<p class="my-2">Hit <kbd class="kbd kbd-md">Enter</kbd> to submit.</p>

<div class="my-6">
	{#if badges.length > 0}
		<h2 class="text-xl">Guesses</h2>
		{#each badges as badge}
			<div class="badge badge-secondary mx-2">{badge}</div>
		{/each}
	{/if}
</div>
{#if modal}
	<dialog class="modal {modal ? 'modal-open' : ''}">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Game Over</h3>
			<p class="py-4">{message}</p>
			<div class="modal-action">
				<form method="dialog">
					<button onclick={restartGame} class="btn btn-info">Play Again</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
