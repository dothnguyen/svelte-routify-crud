<script>
	import { createEventDispatcher } from "svelte";
	import { url } from "@roxi/routify";
	import { authStore } from "./../stores/auth.store";

	let dispatch = createEventDispatcher();
</script>

<header class="navbar app-navbar">
	<section class="navbar-section">
		<a
			href="#"
			target="_self"
			class="btn btn-link off-canvas-toggle"
			on:click|preventDefault={() =>
				dispatch("sidenav-off-canvas-toggle")}
		>
			<span class="icon icon-menu" />
		</a>

		<a
			href="#"
			class="btn btn-link sidemenu-toggle"
			on:click|preventDefault={() => dispatch("sidenav-toggle")}
			><span class="icon icon-menu" />
		</a>
		<a href={$url("/.")} class="navbar-brand mr-2">Spectre.css</a>
		<a href={$url("/docs")} class="btn btn-link">Docs</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" class="btn btn-link">GitHub</a>
	</section>

	<section class="navbar-section">
		{#if $authStore.authenticated}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" on:click={() => dispatch("logout")} class="btn btn-link"
				>Logout</a
			>
		{/if}
	</section>
</header>

<style lang="scss">
	.app-navbar {
		height: 3.8rem;
		position: fixed;
		right: 0;
		top: 0;
		-webkit-backdrop-filter: blur(5px);
		backdrop-filter: blur(5px);
		background: rgba(247, 248, 249, 0.65);
		left: 0;
		z-index: 100;
	}

	@media (min-width: 960px) {
		.sidemenu-toggle {
			display: inline;
		}

		.off-canvas-toggle {
			display: none;
		}
	}

	@media (max-width: 960px) {
		.sidemenu-toggle {
			display: none;
		}

		.off-canvas-toggle {
			display: inline;
		}
	}
</style>
