<script>
	import {
		Control,
		ControlGroup,
		ControlArray,
		controlClasses,
		email,
		integer,
		required,
		minLength,
		maxLength,
		min,
		max,
	} from "@rbzl/svelte-form-control";
	import { goto } from "@roxi/routify";
	import { onDestroy } from "svelte";
	import { authStore, loading, error } from "../../stores/auth.store";

	const un = authStore.subscribe((state) => {
		if (state.authenticated) {
			$goto("/index");
		}
	});

	const asyncValidtor = async (value) => {
		console.log("async validator");
		return new Promise((resolve) =>
			setTimeout(() => {
				resolve(
					value === "wayne@do.com" ? null : { serverError: true }
				);
			}, 2000)
		);
	};

	const loginForm = new ControlGroup({
		email: new Control("", [required, email, asyncValidtor]),
		password: new Control("", [required, minLength(6)]),
	});

	const value = loginForm.value;
	const state = loginForm.state;

	onDestroy(un);
</script>

<div class="panel login-panel mt-2">
	<div class="panel-header text-center">
		<div class="panel-title h5 mt-10">LOGIN</div>
	</div>
	<div class="panel-body">
		{#if $error}
			<div class="toast toast-error">
				{$error}
			</div>
		{/if}
		<!-- svelte-ignore component-name-lowercase -->
		<form
			on:submit|preventDefault={() =>
				authStore.login($value.email, $value.password)}
		>
			<div
				class="form-group"
				class:has-error={$state.email.$touched && !$state.email.$valid}
			>
				<label class="form-label" for="Email">Email</label>
				<input
					class="form-input"
					type="email"
					name="email"
					bind:value={$value.email}
					use:controlClasses={loginForm.child("email")}
				/>
				{#if $state.email.$touched && !$state.email.$valid}
					<p class="form-input-hint">Please input valid email</p>
				{/if}

				{#if $state.email.$pending}
					<p class="form-input-hint">Validating....</p>
				{/if}
			</div>
			<div
				class="form-group"
				class:has-error={$state.password.$touched &&
					!$state.password.$valid}
			>
				<label class="form-label" for="Password">Password</label>
				<input
					class="form-input"
					type="password"
					name="password"
					bind:value={$value.password}
					use:controlClasses={loginForm.child("password")}
				/>
				{#if $state.password.$touched && !$state.password.$valid}
					<p class="form-input-hint">Please enter password.</p>
				{/if}
			</div>
		</form>
	</div>
	<div class="panel-footer">
		<button
			disabled={!$state.$valid}
			class="btn btn-primary btn-block"
			class:loading={$loading}
			on:click={() => authStore.login($value.email, $value.password)}
			>Login</button
		>
	</div>
</div>

<style lang="scss">
	.login-panel {
		width: 600px;
		margin-left: auto;
		margin-right: auto;
		padding: 0 2rem;
	}

	@media (max-width: 600px) {
		:host {
			.login-panel {
				width: 100%;
			}
		}
	}
</style>
