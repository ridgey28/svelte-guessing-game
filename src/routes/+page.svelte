<script lang="ts">
	import { localStore } from '$lib/localStore.svelte';
	import Button from '$lib/components/Button.svelte';

	let currentLevel = localStore('currentLevel', 5);
	let modal: boolean = $state(false);
	let ref: HTMLElement;
	let guess: number = $state(0);
	let randomNumber: number = $state.raw(Math.floor(Math.random() * (1 - 100) + 100));
	let message: string = $state('');
	let guesses: number = $state(0);
	let badges: number[] = $state([]);

	let restartGame = () => {
		randomNumber = Math.floor(Math.random() * (1 - 100) + 100);
		guesses = 0;
		badges = [];
		message = '';
		guess = 0;
		modal = false;
	};

	let handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			checkNumber();
		}
	};

	let checkNumber = () => {
		guesses++;
		if (guess < 1 || guess > 100) {
			message = 'Please enter a number between 1 and 100';
			return;
		}
		if (badges.includes(guess)) {
			message = 'You have already guessed that number';
			return;
		}
		if (guesses === currentLevel.value) {
			message = 'You have reached the maximum number of guesses. The number was ' + randomNumber;
			modal = true;
			return;
		}

		badges = [...badges, guess];
		if (guess !== randomNumber) {
			if (guess > randomNumber) {
				message = 'You guessed too high';
			} else {
				message = 'You guessed too low';
			}
		} else {
			message = `Super, you guessed right. You guessed it in ${guesses} tries.`;
			modal = true;
		}
		guess = 0;
	};
	$effect(() => {
		ref.focus();
	});
</script>

<Button
	onclick={() => (currentLevel.value = 10)}
	level="Easy"
	currentLevel={currentLevel.value}
	val={10}
/>
<Button
	onclick={() => (currentLevel.value = 5)}
	level="Medium"
	currentLevel={currentLevel.value}
	val={5}
/>
<Button
	onclick={() => (currentLevel.value = 2)}
	level="Hard"
	currentLevel={currentLevel.value}
	val={2}
/>
<svelte:head>
	<title>Svelte Guessing Game</title>
</svelte:head>

<div class="my-6">
	<label class="form-control w-full">
		<div class="label">
			<span class="label-text font-bold">Enter a Number</span>
		</div>
		<input
			type="number"
			inputmode="numeric"
			min="1"
			max="100"
			bind:this={ref}
			bind:value={guess}
			onselect={() => (message = '')}
			placeholder="Enter number"
			class="input input-bordered input-lg w-full"
			onkeydown={handleKeydown}
		/>
	</label>
</div>
<button onclick={checkNumber} class="btn btn-primary">Submit</button>
<p class="my-2">Hit <kbd class="kbd kbd-md">Enter</kbd> to submit.</p>

{#if message !== ''}
	<div role="alert" class="alert">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-info h-6 w-6 shrink-0"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>{message}</span>
	</div>
{/if}
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
