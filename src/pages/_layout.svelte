<script>
	import { metatags } from "@roxi/routify";
	import { goto } from "@roxi/routify/runtime/helpers";
	import { onDestroy } from "svelte";
	import Header from "../components/Header.svelte";
	import { authStore } from "../stores/auth.store";
	metatags.title = "Svelte - Routify - Jwt";

	const un = authStore.subscribe((state) => {
		if (!state.authenticated) {
			$goto("/login");
		}
	});

	onDestroy(un);
</script>

<Header on:logout={() => authStore.logout()} />
<div class="app-container">
	<slot />
</div>

<style lang="scss">
	.app-container {
		margin-top: 3.8rem;
		min-height: calc(100vh - 3.8rem);
	}
</style>
